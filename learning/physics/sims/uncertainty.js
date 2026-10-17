/* Kelly's Learning Studio: the uncertainty principle as a property of waves.
   A packet is built by adding plane waves e^{ikx} with Gaussian weights.
   Squeeze it in position and it needs a wider spread of wavelengths,
   that is, of momenta (p = ħk, natural units with ħ = 1). Δx and Δp are
   computed numerically from the sum, and their product sits at the
   Gaussian minimum ħ/2. Self contained. */
(function (g) {
  'use strict';
  var ID = 'uncertainty';

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
    '.sim-uncertainty .sim-val{color:var(--ink);font-family:var(--font-mono);font-size:.8rem}',
    '.sim-uncertainty .sim-control{flex-basis:220px}',
    '.sim-uncertainty .sim-note{font-size:.88rem;color:var(--ink);margin:10px 2px 0;line-height:1.5}'
  ].join('\n');

  var K0 = 4, DK = 0.1, XR = 10, CUT = 4.5, SMIN = 0.3, SMAX = 4;

  function sigmaFrom(v) { return SMAX * Math.pow(SMIN / SMAX, v / 100); }
  function valueFrom(sig) { return 100 * Math.log(sig / SMAX) / Math.log(SMIN / SMAX); }

  function mount(el) {
    injectCSS(CSS);
    var inSim = el.classList.contains('sim') || (el.closest && el.closest('.sim'));
    var root = h('div', 'sim-' + ID + (inSim ? '' : ' sim'));
    el.appendChild(root);

    var s = { v: 45, showWaves: true, tween: null };
    var comp = { k: [], a: [], dx: 0, dp: 0, n: 0, sk: 0 };

    /* build the mix of waves for the current squeeze and measure its spreads */
    function build() {
      var sx = sigmaFrom(s.v), sk = 1 / (2 * sx);
      var ks = [], as = [];
      var jmax = Math.floor(CUT * sk / DK);
      for (var j = -jmax; j <= jmax; j++) {
        var k = K0 + j * DK, u = k - K0;
        ks.push(k); as.push(Math.exp(-u * u / (4 * sk * sk))); // amplitude; |a|² has spread sk
      }
      // Δp from the weights |a|²
      var w = 0, m1 = 0, m2 = 0, i;
      for (i = 0; i < ks.length; i++) { var q = as[i] * as[i]; w += q; m1 += q * ks[i]; m2 += q * ks[i] * ks[i]; }
      var mean = m1 / w, dp = Math.sqrt(Math.max(0, m2 / w - mean * mean));
      // Δx from |ψ(x)|² of the actual sum, over one repeat length of the sum
      var P = 2 * Math.PI / DK, G = 700, sw = 0, x1 = 0, x2 = 0;
      for (var gi = 0; gi < G; gi++) {
        var x = -P / 2 + (gi + 0.5) * P / G, re = 0, im = 0;
        for (i = 0; i < ks.length; i++) { re += as[i] * Math.cos(ks[i] * x); im += as[i] * Math.sin(ks[i] * x); }
        var d = re * re + im * im;
        sw += d; x1 += d * x; x2 += d * x * x;
      }
      var mx = x1 / sw, dxv = Math.sqrt(Math.max(0, x2 / sw - mx * mx));
      comp = { k: ks, a: as, dx: dxv, dp: dp, n: ks.length, sk: sk, sx: sx };
    }

    function draw(ctx, st) {
      var C = st.C, W = st.W, H = st.H;
      ctx.clearRect(0, 0, W, H);
      var padX = 12, x0 = padX, x1 = W - padX;
      var gaugeH = 44;
      var topA = 22, botA = Math.round((H - gaugeH) * 0.56);
      var topB = botA + 26, botB = H - gaugeH - 8;
      var ks = comp.k, as = comp.a, n = comp.n, i, j;
      var asum = 0; for (i = 0; i < n; i++) asum += as[i];

      /* ----- position panel ----- */
      var yc = (topA + botA) / 2, half = (botA - topA) / 2 - 4;
      var X = function (x) { return x0 + (x + XR) / (2 * XR) * (x1 - x0); };
      ctx.font = '11px ' + C.body; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
      ctx.fillText('Position: the packet', x0, topA - 8);
      ctx.textAlign = 'right'; ctx.fillStyle = C.phys; ctx.font = '12px ' + C.mono;
      ctx.fillText('Δx = ' + comp.dx.toFixed(2), x1, topA - 8);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, Math.round(yc) + 0.5); ctx.lineTo(x1, Math.round(yc) + 0.5); ctx.stroke();

      var cols = Math.max(160, Math.round((x1 - x0) * 1.2));
      // faint component waves (a few of them, drawn larger so their shapes show)
      if (s.showWaves) {
        var show = Math.min(7, n), amax = as[Math.floor(n / 2)];
        ctx.lineWidth = 1; ctx.strokeStyle = C.muted;
        for (var t = 0; t < show; t++) {
          j = show === 1 ? Math.floor(n / 2) : Math.round(t * (n - 1) / (show - 1));
          var amp = half * 0.42 * Math.max(0.3, as[j] / amax);
          ctx.globalAlpha = 0.12 + 0.2 * (as[j] / amax);
          ctx.beginPath();
          for (var c = 0; c <= cols; c++) {
            var xx = -XR + 2 * XR * c / cols, yy = yc - amp * Math.cos(ks[j] * xx);
            if (c === 0) ctx.moveTo(X(xx), yy); else ctx.lineTo(X(xx), yy);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      // the sum: envelope and real part
      var env = new Float64Array(cols + 1), rp = new Float64Array(cols + 1);
      for (c = 0; c <= cols; c++) {
        var x = -XR + 2 * XR * c / cols, re = 0, im = 0;
        for (i = 0; i < n; i++) { re += as[i] * Math.cos(ks[i] * x); im += as[i] * Math.sin(ks[i] * x); }
        rp[c] = re / asum; env[c] = Math.sqrt(re * re + im * im) / asum;
      }
      ctx.beginPath();
      for (c = 0; c <= cols; c++) { var px = X(-XR + 2 * XR * c / cols); if (c === 0) ctx.moveTo(px, yc - env[c] * half); else ctx.lineTo(px, yc - env[c] * half); }
      for (c = cols; c >= 0; c--) ctx.lineTo(X(-XR + 2 * XR * c / cols), yc + env[c] * half);
      ctx.closePath(); ctx.globalAlpha = 0.14; ctx.fillStyle = C.phys; ctx.fill(); ctx.globalAlpha = 1;
      ctx.beginPath();
      for (c = 0; c <= cols; c++) { px = X(-XR + 2 * XR * c / cols); if (c === 0) ctx.moveTo(px, yc - rp[c] * half); else ctx.lineTo(px, yc - rp[c] * half); }
      ctx.strokeStyle = C.phys; ctx.lineWidth = 2; ctx.stroke();
      // Δx bracket
      bracket(ctx, C.phys, X(-comp.dx), X(comp.dx), botA - 2, 'Δx', C);

      /* ----- momentum panel ----- */
      var PR = 6.5, P = function (k) { return x0 + (k - (K0 - PR)) / (2 * PR) * (x1 - x0); };
      ctx.font = '11px ' + C.body; ctx.fillStyle = C.muted; ctx.textAlign = 'left';
      ctx.fillText('Momentum: the mix of wavelengths', x0, topB - 8);
      ctx.textAlign = 'right'; ctx.fillStyle = C.gold; ctx.font = '12px ' + C.mono;
      ctx.fillText('Δp = ' + comp.dp.toFixed(2), x1, topB - 8);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, botB + 0.5); ctx.lineTo(x1, botB + 0.5); ctx.stroke();
      var hB = botB - topB - 12;
      // smooth curve |φ(p)|²
      ctx.beginPath(); ctx.moveTo(x0, botB);
      for (c = 0; c <= cols; c++) {
        var kk = K0 - PR + 2 * PR * c / cols, u = kk - K0;
        ctx.lineTo(P(kk), botB - hB * Math.exp(-u * u / (2 * comp.sk * comp.sk)));
      }
      ctx.lineTo(x1, botB); ctx.closePath();
      ctx.globalAlpha = 0.16; ctx.fillStyle = C.gold; ctx.fill(); ctx.globalAlpha = 1;
      // one stem per wave in the mix
      ctx.strokeStyle = C.gold; ctx.lineWidth = n > 60 ? 1 : 1.5;
      ctx.beginPath();
      for (i = 0; i < n; i++) { var sx = Math.round(P(ks[i])) + 0.5; ctx.moveTo(sx, botB); ctx.lineTo(sx, botB - hB * as[i] * as[i]); }
      ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText('longer waves', x0, botB + 13);
      ctx.textAlign = 'right';
      ctx.fillText('shorter waves', x1, botB + 13);
      bracket(ctx, C.gold, P(K0 - comp.dp), P(K0 + comp.dp), botB - hB * 0.6 - 2, 'Δp', C, true);

      /* ----- product gauge ----- */
      var gy = H - 14, gx0 = x0 + 74, gx1 = x1 - 4, prod = comp.dx * comp.dp;
      var G = function (v) { return gx0 + (v / 2) * (gx1 - gx0); };
      ctx.fillStyle = C.ink; ctx.font = '12px ' + C.mono; ctx.textAlign = 'left';
      ctx.fillText('Δx × Δp', x0, gy + 4);
      ctx.globalAlpha = 0.12; ctx.fillStyle = C.ink;
      ctx.fillRect(gx0, gy - 4, G(0.5) - gx0, 8); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(G(0.5), gy); ctx.lineTo(gx1, gy); ctx.stroke();
      ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(Math.round(G(0.5)) + 0.5, gy - 8); ctx.lineTo(Math.round(G(0.5)) + 0.5, gy + 8); ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'right';
      ctx.fillText('floor ħ/2', G(0.5) - 6, gy - 9);
      ctx.fillStyle = C.phys;
      ctx.beginPath(); ctx.arc(G(Math.min(prod, 2)), gy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink; ctx.font = '12px ' + C.mono; ctx.textAlign = 'left';
      ctx.fillText(prod.toFixed(2), G(Math.min(prod, 2)) + 9, gy - 7);
    }
    function bracket(ctx, col, a, b, y, label, C, above) {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b, y);
      ctx.moveTo(a, y - 4); ctx.lineTo(a, y + 4); ctx.moveTo(b, y - 4); ctx.lineTo(b, y + 4); ctx.stroke();
      ctx.font = '11px ' + C.mono; ctx.textAlign = 'center';
      ctx.lineWidth = 4; ctx.strokeStyle = C.bg; ctx.lineJoin = 'round';
      ctx.strokeText(label, (a + b) / 2, y - 6);
      ctx.fillText(label, (a + b) / 2, y - 6);
    }

    function tick(dt) {
      var tw = s.tween;
      if (!tw) { st.setAnimating(false); return; }
      tw.t += dt / 0.6;
      var k = Math.min(1, tw.t), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      s.v = tw.from + (tw.to - tw.from) * e;
      sq.set(s.v); build(); updateReadout();
      if (k >= 1) s.tween = null;
    }

    var stageWrap = h('div');
    root.appendChild(stageWrap);
    var st = stage(stageWrap, {
      label: 'A wave packet in position above, and its spread of momenta below',
      touch: 'pan-y',
      height: function (w) { return clamp(Math.round(w * 0.86), 310, 380); },
      draw: draw, tick: tick
    });

    var readout = h('div', 'sim-readout');
    readout.setAttribute('aria-live', 'polite');
    root.appendChild(readout);

    var controls = h('div', 'sim-controls');
    var sq = slider('Squeeze the packet', 0, 100, 0.5, s.v, function (v) { return 'Δx ' + sigmaFrom(v).toFixed(2); });
    controls.appendChild(sq.el);
    root.appendChild(controls);

    var presets = h('div', 'sim-presets');
    var pW = chip('Wide', false), pM = chip('Middle', false), pN = chip('Narrow', false), wavesChip = chip('Show the waves', true);
    presets.appendChild(pW); presets.appendChild(pM); presets.appendChild(pN); presets.appendChild(wavesChip);
    root.appendChild(presets);

    var note = h('p', 'sim-note', 'This is a property of waves, not clumsy measurement. A short burst of wave has to be made from many wavelengths, and for a quantum particle each wavelength is a momentum.');
    root.appendChild(note);

    function updateReadout() {
      readout.textContent = 'Δx = ' + comp.dx.toFixed(2) + ' · Δp = ' + comp.dp.toFixed(2) + ' · product ' + (comp.dx * comp.dp).toFixed(2) +
        ' (the floor ħ/2 is 0.50 here) · built from ' + comp.n + ' waves';
    }
    function goTo(sig) {
      var to = valueFrom(sig);
      if (st.reduced) { s.v = to; sq.set(to); build(); updateReadout(); st.redraw(); return; }
      s.tween = { from: s.v, to: to, t: 0 };
      st.setAnimating(true);
    }
    sq.input.addEventListener('input', function () { s.tween = null; s.v = sq.get(); sq.show(); build(); updateReadout(); st.redraw(); });
    pW.addEventListener('click', function () { goTo(3); });
    pM.addEventListener('click', function () { goTo(1.2); });
    pN.addEventListener('click', function () { goTo(0.35); });
    wavesChip.addEventListener('click', function () { s.showWaves = !s.showWaves; setChip(wavesChip, s.showWaves); st.redraw(); });

    build(); sq.show(); updateReadout(); st.redraw();

    return {
      destroy: function () {
        st.destroy();
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'Uncertainty from waves',
    blurb: 'Squeeze a wave packet into a smaller space and its spread of momenta has to grow.',
    try: [
      'Squeeze the packet slowly. As it narrows above, watch the spread of momenta below grow wider.',
      'Turn on the waves and choose Narrow. A short packet needs many different wavelengths that agree in one place and cancel everywhere else.',
      'Watch the product Δx × Δp as you slide. It never drops below the floor, however you set the packet.',
      'Choose Wide. A long, even wave has an almost exact wavelength, so its momentum is sharp but its position is spread out.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
