/* Kelly's Learning Studio: measuring a qubit.
   The state is an arrow on a great circle of the Bloch sphere, at angle θ
   from "0". Measuring along an axis at angle β gives the outcome along
   the axis with probability cos²((θ − β)/2) (the Born rule), otherwise the
   opposite one, and leaves the arrow pointing at the result. Repeating a
   measurement gives the same answer; fresh copies give random answers
   whose tally settles on the Born rule. Self contained. */
(function (g) {
  'use strict';
  var ID = 'measurement';

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
    '.sim-measurement .sim-val{color:var(--ink);font-family:var(--font-mono);font-size:.8rem}',
    '.sim-measurement .sim-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}',
    '.sim-measurement .sim-control{flex-basis:220px}',
    '.sim-measurement .sim-note{font-size:.88rem;color:var(--ink);margin:10px 2px 0;line-height:1.5}',
    '.sim-measurement .sim-lab{font-size:.82rem;color:var(--muted);align-self:center}'
  ].join('\n');

  var BASES = [
    { name: 'Up or down', beta: 0, labels: ['0', '1'] },
    { name: 'Tilted', beta: 45, labels: ['↗', '↙'] },
    { name: 'Sideways', beta: 90, labels: ['→', '←'] }
  ];
  var RAD = Math.PI / 180;

  function wrap360(a) { a %= 360; return a < 0 ? a + 360 : a; }
  function angDiff(a, b) { var d = wrap360(a - b); return d > 180 ? d - 360 : d; }

  function mount(el) {
    injectCSS(CSS);
    var inSim = el.classList.contains('sim') || (el.closest && el.closest('.sim'));
    var root = h('div', 'sim-' + ID + (inSim ? '' : ' sim'));
    el.appendChild(root);

    var s = {
      prep: 50, cur: 50, disp: 50, basis: 0, fresh: true,
      counts: [0, 0], lastResult: null, repeat: 0,
      flash: null, swing: null, batch: 0, batchAcc: 0, batchFlash: []
    };
    function B() { return BASES[s.basis]; }
    function pA(theta) { var d = (theta - B().beta) * RAD / 2; return Math.cos(d) * Math.cos(d); }

    /* ---------- drawing ---------- */
    var geo = {};
    function layout(st) {
      var W = st.W, H = st.H;
      var leftW = W < 520 ? Math.round(W * (W < 400 ? 0.6 : 0.56)) : Math.min(Math.round(W * 0.5), H + 60);
      var R = Math.max(60, Math.min(leftW / 2 - 30, H / 2 - 46));
      geo = { cx: leftW / 2 + 4, cy: H / 2 - 8, R: R, rx0: leftW + 14, rx1: W - 12 };
    }
    function pt(a, r) { return { x: geo.cx + r * Math.sin(a * RAD), y: geo.cy - r * Math.cos(a * RAD) }; }

    function draw(ctx, st) {
      var C = st.C, W = st.W, H = st.H;
      layout(st);
      ctx.clearRect(0, 0, W, H);
      var R = geo.R, b = B(), i;

      // circle and faint guides
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(geo.cx, geo.cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.moveTo(geo.cx - R, geo.cy); ctx.lineTo(geo.cx + R, geo.cy);
      ctx.moveTo(geo.cx, geo.cy - R); ctx.lineTo(geo.cx, geo.cy + R); ctx.stroke();
      ctx.globalAlpha = 1;

      // measuring axis
      var e1 = pt(b.beta, R + 10), e2 = pt(b.beta + 180, R + 10);
      ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(e2.x, e2.y); ctx.lineTo(e1.x, e1.y); ctx.stroke(); ctx.setLineDash([]);
      var l1 = pt(b.beta, R + 22), l2 = pt(b.beta + 180, R + 22);
      ctx.fillStyle = C.gold; ctx.font = '600 15px ' + C.mono; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.labels[0], l1.x, l1.y); ctx.fillText(b.labels[1], l2.x, l2.y);
      ctx.textBaseline = 'alphabetic';

      // flashes at the outcome ends
      function ring(f) {
        var k = clamp(f.age / f.life, 0, 1), p = pt(b.beta + (f.out ? 180 : 0), R);
        ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, 6 + 20 * k, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (s.flash) ring(s.flash);
      for (i = 0; i < s.batchFlash.length; i++) ring(s.batchFlash[i]);

      // prepared state ghost when the arrow has collapsed elsewhere
      if (!s.fresh && Math.abs(angDiff(s.prep, s.disp)) > 0.5) {
        var gp = pt(s.prep, R);
        ctx.strokeStyle = C.muted; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]); ctx.globalAlpha = 0.7;
        ctx.beginPath(); ctx.moveTo(geo.cx, geo.cy); ctx.lineTo(gp.x, gp.y); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
        ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'center';
        var gl = pt(s.prep, R * 0.62);
        ctx.fillText('prepared', gl.x, gl.y - 4);
      }

      // the state arrow
      var tip = pt(s.disp, R - 2), base = pt(s.disp, R - 16);
      ctx.strokeStyle = C.phys; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(geo.cx, geo.cy); ctx.lineTo(base.x, base.y); ctx.stroke(); ctx.lineCap = 'butt';
      var nx = Math.cos(s.disp * RAD), ny = Math.sin(s.disp * RAD);
      ctx.fillStyle = C.phys;
      ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.lineTo(base.x + 7 * nx, base.y + 7 * ny); ctx.lineTo(base.x - 7 * nx, base.y - 7 * ny); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(geo.cx, geo.cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.16; ctx.beginPath(); ctx.arc(tip.x, tip.y, 15, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'center';
      ctx.fillText(st.W < 520 ? 'drag the arrow' : 'drag the arrow to set the state', geo.cx, H - 8);

      /* right side: chances now, and the tally of fresh copies */
      var x0 = geo.rx0, x1 = geo.rx1, wR = x1 - x0;
      var p0 = pA(s.cur), probs = [p0, 1 - p0];
      ctx.textAlign = 'left'; ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body;
      ctx.fillText(wR < 200 ? 'Chance now' : 'Chance for the arrow now', x0, 18);
      var barX = x0 + 22, barW = wR - 22 - 40;
      for (i = 0; i < 2; i++) {
        var by = 30 + i * 24;
        ctx.fillStyle = C.gold; ctx.font = '600 13px ' + C.mono; ctx.textAlign = 'left';
        ctx.fillText(b.labels[i], x0 + 2, by + 11);
        ctx.fillStyle = C.line; ctx.fillRect(barX, by + 2, barW, 12);
        ctx.fillStyle = C.phys; ctx.fillRect(barX, by + 2, barW * probs[i], 12);
        ctx.fillStyle = C.ink; ctx.font = '12px ' + C.mono; ctx.textAlign = 'right';
        ctx.fillText(Math.round(probs[i] * 100) + '%', x1, by + 12);
      }

      var n = s.counts[0] + s.counts[1], q0 = pA(s.prep), exp = [q0, 1 - q0];
      var hy0 = 100, hy1 = H - 34;
      ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText((wR < 200 ? 'Fresh copies: ' : 'Fresh copies measured: ') + n, x0, hy0 - 6);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, hy1 + 0.5); ctx.lineTo(x1, hy1 + 0.5); ctx.stroke();
      var colW = Math.min(64, wR * 0.32), gap = (wR - 2 * colW) / 3;
      var top = hy0 + 22, hh = hy1 - top;
      for (i = 0; i < 2; i++) {
        var cx0 = x0 + gap + i * (colW + gap);
        var frac = n ? s.counts[i] / n : 0;
        ctx.globalAlpha = 0.85; ctx.fillStyle = C.phys;
        ctx.fillRect(cx0, hy1 - hh * frac, colW, hh * frac); ctx.globalAlpha = 1;
        // Born rule expectation
        var ey = Math.round(hy1 - hh * exp[i]) + 0.5;
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx0 - 5, ey); ctx.lineTo(cx0 + colW + 5, ey); ctx.stroke();
        ctx.fillStyle = C.ink; ctx.font = '12px ' + C.mono; ctx.textAlign = 'center';
        ctx.fillText(String(s.counts[i]), cx0 + colW / 2, Math.min(hy1 - hh * frac, ey) - 6);
        ctx.fillStyle = C.gold; ctx.font = '600 14px ' + C.mono;
        ctx.fillText(b.labels[i], cx0 + colW / 2, hy1 + 17);
      }
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, H - 8.5); ctx.lineTo(x0 + 14, H - 8.5); ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText('expected share', x0 + 19, H - 5);
    }

    /* ---------- actions ---------- */
    function sample(theta) { return Math.random() < pA(theta) ? 0 : 1; }
    function measure() {
      if (s.batch) return;
      var wasFresh = s.fresh, out = sample(s.cur);
      var target = wrap360(B().beta + (out ? 180 : 0));
      if (wasFresh) s.counts[out]++;
      s.repeat = (!wasFresh && s.lastResult && s.lastResult.basis === s.basis && s.lastResult.out === out) ? s.repeat + 1 : 0;
      s.lastResult = { out: out, basis: s.basis, fresh: wasFresh };
      s.fresh = false;
      var from = s.disp;
      s.cur = target;
      if (st.reduced) { s.disp = target; s.flash = null; }
      else { s.swing = { from: from, d: angDiff(target, from), t: 0 }; s.flash = { out: out, age: 0, life: 0.7 }; st.setAnimating(true); }
      updateReadout(); st.redraw();
    }
    function prepareFresh() {
      if (s.batch) return;
      s.cur = s.disp = s.prep; s.fresh = true; s.lastResult = null; s.swing = null;
      updateReadout(); st.redraw();
    }
    function measure100() {
      if (s.batch) return;
      s.cur = s.disp = s.prep; s.fresh = true; s.swing = null; s.lastResult = null;
      if (st.reduced) {
        for (var i = 0; i < 100; i++) s.counts[sample(s.prep)]++;
        updateReadout(); st.redraw(); return;
      }
      s.batch = 100; s.batchAcc = 0;
      st.setAnimating(true);
    }
    function setPrep(theta) {
      s.prep = s.cur = s.disp = wrap360(Math.round(theta));
      s.fresh = true; s.counts = [0, 0]; s.lastResult = null; s.swing = null;
      ang.set(s.prep);
      updateReadout(); st.redraw();
    }

    function tick(dt) {
      var busy = false;
      if (s.swing) {
        s.swing.t += dt / 0.35;
        var k = Math.min(1, s.swing.t), e = 1 - Math.pow(1 - k, 3);
        s.disp = wrap360(s.swing.from + s.swing.d * e);
        if (k >= 1) { s.disp = s.cur; s.swing = null; } else busy = true;
      }
      if (s.flash) { s.flash.age += dt; if (s.flash.age > s.flash.life) s.flash = null; else busy = true; }
      if (s.batch) {
        s.batchAcc += dt * 65;
        var m = Math.min(s.batch, Math.floor(s.batchAcc));
        s.batchAcc -= m;
        for (var i = 0; i < m; i++) {
          var out = sample(s.prep);
          s.counts[out]++;
          s.batchFlash.push({ out: out, age: 0, life: 0.45 });
        }
        s.batch -= m;
        if (m) updateReadout();
        busy = true;
      }
      for (var j = s.batchFlash.length - 1; j >= 0; j--) { s.batchFlash[j].age += dt; if (s.batchFlash[j].age > s.batchFlash[j].life) s.batchFlash.splice(j, 1); }
      if (s.batchFlash.length) busy = true;
      if (!busy) st.setAnimating(false);
    }

    var stageWrap = h('div');
    root.appendChild(stageWrap);
    var st = stage(stageWrap, {
      label: 'A qubit drawn as an arrow on a circle, with the chance of each outcome and a tally of results',
      touch: 'none',
      height: function (w) { return clamp(Math.round(w * 0.78), 290, 340); },
      draw: draw, tick: tick
    });

    var readout = h('div', 'sim-readout');
    readout.setAttribute('aria-live', 'polite');
    root.appendChild(readout);

    var row = h('div', 'sim-row');
    var mBtn = button('Measure', 'primary'), fBtn = button('Prepare fresh'), hBtn = button('Prepare and measure 100'), cBtn = button('Clear tally');
    row.appendChild(mBtn); row.appendChild(hBtn); row.appendChild(fBtn); row.appendChild(cBtn);
    root.appendChild(row);

    var controls = h('div', 'sim-controls');
    var ang = slider('Prepared arrow angle', 0, 359, 1, s.prep, function (v) { return Math.round(v) + '°'; });
    controls.appendChild(ang.el);
    root.appendChild(controls);

    var presets = h('div', 'sim-presets');
    presets.appendChild(h('span', 'sim-lab', 'Measure along'));
    var bchips = BASES.map(function (bs, i) {
      var c = chip(bs.name, i === 0);
      c.addEventListener('click', function () { setBasis(i); });
      presets.appendChild(c);
      return c;
    });
    root.appendChild(presets);

    root.appendChild(h('p', 'sim-note', 'Each outcome is random. The statistics are not.'));

    function setBasis(i) {
      s.basis = i; s.counts = [0, 0];
      bchips.forEach(function (c, j) { setChip(c, j === i); });
      updateReadout(); st.redraw();
    }
    function updateReadout() {
      var b = B(), p0 = pA(s.cur), lines = [];
      var L = s.lastResult;
      if (L && !s.batch) {
        var lab = BASES[L.basis].labels[L.out];
        if (L.basis !== s.basis) lines.push('The arrow still points along the last axis. Along this one, chance of ' + b.labels[0] + ' is ' + Math.round(p0 * 100) + '%, chance of ' + b.labels[1] + ' is ' + Math.round((1 - p0) * 100) + '%.');
        else if (s.repeat > 0) lines.push('Result ' + lab + ' again (' + (s.repeat + 1) + ' in a row). The arrow already points at ' + lab + ', so this measurement can only say ' + lab + '.');
        else lines.push('Result ' + lab + '. The arrow now points at ' + lab + ', so measuring the same way again will give ' + lab + '.');
      } else {
        lines.push('Chance of ' + b.labels[0] + ' is ' + Math.round(p0 * 100) + '%, chance of ' + b.labels[1] + ' is ' + Math.round((1 - p0) * 100) + '%.');
      }
      var n = s.counts[0] + s.counts[1];
      if (n) {
        var q0 = pA(s.prep);
        lines.push('Fresh copies: ' + n + '. ' + b.labels[0] + ' came up ' + s.counts[0] + (s.counts[0] === 1 ? ' time (' : ' times (') + Math.round(100 * s.counts[0] / n) + '%; the rule says ' + Math.round(q0 * 100) + '%).');
      }
      readout.textContent = lines.join(' ');
    }

    mBtn.addEventListener('click', measure);
    fBtn.addEventListener('click', prepareFresh);
    hBtn.addEventListener('click', measure100);
    cBtn.addEventListener('click', function () { s.counts = [0, 0]; updateReadout(); st.redraw(); });
    ang.input.addEventListener('input', function () { if (s.batch) s.batch = 0; setPrep(ang.get()); });

    /* drag the arrow */
    var dragging = null;
    function angleAt(e) {
      var r = st.canvas.getBoundingClientRect(), x = e.clientX - r.left - geo.cx, y = e.clientY - r.top - geo.cy;
      return { a: wrap360(Math.atan2(x, -y) / RAD), d: Math.sqrt(x * x + y * y) };
    }
    st.canvas.addEventListener('pointerdown', function (e) {
      var p = angleAt(e);
      if (p.d > geo.R + 34 || p.d < 6) return;
      dragging = e.pointerId;
      try { st.canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      s.batch = 0;
      setPrep(p.a);
      e.preventDefault();
    });
    st.canvas.addEventListener('pointermove', function (e) { if (dragging === e.pointerId) setPrep(angleAt(e).a); });
    function end(e) { if (dragging === e.pointerId) dragging = null; }
    st.canvas.addEventListener('pointerup', end);
    st.canvas.addEventListener('pointercancel', end);

    updateReadout(); st.redraw();

    return {
      destroy: function () {
        st.destroy();
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'Measuring a qubit',
    blurb: 'A qubit can point anywhere on a circle, but a measurement only ever answers one of two ways.',
    try: [
      'Set the arrow and press Measure, then Measure again. The second answer always matches the first.',
      'Press Prepare and measure 100 a few times. Single results jump about, but the bars settle on the gold lines.',
      'Point the arrow straight sideways. Up or down is now a perfect 50:50 gamble, yet measuring sideways is certain.',
      'Measure up or down, then switch to Sideways and measure the same arrow. The first answer wiped out any certainty about the second.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
