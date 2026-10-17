/* Kelly's Learning Studio: double slit, one particle at a time.
   Each particle lands at a single point, drawn at random from the quantum probability
   distribution: two slit interference (cos squared) times the single slit envelope
   (sinc squared). With a which path detector the fringes go and the pattern becomes
   the sum of two single slit patterns. Far field (Fraunhofer) optics, screen 1 m away. */
(function (g) {
  'use strict';
  var ID = 'double-slit';
  var EXTRA_CSS = '';
  var L_SCREEN = 1000;      // mm from slits to screen
  var Y_MAX = 15;           // mm, half width of the screen shown
  var SLIT_A = 0.04;        // mm, width of each slit for light (40 micrometres)
  var SCALE_E = 1e-3;       // electrons: slits and wavelength 1000 times smaller, so the same pattern on a screen 1 m away
  var MAX_HITS = 60000;

  /* ---------- small shared helpers (each sim file is self contained) ---------- */
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var colourCache = {};
  function parseColour(c) {
    if (colourCache[c]) return colourCache[c];
    var cv = document.createElement('canvas'); cv.width = cv.height = 1;
    var x = cv.getContext('2d');
    x.fillStyle = '#000'; x.fillStyle = c; x.fillRect(0, 0, 1, 1);
    var d = x.getImageData(0, 0, 1, 1).data;
    return (colourCache[c] = [d[0], d[1], d[2]]);
  }
  function rgba(c, a) { var p = parseColour(c); return 'rgba(' + p[0] + ',' + p[1] + ',' + p[2] + ',' + a + ')'; }
  function readTheme() {
    var cs = getComputedStyle(document.documentElement);
    function v(n, d) { var x = cs.getPropertyValue(n).trim(); return x || d; }
    var t = {
      ink: v('--ink', '#1f2328'), muted: v('--muted', '#6b7076'), line: v('--line', '#dcd8cf'),
      surface: v('--surface', '#ffffff'), bg: v('--bg', '#f7f4ee'), phys: v('--phys', '#2e8b84'),
      gold: v('--accent-2', '#c49a2c'),
      mono: v('--font-mono', '"IBM Plex Mono", ui-monospace, Menlo, monospace'),
      body: v('--font-body', 'Inter, system-ui, sans-serif')
    };
    var b = parseColour(t.bg);
    t.dark = (0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2]) < 110;
    t.stage = t.dark ? '#0a1213' : '#0f1d1e';
    t.stageInk = 'rgba(232,240,238,0.86)';
    t.stageMuted = 'rgba(232,240,238,0.5)';
    t.stageLine = 'rgba(232,240,238,0.14)';
    return t;
  }
  // Wavelength (nm) to an sRGB colour; null outside the visible band.
  function waveRGB(nm) {
    if (nm < 380 || nm > 780) return null;
    var r = 0, gg = 0, b = 0;
    if (nm < 440) { r = (440 - nm) / 60; b = 1; }
    else if (nm < 490) { gg = (nm - 440) / 50; b = 1; }
    else if (nm < 510) { gg = 1; b = (510 - nm) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; gg = 1; }
    else if (nm < 645) { r = 1; gg = (645 - nm) / 65; }
    else { r = 1; }
    var f = nm < 420 ? 0.35 + 0.65 * (nm - 380) / 40 : nm > 700 ? 0.35 + 0.65 * (780 - nm) / 80 : 1;
    function c(x) { return Math.round(255 * Math.pow(x * f, 0.8)); }
    return [c(r), c(gg), c(b)];
  }
  function lightColour(nm, a) {
    var w = waveRGB(nm);
    if (w) return 'rgba(' + w[0] + ',' + w[1] + ',' + w[2] + ',' + a + ')';
    // invisible light: infrared drawn as a dim ember, ultraviolet as a pale lilac ghost
    return nm > 780 ? 'rgba(150,70,60,' + a * 0.8 + ')' : 'rgba(196,170,255,' + a * 0.75 + ')';
  }
  function colourName(nm) {
    if (nm < 380) return 'ultraviolet';
    if (nm < 450) return 'violet';
    if (nm < 495) return 'blue';
    if (nm < 570) return 'green';
    if (nm < 590) return 'yellow';
    if (nm < 620) return 'orange';
    if (nm <= 750) return 'red';
    return 'infrared';
  }
  function injectCss() {
    if (document.getElementById('sim-' + ID + '-css')) return;
    var s = mk('style');
    s.id = 'sim-' + ID + '-css';
    s.textContent =
      '.sim-' + ID + ' .sim-canvas{display:block;width:100%;touch-action:pan-y;border-radius:var(--radius,12px)}' +
      '.sim-' + ID + ' .sim-val{font-family:var(--font-mono,monospace);color:var(--muted);font-size:.85em;margin-left:.35em;font-weight:400}' +
      '.sim-' + ID + ' input[type=range]{accent-color:var(--phys)}' +
      '.sim-' + ID + ' .sim-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
      '.sim-' + ID + ' .sim-readout{white-space:pre-line}' + EXTRA_CSS;
    document.head.appendChild(s);
  }
  function rangeControl(label, min, max, step, value, fmt, onInput) {
    var lab = mk('label', 'sim-control');
    var txt = mk('span', 'sim-label', label);
    var out = mk('output', 'sim-val');
    var inp = mk('input');
    inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = value;
    txt.appendChild(out); lab.appendChild(txt); lab.appendChild(inp);
    function show() { out.textContent = fmt(+inp.value); }
    inp.addEventListener('input', function () { show(); onInput(+inp.value); });
    show();
    return { el: lab, input: inp, set: function (v) { inp.value = v; show(); } };
  }
  function chip(text, on, onClick) {
    var b = mk('button', 'chip' + (on ? ' on' : ''), text);
    b.type = 'button';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.addEventListener('click', onClick);
    return b;
  }
  function setChip(b, on) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function expWait(rate) { return rate > 0 ? -Math.log(1 - Math.random()) / rate : Infinity; }
  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }

  // Canvas plumbing: sizing with devicePixelRatio, animation loop that pauses off screen
  // or in a hidden tab, theme changes, reduced motion. opts: height(W), onSize(),
  // step(dt), draw(), busy(), onTheme().
  function makeStage(root, canvas, opts) {
    var ctx = canvas.getContext('2d');
    var S = { W: 0, H: 0, ctx: ctx, T: readTheme(), reduce: false };
    var mm = window.matchMedia ? function (q) { return window.matchMedia(q); } : function () { return { matches: false }; };
    var rmq = mm('(prefers-reduced-motion: reduce)'), dmq = mm('(prefers-color-scheme: dark)');
    S.reduce = !!rmq.matches;
    var raf = 0, last = 0, alive = true, onScreen = true, themeTimer = 0;
    function size(force) {
      var w = Math.round(root.clientWidth || 360);
      if (w === S.W && !force) return;
      S.W = w; S.H = Math.round(opts.height(w));
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(S.W * dpr); canvas.height = Math.round(S.H * dpr);
      canvas.style.height = S.H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (opts.onSize) opts.onSize();
      opts.draw();
      kick();
    }
    function frame(t) {
      raf = 0;
      if (!alive) return;
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      opts.step(dt);
      opts.draw();
      if (opts.busy()) kick(); else last = 0;
    }
    function kick() { if (!raf && alive && onScreen && !document.hidden) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
    var ro = new ResizeObserver(function () { size(false); });
    ro.observe(root);
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      onScreen = es[es.length - 1].isIntersecting;
      if (onScreen) kick(); else stop();
    }) : null;
    if (io) io.observe(root);
    function onVis() { if (document.hidden) stop(); else kick(); }
    function onTheme() {
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () {
        if (!alive) return;
        colourCache = {}; S.T = readTheme();
        if (opts.onTheme) opts.onTheme();
        opts.draw();
      }, 30);
    }
    function onMotion() { S.reduce = !!rmq.matches; opts.draw(); }
    function listen(q, f, on) {
      if (!q || !q.addEventListener && !q.addListener) return;
      if (q.addEventListener) q[on ? 'addEventListener' : 'removeEventListener']('change', f);
      else q[on ? 'addListener' : 'removeListener'](f);
    }
    document.addEventListener('visibilitychange', onVis);
    document.addEventListener('kls-theme', onTheme);
    listen(dmq, onTheme, true); listen(rmq, onMotion, true);
    S.size = size; S.kick = kick;
    S.destroy = function () {
      alive = false; stop(); clearTimeout(themeTimer);
      ro.disconnect(); if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      document.removeEventListener('kls-theme', onTheme);
      listen(dmq, onTheme, false); listen(rmq, onMotion, false);
    };
    return S;
  }
  function pointerPos(canvas, ev) {
    var r = canvas.getBoundingClientRect();
    return { x: ev.clientX - r.left, y: ev.clientY - r.top };
  }

  function sinc(x) { return Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x; }
  function fmtInt(n) { return n.toLocaleString('en-GB'); }

  function mount(el) {
    injectCss();
    var root = mk('div', 'sim sim-' + ID);
    var canvas = mk('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Particles are fired one at a time at two slits. Each lands as a single dot on a screen, and stripes slowly build up. A histogram under the screen counts where they land.');
    root.appendChild(canvas);
    var readout = mk('div', 'sim-readout');
    root.appendChild(readout);

    var st = {
      kind: 'photon', d: 0.25, lam: 550, closed: false, detector: false, predict: false,
      rate: 'slow', n: 0, left: 0, right: 0, lastHitY: null
    };
    var hitsY = new Float32Array(MAX_HITS), hitsV = new Float32Array(MAX_HITS), hitsS = new Int8Array(MAX_HITS);
    var bins = null, flights = [], flashes = [], nextShot = 0.4, slitFlash = [0, 0];

    /* ----- controls ----- */
    var presets = mk('div', 'sim-presets');
    var rateChips = {};
    [['pause', 'Paused'], ['slow', 'One at a time'], ['fast', 'Fast']].forEach(function (r) {
      rateChips[r[0]] = chip(r[1], st.rate === r[0], function () {
        st.rate = r[0];
        for (var k in rateChips) setChip(rateChips[k], k === st.rate);
        nextShot = 0.15; stage.kick();
      });
      presets.appendChild(rateChips[r[0]]);
    });
    var fireBtn = mk('button', 'btn small', 'Fire one'); fireBtn.type = 'button';
    fireBtn.addEventListener('click', function () { fire(true); stage.kick(); });
    var resetBtn = mk('button', 'btn small', 'Reset'); resetBtn.type = 'button';
    resetBtn.addEventListener('click', function () { clearScreen(); });
    presets.appendChild(fireBtn); presets.appendChild(resetBtn);
    root.appendChild(presets);

    var controls = mk('div', 'sim-controls');
    var selLab = mk('label', 'sim-control');
    selLab.appendChild(mk('span', 'sim-label', 'Fire'));
    var sel = mk('select');
    [['photon', 'Photons (light)'], ['electron', 'Electrons']].forEach(function (o) {
      var op = mk('option', null, o[1]); op.value = o[0]; sel.appendChild(op);
    });
    sel.addEventListener('change', function () { st.kind = sel.value; dR.set(st.d); lR.set(st.lam); clearScreen(); });
    selLab.appendChild(sel);
    var dR = rangeControl('Gap between the slits', 0.1, 0.6, 0.01, st.d, function (v) {
      return st.kind === 'photon' ? v.toFixed(2) + ' mm' : Math.round(v * 1000) + ' nm';
    }, function (v) { st.d = v; clearScreen(); });
    var lR = rangeControl('Wavelength', 400, 700, 5, st.lam, function (v) {
      if (st.kind === 'photon') return v + ' nm, ' + colourName(v);
      var nm = v * SCALE_E, eV = Math.pow(1.2264 / nm, 2);
      return nm.toFixed(2) + ' nm, electrons of ' + eV.toFixed(1) + ' eV';
    }, function (v) { st.lam = v; clearScreen(); });
    var row = mk('div', 'sim-row');
    var closeChip = chip('Close one slit', false, function () { st.closed = !st.closed; setChip(closeChip, st.closed); clearScreen(); });
    var detChip = chip('Which path detector', false, function () { st.detector = !st.detector; setChip(detChip, st.detector); clearScreen(); });
    var predChip = chip('Show prediction', false, function () { st.predict = !st.predict; setChip(predChip, st.predict); draw(); });
    row.appendChild(closeChip); row.appendChild(detChip); row.appendChild(predChip);
    controls.appendChild(selLab); controls.appendChild(dR.el); controls.appendChild(lR.el); controls.appendChild(row);
    root.appendChild(controls);
    el.appendChild(root);

    var L = null, layer = null, lctx = null, layerDpr = 1;
    var stage = makeStage(root, canvas, {
      height: function (w) { return w < 600 ? clamp(w * 0.95, 320, 360) : clamp(w * 0.46, 360, 420); },
      onSize: function () { layout(); rebuild(); },
      onTheme: rebuild,
      step: step, draw: draw,
      busy: function () { return st.rate !== 'pause' || flights.length > 0 || flashes.length > 0 || slitFlash[0] > 0 || slitFlash[1] > 0; }
    });
    var ctx = stage.ctx;

    /* ----- physics ----- */
    // intensity at screen position y (mm) through one slit centred at offset s (mm), or both
    function lamMM() { return st.lam * 1e-6; }   // the dimensionless pattern is identical for both particles
    function single(y, s) {
      var sn = (y - s) / Math.hypot(y - s, L_SCREEN);
      var b = Math.PI * SLIT_A * sn / lamMM();
      var v = sinc(b); return v * v;
    }
    function both(y) {
      var sn = y / Math.hypot(y, L_SCREEN);
      var b = Math.PI * SLIT_A * sn / lamMM(), dl = Math.PI * st.d * sn / lamMM();
      var v = sinc(b), c = Math.cos(dl);
      return c * c * v * v;
    }
    // probability density (unnormalised) for the current set up
    function density(y) {
      if (st.closed) return single(y, -st.d / 2);
      if (st.detector) return 0.5 * (single(y, -st.d / 2) + single(y, st.d / 2));
      return both(y);
    }
    // draw one landing position by rejection sampling (every density here is at most 1)
    function sampleFrom(fn) {
      for (var i = 0; i < 5000; i++) {
        var y = (Math.random() * 2 - 1) * Y_MAX;
        if (Math.random() < fn(y)) return y;
      }
      return 0;
    }
    function shoot() {
      var slit = -1;  // -1 unknown, 0 left, 1 right
      var y;
      if (st.closed) { slit = 0; y = sampleFrom(function (q) { return single(q, -st.d / 2); }); }
      else if (st.detector) {
        slit = Math.random() < 0.5 ? 0 : 1;
        var off = slit === 0 ? -st.d / 2 : st.d / 2;
        y = sampleFrom(function (q) { return single(q, off); });
      } else y = sampleFrom(both);
      return { y: y, v: Math.random(), slit: slit };
    }

    /* ----- layout ----- */
    function layout() {
      var W = stage.W, H = stage.H;
      var histH = Math.round(H * 0.22);
      var screenH = Math.round(H * 0.2);
      L = {
        cx: W / 2, srcY: 26,
        barY: Math.round(H * 0.25),
        scr: { x0: 14, x1: W - 14, y0: H - histH - screenH - 18, h: screenH },
        hist: { y0: H - histH - 8, h: histH }
      };
      L.slitGap = function () { return 24 + (st.d - 0.1) / 0.5 * Math.min(110, W * 0.3); };
      L.slitW = 7;
      var nb = clamp(Math.floor((L.scr.x1 - L.scr.x0) / 4), 60, 150);
      bins = new Float32Array(nb);
    }
    function xOf(ymm) { return L.cx + ymm / Y_MAX * (L.scr.x1 - L.scr.x0) / 2; }
    function binOf(ymm) { return Math.min(bins.length - 1, Math.max(0, Math.floor((ymm + Y_MAX) / (2 * Y_MAX) * bins.length))); }
    function slitX(i) { return L.cx + (i === 0 ? -1 : 1) * L.slitGap() / 2; }

    function dotColour() {
      if (st.kind === 'electron') return [140, 240, 222];
      var w = waveRGB(st.lam) || [255, 255, 255];
      // lift dark violets and reds a little so they read on the screen
      return [Math.min(255, w[0] + 40), Math.min(255, w[1] + 40), Math.min(255, w[2] + 40)];
    }
    function dotAlpha() { return clamp(28 / Math.sqrt(st.n + 1), 0.16, 0.9); }

    function rebuild() {
      if (!L) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      var w = Math.max(1, Math.round((L.scr.x1 - L.scr.x0) * dpr)), h = Math.max(1, Math.round(L.scr.h * dpr));
      if (!layer) { layer = document.createElement('canvas'); lctx = layer.getContext('2d'); }
      layer.width = w; layer.height = h; layerDpr = dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bins.fill(0);
      var a = dotAlpha(), col = dotColour();
      lctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a + ')';
      for (var i = 0; i < Math.min(st.n, MAX_HITS); i++) {
        bins[binOf(hitsY[i])]++;
        dot(hitsY[i], hitsV[i]);
      }
    }
    function dot(ymm, v) {
      var x = xOf(ymm) - L.scr.x0, y = 3 + v * (L.scr.h - 6);
      lctx.beginPath(); lctx.arc(x, y, st.n > 3000 ? 1 : 1.3, 0, 6.283); lctx.fill();
    }
    function land(h) {
      if (st.n < MAX_HITS) { hitsY[st.n] = h.y; hitsV[st.n] = h.v; hitsS[st.n] = h.slit; }
      st.n++;
      if (h.slit === 0) st.left++; else if (h.slit === 1) st.right++;
      bins[binOf(h.y)]++;
      var col = dotColour();
      lctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + dotAlpha() + ')';
      dot(h.y, h.v);
      if (st.rate !== 'fast') flashes.push({ y: h.y, v: h.v, t: 0 });
      st.lastHitY = h.y;
    }

    function clearScreen() {
      st.n = 0; st.left = 0; st.right = 0; st.lastHitY = null;
      flights.length = 0; flashes.length = 0;
      if (L) rebuild();
      updateReadout(); draw(); stage.kick();
    }

    function fire(manual) {
      if (!L) return;
      var h = shoot();
      if (st.rate === 'fast' && !manual) { land(h); return; }
      if (stage.reduce) {
        if (h.slit >= 0 && st.detector) slitFlash[h.slit] = 0.6;
        land(h); return;
      }
      flights.push({ h: h, t: 0 });
    }

    var readoutTimer = 0;
    function step(dt) {
      if (!L) return;
      if (st.rate !== 'pause') {
        var rate = st.rate === 'fast' ? 140 : 1.4;
        nextShot -= dt;
        var guard = 0;
        while (nextShot <= 0 && guard++ < 40) { fire(false); nextShot += st.rate === 'fast' ? 1 / rate : 1 / rate * (0.7 + 0.6 * Math.random()); }
      }
      for (var i = flights.length - 1; i >= 0; i--) {
        var f = flights[i], before = f.t;
        f.t += dt / 1.0;
        if (st.detector && f.h.slit >= 0 && before < 0.35 && f.t >= 0.35) slitFlash[f.h.slit] = 0.6;
        if (f.t >= 1) { land(f.h); flights.splice(i, 1); }
      }
      for (i = flashes.length - 1; i >= 0; i--) { flashes[i].t += dt / 0.7; if (flashes[i].t >= 1) flashes.splice(i, 1); }
      slitFlash[0] = Math.max(0, slitFlash[0] - dt); slitFlash[1] = Math.max(0, slitFlash[1] - dt);
      readoutTimer -= dt;
      if (readoutTimer <= 0) { updateReadout(); readoutTimer = 0.25; }
    }

    var lastText = '';
    function updateReadout() {
      var lines = [];
      var spacing = lamMM() * L_SCREEN / st.d;  // mm between bright stripes
      lines.push('Hits: ' + fmtInt(st.n) + (st.n >= MAX_HITS ? ' (screen full, dots no longer drawn)' : ''));
      if (st.closed) lines.push('One slit open: a single broad hump, no stripes');
      else if (st.detector) lines.push('Detector saw it go left ' + fmtInt(st.left) + ', right ' + fmtInt(st.right) + '. The stripes are gone');
      else lines.push('Both slits open, nobody looking: stripes ' + spacing.toFixed(1) + ' mm apart');
      if (st.kind === 'electron') lines.push('Electron slits are 40 nm wide, ' + Math.round(st.d * 1000) + ' nm apart, screen 1 m away');
      else lines.push('Light slits are 0.04 mm wide, ' + st.d.toFixed(2) + ' mm apart, screen 1 m away');
      var t = lines.join('\n');
      if (t !== lastText) { readout.textContent = t; lastText = t; }
    }

    /* ----- drawing ----- */
    function draw() {
      if (!L) return;
      var T = stage.T, c = ctx, W = stage.W, H = stage.H;
      var col = dotColour(), colS = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
      c.clearRect(0, 0, W, H);
      roundRect(c, 0.5, 0.5, W - 1, H - 1, 12);
      c.fillStyle = T.stage; c.fill();

      // source
      c.fillStyle = 'rgba(232,240,238,0.14)';
      roundRect(c, L.cx - 22, L.srcY - 12, 44, 20, 6); c.fill();
      c.fillStyle = colS; c.beginPath(); c.arc(L.cx, L.srcY + 8, 3, 0, 6.283); c.fill();
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText(st.kind === 'photon' ? 'very dim light source' : 'electron gun', L.cx + 30, L.srcY - 2);

      // barrier with slits
      var by = L.barY, sw = L.slitW, x0 = slitX(0), x1 = slitX(1);
      c.fillStyle = 'rgba(200,210,210,0.55)';
      c.fillRect(L.scr.x0, by - 3, x0 - sw / 2 - L.scr.x0, 6);
      c.fillRect(x0 + sw / 2, by - 3, x1 - x0 - sw, 6);
      c.fillRect(x1 + sw / 2, by - 3, L.scr.x1 - x1 - sw / 2, 6);
      if (st.closed) { c.fillStyle = 'rgba(200,210,210,0.9)'; c.fillRect(x1 - sw / 2 - 1, by - 5, sw + 2, 10); }
      // detectors beside each slit
      if (st.detector) {
        for (var i = 0; i < 2; i++) {
          if (st.closed && i === 1) continue;
          var sx = slitX(i), on = slitFlash[i] > 0, k = on ? slitFlash[i] / 0.6 : 0;
          c.fillStyle = on ? 'rgba(232,190,90,' + (0.4 + 0.6 * k) + ')' : 'rgba(232,190,90,0.35)';
          c.beginPath(); c.arc(sx + (i === 0 ? -14 : 14), by - 12, on ? 5 : 3.5, 0, 6.283); c.fill();
        }
        c.font = '10px ' + T.body; c.fillStyle = T.gold; c.textAlign = 'right'; c.textBaseline = 'middle';
        c.fillText('detectors', x0 - 26, by - 12);
      }

      // particles in flight
      for (i = 0; i < flights.length; i++) drawFlight(flights[i], colS);

      // screen
      var S = L.scr;
      c.fillStyle = '#05090a';
      roundRect(c, S.x0, S.y0, S.x1 - S.x0, S.h, 4); c.fill();
      if (layer) c.drawImage(layer, 0, 0, layer.width, layer.height, S.x0, S.y0, S.x1 - S.x0, S.h);
      for (i = 0; i < flashes.length; i++) {
        var fl = flashes[i], fx = xOf(fl.y), fy = S.y0 + 3 + fl.v * (S.h - 6);
        c.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (1 - fl.t) + ')';
        c.lineWidth = 1.5;
        c.beginPath(); c.arc(fx, fy, 3 + (stage.reduce ? 2 : 9 * fl.t), 0, 6.283); c.stroke();
      }
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'bottom';
      c.fillText('screen', S.x0 + 2, S.y0 - 3);

      drawHistogram(T);
    }

    function drawFlight(f, colS) {
      var c = ctx, t = f.t, h = f.h, sy = L.srcY + 8, by = L.barY, ty = L.scr.y0 + 3 + h.v * (L.scr.h - 6), tx = xOf(h.y);
      var see = st.detector || st.closed;
      if (see) {
        // a particle with a known path: a dot through one slit
        var sx = slitX(h.slit), x, y;
        if (t < 0.35) { var u = t / 0.35; x = L.cx + (sx - L.cx) * u; y = sy + (by - sy) * u; }
        else { var v = (t - 0.35) / 0.65; x = sx + (tx - sx) * v; y = by + (ty - by) * v; }
        c.fillStyle = colS; c.beginPath(); c.arc(x, y, 3, 0, 6.283); c.fill();
        return;
      }
      // no path information: a spreading wave through both slits, then one dot appears
      var col = dotColour();
      if (t < 0.35) {
        var r = (t / 0.35) * (by - sy);
        c.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.55)';
        c.lineWidth = 1.4;
        c.beginPath(); c.arc(L.cx, sy, Math.max(1, r), Math.PI * 0.2, Math.PI * 0.8); c.stroke();
      } else {
        var k = (t - 0.35) / 0.65, rr = k * (ty - by + 30);
        c.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.55 * (1 - k * 0.6)) + ')';
        c.lineWidth = 1.2;
        for (var i = 0; i < 2; i++) {
          c.beginPath(); c.arc(slitX(i), by, Math.max(1, rr), Math.PI * 0.08, Math.PI * 0.92); c.stroke();
        }
      }
    }

    function drawHistogram(T) {
      var c = ctx, Hh = L.hist, S = L.scr, nb = bins.length, bw = (S.x1 - S.x0) / nb;
      var maxB = 0, i;
      for (i = 0; i < nb; i++) if (bins[i] > maxB) maxB = bins[i];
      // predicted counts per bin
      var pred = null, maxP = 0;
      if (st.predict) {
        pred = new Float32Array(nb); var sum = 0;
        for (i = 0; i < nb; i++) {
          var a = -Y_MAX + (i + 0.5) / nb * 2 * Y_MAX, s = 0;
          for (var k = -1.5; k <= 1.5; k += 1) s += density(a + k / 4 * (2 * Y_MAX / nb));
          pred[i] = s; sum += s;
        }
        for (i = 0; i < nb; i++) { pred[i] = pred[i] / sum * Math.max(st.n, 1); if (pred[i] > maxP) maxP = pred[i]; }
      }
      var top = Math.max(maxB, st.predict ? maxP : 0, 4) * 1.08;
      c.strokeStyle = T.stageLine; c.lineWidth = 1;
      c.beginPath(); c.moveTo(S.x0, Hh.y0 + Hh.h + 0.5); c.lineTo(S.x1, Hh.y0 + Hh.h + 0.5); c.stroke();
      c.fillStyle = 'rgba(110,225,205,0.75)';
      for (i = 0; i < nb; i++) {
        if (!bins[i]) continue;
        var bh = bins[i] / top * Hh.h;
        c.fillRect(S.x0 + i * bw + 0.3, Hh.y0 + Hh.h - bh, Math.max(1, bw - 0.6), bh);
      }
      if (pred) {
        c.strokeStyle = T.gold; c.lineWidth = 1.6; c.beginPath();
        for (i = 0; i < nb; i++) {
          var x = S.x0 + (i + 0.5) * bw, y = Hh.y0 + Hh.h - pred[i] / top * Hh.h;
          if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.stroke();
      }
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText('where they landed', S.x0 + 2, Hh.y0 - 2);
      if (pred) { c.fillStyle = T.gold; c.textAlign = 'right'; c.fillText('quantum prediction', S.x1 - 2, Hh.y0 - 2); }
    }

    /* ----- input: tap the canvas to fire one ----- */
    function onDown(ev) {
      var p = pointerPos(canvas, ev);
      if (L && p.y < L.scr.y0) { fire(true); stage.kick(); }
    }
    canvas.addEventListener('pointerdown', onDown);

    stage.size(true);
    updateReadout();

    return {
      destroy: function () {
        stage.destroy();
        canvas.removeEventListener('pointerdown', onDown);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'The double slit, one at a time',
    blurb: 'Fire single particles at two slits. Each one lands as a single dot, yet together they paint stripes that only a wave could make.',
    try: [
      'Watch a few dots arrive one at a time. Each lands somewhere unpredictable. Then switch to Fast.',
      'Turn on the which path detector. Knowing which slit each particle used wipes out the stripes.',
      'Close one slit. Opening a second slit makes some places on the screen receive fewer hits, not more.',
      'Switch to electrons. Matter gives exactly the same stripes as light.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
