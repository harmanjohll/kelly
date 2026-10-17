/* Kelly's Learning Studio: particle in a box.
   Energy levels E_n = n² E_1 for n = 1 to 5. Each level is a standing wave
   whose phase spins at a rate set by its energy. One level alone: the
   chance pattern |ψ|² never changes. Two or more: they beat and slosh.
   A position measurement collapses the state to a narrow packet, which is
   re expanded in the box levels (up to n = 60) and then spreads. Natural
   units, exact time evolution of the expansion. Self contained. */
(function (g) {
  'use strict';
  var ID = 'box';

  /* ---------- small shared kit (copied into each sim file) ---------- */
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function readTheme() {
    var cs = getComputedStyle(document.documentElement);
    var v = function (n, f) { var s = (cs.getPropertyValue(n) || '').trim(); return s || f; };
    return {
      ink: v('--ink', '#1e1b17'), muted: v('--muted', '#6a6358'), line: v('--line', '#e2dacb'),
      surface: v('--surface', '#fffcf7'), bg: v('--bg', '#f6f2ea'), phys: v('--phys', '#1d7482'),
      gold: v('--accent-2', '#a87b22'),
      body: v('--font-body', 'system-ui, sans-serif'), mono: v('--font-mono', 'ui-monospace, monospace')
    };
  }
  function slider(label, min, max, step, value, fmt) {
    var wrap = h('label', 'sim-control');
    var top = h('span');
    var name = h('span', null, label + ' ');
    var val = h('span', 'sim-val');
    top.appendChild(name); top.appendChild(val);
    var input = document.createElement('input');
    input.type = 'range'; input.min = min; input.max = max; input.step = step; input.value = value;
    wrap.appendChild(top); wrap.appendChild(input);
    var api = {
      el: wrap, input: input,
      get: function () { return parseFloat(input.value); },
      set: function (x) { input.value = x; api.show(); },
      show: function () { val.textContent = fmt(api.get()); }
    };
    api.show();
    return api;
  }
  function button(label, cls) {
    var b = h('button', 'btn small' + (cls ? ' ' + cls : ''), label);
    b.type = 'button';
    return b;
  }
  function chip(label, on) {
    var b = h('button', 'chip' + (on ? ' on' : ''), label);
    b.type = 'button';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    return b;
  }
  function setChip(b, on) { b.classList.toggle('on', !!on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function injectCSS(css) {
    if (document.getElementById('sim-' + ID + '-css')) return;
    var s = document.createElement('style');
    s.id = 'sim-' + ID + '-css';
    s.textContent = css;
    document.head.appendChild(s);
  }
  /* Canvas stage: sizing, DPR, theme, visibility, reduced motion, frame loop. */
  function stage(parent, opts) {
    var canvas = h('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', opts.label || 'Simulation');
    if (opts.touch) canvas.style.touchAction = opts.touch;
    parent.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var mqR = g.matchMedia ? g.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var mqD = g.matchMedia ? g.matchMedia('(prefers-color-scheme: dark)') : null;
    var st = {
      canvas: canvas, ctx: ctx, W: 0, H: 0, C: readTheme(),
      reduced: !!(mqR && mqR.matches), visible: true, animating: false,
      raf: 0, last: 0, dead: false
    };
    function canRun() { return !st.dead && st.visible && !document.hidden; }
    function schedule() { if (!st.raf && canRun()) st.raf = requestAnimationFrame(frame); }
    function frame(ts) {
      st.raf = 0;
      if (!canRun()) return;
      var dt = st.last ? Math.min(0.1, (ts - st.last) / 1000) : 1 / 60;
      st.last = st.animating ? ts : 0;
      if (st.animating && opts.tick) opts.tick(dt);
      if (st.W > 0) opts.draw(ctx, st);
      if (st.animating) schedule();
    }
    function resize() {
      var w = Math.round(parent.clientWidth);
      if (!w) return;
      var hgt = Math.round(opts.height(w));
      var dpr = Math.min(g.devicePixelRatio || 1, 2.5);
      if (w === st.W && hgt === st.H && dpr === st.dpr) return;
      st.W = w; st.H = hgt; st.dpr = dpr;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(hgt * dpr);
      canvas.style.height = hgt + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (opts.onResize) opts.onResize(st);
      st.last = 0;
      if (st.W > 0) opts.draw(ctx, st);
    }
    var ro = new ResizeObserver(resize);
    ro.observe(parent);
    var io = null;
    if (g.IntersectionObserver) {
      io = new IntersectionObserver(function (es) {
        st.visible = es[es.length - 1].isIntersecting;
        st.last = 0;
        if (st.visible) schedule();
      });
      io.observe(canvas);
    }
    function onVis() { st.last = 0; if (!document.hidden) schedule(); }
    function onTheme() {
      st.C = readTheme(); schedule();
      setTimeout(function () { if (!st.dead) { st.C = readTheme(); schedule(); } }, 60);
    }
    function onReduce() { st.reduced = !!(mqR && mqR.matches); if (opts.onReduce) opts.onReduce(st.reduced); schedule(); }
    document.addEventListener('visibilitychange', onVis);
    document.addEventListener('kls-theme', onTheme);
    if (mqD) (mqD.addEventListener ? mqD.addEventListener('change', onTheme) : mqD.addListener(onTheme));
    if (mqR) (mqR.addEventListener ? mqR.addEventListener('change', onReduce) : mqR.addListener(onReduce));
    st.redraw = schedule;
    st.setAnimating = function (on) { st.animating = !!on; st.last = 0; schedule(); };
    st.destroy = function () {
      st.dead = true;
      if (st.raf) cancelAnimationFrame(st.raf);
      st.raf = 0;
      ro.disconnect(); if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      document.removeEventListener('kls-theme', onTheme);
      if (mqD) (mqD.removeEventListener ? mqD.removeEventListener('change', onTheme) : mqD.removeListener(onTheme));
      if (mqR) (mqR.removeEventListener ? mqR.removeEventListener('change', onReduce) : mqR.removeListener(onReduce));
    };
    resize();
    return st;
  }
  /* ---------- end kit ---------- */

  var CSS = [
    '.sim-box .sim-val{color:var(--ink);font-family:var(--font-mono);font-size:.8rem}',
    '.sim-box .sim-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}',
    '.sim-box .sim-group{display:flex;flex-wrap:wrap;gap:8px}',
    '.sim-box .sim-row .grow{flex:1 1 0;min-width:0}',
    '.sim-box .sim-lab{font-size:.82rem;color:var(--muted);margin-right:2px;align-self:center;font-family:var(--font-mono)}',
    '.sim-box .chip.lvl{min-width:44px;justify-content:center;font-family:var(--font-mono)}'
  ].join('\n');

  var NMAX = 60, M = 240, SIG = 0.04, LEVELS = 5;

  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }

  function mount(el) {
    injectCSS(CSS);
    var inSim = el.classList.contains('sim') || (el.closest && el.closest('.sim'));
    var root = h('div', 'sim-' + ID + (inSim ? '' : ' sim'));
    el.appendChild(root);

    /* basis on a grid: φ_n(x) = √2 sin(nπx), box from 0 to 1 */
    var xg = new Float64Array(M), basis = [];
    for (var i = 0; i < M; i++) xg[i] = (i + 0.5) / M;
    for (var n = 1; n <= NMAX; n++) {
      var row = new Float64Array(M);
      for (i = 0; i < M; i++) row[i] = Math.SQRT2 * Math.sin(n * Math.PI * xg[i]);
      basis[n] = row;
    }
    var cR = new Float64Array(NMAX + 1), cI = new Float64Array(NMAX + 1);
    var pR = new Float64Array(M), pI = new Float64Array(M), dens = new Float64Array(M);

    var s = {
      mode: 'levels', amps: [0, 1, 0, 0, 0, 0], t: 0, speed: 1, playing: true,
      scale: 2.4, scaleTarget: 2.4, flash: null, top: 1, lastMeasure: null
    };
    var E1 = 0.5; // radians per second for n = 1 at normal speed

    function setFromLevels() {
      var norm = 0;
      for (var n = 1; n <= LEVELS; n++) norm += s.amps[n] * s.amps[n];
      cR.fill(0); cI.fill(0);
      if (norm > 0) for (n = 1; n <= LEVELS; n++) cR[n] = s.amps[n] / Math.sqrt(norm);
      s.mode = 'levels'; s.t = 0; s.top = LEVELS;
      // fixed vertical scale: largest |ψ|² over one full repeat of the pattern
      var mx = 0;
      for (var k = 0; k < 48; k++) { evalPsi(k * (2 * Math.PI / E1) / 48); for (var i = 0; i < M; i++) if (dens[i] > mx) mx = dens[i]; }
      s.scaleTarget = s.scale = Math.max(1.2, mx * 1.08);
      evalPsi(0);
    }
    function evalPsi(t) {
      pR.fill(0); pI.fill(0);
      for (var n = 1; n <= s.top; n++) {
        var a = cR[n], b = cI[n];
        if (a === 0 && b === 0) continue;
        var ph = -n * n * E1 * t, c = Math.cos(ph), sn = Math.sin(ph);
        var re = a * c - b * sn, im = a * sn + b * c, row = basis[n];
        for (var i = 0; i < M; i++) { pR[i] += re * row[i]; pI[i] += im * row[i]; }
      }
      for (var j = 0; j < M; j++) dens[j] = pR[j] * pR[j] + pI[j] * pI[j];
    }
    function measure() {
      evalPsi(s.t);
      var tot = 0, i;
      for (i = 0; i < M; i++) tot += dens[i];
      var r = Math.random() * tot, acc = 0, idx = M - 1;
      for (i = 0; i < M; i++) { acc += dens[i]; if (acc >= r) { idx = i; break; } }
      var xm = xg[idx] + (Math.random() - 0.5) / M;
      // collapse to a narrow packet at xm, expand in the box levels
      var norm = 0;
      cR.fill(0); cI.fill(0);
      for (var n = 1; n <= NMAX; n++) {
        var sum = 0, row = basis[n];
        for (i = 0; i < M; i++) { var u = xg[i] - xm; sum += Math.exp(-u * u / (4 * SIG * SIG)) * row[i]; }
        cR[n] = sum / M; norm += cR[n] * cR[n];
      }
      norm = Math.sqrt(norm);
      for (n = 1; n <= NMAX; n++) cR[n] /= norm;
      s.mode = 'packet'; s.t = 0; s.top = NMAX;
      for (n = 1; n <= LEVELS; n++) s.amps[n] = 0;
      s.flash = { x: xm, age: 0 }; s.lastMeasure = xm;
      evalPsi(0);
      var mx = 0; for (i = 0; i < M; i++) if (dens[i] > mx) mx = dens[i];
      s.scale = s.scaleTarget = mx * 1.05;
      syncChips(); updateReadout();
      if (!s.playing) setPlaying(true);
      st.redraw();
    }

    /* ---------- drawing ---------- */
    var geo = {};
    function layout(st) {
      var W = st.W, H = st.H;
      var lw = clamp(Math.round(W * 0.27), 92, 170);
      geo.lad = { x0: 8, x1: lw, top: 40, bot: H - 22 };
      geo.px0 = lw + 22; geo.px1 = W - 12;
      var top = 10, mid = Math.round(H * 0.47);
      geo.A = { top: top + 18, bot: mid - 6 };
      geo.B = { top: mid + 18, bot: H - 22 };
    }
    function levelY(n) { var L = geo.lad; return L.bot - (n * n / 25) * (L.bot - L.top); }
    function lineSpan() { var L = geo.lad; return { a: L.x0 + 18, b: L.x1 - 22 }; }

    function draw(ctx, st) {
      var C = st.C, W = st.W, H = st.H;
      layout(st);
      ctx.clearRect(0, 0, W, H);
      evalPsi(s.t);
      var stationary = s.mode === 'levels' && activeLevels().length === 1;

      /* ladder */
      var L = geo.lad, sp = lineSpan();
      ctx.font = '11px ' + C.body; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
      ctx.fillText('Energy levels', L.x0, 16);
      ctx.fillText('tap or drag', L.x0, 30);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(sp.a - 6.5, L.top - 6); ctx.lineTo(sp.a - 6.5, L.bot + 4); ctx.stroke();
      var weights = levelWeights(), wmax = 0;
      for (var q = 1; q <= NMAX; q++) wmax = Math.max(wmax, Math.sqrt(cR[q] * cR[q] + cI[q] * cI[q]));
      for (var n = 1; n <= LEVELS; n++) {
        var y = Math.round(levelY(n)) + 0.5, w = weights[n];
        ctx.fillStyle = w > 0.001 ? C.ink : C.muted; ctx.font = '12px ' + C.mono; ctx.textAlign = 'right';
        ctx.fillText(String(n), sp.a - 10, y + 4);
        ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(sp.a, y); ctx.lineTo(sp.b, y); ctx.stroke(); ctx.setLineDash([]);
        if (w > 0.001) {
          ctx.strokeStyle = C.phys; ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(sp.a, y); ctx.lineTo(sp.a + Math.max(3, (sp.b - sp.a) * (s.mode === 'levels' ? s.amps[n] : Math.sqrt(w) / wmax)), y); ctx.stroke();
          ctx.lineCap = 'butt';
          // phase clock: spins at a rate set by the energy
          var cx = L.x1 - 9, r = 7, ang = -n * n * E1 * s.t + Math.atan2(cI[n], cR[n]);
          ctx.strokeStyle = C.phys; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, y, r, 0, Math.PI * 2); ctx.stroke();
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + r * Math.cos(ang), y - r * Math.sin(ang)); ctx.stroke();
        }
      }
      if (s.mode === 'packet') {
        ctx.fillStyle = C.gold; ctx.font = '11px ' + C.body; ctx.textAlign = 'left';
        var hi = 0; for (n = LEVELS + 1; n <= NMAX; n++) hi += cR[n] * cR[n] + cI[n] * cI[n];
        ctx.fillText('levels above 5: ' + Math.round(hi * 100) + '%', L.x0, L.bot + 16);
      } else {
        ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'left';
        ctx.fillText('energy grows as n²', L.x0, L.bot + 16);
      }

      /* panels */
      var x0 = geo.px0, x1 = geo.px1;
      var X = function (u) { return x0 + u * (x1 - x0); };
      var A = geo.A, B = geo.B;
      var yA = (A.top + A.bot) / 2, ampA = (A.bot - A.top) / 2 / Math.sqrt(s.scale);
      var dB = (B.bot - B.top) / s.scale;

      // headers
      ctx.font = '11px ' + C.body; ctx.textAlign = 'left'; ctx.fillStyle = C.muted;
      ctx.fillText('Wave, real part', x0, A.top - 6);
      ctx.fillText('Chance of finding it, |ψ|²', x0, B.top - 6);
      ctx.textAlign = 'right'; ctx.fillStyle = C.gold;
      ctx.fillText(s.playing ? 'always moving' : 'paused', x1 - 4, A.top - 6);
      ctx.fillStyle = stationary ? C.muted : C.gold;
      ctx.fillText(stationary ? 'stays still' : (s.mode === 'packet' ? 'spreading' : 'sloshing'), x1 - 4, B.top - 6);

      // axes
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, Math.round(yA) + 0.5); ctx.lineTo(x1, Math.round(yA) + 0.5);
      ctx.moveTo(x0, Math.round(B.bot) + 0.5); ctx.lineTo(x1, Math.round(B.bot) + 0.5); ctx.stroke();

      // real part
      var i;
      ctx.beginPath(); ctx.moveTo(X(0), yA);
      for (i = 0; i < M; i++) ctx.lineTo(X(xg[i]), yA - pR[i] * ampA);
      ctx.lineTo(X(1), yA);
      ctx.strokeStyle = C.phys; ctx.lineWidth = 1.8; ctx.stroke();

      // density
      ctx.beginPath(); ctx.moveTo(X(0), B.bot);
      for (i = 0; i < M; i++) ctx.lineTo(X(xg[i]), B.bot - Math.min(dens[i] * dB, B.bot - B.top + 8));
      ctx.lineTo(X(1), B.bot); ctx.closePath();
      ctx.globalAlpha = 0.28; ctx.fillStyle = C.phys; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.phys; ctx.lineWidth = 1.8; ctx.stroke();

      // walls
      ctx.strokeStyle = C.ink; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x0 - 1.5, A.top - 2); ctx.lineTo(x0 - 1.5, B.bot + 2);
      ctx.moveTo(x1 + 1.5, A.top - 2); ctx.lineTo(x1 + 1.5, B.bot + 2);
      ctx.stroke();

      // measurement flash
      if (s.flash) {
        var f = s.flash, k = clamp(f.age / 0.9, 0, 1), fx = X(f.x);
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(fx, A.top); ctx.lineTo(fx, B.bot); ctx.stroke();
        ctx.beginPath(); ctx.arc(fx, B.bot - 4, 4 + 22 * k, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (s.lastMeasure != null && s.mode === 'packet') {
        var mx = X(s.lastMeasure);
        ctx.fillStyle = C.gold;
        ctx.beginPath(); ctx.moveTo(mx, B.bot + 3); ctx.lineTo(mx - 5, B.bot + 11); ctx.lineTo(mx + 5, B.bot + 11); ctx.closePath(); ctx.fill();
        ctx.font = '11px ' + C.body; ctx.textAlign = clamp(mx, x0 + 50, x1 - 50) === mx ? 'center' : (mx < x0 + 50 ? 'left' : 'right');
        ctx.fillText('found here', mx, B.bot + 22 > st.H - 2 ? st.H - 2 : B.bot + 21);
      }
    }
    function activeLevels() { var a = []; for (var n = 1; n <= LEVELS; n++) if (s.amps[n] > 0) a.push(n); return a; }
    function levelWeights() {
      var w = [0];
      for (var n = 1; n <= LEVELS; n++) w[n] = cR[n] * cR[n] + cI[n] * cI[n];
      return w;
    }

    /* ---------- loop ---------- */
    function tick(dt) {
      if (s.playing) s.t += dt * s.speed;
      if (s.flash) { s.flash.age += dt; if (s.flash.age > 0.9) s.flash = null; }
      if (s.mode === 'packet') {
        evalPsi(s.t);
        var mx = 0; for (var i = 0; i < M; i++) if (dens[i] > mx) mx = dens[i];
        s.scaleTarget = Math.max(2.4, mx * 1.08);
        var rate = s.scaleTarget > s.scale ? 10 : 0.8;
        s.scale += (s.scaleTarget - s.scale) * Math.min(1, dt * rate);
      }
      if (!s.playing && !s.flash) st.setAnimating(false);
    }

    var stageWrap = h('div');
    root.appendChild(stageWrap);
    var st = stage(stageWrap, {
      label: 'A particle in a box: an energy ladder on the left, the wave and the chance pattern on the right',
      touch: 'pan-y',
      height: function (w) { return clamp(Math.round(w * 0.8), 290, 360); },
      draw: draw, tick: tick,
      onReduce: function (r) { if (r) setSpeed(0.4); }
    });

    var readout = h('div', 'sim-readout');
    readout.setAttribute('aria-live', 'polite');
    root.appendChild(readout);

    var row1 = h('div', 'sim-row');
    var lg = h('div', 'sim-group');
    lg.appendChild(h('span', 'sim-lab', 'Levels n ='));
    var chips = [];
    for (var nn = 1; nn <= LEVELS; nn++) {
      (function (n) {
        var c = chip(String(n), s.amps[n] > 0);
        c.setAttribute('aria-label', 'Level ' + n);
        c.classList.add('lvl');
        c.addEventListener('click', function () { toggle(n); });
        chips[n] = c; lg.appendChild(c);
      })(nn);
    }
    row1.appendChild(lg);
    root.appendChild(row1);

    var row2 = h('div', 'sim-row');
    var g1 = h('div', 'sim-group'), g2 = h('div', 'sim-group');
    var measBtn = button('Measure position', 'primary');
    var pauseBtn = button('Pause');
    var resetBtn = button('Reset');
    g1.appendChild(measBtn); g1.appendChild(pauseBtn); g1.appendChild(resetBtn);
    var slowChip = chip('Slow', false), normChip = chip('Normal', true);
    g2.appendChild(slowChip); g2.appendChild(normChip);
    row2.appendChild(g1); row2.appendChild(h('span', 'grow')); row2.appendChild(g2);
    root.appendChild(row2);

    function syncChips() { for (var n = 1; n <= LEVELS; n++) setChip(chips[n], s.amps[n] > 0); }
    function toggle(n) {
      if (s.mode === 'packet') { for (var k = 1; k <= LEVELS; k++) s.amps[k] = 0; s.lastMeasure = null; }
      s.amps[n] = s.amps[n] > 0 ? 0 : 1;
      if (!activeLevels().length) s.amps[n] = 1; // keep at least one level
      setFromLevels(); syncChips(); updateReadout(); st.redraw();
    }
    function setWeight(n, w) {
      if (s.mode === 'packet') { for (var k = 1; k <= LEVELS; k++) s.amps[k] = 0; s.lastMeasure = null; }
      s.amps[n] = w;
      setFromLevels(); syncChips(); updateReadout(); st.redraw();
    }
    function setSpeed(v) {
      s.speed = v; setChip(slowChip, v < 1); setChip(normChip, v >= 1); updateReadout();
    }
    function setPlaying(on) {
      s.playing = on; pauseBtn.textContent = on ? 'Pause' : 'Play';
      if (on) st.setAnimating(true); else st.redraw();
    }
    function fmtS(x) { return x >= 10 ? Math.round(x) + ' s' : x.toFixed(1) + ' s'; }
    function updateReadout() {
      var e1 = E1 * s.speed;
      if (s.mode === 'packet') {
        readout.textContent = 'Found at ' + Math.round(s.lastMeasure * 100) + '% of the way across. A narrow spike needs many levels at once, so it spreads straight away. Wait about ' +
          fmtS(2 * Math.PI / e1) + ' and it briefly gathers itself again.';
        return;
      }
      var a = activeLevels();
      if (a.length === 1) {
        readout.textContent = 'Only n = ' + a[0] + ': a stationary state. The wave keeps turning, but the chance pattern never changes.';
      } else {
        var gg = 0;
        for (var i = 0; i < a.length; i++) for (var j = i + 1; j < a.length; j++) gg = gcd(gg, a[j] * a[j] - a[i] * a[i]);
        readout.textContent = 'Levels ' + a.join(', ') + ' together. Each part turns at its own rate, so they drift in and out of step and the chance sloshes. The pattern repeats every ' + fmtS(2 * Math.PI / (gg * e1)) + '.';
      }
    }

    measBtn.addEventListener('click', measure);
    pauseBtn.addEventListener('click', function () { setPlaying(!s.playing); });
    resetBtn.addEventListener('click', function () {
      s.amps = [0, 1, 0, 0, 0, 0]; s.lastMeasure = null; s.flash = null;
      setFromLevels(); syncChips(); updateReadout(); setPlaying(true);
    });
    slowChip.addEventListener('click', function () { setSpeed(0.4); });
    normChip.addEventListener('click', function () { setSpeed(1); });

    /* ladder pointer: tap toggles a level, sideways drag sets its share */
    var drag = null;
    function nearestLevel(e) {
      var r = st.canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (x > geo.lad.x1 + 6) return null;
      var best = null, bd = 24;
      for (var n = 1; n <= LEVELS; n++) { var d = Math.abs(levelY(n) - y); if (d < bd) { bd = d; best = n; } }
      return best ? { n: best, x: x } : null;
    }
    function onDown(e) {
      var hit = nearestLevel(e);
      if (!hit) return;
      drag = { n: hit.n, x0: hit.x, moved: false, id: e.pointerId };
      try { st.canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var r = st.canvas.getBoundingClientRect(), x = e.clientX - r.left;
      if (!drag.moved && Math.abs(x - drag.x0) < 6) return;
      drag.moved = true;
      var sp = lineSpan();
      var u = clamp((x - sp.a) / (sp.b - sp.a), 0.15, 1);
      setWeight(drag.n, u);
    }
    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) toggle(drag.n);
      drag = null;
    }
    st.canvas.addEventListener('pointerdown', onDown);
    st.canvas.addEventListener('pointermove', onMove);
    st.canvas.addEventListener('pointerup', onUp);
    st.canvas.addEventListener('pointercancel', function () { drag = null; });

    if (st.reduced) setSpeed(0.4);
    setFromLevels(); syncChips(); updateReadout();
    st.setAnimating(true);

    return {
      destroy: function () {
        st.destroy();
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'Particle in a box',
    blurb: 'Trapped between two walls, a particle can only hold certain energies, and only mixtures of them make anything move.',
    try: [
      'Choose one level on its own. The wave keeps turning, yet the chance pattern below stays perfectly still.',
      'Add level 2 to level 1. The chance now sloshes from side to side. Watch the little clocks drift in and out of step.',
      'Drag a level sideways to give it a bigger or smaller share, and see how the slosh changes.',
      'Press Measure position. The particle is found at one spot, then the spike spreads out at once. Wait, and it gathers itself again.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
