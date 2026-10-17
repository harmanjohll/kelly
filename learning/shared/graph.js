/* =========================================================
   learning/shared/graph.js
   The Mind Web. Needs D3 v7 and core.js.

   Model: hub (domain) -> group (facet value or English theme)
   -> content nodes, plus every typed content link. Cross domain
   links are dashed gold. In a single domain web, nodes from
   other domains that this domain links to are pulled in at
   the edge, so connections never dead end.

   Two views:
     overview  the whole web, force laid out once (deterministic,
               cached), pan and zoom, labels appear as you zoom.
     focus     one node in the centre, its neighbours around it.
               Tap to travel; the trail keeps where you have been.

   KLS.Web.mount(stage, { domain, sheet, trail, onChange }) -> api
   ========================================================= */

(function (g) {
  const { esc, DOMAINS, node: getNode, allNodes, data, neighbours, linkLabel, nodeHref, domainOf } = g.KLS;
  const PERSON = new Set(['thinker', 'psychologist', 'physicist']);
  const ALL = ['philosophy', 'physics', 'psychology', 'english'];

  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function colours() { return { philosophy: css('--phil'), physics: css('--phys'), psychology: css('--psy'), english: css('--eng'), ink: css('--ink'), muted: css('--muted'), bg: css('--bg'), gold: css('--accent-2'), line: css('--line') }; }

  // ---------- model ----------
  function buildModel(domain) {
    const doms = domain === 'all' ? ALL : [domain];
    const nodes = []; const byId = new Map(); const edges = []; const pair = new Set();
    const add = (n) => { if (!byId.has(n.id)) { byId.set(n.id, n); nodes.push(n); } return byId.get(n.id); };
    const edge = (a, b, kind, link) => {
      const k = a < b ? a + '|' + b : b + '|' + a;
      if (a === b || pair.has(k)) return; pair.add(k);
      edges.push({ source: a, target: b, kind, link, cross: kind === 'link' && domainOf(a) !== domainOf(b) });
    };
    for (const d of doms) {
      const dd = DOMAINS[d];
      add({ id: 'hub.' + d, type: 'hub', title: domain === 'all' ? dd.name : dd.name, domain: d, line: dd.blurb });
      if (d === 'english') {
        const E = data('english'); if (!E) continue;
        if (domain === 'all') {
          const hub = getNode('eng.from-ideas');
          if (hub) { add(Object.assign({ type: 'group' }, hub, { type: 'group', group: 'hub.english' })); edge('hub.english', 'eng.from-ideas', 'struct'); }
          for (const n of allNodes('english')) if (n.deck === 'from-ideas') { add(Object.assign({ type: 'content' }, n, { group: 'eng.from-ideas' })); edge('eng.from-ideas', n.id, 'struct'); }
        } else {
          for (const t of E.themes || []) { add({ id: `grp.english.${t.id}`, type: 'group', title: t.label, domain: 'english', line: '' }); edge('hub.english', `grp.english.${t.id}`, 'struct'); }
          for (const n of allNodes('english')) {
            if (n.kind === 'hub') { add(Object.assign({}, n, { type: 'group' })); edge('hub.english', n.id, 'struct'); continue; }
            const gid = `grp.english.${n.theme}`;
            add(Object.assign({}, n, { type: 'content', group: gid })); if (byId.has(gid)) edge(gid, n.id, 'struct');
            if (n.deck === 'from-ideas') edge('eng.from-ideas', n.id, 'link', { type: 'part-of', why: 'An English word that began as an idea.' });
          }
        }
        continue;
      }
      const D = data(d); if (!D) continue;
      const facet = (D.facets || []).find(f => f.id === D.groupBy);
      for (const v of (facet ? facet.values : [])) { add({ id: `grp.${d}.${v.id}`, type: 'group', title: v.label, domain: d, line: v.blurb || '' }); edge('hub.' + d, `grp.${d}.${v.id}`, 'struct'); }
      for (const n of allNodes(d)) {
        const gv = ((n.facets || {})[D.groupBy] || [])[0];
        const gid = gv ? `grp.${d}.${gv}` : 'hub.' + d;
        add(Object.assign({}, n, { type: 'content', group: gid }));
        edge(gid, n.id, 'struct');
      }
    }
    // Content links; pull in foreign endpoints for single domain webs.
    for (const n of nodes.slice()) {
      if (n.type !== 'content') continue;
      for (const l of n.links || []) {
        const t = getNode(l.to); if (!t) continue;
        if (!byId.has(l.to)) {
          if (domain === 'all') continue;
          add(Object.assign({}, t, { type: 'content', foreign: true }));
        }
        edge(n.id, l.to, 'link', l);
      }
    }
    // Links that point INTO this domain from foreign nodes already present are covered above;
    // links from other domains into this one, whose source is not present, pull the source in too.
    if (domain !== 'all') {
      for (const d of ALL) {
        if (d === domain) continue;
        for (const n of allNodes(d)) for (const l of n.links || []) {
          if (byId.has(l.to) && byId.get(l.to).type === 'content' && !byId.get(l.to).foreign) {
            add(Object.assign({}, n, { type: 'content', foreign: true }));
            edge(n.id, l.to, 'link', l);
          }
        }
      }
    }
    const deg = {};
    for (const e of edges) if (e.kind === 'link') { deg[e.source] = (deg[e.source] || 0) + 1; deg[e.target] = (deg[e.target] || 0) + 1; }
    for (const n of nodes) {
      n.deg = deg[n.id] || 0;
      n.r = n.type === 'hub' ? 16 : n.type === 'group' ? 9 : n.foreign ? 4.5 : 4 + Math.min(6, Math.sqrt(n.deg) * 1.6);
      n.lv = n.type !== 'content' ? 0 : n.deg >= 7 ? 1 : n.deg >= 4 ? 2 : 3;
    }
    return { nodes, edges, byId, domain };
  }

  // ---------- overview layout (deterministic, cached) ----------
  function layout(model) {
    const key = `kls.web.${model.domain}.${model.nodes.length}.${model.edges.length}`;
    try {
      const c = JSON.parse(localStorage.getItem(key) || 'null');
      if (c && c.length === model.nodes.length) { model.nodes.forEach((n, i) => { n.x = c[i][0]; n.y = c[i][1]; }); return; }
    } catch (_) {}
    const hubs = model.nodes.filter(n => n.type === 'hub');
    const HUB_R = hubs.length > 1 ? 620 : 0;
    hubs.forEach((h, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / hubs.length; h.ax = h.x = HUB_R * Math.cos(a); h.ay = h.y = HUB_R * Math.sin(a); });
    const kids = (pid, type) => model.nodes.filter(n => n.type === type && (type === 'group' ? (n.group || 'hub.' + n.domain) === pid : n.group === pid));
    for (const h of hubs) {
      const gs = model.nodes.filter(n => n.type === 'group' && (n.group || 'hub.' + n.domain) === h.id);
      const GR = hubs.length > 1 ? 230 : 300;
      gs.forEach((gn, i) => {
        const a = (i / gs.length) * 2 * Math.PI + (hubs.length > 1 ? Math.atan2(h.ay, h.ax) : 0);
        gn.ax = gn.x = h.ax + GR * Math.cos(a); gn.ay = gn.y = h.ay + GR * Math.sin(a);
        kids(gn.id, 'content').forEach((c, j, arr) => {
          const b = (j / arr.length) * 2 * Math.PI; const rr = 30 + 6 * Math.sqrt(arr.length);
          c.x = gn.ax + rr * Math.cos(b); c.y = gn.ay + rr * Math.sin(b);
        });
      });
    }
    const foreign = model.nodes.filter(n => n.foreign);
    foreign.forEach((f, i) => { const a = (i / Math.max(1, foreign.length)) * 2 * Math.PI; f.x = 620 * Math.cos(a); f.y = 620 * Math.sin(a); });
    const sim = d3.forceSimulation(model.nodes)
      .force('link', d3.forceLink(model.edges.map(e => Object.assign({}, e))).id(d => d.id)
        .distance(e => e.kind === 'struct' ? (e.source.type === 'hub' ? (hubs.length > 1 ? 230 : 300) : 46 + e.target.r * 2) : 140)
        .strength(e => e.kind === 'struct' ? (e.source.type === 'hub' ? 0.9 : 0.5) : e.cross ? 0.015 : 0.05))
      .force('charge', d3.forceManyBody().strength(n => n.type === 'hub' ? -900 : n.type === 'group' ? -260 : -55).distanceMax(420))
      .force('collide', d3.forceCollide(n => n.r + (n.type === 'content' ? 5 : 16)).iterations(2))
      .force('x', d3.forceX(n => n.ax != null ? n.ax : 0).strength(n => n.type === 'hub' ? 1 : n.type === 'group' ? 0.25 : 0.01))
      .force('y', d3.forceY(n => n.ay != null ? n.ay : 0).strength(n => n.type === 'hub' ? 1 : n.type === 'group' ? 0.25 : 0.01))
      .stop();
    const ticks = model.nodes.length > 400 ? 220 : 300;
    for (let i = 0; i < ticks; i++) sim.tick();
    try { localStorage.setItem(key, JSON.stringify(model.nodes.map(n => [Math.round(n.x), Math.round(n.y)]))); } catch (_) {}
  }

  // ---------- mount ----------
  function mount(stage, opts) {
    const o = Object.assign({ domain: 'all', mode: 'overview' }, opts);
    const model = buildModel(o.domain);
    const t0 = performance.now();
    layout(model);
    const layoutMs = Math.round(performance.now() - t0);
    let C = colours();
    let mode = o.mode;
    let focusId = null;
    let trail = [];
    let filter = null; // node -> bool

    const svg = d3.select(stage).append('svg').attr('role', 'img').attr('aria-label', 'Mind Web');
    const root = svg.append('g');
    const gEdges = root.append('g');
    const gNodes = root.append('g');
    const zoom = d3.zoom().scaleExtent([0.15, 5]).on('zoom', (ev) => { root.attr('transform', ev.transform); setZoomLevel(ev.transform.k); });
    svg.call(zoom).on('dblclick.zoom', null);
    svg.on('click', (ev) => { if (ev.target === svg.node()) { if (mode === 'overview') clearFocus(); } });

    const fill = (n) => n.type === 'hub' ? C.ink : n.type === 'group' ? C[n.domain] : C[n.domain] || C.muted;
    function setZoomLevel(k) { svg.attr('data-zl', k < 0.55 ? 0 : k < 1 ? 1 : k < 1.7 ? 2 : 3); }

    // Overview: show labels by importance as the zoom grows.
    const style = document.createElement('style');
    style.textContent = `
      svg[data-zl="0"] .web-node[data-lv="1"] text, svg[data-zl="0"] .web-node[data-lv="2"] text, svg[data-zl="0"] .web-node[data-lv="3"] text,
      svg[data-zl="1"] .web-node[data-lv="2"] text, svg[data-zl="1"] .web-node[data-lv="3"] text,
      svg[data-zl="2"] .web-node[data-lv="3"] text { display: none; }
      svg[data-zl="0"] .web-node.group text { display: none; }
      .web-node.near text, .web-node.focus text { display: block !important; }
      .web-node.focus circle { stroke: var(--ink); stroke-width: 2.5; }
      .web-node.person circle { stroke-width: 2.4; }
      .web-node.foreign circle { stroke-dasharray: 2 2; }`;
    document.head.appendChild(style);

    let edgeSel, nodeSel;
    function short(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }

    function drawOverview() {
      gEdges.selectAll('*').remove(); gNodes.selectAll('*').remove();
      edgeSel = gEdges.selectAll('path').data(model.edges).join('path')
        .attr('class', e => 'web-edge' + (e.cross ? ' cross' : '') + (e.kind === 'struct' ? ' struct' : ''))
        .attr('d', e => pathFor(model.byId.get(e.source.id || e.source), model.byId.get(e.target.id || e.target), e))
        .attr('opacity', e => e.kind === 'struct' ? 0.55 : 0.5);
      nodeSel = gNodes.selectAll('g').data(model.nodes, d => d.id).join('g')
        .attr('class', n => `web-node ${n.type}` + (PERSON.has(n.kind) ? ' person' : '') + (n.foreign ? ' foreign' : ''))
        .attr('data-lv', n => n.lv)
        .attr('transform', n => `translate(${n.x},${n.y})`)
        .on('click', (ev, n) => { ev.stopPropagation(); select(n.id, true); });
      nodeSel.append('circle').attr('r', n => n.r);
      nodeSel.append('text').attr('dy', n => n.r + 12).attr('text-anchor', 'middle').text(n => short(n.title, n.type === 'content' ? 26 : 30));
      paint();
      applyFilter();
    }
    function pathFor(a, b, e) {
      if (!e.cross) return `M${a.x},${a.y}L${b.x},${b.y}`;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y;
      return `M${a.x},${a.y}Q${mx - dy * 0.15},${my + dx * 0.15} ${b.x},${b.y}`;
    }
    function paint() {
      if (!nodeSel) return;
      nodeSel.select('circle')
        .attr('fill', n => PERSON.has(n.kind) ? C.bg : fill(n))
        .attr('stroke', n => PERSON.has(n.kind) ? fill(n) : C.bg);
    }

    function fitAll(dur) {
      const vis = model.nodes;
      const xs = vis.map(n => n.x), ys = vis.map(n => n.y);
      fitBox(Math.min(...xs) - 30, Math.min(...ys) - 30, Math.max(...xs) + 30, Math.max(...ys) + 40, dur);
    }
    function fitBox(x0, y0, x1, y1, dur, maxK) {
      const r = stage.getBoundingClientRect();
      const sheetOpen = o.sheet && o.sheet.classList.contains('on');
      const wide = r.width >= 900;
      const W = r.width - (sheetOpen && wide ? 400 : 0);
      const H = r.height * (sheetOpen && !wide ? 0.42 : 1);
      const k = Math.min(maxK || 2.2, 0.9 * Math.min(W / Math.max(1, x1 - x0), H / Math.max(1, y1 - y0)));
      const tx = W / 2 - k * (x0 + x1) / 2, ty = H / 2 - k * (y0 + y1) / 2;
      const tr = d3.zoomIdentity.translate(tx, ty).scale(k);
      (dur ? svg.transition().duration(dur) : svg).call(zoom.transform, tr);
    }

    // ---------- focus view: ego layout ----------
    function egoNeighbours(id) {
      const n = model.byId.get(id) || getNode(id);
      const out = [];
      const seen = new Set([id]);
      const push = (oid, type, why, dir, structural) => { if (seen.has(oid)) return; const t = model.byId.get(oid) || getNode(oid); if (!t) return; seen.add(oid); out.push({ n: t, type, why, dir, structural }); };
      // Up the hierarchy first, then down, then the real connections.
      if (n && n.group) push(n.group, 'part-of', '', 'out', true);
      if (n && n.type === 'group') push(n.group || 'hub.' + n.domain, 'part-of', '', 'out', true);
      for (const e of model.edges) {
        if (e.kind !== 'struct') continue;
        const s = e.source.id || e.source, t = e.target.id || e.target;
        if (s === id) push(t, 'part-of', '', 'in', true);
      }
      for (const x of neighbours(id)) push(x.id, x.type, x.why, x.dir, false);
      return out;
    }
    function drawFocus(id, animate) {
      const centre = model.byId.get(id) || Object.assign({ type: 'content' }, getNode(id));
      const nb = egoNeighbours(id);
      const r = stage.getBoundingClientRect();
      const n = nb.length;
      const R1 = Math.max(120, Math.min(210, 60 + n * 9));
      const two = n > 14;
      const pts = [{ d: centre, x: 0, y: 0, c: true }].concat(nb.map((x, i) => {
        const a = -Math.PI / 2 + (i / Math.max(1, n)) * 2 * Math.PI;
        const rr = two ? (i % 2 ? R1 * 1.45 : R1) : R1;
        return { d: x.n, x: rr * Math.cos(a), y: rr * Math.sin(a), link: x };
      }));
      gEdges.selectAll('*').remove();
      gEdges.selectAll('path').data(pts.slice(1)).join('path')
        .attr('class', p => 'web-edge hot' + (domainOf(p.d.id) !== domainOf(centre.id) && !p.link.structural && !String(p.d.id).startsWith('grp.') && !String(p.d.id).startsWith('hub.') ? ' cross' : ''))
        .attr('d', p => `M0,0L${p.x},${p.y}`)
        .attr('opacity', p => p.link.structural ? 0.35 : 0.8);
      gNodes.selectAll('*').remove();
      const gs = gNodes.selectAll('g').data(pts, p => p.d.id).join('g')
        .attr('class', p => `web-node near ${p.d.type || 'content'}` + (p.c ? ' focus' : '') + (PERSON.has(p.d.kind) ? ' person' : ''))
        .attr('transform', p => animate ? 'translate(0,0)' : `translate(${p.x},${p.y})`)
        .on('click', (ev, p) => { ev.stopPropagation(); if (!p.c) select(p.d.id, true); });
      gs.append('circle').attr('r', p => p.c ? 16 : p.d.type === 'hub' ? 14 : p.d.type === 'group' ? 10 : 8)
        .attr('fill', p => PERSON.has(p.d.kind) ? C.bg : fill(p.d)).attr('stroke', p => PERSON.has(p.d.kind) ? fill(p.d) : C.bg);
      gs.append('text').attr('text-anchor', 'middle')
        .attr('dy', p => p.c ? 32 : (p.y < -4 ? -14 : 22))
        .style('font-size', p => p.c ? '15px' : '12px').style('font-weight', p => p.c ? 600 : 400)
        .text(p => short(p.d.title, p.c ? 34 : r.width < 500 ? 16 : 24));
      if (animate) gs.transition().duration(450).ease(d3.easeCubicOut).attr('transform', p => `translate(${p.x},${p.y})`);
      const ext = (two ? R1 * 1.45 : R1) + 40;
      fitBox(-ext, -ext, ext, ext, animate ? 400 : 0, 1.6);
    }

    // ---------- selection, trail, sheet ----------
    function select(id, travel) {
      if (!model.byId.get(id) && !getNode(id)) return;
      focusId = id;
      if (travel) { const i = trail.indexOf(id); if (i >= 0) trail = trail.slice(0, i + 1); else trail.push(id); if (trail.length > 12) trail.shift(); }
      if (mode === 'focus') drawFocus(id, true);
      else highlight(id);
      renderSheet(id);
      renderTrail();
      if (o.onChange) o.onChange({ focus: id, mode });
    }
    function highlight(id) {
      if (!nodeSel) return;
      const near = new Set([id]);
      model.edges.forEach(e => { const s = e.source.id || e.source, t = e.target.id || e.target; if (s === id) near.add(t); if (t === id) near.add(s); });
      nodeSel.classed('dim', n => !near.has(n.id)).classed('near', n => near.has(n.id)).classed('focus', n => n.id === id);
      edgeSel.classed('dim', e => (e.source.id || e.source) !== id && (e.target.id || e.target) !== id)
        .classed('hot', e => (e.source.id || e.source) === id || (e.target.id || e.target) === id);
      const pts = Array.from(near).map(x => model.byId.get(x)).filter(Boolean);
      const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
      fitBox(Math.min(...xs) - 40, Math.min(...ys) - 40, Math.max(...xs) + 40, Math.max(...ys) + 50, 450, 2.4);
    }
    function clearFocus() {
      focusId = null;
      if (o.sheet) o.sheet.classList.remove('on');
      if (nodeSel) { nodeSel.classed('dim', false).classed('near', false).classed('focus', false); edgeSel.classed('dim', false).classed('hot', false); applyFilter(); }
      if (o.onChange) o.onChange({ focus: null, mode });
    }
    function renderTrail() {
      if (!o.trail) return;
      o.trail.innerHTML = trail.map((id, i) => {
        const n = model.byId.get(id) || getNode(id);
        return (i ? '<span aria-hidden="true">›</span>' : '') + `<button data-trail="${esc(id)}">${esc(short(n ? n.title : id, 22))}</button>`;
      }).join('');
      o.trail.scrollLeft = o.trail.scrollWidth;
    }
    if (o.trail) o.trail.addEventListener('click', (e) => { const b = e.target.closest('[data-trail]'); if (b) select(b.dataset.trail, true); });

    function badge(n) {
      if (n.evidence) return `<span class="badge ev-${n.evidence}">Evidence: ${n.evidence === 'failed' ? 'failed to replicate' : n.evidence}</span>`;
      if (n.status) return `<span class="badge st-${n.status}">${n.status === 'settled' ? 'Settled science' : n.status === 'interpretation' ? 'Interpretation' : 'Open question'}</span>`;
      return '';
    }
    function renderSheet(id) {
      if (!o.sheet) return;
      const n = model.byId.get(id) || getNode(id);
      if (!n) return;
      const nb = egoNeighbours(id);
      const dname = DOMAINS[n.domain] ? DOMAINS[n.domain].name : '';
      const kind = n.type === 'hub' ? 'Domain' : n.type === 'group' ? 'Cluster' : (n.kindLabel || n.kind || '');
      const isContent = n.type === 'content' || (!n.type && getNode(id));
      const conn = nb.filter(x => !x.structural);
      const members = nb.filter(x => x.structural && x.dir === 'in');
      const up = nb.filter(x => x.structural && x.dir === 'out');
      const row = (x) => `<button class="conn${domainOf(x.n.id) !== domainOf(id) && !x.structural ? ' cross' : ''}" data-go="${esc(x.n.id)}" style="--c:${fill(x.n)};width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);cursor:pointer;color:inherit">
          <span class="dot"></span><span><span class="type">${esc(x.structural ? (x.dir === 'in' ? 'Includes' : 'Part of') : linkLabel(x.type, x.dir))}</span><div class="t">${esc(x.n.title)}</div>${x.why ? `<div class="why">${esc(x.why)}</div>` : ''}</span></button>`;
      o.sheet.innerHTML = `
        <div class="spread"><p class="kicker" style="margin:0">${esc(dname)} · ${esc(kind)}</p><button class="btn ghost small" data-close-sheet aria-label="Close">Close</button></div>
        <h3 style="font-size:1.35rem;margin:.3rem 0 .3rem">${esc(n.title)}</h3>
        ${n.line ? `<p class="muted" style="margin:0 0 .6rem">${esc(n.line)}</p>` : ''}
        <div class="row" style="margin-bottom:10px">${badge(n)}</div>
        <div class="row" style="margin-bottom:6px">
          ${isContent ? `<a class="btn primary small" href="${nodeHref(n.id)}">Open card</a>` : ''}
          <button class="btn small" data-mode-toggle>${mode === 'focus' ? 'See whole web' : 'Focus here'}</button>
        </div>
        ${up.length ? `<div style="margin-top:10px">${up.map(row).join('')}</div>` : ''}
        ${conn.length ? `<h4 class="kicker" style="margin-top:16px">Connections (${conn.length})</h4><div>${conn.map(row).join('')}</div>` : ''}
        ${members.length ? `<h4 class="kicker" style="margin-top:16px">Inside (${members.length})</h4><div>${members.map(row).join('')}</div>` : ''}`;
      o.sheet.classList.add('on');
      o.sheet.scrollTop = 0;
    }
    if (o.sheet) o.sheet.addEventListener('click', (e) => {
      const go = e.target.closest('[data-go]'); if (go) { select(go.dataset.go, true); return; }
      if (e.target.closest('[data-close-sheet]')) { if (mode === 'focus') o.sheet.classList.remove('on'); else clearFocus(); return; }
      if (e.target.closest('[data-mode-toggle]')) setMode(mode === 'focus' ? 'overview' : 'focus');
    });

    function setMode(m) {
      mode = m;
      if (m === 'focus') {
        if (!focusId) focusId = model.nodes.find(n => n.type === 'hub').id;
        if (!trail.length) trail = [focusId];
        drawFocus(focusId, true); renderSheet(focusId); renderTrail();
      } else {
        drawOverview();
        if (focusId) { highlight(focusId); renderSheet(focusId); } else fitAll(300);
      }
      if (o.onChange) o.onChange({ focus: focusId, mode });
    }

    function applyFilter() {
      if (mode !== 'overview' || !nodeSel) return;
      if (!filter) { nodeSel.classed('dim', false); edgeSel.classed('dim', false); return; }
      const keep = new Set(model.nodes.filter(n => n.type !== 'content' || filter(n)).map(n => n.id));
      nodeSel.classed('dim', n => !keep.has(n.id));
      edgeSel.classed('dim', e => !(keep.has(e.source.id || e.source) && keep.has(e.target.id || e.target)) || e.kind === 'struct' && false);
    }

    document.addEventListener('kls-theme', () => { C = colours(); if (mode === 'overview') paint(); else if (focusId) drawFocus(focusId, false); });
    let rz; new ResizeObserver(() => { clearTimeout(rz); rz = setTimeout(() => { if (mode === 'focus' && focusId) drawFocus(focusId, false); }, 150); }).observe(stage);

    // First paint.
    if (mode === 'focus') setMode('focus'); else { drawOverview(); fitAll(0); }

    return {
      model, layoutMs,
      select: (id) => select(id, true),
      setMode, get mode() { return mode; }, get focus() { return focusId; },
      setFilter(fn) { filter = fn; applyFilter(); },
      zoomBy(k) { svg.transition().duration(200).call(zoom.scaleBy, k); },
      fit() { if (mode === 'overview') fitAll(300); else if (focusId) drawFocus(focusId, false); },
      search(q) {
        q = String(q || '').trim().toLowerCase(); if (!q) return [];
        return model.nodes.filter(n => n.title && n.title.toLowerCase().includes(q)).sort((a, b) => a.title.toLowerCase().indexOf(q) - b.title.toLowerCase().indexOf(q)).slice(0, 8);
      },
    };
  }

  g.KLS.Web = { mount, buildModel };
})(window);
