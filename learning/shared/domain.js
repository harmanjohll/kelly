/* =========================================================
   learning/shared/domain.js
   A room (Philosophy, Physics, Psychology). Order:
     hero         the room's own generative sky, its promise
     start here   one featured journey, large
     shelves      journeys grouped by what kind of route they are
     lens         the view that suits this room
                  (traditions / settled to open / how sure are we)
     people       a timeline strip by era
     everything   search, one filter sheet, grouped index
   The page shell sets <body data-domain> and <main id="app">.
   ========================================================= */

(function () {
  const { $, esc, data, store, nodeHref, ROOT, DOMAINS, modal } = KLS;
  const domain = document.body.dataset.domain;
  const D = data(domain);
  const app = $('#app');
  if (!D) { app.innerHTML = '<p class="empty">This room is still being written.</p>'; return; }
  const S = store.get();
  const kinds = Object.fromEntries(D.kinds.map(k => [k.id, k]));
  const facets = D.facets || [];
  const groupFacet = facets.find(f => f.id === D.groupBy);
  const eraFacet = facets.find(f => f.id === 'era');
  const PERSON = new Set(['thinker', 'psychologist', 'physicist']);
  const SHELF = { construct: 'Big questions', era: 'Through time', tradition: 'Traditions', thinker: 'People', field: 'Fields', school: 'Schools of thought', journey: 'Across the rooms' };
  const SHELF_ORDER = ['construct', 'field', 'journey', 'era', 'tradition', 'school', 'thinker'];
  const lessonHref = (m) => `${ROOT}learn/?j=${encodeURIComponent(m.id)}`;
  const state = { q: '', kind: null, f: {}, ev: null, st: null };

  const modState = (m) => {
    const r = S.modules[m.id] || {};
    const seen = m.path.filter(id => S.seen[id]).length;
    return { seen, done: !!r.completedIso, started: seen > 0 || r.step > 0 };
  };
  const lit = (m) => Object.fromEntries(m.path.filter(id => S.seen[id]).map(id => [id, true]));
  const starsHtml = (m) => `<span class="stars" aria-label="${modState(m).seen} of ${m.path.length} visited">${m.path.map(id => `<i class="${S.seen[id] ? 'on' : ''}"></i>`).join('')}</span>`;

  function cover(m, big) {
    const st = modState(m);
    return `<a class="cover${big ? ' big' : ''}${st.done ? ' done' : ''}" href="${lessonHref(m)}">
      <span class="art">${KLSMotif.journey(m, { domain, lit: lit(m), w: big ? 640 : 320, h: big ? 220 : 160 })}</span>
      <span class="top"><span class="tag dom">${esc(SHELF[m.kind] || 'Journey')}</span><span class="tag">${m.path.length} stops</span></span>
      <h3>${esc(m.title)}</h3>
      <p>${esc(m.blurb || '')}</p>
      <span class="foot">${starsHtml(m)}<span class="state">${st.done ? 'Completed' : st.started ? 'Continue →' : 'Begin →'}</span></span>
    </a>`;
  }

  function featured() {
    const mods = D.modules || [];
    const inProgress = mods.filter(m => { const s = modState(m); return s.started && !s.done; })
      .sort((a, b) => Math.max(...b.path.map(id => S.seen[id] ? Date.parse(S.seen[id]) : 0)) - Math.max(...a.path.map(id => S.seen[id] ? Date.parse(S.seen[id]) : 0)));
    return inProgress[0] || mods.find(m => !modState(m).done) || mods[0];
  }

  function lens() {
    const nodes = D.nodes;
    if (domain === 'psychology') {
      const EV = [['strong', 'Strong', '#7ad3a0'], ['moderate', 'Moderate', '#b9d77a'], ['mixed', 'Mixed', '#f3c56b'], ['contested', 'Contested', '#f5a65b'], ['weak', 'Weak', '#ff9d7f'], ['failed', 'Failed to replicate', '#ff7a8a']];
      return `<section><div class="section-head"><h2>How sure are we?</h2></div>
        <p class="muted" style="max-width:40em">Every claim built on studies carries an honest label. Tap a band to see what sits in it, from the rock solid to the famous findings that did not survive.</p>
        <div class="spectrum" style="--cols:6;margin-top:16px">${EV.map(([id, l, c]) => `<button data-ev="${id}" style="--c:${c}"><span class="bar-c"></span><span class="n">${nodes.filter(n => n.evidence === id).length}</span><span class="l">${l}</span></button>`).join('')}</div></section>`;
    }
    if (domain === 'physics') {
      const ST = [['settled', 'Settled science', 'Measured again and again. Not in doubt.', 'var(--good)'], ['interpretation', 'Interpretation', 'Same equations, different stories about what is real.', 'var(--phil)'], ['open', 'Open question', 'Nobody knows yet. That includes the experts.', 'var(--accent-2)']];
      return `<section><div class="section-head"><h2>Settled, interpreted, open</h2></div>
        <p class="muted" style="max-width:40em">Quantum physics is the best tested theory we have, and the most argued over. Every card says which kind of claim it is.</p>
        <div class="grid" style="margin-top:16px">${ST.map(([id, l, b, c]) => { const list = nodes.filter(n => n.status === id); return `<button class="card" data-st="${id}" style="--dom:${c}"><span class="eyebrow dom">${l}</span><span class="stat" style="display:block;margin:4px 0 8px">${list.length}</span><span class="muted small">${b}</span><span class="small" style="display:block;margin-top:10px;color:var(--ink-2)">${list.slice(0, 4).map(n => esc(n.title)).join(' · ')}</span></button>`; }).join('')}</div></section>`;
    }
    const trad = facets.find(f => f.id === 'tradition');
    if (!trad) return '';
    return `<section><div class="section-head"><h2>Many traditions, one conversation</h2></div>
      <p class="muted" style="max-width:40em">The same questions asked in Athens, Lu, Varanasi, Baghdad, Kyoto and Accra. Tap a tradition to see who asked them there.</p>
      <div class="grid" style="margin-top:16px">${trad.values.map(v => { const list = nodes.filter(n => ((n.facets || {}).tradition || []).includes(v.id)); return `<button class="card" data-fv="${v.id}" data-facet="tradition"><span class="spread"><span class="display" style="font-size:1.25rem;font-weight:600">${esc(v.label)}</span><span class="num muted">${list.length}</span></span><span class="small muted" style="display:block;margin-top:8px">${list.filter(n => PERSON.has(n.kind)).slice(0, 4).map(n => esc(n.title)).join(' · ') || esc(v.blurb || '')}</span></button>`; }).join('')}</div></section>`;
  }

  function people() {
    if (!eraFacet) return '';
    const persons = D.nodes.filter(n => PERSON.has(n.kind));
    if (!persons.length) return '';
    const cols = eraFacet.values.map(v => ({ v, list: persons.filter(n => ((n.facets || {}).era || [])[0] === v.id) })).filter(c => c.list.length);
    return `<section><div class="section-head"><h2>People through time</h2><span class="more">${persons.length} people →</span></div>
      <div class="timeline">${cols.map(c => `<div class="era"><h4>${esc(c.v.label)}</h4>${c.list.slice(0, 7).map(n => `<a href="${nodeHref(n.id)}"><span class="nm">${esc(n.title)}</span><span class="yr">${esc(n.life || '')}</span></a>`).join('')}${c.list.length > 7 ? `<button class="btn ghost small" data-era="${c.v.id}" style="margin-left:-12px">${c.list.length - 7} more</button>` : ''}</div>`).join('')}</div></section>`;
  }

  function render() {
    const dd = DOMAINS[domain];
    const intro = D.domain.intro || [];
    const first = intro[0] || '';
    const cut = first.indexOf('. ', 40);
    const promise = cut > 0 ? first.slice(0, cut + 1) : first;
    const rest = [cut > 0 ? first.slice(cut + 2) : ''].concat(intro.slice(1)).filter(Boolean);
    const f = featured();
    const groups = {};
    (D.modules || []).forEach(m => { (groups[m.kind] = groups[m.kind] || []).push(m); });
    let order = SHELF_ORDER.filter(k => groups[k]).concat(Object.keys(groups).filter(k => !SHELF_ORDER.includes(k)));
    // Shelves of one or two feel like fragments: fold them into one shelf.
    const small = order.filter(k => groups[k].length < 3);
    if (small.length) {
      groups._more = small.flatMap(k => groups[k]);
      order = order.filter(k => groups[k].length >= 3).concat('_more');
      SHELF._more = order.length > 1 ? 'More journeys' : 'Journeys';
    }
    app.innerHTML = `
      <header class="hero">
        <div class="motif">${KLSMotif.room(domain, { w: 900, h: 520 })}</div>
        <p class="eyebrow dom">${D.nodes.length} cards · ${(D.modules || []).length} journeys</p>
        <h1 class="room-title">${esc(dd.name)}</h1>
        <p class="tagline">${esc(D.domain.tagline || '')}</p>
        <p class="lede">${esc(promise)}</p>
        <div class="actions">
          ${f ? `<a class="btn dom" href="${lessonHref(f)}">${modState(f).started ? 'Continue' : 'Begin'}: ${esc(f.title)}</a>` : ''}
          <a class="btn" href="${ROOT}web/?d=${domain}&mode=focus">See the ${esc(dd.name.split(' ').pop().toLowerCase())} web</a>
          ${domain === 'physics' ? `<a class="btn ghost" href="${ROOT}physics/sims/">Simulations</a>` : ''}
        </div>
        ${rest.length ? `<details class="drawer" style="max-width:40em;margin-top:28px"><summary>How this room works</summary><div class="body prose plain small">${rest.map(p => `<p>${esc(p)}</p>`).join('')}</div></details>` : ''}
      </header>

      ${f ? `<section><div class="section-head"><h2>${modState(f).started ? 'Pick up where you left off' : 'Start here'}</h2></div>${cover(f, true)}</section>` : ''}

      ${order.map(k => `<section><div class="section-head"><h2>${esc(SHELF[k] || 'Journeys')}</h2><span class="more">${groups[k].length}</span></div>
        <div class="shelf">${groups[k].map(m => cover(m)).join('')}</div></section>`).join('')}

      ${lens()}
      ${people()}

      <section id="browse">
        <div class="section-head"><h2>Everything in the room</h2><span class="more" id="count"></span></div>
        <div class="row" style="flex-wrap:nowrap;margin-bottom:12px">
          <div class="search" style="flex:1"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input class="input" id="q" type="search" placeholder="Search ${esc(dd.name.toLowerCase())}"></div>
          <button class="btn" id="filter">Filter</button>
        </div>
        <div class="chips wrap-ok" id="active" style="margin-bottom:8px"></div>
        <div id="results"></div>
      </section>`;
    $('#q').addEventListener('input', e => { state.q = e.target.value; update(); });
    $('#filter').addEventListener('click', openFilter);
    app.addEventListener('click', e => {
      const ev = e.target.closest('[data-ev]'); if (ev) { state.ev = state.ev === ev.dataset.ev ? null : ev.dataset.ev; update(true); return; }
      const st = e.target.closest('[data-st]'); if (st) { state.st = state.st === st.dataset.st ? null : st.dataset.st; update(true); return; }
      const fv = e.target.closest('button[data-fv][data-facet]'); if (fv) { state.f[fv.dataset.facet] = fv.dataset.fv; update(true); return; }
      const era = e.target.closest('[data-era]'); if (era) { state.f.era = era.dataset.era; state.kind = D.kinds.find(k => PERSON.has(k.id)).id; update(true); return; }
      const rm = e.target.closest('[data-rm]'); if (rm) { const k = rm.dataset.rm; if (k === 'kind') state.kind = null; else if (k === 'ev') state.ev = null; else if (k === 'st') state.st = null; else if (k === 'q') { state.q = ''; $('#q').value = ''; } else state.f[k] = null; update(); }
    });
    update();
  }

  function openFilter() {
    const chip = (attr, val, label, on) => `<button class="chip ${on ? 'on' : ''}" ${attr}="${esc(val)}">${esc(label)}</button>`;
    const m = modal(`
      <div class="spread"><h2 style="margin:0">Filter</h2><button class="btn ghost small" data-close>Done</button></div>
      <p class="eyebrow plain" style="margin-top:18px">Kind</p>
      <div class="chips wrap-ok" data-group="kind">${chip('data-k', '', 'All', !state.kind)}${D.kinds.map(k => chip('data-k', k.id, k.plural || k.label, state.kind === k.id)).join('')}</div>
      ${facets.map(f => `<p class="eyebrow plain" style="margin-top:18px">${esc(f.label)}</p><div class="chips wrap-ok" data-group="${f.id}">${f.values.map(v => chip('data-v', v.id, v.label, state.f[f.id] === v.id)).join('')}</div>`).join('')}
      <div class="row" style="margin-top:22px"><button class="btn primary" data-close>Show results</button><button class="btn ghost" id="fx-clear">Clear all</button></div>`, { label: 'Filter', onClose: () => update(true) });
    m.el.addEventListener('click', e => {
      const b = e.target.closest('[data-k],[data-v]'); if (!b) return;
      const grp = b.parentElement.dataset.group;
      if (grp === 'kind') state.kind = b.dataset.k || null;
      else state.f[grp] = state.f[grp] === b.dataset.v ? null : b.dataset.v;
      b.parentElement.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b && (grp === 'kind' || state.f[grp])));
    });
    m.el.querySelector('#fx-clear').addEventListener('click', () => { state.kind = null; state.f = {}; state.ev = null; state.st = null; m.close(); });
  }

  function matches(n) {
    if (state.kind && n.kind !== state.kind) return false;
    if (state.ev && n.evidence !== state.ev) return false;
    if (state.st && n.status !== state.st) return false;
    for (const f of facets) { const v = state.f[f.id]; if (v && !((n.facets || {})[f.id] || []).includes(v)) return false; }
    if (state.q) { const q = state.q.toLowerCase(); if (!(n.title + ' ' + n.line + ' ' + (n.body || []).join(' ')).toLowerCase().includes(q)) return false; }
    return true;
  }

  function row(n) {
    return `<a href="${nodeHref(n.id)}"><span class="dot${PERSON.has(n.kind) ? ' ring' : ''}"></span><span class="grow"><div class="t">${esc(n.title)}</div><div class="sub">${esc(n.line)}</div></span><span class="k">${S.seen[n.id] ? '<span class="seen">seen</span>' : esc((kinds[n.kind] || {}).label || '')}</span></a>`;
  }

  function update(scroll) {
    const hits = D.nodes.filter(matches);
    const active = [];
    if (state.q) active.push(['q', `“${state.q}”`]);
    if (state.kind) active.push(['kind', (kinds[state.kind] || {}).plural || state.kind]);
    if (state.ev) active.push(['ev', state.ev === 'failed' ? 'Failed to replicate' : state.ev + ' evidence']);
    if (state.st) active.push(['st', state.st]);
    for (const f of facets) if (state.f[f.id]) active.push([f.id, (f.values.find(v => v.id === state.f[f.id]) || {}).label]);
    $('#active').innerHTML = active.map(([k, l]) => `<button class="chip on" data-rm="${k}" aria-label="Remove ${esc(l)}">${esc(l)} ×</button>`).join('');
    $('#count').textContent = `${hits.length} of ${D.nodes.length}`;
    const R = $('#results');
    if (!hits.length) R.innerHTML = '<p class="empty">Nothing matches. Try removing a filter.</p>';
    else if (!active.length && groupFacet) {
      R.innerHTML = groupFacet.values.map((v, k) => {
        const list = D.nodes.filter(n => ((n.facets || {})[groupFacet.id] || [])[0] === v.id)
          .sort((a, b) => (PERSON.has(a.kind) - PERSON.has(b.kind)) || a.title.localeCompare(b.title));
        if (!list.length) return '';
        return `<details class="group"><summary><h3>${esc(v.label)}</h3><span class="n">${list.length}</span></summary>${v.blurb ? `<p class="blurb">${esc(v.blurb)}</p>` : ''}<div class="index">${list.map(row).join('')}</div></details>`;
      }).join('');
    } else R.innerHTML = `<div class="index">${hits.slice().sort((a, b) => a.title.localeCompare(b.title)).map(row).join('')}</div>`;
    if (scroll) $('#browse').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render();
})();
