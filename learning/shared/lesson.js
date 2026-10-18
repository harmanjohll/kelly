/* =========================================================
   learning/shared/lesson.js
   The guided lesson. Turns a journey (module) into a short
   sequence of steps assembled from the content it already has:

     cover   the journey's constellation, what it covers
     hook    a question to hold (the stop's first prompt)
     idea    the idea itself, in two short paragraphs
     try     the simulation, for physics stops that have one
     check   one recall question, rated into the review
     bridge  the typed link from this stop to the next, with
             its reason, so the list becomes a story
     close   the lit constellation, explain it back, next

   Needs core.js and motif.js. Renders into #lesson.
   Progress: kls.progress.modules[id] = { step, completedIso }
   ========================================================= */

(function (g) {
  const { $, esc, rich, node, neighbours, linkLabel, nodeHref, DOMAINS, data, store, spaced, ROOT, playBtn, param } = g.KLS;
  const PERSON = new Set(['thinker', 'psychologist', 'physicist']);

  function findModule(id) {
    for (const d of ['philosophy', 'physics', 'psychology']) {
      const m = ((data(d) || {}).modules || []).find(x => x.id === id);
      if (m) return { m, d };
    }
    return null;
  }

  // How the journey moves from one stop to the next.
  function bridgeBetween(a, b) {
    const direct = neighbours(a.id).find(x => x.id === b.id);
    if (direct) return { kind: 'direct', label: linkLabel(direct.type, direct.dir), why: direct.why };
    const nb = new Map(neighbours(b.id).map(x => [x.id, x]));
    for (const x of neighbours(a.id)) {
      const y = nb.get(x.id); const via = node(x.id);
      if (y && via) return { kind: 'via', via, whyA: x.why, whyB: y.why };
    }
    return { kind: 'turn' };
  }

  function buildSteps(m) {
    const stops = m.path.map(node).filter(Boolean);
    const steps = [{ type: 'cover' }];
    stops.forEach((n, i) => {
      if (!PERSON.has(n.kind)) steps.push({ type: 'hook', n, i });
      steps.push({ type: 'idea', n, i });
      if (n.sim) steps.push({ type: 'try', n, i });
      if ((n.recall || []).length) steps.push({ type: 'check', n, i, r: n.recall[0], key: `node:${n.id}:0` });
      if (i < stops.length - 1) steps.push({ type: 'bridge', a: n, b: stops[i + 1], i });
    });
    steps.push({ type: 'close' });
    return { steps, stops };
  }

  function badge(n) {
    if (n.evidence) return `<span class="badge ev-${n.evidence}">${n.evidence === 'failed' ? 'Failed to replicate' : n.evidence + ' evidence'}</span>`;
    if (n.status) return `<span class="badge st-${n.status}">${n.status === 'settled' ? 'Settled science' : n.status === 'interpretation' ? 'Interpretation' : 'Open question'}</span>`;
    return '';
  }

  function mount(root) {
    const found = findModule(param('j'));
    if (!found) { root.innerHTML = '<div class="wrap empty"><p>That journey was not found.</p><a class="btn" href="../explore/">Explore</a></div>'; return; }
    const { m, d } = found;
    const D = data(d);
    document.body.dataset.domain = d;
    document.body.dataset.back = '../' + DOMAINS[d].href;
    document.body.dataset.title = DOMAINS[d].name;
    document.title = m.title;
    const { steps, stops } = buildSteps(m);
    const saved = (store.get().modules[m.id] || {});
    let i = Math.min(Number(param('s')) || (saved.completedIso ? 0 : saved.step || 0), steps.length - 1);
    let dir = 1;
    let simHandle = null;
    const minutes = Math.max(4, Math.round(steps.length * 0.45 + stops.filter(n => n.sim).length * 2));

    root.innerHTML = `
      <div class="lesson">
        <div class="progress" aria-hidden="true"><i></i></div>
        <div class="wrap narrow" style="width:100%">
          <div class="crumb"><a href="../${DOMAINS[d].href}">${esc(m.title)}</a><span id="where"></span></div>
        </div>
        <div class="wrap narrow stage" id="stage" style="width:100%" aria-live="polite"></div>
        <div class="wrap narrow" style="width:100%">
          <div class="nav"><button class="btn" id="back">Back</button><span class="grow count" id="count"></span><button class="btn dom" id="next">Next</button></div>
        </div>
      </div>`;
    const stage = $('#stage', root);

    function save() { store.update(s => { const r = s.modules[m.id] || {}; r.step = i; s.modules[m.id] = r; }); }
    function lit() { const S = store.get(); const o = {}; m.path.forEach(id => { if (S.seen[id]) o[id] = true; }); return o; }

    function render() {
      if (simHandle && simHandle.destroy) { try { simHandle.destroy(); } catch (_) {} simHandle = null; }
      const st = steps[i];
      $('.progress > i', root).style.width = `${Math.round(100 * i / (steps.length - 1))}%`;
      $('#where', root).textContent = st.n || st.a ? `Stop ${(st.i || 0) + 1} of ${stops.length}` : st.type === 'close' ? 'Journey complete' : `${stops.length} stops`;
      $('#count', root).textContent = `${i + 1} / ${steps.length}`;
      $('#back', root).style.visibility = i ? 'visible' : 'hidden';
      const next = $('#next', root);
      next.textContent = st.type === 'cover' ? 'Begin' : st.type === 'close' ? 'Back to the room' : st.type === 'check' ? 'Skip' : 'Next';
      const html = ({ cover, hook, idea, try: tryStep, check, bridge, close })[st.type](st);
      stage.innerHTML = `<div class="step${dir < 0 ? ' back' : ''}">${html}</div>`;
      after(st);
      const u = new URL(location.href); u.searchParams.set('s', i); history.replaceState(null, '', u);
      save();
      scrollTo({ top: 0 });
    }

    function cover() {
      const S = store.get();
      const seenCount = m.path.filter(id => S.seen[id]).length;
      return `
        <div class="cover-art">${KLSMotif.journey(m, { domain: d, lit: lit(), w: 640, h: 220, aspect: 'xMidYMid meet' })}</div>
        <p class="eyebrow dom">${esc(DOMAINS[d].name)} journey</p>
        <h1 style="max-width:16ch">${esc(m.title)}</h1>
        <p class="lede">${esc(m.blurb || '')}</p>
        <p class="muted small" style="margin-top:14px">${stops.length} stops · about ${minutes} minutes${seenCount ? ` · ${seenCount} already visited` : ''}</p>
        <ol class="index" style="list-style:none;padding:0;margin-top:22px">${stops.map((n, k) => `<li class="item" style="display:flex"><span class="num muted" style="width:26px">${String(k + 1).padStart(2, '0')}</span><span class="grow"><span class="t">${esc(n.title)}</span><div class="sub">${esc(n.line)}</div></span>${S.seen[n.id] ? '<span class="seen">seen</span>' : ''}</li>`).join('')}</ol>`;
    }
    function hook(st) {
      const q = (st.n.prompts || [])[0] || st.n.line;
      return `<div class="where-art">${KLSMotif.journey(m, { domain: d, lit: lit(), current: st.i, w: 640, h: 120, aspect: 'xMidYMid meet' })}</div>
        <p class="stopline">Stop ${st.i + 1} · ${esc(st.n.title)}</p><p class="hook">${esc(q)}</p><p class="muted" style="margin-top:22px">Hold that question for a moment. Then read on.</p>`;
    }
    function idea(st) {
      const n = st.n;
      g.KLS.markSeen(n.id);
      return `
        <p class="stopline">Stop ${st.i + 1} of ${stops.length} · ${esc(n.kindLabel || n.kind)}</p>
        <h2 class="idea-title">${esc(n.title)}</h2>
        ${n.say ? `<p class="say">${playBtn(n.say.text || n.title)}<span class="respell">${esc(n.say.respell || '')}</span><span class="ipa">/${esc(n.say.ipa || '')}/</span></p>` : ''}
        ${n.life || n.place ? `<p class="muted small">${esc([n.life, n.place].filter(Boolean).join(' · '))}</p>` : ''}
        <div class="row" style="margin:6px 0 18px">${badge(n)}</div>
        <div class="prose">${(n.body || []).slice(0, 2).map(p => `<p>${rich(p)}</p>`).join('')}</div>
        ${n.quote ? `<blockquote class="quote">${esc(n.quote.text)}<cite>${esc(n.quote.source)}</cite></blockquote>` : ''}
        <a class="btn ghost small" href="${nodeHref(n.id)}&m=${encodeURIComponent(m.id)}" style="margin-left:-12px">Read the whole card</a>`;
    }
    function tryStep(st) {
      return `<p class="stopline">Stop ${st.i + 1} · Try it</p><h2>See it for yourself</h2><p class="muted">Play first. Notice what surprises you before reading any more.</p><div id="sim-host"><p class="muted small">Loading...</p></div><ul class="sim-try" id="sim-try"></ul>`;
    }
    function check(st) {
      return `
        <p class="stopline">Stop ${st.i + 1} · Check yourself</p>
        <p class="check-q">${esc(st.r.q)}</p>
        <p class="muted small" style="margin-top:14px">Answer in your head first.</p>
        <button class="btn" id="reveal" style="margin-top:12px">Show the answer</button>
        <div id="ans" hidden><p class="check-a">${esc(st.r.a)}</p>
          <p class="muted small" style="margin-top:16px">How did that go? It will come back in your review accordingly.</p>
          <div class="rate"><button class="btn" data-g="0">Not yet</button><button class="btn" data-g="1">Shaky</button><button class="btn dom" data-g="2">Knew it</button></div></div>`;
    }
    function bridge(st) {
      const b = bridgeBetween(st.a, st.b);
      let words;
      if (b.kind === 'direct') words = `<p class="eyebrow dom plain">${esc(b.label)}</p><p class="why">${esc(b.why)}</p>`;
      else if (b.kind === 'via') words = `<p class="eyebrow dom plain">by way of ${esc(b.via.title)}</p><p class="why">${esc(b.whyA)}</p><p class="why" style="color:var(--ink-2)">${esc(b.whyB)}</p>`;
      else words = `<p class="eyebrow dom plain">A change of angle</p><p class="why">${esc(st.b.title)} comes at ${esc(m.title.toLowerCase().replace(/\?$/, ''))} from another side: ${esc(st.b.line.charAt(0).toLowerCase() + st.b.line.slice(1))}</p>`;
      return `<p class="stopline">The thread</p><div class="bridge">${KLSMotif.pair(st.a, st.b, { w: 520, h: 170, labels: true, via: b.kind === 'via' ? b.via : null })}${words}</div>`;
    }
    function close() {
      store.update(s => { const r = s.modules[m.id] || {}; r.completedIso = r.completedIso || new Date().toISOString(); s.modules[m.id] = r; });
      const mods = D.modules; const k = mods.indexOf(m);
      const S = store.get();
      const nextMod = mods.slice(k + 1).concat(mods.slice(0, k)).find(x => !(S.modules[x.id] || {}).completedIso);
      return `
        <div class="cover-art">${KLSMotif.journey(m, { domain: d, lit: lit(), w: 640, h: 220, aspect: 'xMidYMid meet' })}</div>
        <p class="eyebrow dom">Journey complete</p>
        <h2 style="font-size:clamp(1.8rem,7vw,2.6rem)">${esc(m.title)}</h2>
        <p class="lede">You walked ${stops.length} stops: ${stops.map(n => esc(n.title)).join(', ')}.</p>
        <section style="margin-top:28px">
          <h3>Say it back</h3>
          <p class="muted small">In three or four sentences: what connects these ideas? The Coach will say what holds and ask one question.</p>
          <textarea class="input" id="ex" maxlength="1500" placeholder="What I now see is..."></textarea>
          <div class="row" style="margin-top:10px"><button class="btn dom" id="ex-go">Get feedback</button></div>
          <div id="ex-out" class="coach" style="display:none;margin-top:12px"></div>
        </section>
        ${nextMod ? `<a class="cover d-${d}" href="?j=${encodeURIComponent(nextMod.id)}" style="margin-top:20px;min-height:200px"><span class="art">${KLSMotif.journey(nextMod, { domain: d, lit: lit(), w: 320, h: 150 })}</span><span class="top"><span class="tag dom">Next journey</span></span><h3>${esc(nextMod.title)}</h3><p>${esc(nextMod.blurb || '')}</p><span class="foot"><span>${nextMod.path.length} stops</span><span>Begin →</span></span></a>` : ''}`;
    }

    function after(st) {
      if (st.type === 'try') {
        g.KLS.loadScript(`physics/sims/${st.n.sim}.js`).then(() => {
          const sim = (g.KLS_SIMS || {})[st.n.sim]; const host = $('#sim-host', stage);
          if (!sim || !host) return;
          host.innerHTML = ''; simHandle = sim.mount(host);
          $('#sim-try', stage).innerHTML = (sim.try || []).map(t => `<li>${esc(t)}</li>`).join('');
        }).catch(() => { const h = $('#sim-host', stage); if (h) h.innerHTML = '<p class="muted small">The simulation could not load.</p>'; });
      }
      if (st.type === 'check') {
        $('#reveal', stage).addEventListener('click', (e) => { e.target.remove(); $('#ans', stage).hidden = false; $('#next', root).textContent = 'Next'; });
        stage.querySelector('.rate').addEventListener('click', (e) => {
          const b = e.target.closest('[data-g]'); if (!b) return;
          spaced.add(st.key); spaced.rate(st.key, Number(b.dataset.g));
          stage.querySelectorAll('.rate .btn').forEach(x => x.classList.toggle('dom', x === b));
          setTimeout(go.bind(null, 1), 380);
        });
      }
      if (st.type === 'close') {
        $('#ex-go', stage).addEventListener('click', async () => {
          const text = $('#ex', stage).value.trim(); const out = $('#ex-out', stage);
          if (text.length < 25) { g.KLS.toast('Write a few sentences first.'); return; }
          out.style.display = 'block'; out.innerHTML = g.KLS.thinking();
          const synthetic = { title: m.title, kindLabel: 'journey', domain: d, line: m.blurb || '', body: stops.map(n => `${n.title}: ${n.line}`) };
          try { await g.KLS.loadScript('shared/coach.js'); const fb = await g.KLS.ai(g.KLSCoach.P.explain(synthetic, text)); out.innerHTML = `<div class="msg ai">${g.KLS.coachHtml(fb)}</div>`; }
          catch (e) { out.innerHTML = `<p class="notice">${esc(e.message)}</p>`; }
        });
      }
    }

    function go(delta) {
      if (delta > 0 && i === steps.length - 1) { location.href = `../${DOMAINS[d].href}`; return; }
      const j = Math.max(0, Math.min(steps.length - 1, i + delta));
      if (j === i) return;
      dir = delta; i = j; render();
    }
    $('#next', root).addEventListener('click', () => go(1));
    $('#back', root).addEventListener('click', () => go(-1));
    addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });
    // Swipe, but never when the gesture starts inside a simulation or a field.
    let sx = null, sy = 0;
    stage.addEventListener('pointerdown', (e) => { if (e.target.closest('canvas, input, textarea, .sim, button, a')) { sx = null; return; } sx = e.clientX; sy = e.clientY; });
    stage.addEventListener('pointerup', (e) => {
      if (sx == null) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(dx < 0 ? 1 : -1);
    });
    render();
  }

  g.KLSLesson = { mount, buildSteps, findModule, bridgeBetween };
})(window);
