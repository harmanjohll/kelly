/* =========================================================
   learning/shared/domain.js
   Renders a domain page (Philosophy, Physics, Psychology)
   from KLS_DATA: intro, journeys (modules), and a filterable
   browser of every node. The page shell sets
   <body data-domain="..."> and provides <main id="app">.
   ========================================================= */

(function () {
  const { $, esc, data, store, nodeHref, ROOT, DOMAINS } = KLS;
  const domain = document.body.dataset.domain;
  const D = data(domain);
  const app = $('#app');
  if (!D) { app.innerHTML = '<p class="empty">This domain is still being written.</p>'; return; }
  const S = store.get();
  const kinds = Object.fromEntries(D.kinds.map(k => [k.id, k]));
  const facets = D.facets || [];
  const groupFacet = facets.find(f => f.id === D.groupBy);
  const PERSON = new Set(['thinker', 'psychologist', 'physicist']);

  const state = { q: '', kind: null, f: {} };
  try { Object.assign(state, JSON.parse(sessionStorage.getItem('kls.filter.' + domain) || '{}')); } catch (_) {}

  function badge(n) {
    if (n.evidence) return `<span class="badge ev-${n.evidence}">${n.evidence === 'failed' ? 'Failed to replicate' : n.evidence[0].toUpperCase() + n.evidence.slice(1) + ' evidence'}</span>`;
    if (n.status && n.status !== 'settled') return `<span class="badge st-${n.status}">${n.status === 'interpretation' ? 'Interpretation' : 'Open question'}</span>`;
    return '';
  }
  function modProgress(m) { const done = m.path.filter(id => S.seen[id]).length; return { done, total: m.path.length }; }

  function render() {
    const dd = DOMAINS[domain];
    app.innerHTML = `
      <div class="page-head">
        <p class="kicker dom">${esc(dd.name)}</p>
        <h1>${esc(D.domain.tagline || dd.name)}</h1>
        ${(D.domain.intro || []).slice(0, 1).map(p => `<p class="lede">${esc(p)}</p>`).join('')}
        ${(D.domain.intro || []).length > 1 ? `<details class="drawer"><summary>How this part works</summary><div class="body prose">${D.domain.intro.slice(1).map(p => `<p>${esc(p)}</p>`).join('')}</div></details>` : ''}
        <div class="row" style="margin-top:12px">
          <a class="btn primary dom" href="${ROOT}web/?d=${domain}">Open the ${esc(dd.name)} web</a>
          ${domain === 'physics' ? `<a class="btn" href="${ROOT}physics/sims/">All simulations</a>` : ''}
        </div>
      </div>
      <section>
        <h2>Journeys</h2>
        <p class="muted small">Curated routes through the ideas, in teaching order.</p>
        <div class="grid">${(D.modules || []).map(m => {
          const p = modProgress(m);
          const next = m.path.find(id => !S.seen[id]) || m.path[0];
          return `<a class="card edge" href="${nodeHref(next)}&m=${encodeURIComponent(m.id)}">
            <div class="meta"><span class="tag dom">${esc(m.kind || 'journey')}</span><span>${p.total} stops</span></div>
            <h3 style="margin-top:8px">${esc(m.title)}</h3>
            <p class="muted small">${esc(m.blurb || '')}</p>
            <div class="step-dots" aria-label="${p.done} of ${p.total} visited">${m.path.map(id => `<i class="${S.seen[id] ? 'done' : ''}"></i>`).join('')}</div>
          </a>`;
        }).join('')}</div>
      </section>
      <section id="browse">
        <h2>Browse everything</h2>
        <div class="search" style="margin:10px 0"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input class="input" id="q" type="search" placeholder="Search ${esc(dd.name.toLowerCase())}" value="${esc(state.q)}"></div>
        <div class="chips" id="kinds"></div>
        ${facets.map(f => `<div><p class="kicker" style="margin:8px 0 6px">${esc(f.label)}</p><div class="chips" data-facet="${f.id}"></div></div>`).join('')}
        <div class="spread" style="margin:12px 0 8px"><span class="muted small" id="count"></span><button class="btn ghost small" id="clear">Clear filters</button></div>
        <div id="results"></div>
      </section>`;
    $('#q').addEventListener('input', e => { state.q = e.target.value; update(); });
    $('#clear').addEventListener('click', () => { state.q = ''; state.kind = null; state.f = {}; $('#q').value = ''; update(); });
    app.addEventListener('click', e => {
      const k = e.target.closest('[data-kind]');
      if (k) { state.kind = k.dataset.kind || null; update(); return; }
      const fv = e.target.closest('[data-fv]');
      if (fv) { const f = fv.parentElement.dataset.facet; state.f[f] = state.f[f] === fv.dataset.fv ? null : fv.dataset.fv; update(); }
    });
    update();
  }

  function matches(n, skipFacet) {
    if (state.kind && n.kind !== state.kind && skipFacet !== '_kind') return false;
    for (const f of facets) {
      if (f.id === skipFacet) continue;
      const v = state.f[f.id];
      if (v && !((n.facets || {})[f.id] || []).includes(v)) return false;
    }
    if (state.q) {
      const q = state.q.toLowerCase();
      const hay = (n.title + ' ' + n.line + ' ' + (n.body || []).join(' ')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function update() {
    try { sessionStorage.setItem('kls.filter.' + domain, JSON.stringify(state)); } catch (_) {}
    const nodes = D.nodes;
    // Counts reflect the other active filters, so chips show what is reachable.
    const kc = {}; nodes.filter(n => matches(n, '_kind')).forEach(n => { kc[n.kind] = (kc[n.kind] || 0) + 1; });
    $('#kinds').innerHTML = `<button class="chip ${!state.kind ? 'on' : ''}" data-kind="">All</button>` +
      D.kinds.map(k => `<button class="chip ${state.kind === k.id ? 'on' : ''}" data-kind="${k.id}">${esc(k.plural || k.label)} <span class="n">${kc[k.id] || 0}</span></button>`).join('');
    for (const f of facets) {
      const c = {}; nodes.filter(n => matches(n, f.id)).forEach(n => ((n.facets || {})[f.id] || []).forEach(v => { c[v] = (c[v] || 0) + 1; }));
      $(`[data-facet="${f.id}"]`).innerHTML = f.values.filter(v => c[v.id] || state.f[f.id] === v.id)
        .map(v => `<button class="chip ${state.f[f.id] === v.id ? 'on' : ''}" data-fv="${v.id}" title="${esc(v.blurb || '')}">${esc(v.label)} <span class="n">${c[v.id] || 0}</span></button>`).join('');
    }
    const hits = nodes.filter(n => matches(n));
    $('#count').textContent = `${hits.length} of ${nodes.length}`;
    const anyFilter = state.q || state.kind || Object.values(state.f).some(Boolean);
    $('#clear').style.visibility = anyFilter ? 'visible' : 'hidden';
    const card = (n) => `<a class="card" href="${nodeHref(n.id)}" style="margin-bottom:10px">
        <div class="meta"><span class="tag dom">${esc((kinds[n.kind] || {}).label || n.kind)}</span>${n.life ? `<span>${esc(n.life)}</span>` : ''}${S.seen[n.id] ? '<span>Visited</span>' : ''}${S.saved[n.id] ? '<span>Saved</span>' : ''}</div>
        <h3 style="margin-top:6px">${esc(n.title)}</h3>
        <p class="muted small" style="margin-bottom:${badge(n) ? '8px' : 0}">${esc(n.line)}</p>${badge(n)}
      </a>`;
    if (!hits.length) { $('#results').innerHTML = '<p class="empty">Nothing matches those filters.</p>'; return; }
    if (groupFacet && !anyFilter) {
      $('#results').innerHTML = groupFacet.values.map(v => {
        const list = hits.filter(n => ((n.facets || {})[groupFacet.id] || [])[0] === v.id);
        if (!list.length) return '';
        list.sort((a, b) => (PERSON.has(a.kind) - PERSON.has(b.kind)) || a.title.localeCompare(b.title));
        return `<h3 style="margin:22px 0 4px">${esc(v.label)}</h3>${v.blurb ? `<p class="muted small">${esc(v.blurb)}</p>` : ''}${list.map(card).join('')}`;
      }).join('');
    } else {
      $('#results').innerHTML = hits.slice().sort((a, b) => a.title.localeCompare(b.title)).map(card).join('');
    }
  }

  render();
})();
