/* Kelly's Learning Studio: single photons through polarising filters.
   A photon meets a filter at angle difference d and passes with probability cos^2(d)
   (Malus's law, one photon at a time). If it passes, its polarisation is now the
   filter's angle: the measurement has changed its state. Unpolarised light is a
   random mixture, so the first filter passes half. */
(function (g) {
  'use strict';
  var ID = 'polarisers';
  var EXTRA_CSS = '';

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

  var DEG = Math.PI / 180;
  function mod180(a) { a = a % 180; return a < 0 ? a + 180 : a; }
  function passChance(a, b) { var c = Math.cos((a - b) * DEG); return c * c; }
  function pct(x) { var v = Math.round(x * 1000) / 10; return (v % 1 ? v.toFixed(1) : String(v)) + '%'; }

  function mount(el) {
    injectCss();
    var root = mk('div', 'sim sim-' + ID);
    var canvas = mk('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Single photons travel left to right through up to three polarising filters. Each photon shows its polarisation as a small tick. A detector on the right counts the photons that get through.');
    root.appendChild(canvas);
    var readout = mk('div', 'sim-readout');
    root.appendChild(readout);

    var st = {
      on: [true, false, true], ang: [0, 45, 90], rate: 'slow',
      sent: 0, arrived: 0, absorbed: 0, reached: [0, 0, 0], passed: [0, 0, 0], detFlash: 0
    };
    var photons = [], puffs = [], nextShot = 0.2;

    /* ----- controls ----- */
    var presets = mk('div', 'sim-presets');
    var PRE = [
      ['One filter', [true, false, false], [0, 45, 90]],
      ['Two crossed: 0° and 90°', [true, false, true], [0, 45, 90]],
      ['Add 45° between them', [true, true, true], [0, 45, 90]]
    ];
    PRE.forEach(function (p) {
      var b = mk('button', 'chip', p[0]); b.type = 'button';
      b.addEventListener('click', function () {
        for (var i = 0; i < 3; i++) { st.on[i] = p[1][i]; st.ang[i] = p[2][i]; }
        syncControls(); changed();
      });
      presets.appendChild(b);
    });
    root.appendChild(presets);

    var controls = mk('div', 'sim-controls');
    var rateRow = mk('div', 'sim-row');
    var rateChips = {};
    [['pause', 'Paused'], ['slow', 'One at a time'], ['fast', 'Fast']].forEach(function (r) {
      rateChips[r[0]] = chip(r[1], st.rate === r[0], function () {
        st.rate = r[0];
        for (var k in rateChips) setChip(rateChips[k], k === st.rate);
        nextShot = 0.1; stage.kick();
      });
      rateRow.appendChild(rateChips[r[0]]);
    });
    var resetBtn = mk('button', 'btn small', 'Reset counts'); resetBtn.type = 'button';
    resetBtn.addEventListener('click', function () { changed(); });
    rateRow.appendChild(resetBtn);
    var filterRow = mk('div', 'sim-row');
    var filterChips = [], sliders = [];
    for (var i = 0; i < 3; i++) (function (i) {
      filterChips[i] = chip('Filter ' + (i + 1), st.on[i], function () { st.on[i] = !st.on[i]; syncControls(); changed(); });
      filterRow.appendChild(filterChips[i]);
      sliders[i] = rangeControl('Filter ' + (i + 1) + ' angle', 0, 180, 1, st.ang[i], function (v) { return v + '°'; },
        function (v) { st.ang[i] = v; changed(); });
    })(i);
    controls.appendChild(filterRow);
    sliders.forEach(function (s) { controls.appendChild(s.el); });
    controls.appendChild(rateRow);
    root.appendChild(controls);
    el.appendChild(root);

    function syncControls() {
      for (var i = 0; i < 3; i++) {
        setChip(filterChips[i], st.on[i]);
        sliders[i].set(st.ang[i]);
        sliders[i].el.style.opacity = st.on[i] ? '' : '0.55';
      }
    }

    var L = null;
    var stage = makeStage(root, canvas, {
      height: function (w) { return w < 600 ? clamp(w * 0.72, 260, 290) : clamp(w * 0.34, 290, 330); },
      onSize: layout, step: step, draw: draw,
      busy: function () { return st.rate !== 'pause' || photons.length > 0 || puffs.length > 0 || st.detFlash > 0; }
    });
    var ctx = stage.ctx;

    function layout() {
      var W = stage.W, H = stage.H;
      var R = clamp(Math.min(W * 0.085, H * 0.16), 24, 50);
      L = {
        y: Math.round(H * 0.42), R: R,
        src: W * 0.065, det: W - Math.max(30, W * 0.065),
        fx: [W * 0.3, W * 0.515, W * 0.73]
      };
    }

    function prediction() {
      var p = 0.5, prev = null;
      for (var i = 0; i < 3; i++) {
        if (!st.on[i]) continue;
        if (prev !== null) p *= passChance(prev, st.ang[i]);
        prev = st.ang[i];
      }
      return prev === null ? 1 : p;
    }
    function chances() {
      var out = [], prev = null;
      for (var i = 0; i < 3; i++) {
        if (!st.on[i]) continue;
        out.push(prev === null ? 0.5 : passChance(prev, st.ang[i]));
        prev = st.ang[i];
      }
      return out;
    }

    function changed() {
      st.sent = 0; st.arrived = 0; st.absorbed = 0; st.reached = [0, 0, 0]; st.passed = [0, 0, 0];
      photons.length = 0; puffs.length = 0;
      updateReadout(); draw(); stage.kick();
    }

    function emit() {
      st.sent++;
      photons.push({ x: L.src + 10, pol: Math.random() * 180, next: 0, turn: 0, from: 0 });
    }

    var readoutTimer = 0;
    function step(dt) {
      if (!L) return;
      if (st.rate !== 'pause') {
        var rate = st.rate === 'fast' ? 30 : 2.5;
        nextShot -= dt;
        var guard = 0;
        while (nextShot <= 0 && guard++ < 20) { emit(); nextShot += expWait(rate); }
      }
      var v = stage.W * (st.rate === 'fast' ? 0.42 : 0.3);
      for (var i = photons.length - 1; i >= 0; i--) {
        var p = photons[i];
        p.x += v * dt;
        if (p.turn > 0) p.turn = Math.max(0, p.turn - dt / 0.25);
        // reach the next filter
        while (p.next < 3 && (!st.on[p.next] || p.x >= L.fx[p.next])) {
          if (st.on[p.next]) {
            var k = p.next;
            st.reached[k]++;
            if (Math.random() < passChance(p.pol, st.ang[k])) {
              st.passed[k]++;
              p.from = p.pol; p.pol = st.ang[k]; p.turn = stage.reduce ? 0 : 1;
            } else {
              st.absorbed++;
              if (!stage.reduce) puffs.push({ x: L.fx[k], pol: p.pol, t: 0 });
              photons.splice(i, 1); p = null; break;
            }
          }
          p.next++;
        }
        if (!p) continue;
        if (p.x >= L.det) { st.arrived++; st.detFlash = 1; photons.splice(i, 1); }
      }
      for (i = puffs.length - 1; i >= 0; i--) { puffs[i].t += dt / 0.5; if (puffs[i].t >= 1) puffs.splice(i, 1); }
      st.detFlash = Math.max(0, st.detFlash - dt / 0.3);
      readoutTimer -= dt;
      if (readoutTimer <= 0) { updateReadout(); readoutTimer = 0.2; }
    }

    var lastText = '';
    function updateReadout() {
      var pred = prediction(), ch = chances();
      var lines = [];
      var done = st.arrived + st.absorbed;
      lines.push('Photons finished: ' + done + '. Reached the detector: ' + st.arrived + (done ? ' (' + pct(st.arrived / done) + ')' : '') + '. Prediction: ' + pct(pred));
      if (ch.length) lines.push('Chance of passing each filter in turn: ' + ch.map(pct).join(', '));
      else lines.push('No filters: every photon arrives');
      var t = lines.join('\n');
      if (t !== lastText) { readout.textContent = t; lastText = t; }
    }

    /* ----- drawing ----- */
    function tick(c, x, y, ang, len, col, w) {
      var s = Math.sin(ang * DEG) * len, k = -Math.cos(ang * DEG) * len;
      c.strokeStyle = col; c.lineWidth = w || 2; c.lineCap = 'round';
      c.beginPath(); c.moveTo(x - s, y - k); c.lineTo(x + s, y + k); c.stroke();
    }

    function draw() {
      if (!L) return;
      var T = stage.T, c = ctx, W = stage.W, H = stage.H, y = L.y, R = L.R, i;
      c.clearRect(0, 0, W, H);
      roundRect(c, 0.5, 0.5, W - 1, H - 1, 12);
      c.fillStyle = T.stage; c.fill();

      // beam line
      c.strokeStyle = 'rgba(232,240,238,0.12)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(L.src, y + 0.5); c.lineTo(L.det, y + 0.5); c.stroke();

      // source
      c.fillStyle = 'rgba(255,236,190,0.9)';
      c.beginPath(); c.arc(L.src, y, 6, 0, 6.283); c.fill();
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'center'; c.textBaseline = 'top';
      c.fillText('lamp', L.src, y + R + 10);
      c.fillText('unpolarised', L.src + 6, y + R + 23);

      // filters
      for (i = 0; i < 3; i++) {
        var fx = L.fx[i];
        if (!st.on[i]) {
          c.strokeStyle = 'rgba(232,240,238,0.16)'; c.setLineDash([3, 4]); c.lineWidth = 1;
          c.beginPath(); c.arc(fx, y, R, 0, 6.283); c.stroke(); c.setLineDash([]);
          c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillText('tap to add', fx, y - R - 12);
          continue;
        }
        c.save();
        c.beginPath(); c.arc(fx, y, R, 0, 6.283);
        c.fillStyle = 'rgba(120,200,190,0.10)'; c.fill();
        c.clip();
        // polaroid grain: lines along the transmission axis
        var a = st.ang[i] * DEG, ux = Math.sin(a), uy = -Math.cos(a), nx = -uy, ny = ux;
        c.strokeStyle = 'rgba(150,230,215,0.16)'; c.lineWidth = 1;
        for (var o = -R; o <= R; o += 5) {
          c.beginPath(); c.moveTo(fx + nx * o - ux * R, y + ny * o - uy * R); c.lineTo(fx + nx * o + ux * R, y + ny * o + uy * R); c.stroke();
        }
        c.restore();
        c.strokeStyle = 'rgba(150,230,215,0.6)'; c.lineWidth = 1.5;
        c.beginPath(); c.arc(fx, y, R, 0, 6.283); c.stroke();
        tick(c, fx, y, st.ang[i], R - 4, T.gold, 2.5);
        // drag handle
        c.fillStyle = T.gold;
        c.beginPath(); c.arc(fx + ux * (R - 4), y + uy * (R - 4), 4.5, 0, 6.283); c.fill();
        c.font = '12px ' + T.mono; c.fillStyle = T.stageInk; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(st.ang[i] + '°', fx, y - R - 12);
        if (st.reached[i]) {
          c.font = '10px ' + T.mono; c.fillStyle = T.stageMuted; c.textBaseline = 'top';
          c.fillText(pct(st.passed[i] / st.reached[i]) + ' pass', fx, y + R + 10);
        }
      }
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText('Drag a filter to turn it', 12, 10);

      // measured share against the prediction
      var bx = 14, bw = W - 28, by = H - 26, done = st.arrived + st.absorbed, pred = prediction();
      c.fillStyle = 'rgba(232,240,238,0.1)';
      roundRect(c, bx, by, bw, 8, 4); c.fill();
      if (done) {
        c.fillStyle = 'rgba(110,225,205,0.85)';
        roundRect(c, bx, by, Math.max(4, bw * st.arrived / done), 8, 4); c.fill();
      }
      c.fillStyle = T.gold;
      c.fillRect(bx + bw * pred - 1, by - 4, 2, 16);
      c.font = '10px ' + T.body; c.textBaseline = 'bottom'; c.textAlign = 'left'; c.fillStyle = T.stageInk;
      c.fillText('Reaching the detector: ' + (done ? pct(st.arrived / done) : 'waiting'), bx, by - 6);
      c.textAlign = 'right'; c.fillStyle = T.gold;
      c.fillText('prediction ' + pct(pred), bx + bw, by - 6);

      // absorbed photons
      for (i = 0; i < puffs.length; i++) {
        var pf = puffs[i];
        c.fillStyle = 'rgba(255,236,190,' + (0.6 * (1 - pf.t)) + ')';
        c.beginPath(); c.arc(pf.x - 4, y, 3 + 5 * pf.t, 0, 6.283); c.fill();
      }
      // photons in flight
      for (i = 0; i < photons.length; i++) {
        var p = photons[i];
        var ang = p.turn > 0 ? p.pol + (shortest(p.from, p.pol)) * -p.turn : p.pol;
        tick(c, p.x, y, ang, 8, T.gold, 2);
        c.fillStyle = 'rgba(255,240,205,0.95)';
        c.beginPath(); c.arc(p.x, y, 3, 0, 6.283); c.fill();
      }

      // detector
      var dx = L.det, f = st.detFlash;
      c.fillStyle = f > 0 ? 'rgba(110,225,205,' + (0.25 + 0.55 * f) + ')' : 'rgba(232,240,238,0.12)';
      roundRect(c, dx - 7, y - 18, 16, 36, 4); c.fill();
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'center'; c.textBaseline = 'top';
      c.fillText('detector', dx, y + R + 10);
      c.font = '13px ' + T.mono; c.fillStyle = T.stageInk; c.textBaseline = 'bottom';
      c.fillText(String(st.arrived), dx, y - 24);
    }
    function shortest(from, to) {   // signed angle from 'to' back to 'from', within plus or minus 90 degrees
      var d = from - to;
      while (d > 90) d -= 180;
      while (d < -90) d += 180;
      return -d;
    }

    /* ----- input: drag a filter to rotate it, tap an empty slot to add one ----- */
    var drag = -1;
    function hitFilter(p) {
      for (var i = 0; i < 3; i++) if (Math.hypot(p.x - L.fx[i], p.y - L.y) <= L.R + 14) return i;
      return -1;
    }
    function setAngle(i, p) {
      var a = Math.atan2(p.x - L.fx[i], -(p.y - L.y)) / DEG;
      a = Math.round(mod180(a));
      for (var s = 0; s <= 180; s += 15) if (Math.abs(a - s) <= 2) a = s;
      if (a === 180) a = 0;
      if (a !== st.ang[i]) { st.ang[i] = a; sliders[i].set(a); changed(); }
    }
    function onDown(ev) {
      if (!L) return;
      var p = pointerPos(canvas, ev), i = hitFilter(p);
      if (i < 0) return;
      if (!st.on[i]) { st.on[i] = true; syncControls(); changed(); return; }
      if (Math.hypot(p.x - L.fx[i], p.y - L.y) < 6) return;
      drag = i;
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      setAngle(i, p);
    }
    function onMove(ev) { if (drag >= 0) setAngle(drag, pointerPos(canvas, ev)); }
    function onUp() { drag = -1; }
    // stop the page scrolling only when a touch starts on a filter
    function onTouchStart(ev) {
      if (!L || !ev.touches.length) return;
      var r = canvas.getBoundingClientRect(), t = ev.touches[0];
      if (hitFilter({ x: t.clientX - r.left, y: t.clientY - r.top }) >= 0) ev.preventDefault();
    }
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });

    syncControls();
    stage.size(true);
    updateReadout();

    return {
      destroy: function () {
        stage.destroy();
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        canvas.removeEventListener('touchstart', onTouchStart);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'Polarisers, one photon at a time',
    blurb: 'Each filter asks a photon a yes or no question. The answer is random, and asking it changes the photon.',
    try: [
      'Start with two crossed filters at 0° and 90°. Nothing reaches the detector.',
      'Add a third filter at 45° in between. Adding a filter lets light through: about one photon in eight.',
      'Watch the ticks. A photon that gets past a filter always leaves lined up with that filter, whatever it was before.',
      'Turn one filter slowly. At 30° apart three quarters pass, at 60° a quarter, at 90° none.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
