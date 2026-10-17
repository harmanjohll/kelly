/* Kelly's Learning Studio: quantum tunnelling.
   A Gaussian wave packet meets a rectangular barrier. The Schrödinger
   equation is solved on a 1D grid (split step Fourier, natural units,
   hbar = m = 1) so the packet genuinely splits into a reflected and a
   transmitted part. Self contained, no libraries. */
(function (g) {
  'use strict';
  var ID = 'tunnelling';

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
    '.sim-tunnelling .sim-val{color:var(--ink);font-family:var(--font-mono);font-size:.8rem}',
    '.sim-tunnelling .sim-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}',
    '.sim-tunnelling .sim-group{display:flex;flex-wrap:wrap;gap:8px}',
    '.sim-tunnelling .sim-row .grow{flex:1 1 0;min-width:0}',
    '.sim-tunnelling .sim-control{flex-basis:180px}',
    '.sim-tunnelling .sim-readout strong{color:var(--ink);font-weight:500}'
  ].join('\n');

  /* ---------- FFT (radix 2, in place) ---------- */
  function makeFFT(n) {
    var rev = new Uint32Array(n), bits = Math.round(Math.log2(n));
    for (var i = 0; i < n; i++) {
      var r = 0, x = i;
      for (var b = 0; b < bits; b++) { r = (r << 1) | (x & 1); x >>= 1; }
      rev[i] = r;
    }
    var cs = new Float64Array(n / 2), sn = new Float64Array(n / 2);
    for (var k = 0; k < n / 2; k++) { cs[k] = Math.cos(2 * Math.PI * k / n); sn[k] = Math.sin(2 * Math.PI * k / n); }
    return function (re, im, inverse) {
      var i, j, t;
      for (i = 0; i < n; i++) {
        j = rev[i];
        if (j > i) { t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; }
      }
      var sgn = inverse ? -1 : 1;
      for (var size = 2; size <= n; size <<= 1) {
        var half = size >> 1, step = n / size;
        for (i = 0; i < n; i += size) {
          for (j = i, k = 0; j < i + half; j++, k += step) {
            var l = j + half, c = cs[k], s = sgn * sn[k];
            var tr = re[l] * c + im[l] * s;
            var ti = im[l] * c - re[l] * s;
            re[l] = re[j] - tr; im[l] = im[j] - ti;
            re[j] += tr; im[j] += ti;
          }
        }
      }
      if (inverse) { var inv = 1 / n; for (i = 0; i < n; i++) { re[i] *= inv; im[i] *= inv; } }
    };
  }

  function mount(el) {
    injectCSS(CSS);
    var inSim = el.classList.contains('sim') || (el.closest && el.closest('.sim'));
    var root = h('div', 'sim-' + ID + (inSim ? '' : ' sim'));
    el.appendChild(root);

    /* ---------- physics setup ---------- */
    var N = 1024, L = 160, dx = L / N, DT = 0.05, X0 = -30, SIG = 5;
    var ZONE = 15, XMIN = -L / 2, VIEW = 62;
    var xs = new Float64Array(N), re = new Float64Array(N), im = new Float64Array(N);
    var kc = new Float64Array(N), ksn = new Float64Array(N);
    var vc = new Float64Array(N), vsn = new Float64Array(N), mask = new Float64Array(N), V = new Float64Array(N);
    var fft = makeFFT(N);
    for (var i = 0; i < N; i++) {
      xs[i] = XMIN + i * dx;
      var kk = 2 * Math.PI / L * (i < N / 2 ? i : i - N);
      kc[i] = Math.cos(-kk * kk / 2 * DT); ksn[i] = Math.sin(-kk * kk / 2 * DT);
      var d = Math.max(0, Math.abs(xs[i]) - (L / 2 - ZONE)) / ZONE;
      mask[i] = Math.exp(-3 * d * d * DT);
    }

    var p = { ratio: 1.2, width: 1.5, energy: 1.0 };
    var s = { t: 0, absL: 0, absR: 0, playing: false, done: false, ball: true, ripples: true, acc: 0, k0: 1 };

    function setupPotential() {
      var a = -p.width / 2, b = p.width / 2, V0 = p.ratio * p.energy;
      for (var i = 0; i < N; i++) {
        var lo = xs[i] - dx / 2, hi = xs[i] + dx / 2;
        var ov = Math.max(0, Math.min(hi, b) - Math.max(lo, a)) / dx; // fractional cell overlap keeps width smooth
        V[i] = V0 * ov;
        vc[i] = Math.cos(-V[i] * DT / 2); vsn[i] = Math.sin(-V[i] * DT / 2);
      }
    }
    function resetPacket() {
      var k0 = Math.sqrt(2 * p.energy);
      s.k0 = k0;
      var norm = Math.pow(2 * Math.PI * SIG * SIG, -0.25);
      for (var i = 0; i < N; i++) {
        var u = xs[i] - X0;
        var a = norm * Math.exp(-u * u / (4 * SIG * SIG));
        re[i] = a * Math.cos(k0 * xs[i]); im[i] = a * Math.sin(k0 * xs[i]);
      }
      s.t = 0; s.absL = 0; s.absR = 0; s.done = false; s.acc = 0;
    }
    function phase(c, sn) {
      for (var i = 0; i < N; i++) {
        var r = re[i], m = im[i];
        re[i] = r * c[i] - m * sn[i];
        im[i] = r * sn[i] + m * c[i];
      }
    }
    function step() {
      phase(vc, vsn);
      fft(re, im, false);
      phase(kc, ksn);
      fft(re, im, true);
      phase(vc, vsn);
      // absorbing edges: count what leaves on each side
      var zN = Math.ceil(ZONE / dx) + 2;
      for (var i = 0; i < zN; i++) absorb(i, true);
      for (i = N - zN; i < N; i++) absorb(i, false);
      s.t += DT;
    }
    function absorb(i, left) {
      var m = mask[i];
      if (m >= 1) return;
      var before = re[i] * re[i] + im[i] * im[i];
      re[i] *= m; im[i] *= m;
      var lost = before * (1 - m * m) * dx;
      if (left) s.absL += lost; else s.absR += lost;
    }
    function tally() {
      var a = -p.width / 2, b = p.width / 2, L1 = 0, R1 = 0, In = 0, near = 0;
      for (var i = 0; i < N; i++) {
        var d = (re[i] * re[i] + im[i] * im[i]) * dx;
        if (xs[i] < a) L1 += d; else if (xs[i] > b) R1 += d; else In += d;
        if (xs[i] > a - 12 && xs[i] < b + 12) near += d;
      }
      return { back: L1 + s.absL, through: R1 + s.absR, inside: In, near: near, live: L1 + R1 + In };
    }

    /* classical ball: rolls at the packet speed, bounces if its energy is below the barrier */
    function ballX(t) {
      var a = -p.width / 2, b = p.width / 2, v = s.k0, xHit = a;
      var tHit = (xHit - X0) / v;
      if (t <= tHit) return X0 + v * t;
      if (p.ratio > 1) return xHit - v * (t - tHit);
      var v2 = Math.sqrt(Math.max(0, 2 * p.energy * (1 - p.ratio)));
      var tIn = v2 > 1e-6 ? (b - a) / v2 : Infinity;
      if (t <= tHit + tIn) return a + v2 * (t - tHit);
      return b + v * (t - tHit - tIn);
    }

    /* ---------- drawing ---------- */
    var peakDens = 1 / (Math.sqrt(2 * Math.PI) * SIG);
    var last = null;

    function draw(ctx, st) {
      var C = st.C, W = st.W, H = st.H;
      ctx.clearRect(0, 0, W, H);
      var padX = 10, top = 52;
      var plotH = (H - top - 10) / 1.2;
      var y0 = top + plotH;
      var px = function (x) { return padX + (x + VIEW) / (2 * VIEW) * (W - 2 * padX); };
      var eY = y0 - 0.40 * plotH;
      var hPer = 0.40 * plotH;
      var dScale = 0.52 * plotH / peakDens;
      var aScale = 0.16 * plotH / Math.sqrt(peakDens);

      // baseline
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padX, y0 + 0.5); ctx.lineTo(W - padX, y0 + 0.5); ctx.stroke();

      // barrier block
      var bx0 = px(-p.width / 2), bx1 = px(p.width / 2);
      var bh = p.ratio * hPer;
      if (bx1 - bx0 < 2) { var mid = (bx0 + bx1) / 2; bx0 = mid - 1; bx1 = mid + 1; }
      ctx.globalAlpha = 0.16; ctx.fillStyle = C.ink;
      ctx.fillRect(bx0, y0 - bh, bx1 - bx0, bh);
      ctx.globalAlpha = 1; ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
      ctx.strokeRect(bx0 + 0.5, y0 - bh + 0.5, bx1 - bx0 - 1, bh);
      ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'center';
      ctx.fillText('barrier', (bx0 + bx1) / 2, Math.max(top + 10, y0 - bh - 6));

      // packet energy line
      ctx.strokeStyle = C.gold; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padX, eY + 0.5); ctx.lineTo(W - padX, eY + 0.5); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.gold; ctx.textAlign = 'right';
      ctx.fillText('packet energy', W - padX - 4, eY + 14);

      // probability density, filled
      var i0 = Math.max(0, Math.floor((-VIEW - XMIN) / dx)), i1 = Math.min(N - 1, Math.ceil((VIEW - XMIN) / dx));
      ctx.beginPath(); ctx.moveTo(px(xs[i0]), y0);
      for (var i = i0; i <= i1; i++) {
        var dd = re[i] * re[i] + im[i] * im[i];
        ctx.lineTo(px(xs[i]), y0 - Math.min(dd * dScale, plotH + 10));
      }
      ctx.lineTo(px(xs[i1]), y0); ctx.closePath();
      ctx.globalAlpha = 0.28; ctx.fillStyle = C.phys; ctx.fill(); ctx.globalAlpha = 1;
      ctx.beginPath();
      for (i = i0; i <= i1; i++) {
        var d2 = re[i] * re[i] + im[i] * im[i];
        var yy = y0 - Math.min(d2 * dScale, plotH + 10);
        if (i === i0) ctx.moveTo(px(xs[i]), yy); else ctx.lineTo(px(xs[i]), yy);
      }
      ctx.strokeStyle = C.phys; ctx.lineWidth = 1.8; ctx.stroke();

      // real part, thin
      if (s.ripples) {
        ctx.beginPath();
        for (i = i0; i <= i1; i++) {
          var ya = y0 - re[i] * aScale;
          if (i === i0) ctx.moveTo(px(xs[i]), ya); else ctx.lineTo(px(xs[i]), ya);
        }
        ctx.globalAlpha = 0.55; ctx.strokeStyle = C.phys; ctx.lineWidth = 0.9; ctx.stroke(); ctx.globalAlpha = 1;
      }

      // classical ball
      if (s.ball) {
        var bxv = ballX(s.t);
        if (bxv > -VIEW - 2 && bxv < VIEW + 2) {
          var r = 6, bxp = px(bxv);
          if (p.ratio > 1 && bxp + r > bx0) bxp = bx0 - r;
          var by = eY - r - 1;
          if (p.ratio <= 1 && bxv > -p.width / 2 && bxv < p.width / 2) by = y0 - bh - r - 1;
          ctx.beginPath(); ctx.arc(bxp, by, r, 0, Math.PI * 2);
          ctx.fillStyle = C.gold; ctx.fill();
          ctx.fillStyle = C.gold; ctx.font = '11px ' + C.body; ctx.textAlign = 'center';
          ctx.fillText('ball', bxp, by - 10);
        }
      }

      // tallies
      var tl = last || tally();
      ctx.textAlign = 'left'; ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body;
      ctx.fillText(s.done ? 'Bounced back' : 'Left side', padX + 2, 16);
      ctx.textAlign = 'right';
      ctx.fillText(s.done ? 'Got through' : 'Right side', W - padX - 2, 16);
      ctx.font = '500 20px ' + C.mono; ctx.fillStyle = C.ink;
      ctx.textAlign = 'left';
      ctx.fillText(pct(tl.back), padX + 2, 40);
      ctx.textAlign = 'right'; ctx.fillStyle = C.phys;
      ctx.fillText(pct(tl.through), W - padX - 2, 40);
    }
    function pct(x) { return Math.round(clamp(x, 0, 1) * 100) + '%'; }

    /* ---------- loop ---------- */
    function tick(dt) {
      if (!s.playing) return;
      var steps;
      if (st.reduced) {
        // fewer, larger visual updates
        s.acc += dt;
        if (s.acc < 0.15) return;
        steps = Math.round(s.acc * 60 * 8); s.acc = 0;
        steps = Math.min(steps, 80);
      } else steps = Math.min(12, Math.max(1, Math.round(dt * 60 * 8))); // slow down gracefully on busy phones
      for (var k = 0; k < steps; k++) step();
      last = tally();
      var tHit = (-p.width / 2 - X0) / s.k0;
      if (s.t > tHit && last.near < 0.002 && !s.done) { s.done = true; }
      if (last.live < 0.004 || s.t > 400) { s.playing = false; st.setAnimating(false); }
      updateReadout();
    }

    var stageWrap = h('div');
    root.appendChild(stageWrap);
    var st = stage(stageWrap, {
      label: 'A wave packet moving toward a barrier, with the chance of bouncing back and getting through',
      touch: 'pan-y',
      height: function (w) { return clamp(Math.round(w * 0.66), 260, 340); },
      draw: draw, tick: tick
    });

    var readout = h('div', 'sim-readout');
    readout.setAttribute('aria-live', 'polite');
    root.appendChild(readout);

    var row = h('div', 'sim-row');
    var play = button('Play', 'primary');
    var reset = button('Reset');
    var ballChip = chip('Classical ball', true);
    var ripChip = chip('Ripples', true);
    var g1 = h('div', 'sim-group'), g2 = h('div', 'sim-group');
    g1.appendChild(play); g1.appendChild(reset);
    g2.appendChild(ballChip); g2.appendChild(ripChip);
    row.appendChild(g1); row.appendChild(h('span', 'grow')); row.appendChild(g2);
    root.appendChild(row);

    var controls = h('div', 'sim-controls');
    var sH = slider('Barrier height', 0, 2, 0.05, p.ratio, function (v) { return v.toFixed(2) + ' × energy'; });
    var sW = slider('Barrier width', 0.5, 5, 0.1, p.width, function (v) { return v.toFixed(1); });
    var sE = slider('Packet energy', 0.5, 2.5, 0.05, p.energy, function (v) { return v.toFixed(2); });
    controls.appendChild(sH.el); controls.appendChild(sW.el); controls.appendChild(sE.el);
    root.appendChild(controls);

    function updateReadout() {
      var tl = last || tally();
      var classical = p.ratio > 1 ? 'A classical ball with this energy always bounces back.' :
        'A classical ball with this energy always rolls over.';
      if (s.t === 0) {
        readout.innerHTML = '';
        readout.appendChild(document.createTextNode('Ready. Press Play and watch the packet meet the barrier. ' + classical));
        return;
      }
      if (s.done) {
        readout.textContent = 'Result: ' + pct(tl.through) + ' got through, ' + pct(tl.back) + ' bounced back. ' + classical;
      } else {
        readout.textContent = 'Left of the barrier ' + pct(tl.back) + ' · inside ' + pct(tl.inside) + ' · right of it ' + pct(tl.through);
      }
    }

    function fullReset() {
      setupPotential(); resetPacket(); last = tally();
      setPlaying(false);
      updateReadout(); st.redraw();
    }
    function setPlaying(on) {
      s.playing = on;
      play.textContent = on ? 'Pause' : 'Play';
      st.setAnimating(on);
    }
    play.addEventListener('click', function () {
      if (s.playing) { setPlaying(false); return; }
      if (s.done && last && last.live < 0.004) { resetPacket(); last = tally(); }
      setPlaying(true);
    });
    reset.addEventListener('click', fullReset);
    ballChip.addEventListener('click', function () { s.ball = !s.ball; setChip(ballChip, s.ball); st.redraw(); });
    ripChip.addEventListener('click', function () { s.ripples = !s.ripples; setChip(ripChip, s.ripples); st.redraw(); });
    function onSlide() {
      p.ratio = sH.get(); p.width = sW.get(); p.energy = sE.get();
      sH.show(); sW.show(); sE.show();
      fullReset();
    }
    sH.input.addEventListener('input', onSlide);
    sW.input.addEventListener('input', onSlide);
    sE.input.addEventListener('input', onSlide);

    fullReset();

    return {
      destroy: function () {
        st.destroy();
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'Quantum tunnelling',
    blurb: 'A wave packet meets a wall it does not have the energy to climb, and part of it turns up on the far side anyway.',
    try: [
      'Keep the barrier a little higher than the packet energy and widen it slowly. Watch how quickly the share that gets through falls away.',
      'Drop the barrier below the packet energy. The ball always rolls over, yet part of the wave still bounces back.',
      'Raise the packet energy with the barrier fixed at about one and a half times it. Faster packets tunnel more.',
      'Pause just as the packet splits. The two humps are one wave, not two particles: each run, a detector would click on one side only.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
