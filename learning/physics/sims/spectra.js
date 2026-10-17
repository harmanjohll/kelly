/* Kelly's Learning Studio: hydrogen spectrum simulation.
   Bohr energy levels E = -13.6 / n^2 eV. Each drop between two levels releases one
   photon whose energy is exactly the gap, so only particular wavelengths appear. */
(function (g) {
  'use strict';
  var ID = 'spectra';
  var EXTRA_CSS = '';
  var NMAX = 6;
  var RY = 13.6057;                 // eV
  var LAMBDA_K = 91.1763;           // nm: 1 / Rydberg constant for hydrogen (vacuum wavelengths)
  // Einstein A coefficients for hydrogen, n to m, in units of 1e8 per second (NIST, averaged over sublevels).
  // Used only as branching ratios: which lower level the electron is likely to drop to.
  var A = {
    2: { 1: 4.699 },
    3: { 1: 0.5575, 2: 0.4410 },
    4: { 1: 0.1278, 2: 0.08419, 3: 0.08986 },
    5: { 1: 0.04125, 2: 0.02530, 3: 0.02201, 4: 0.02699 },
    6: { 1: 0.01644, 2: 0.009732, 3: 0.007783, 4: 0.007703, 5: 0.01050 }
  };
  var SERIES = { 1: 'Lyman', 2: 'Balmer', 3: 'Paschen', 4: 'Brackett', 5: 'Pfund' };
  // stretched spacing so every level is easy to tap; the true spacing is one tap away
  var STRETCH = [0, 0, 0.40, 0.60, 0.74, 0.86, 0.95];

  function energy(n) { return -RY / (n * n); }
  function wavelength(m, n) { return LAMBDA_K / (1 / (m * m) - 1 / (n * n)); }

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

  function mount(el) {
    injectCss();
    var root = mk('div', 'sim sim-' + ID);
    var canvas = mk('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Energy ladder of a hydrogen atom. Tap a level to lift the electron; as it falls back it gives out photons that add bright lines to a spectrum.');
    root.appendChild(canvas);
    var readout = mk('div', 'sim-readout');
    root.appendChild(readout);

    var st = {
      level: 1, from: 1, moveT: 1, dwell: 0, glow: false, rainbow: false, trueScale: false, scaleMix: 0,
      counts: {}, flashes: {}, total: 0, last: null, glowWait: 0
    };
    var photons = [], arrows = [];

    var presets = mk('div', 'sim-presets');
    var pre3 = mk('button', 'chip', 'Lift to level 3'); pre3.type = 'button';
    pre3.addEventListener('click', function () { if (st.moveT >= 1) { excite(3); } });
    var glowChip = chip('Keep it glowing', false, function () { st.glow = !st.glow; setChip(glowChip, st.glow); stage.kick(); });
    var rainbowChip = chip('Compare with a rainbow', false, function () { st.rainbow = !st.rainbow; setChip(rainbowChip, st.rainbow); layout(); stage.kick(); draw(); });
    presets.appendChild(pre3); presets.appendChild(glowChip); presets.appendChild(rainbowChip);
    root.appendChild(presets);

    var controls = mk('div', 'sim-controls');
    var row = mk('div', 'sim-row');
    var scaleChip = chip('True spacing', false, function () { st.trueScale = !st.trueScale; setChip(scaleChip, st.trueScale); stage.kick(); });
    var clearBtn = mk('button', 'btn small', 'Clear lines'); clearBtn.type = 'button';
    clearBtn.addEventListener('click', function () { st.counts = {}; st.total = 0; st.last = null; updateReadout(); draw(); });
    row.appendChild(scaleChip); row.appendChild(clearBtn);
    controls.appendChild(row);
    root.appendChild(controls);
    el.appendChild(root);

    var L = null;
    var stage = makeStage(root, canvas, {
      height: function (w) { return w < 600 ? clamp(w * 0.95, 320, 360) : clamp(w * 0.5, 360, 420); },
      onSize: layout, step: step, draw: draw,
      busy: function () { return st.glow || photons.length > 0 || arrows.length > 0 || st.moveT < 1 || st.level > 1 || Math.abs(st.scaleMix - (st.trueScale ? 1 : 0)) > 0.001 || Object.keys(st.flashes).length > 0; }
    });
    var ctx = stage.ctx;

    function layout() {
      var W = stage.W, H = stage.H;
      var stripH = 22;
      var hy = H - 40;                       // hydrogen strip top
      var ry = hy - stripH - 26;             // rainbow strip top
      var ladderBottom = (st.rainbow ? ry : hy) - 46;
      var lx0 = 64, lx1 = Math.min(W - 96, lx0 + 400);
      var legend = W - lx1 - 96 >= 190 ? { x: lx1 + 110, y: 34 } : null;
      L = {
        lx0: lx0, lx1: lx1, ex: lx0 + (lx1 - lx0) * 0.5,
        top: 34, bottom: ladderBottom,
        strip: { x0: 14, x1: W - 14, hy: hy, ry: ry, h: stripH },
        legend: legend
      };
      var w = L.strip.x1 - L.strip.x0;
      L.seg = {
        uv: [L.strip.x0, L.strip.x0 + w * 0.13],
        vis: [L.strip.x0 + w * 0.15, L.strip.x0 + w * 0.85],
        ir: [L.strip.x0 + w * 0.87, L.strip.x1]
      };
    }

    // y position of a level, blending stretched and true spacing
    function levelY(n) {
      var fStretch = STRETCH[n];
      var fTrue = (energy(n) - energy(1)) / (0 - energy(1));
      var f = fStretch + (fTrue - fStretch) * ease(st.scaleMix);
      return L.bottom - f * (L.bottom - L.top) / 1.0 * 0.96;
    }
    function zeroY() { return L.bottom - (L.bottom - L.top) * 0.96 * 1.0 - 0.0; }
    function ease(t) { return t * t * (3 - 2 * t); }

    // wavelength to x on the strip: UV segment (88 to 128 nm), visible (380 to 750 nm, linear), IR (900 to 8000 nm, log)
    function stripX(nm) {
      var s = L.seg;
      if (nm < 380) return s.uv[0] + (nm - 88) / 40 * (s.uv[1] - s.uv[0]);
      if (nm <= 750) return s.vis[0] + (nm - 380) / 370 * (s.vis[1] - s.vis[0]);
      return s.ir[0] + Math.log(nm / 900) / Math.log(8000 / 900) * (s.ir[1] - s.ir[0]);
    }

    function excite(n) {
      if (n <= st.level) return;
      arrows.push({ from: st.level, to: n, age: 0, up: true });
      moveTo(n);
      st.dwell = st.glow ? 0.3 : 1.1;
      updateReadout();
      stage.kick();
    }
    function moveTo(n) { st.from = st.level; st.level = n; st.moveT = stage.reduce ? 1 : 0; }
    function drop(m) {
      var n = st.level;
      var nm = wavelength(m, n), key = m + ':' + n;
      arrows.push({ from: n, to: m, age: 0, up: false, nm: nm });
      var y0 = levelY(n), y1 = levelY(m);
      moveTo(m);
      st.last = { m: m, n: n, nm: nm, e: energy(n) - energy(m) };
      if (stage.reduce) arrive(key);
      else photons.push({ x0: L.ex + 14, y0: (y0 + y1) / 2, x1: stripX(nm), y1: L.strip.hy + L.strip.h / 2, t: 0, nm: nm, key: key });
      st.dwell = st.glow ? 0.25 : 1.0;
      updateReadout();
      stage.kick();
    }
    function arrive(key) {
      st.counts[key] = (st.counts[key] || 0) + 1;
      st.total++;
      st.flashes[key] = 1;
      updateReadout();
    }
    function chooseLower(n) {
      var row = A[n], sum = 0, m;
      for (m in row) sum += row[m];
      var r = Math.random() * sum;
      for (m in row) { r -= row[m]; if (r <= 0) return +m; }
      return 1;
    }

    function step(dt) {
      var target = st.trueScale ? 1 : 0;
      if (st.scaleMix !== target) {
        var d = stage.reduce ? 1 : dt / 0.45;
        st.scaleMix = target > st.scaleMix ? Math.min(target, st.scaleMix + d) : Math.max(target, st.scaleMix - d);
      }
      if (st.moveT < 1) st.moveT = Math.min(1, st.moveT + dt / 0.3);
      else if (st.level > 1) {
        st.dwell -= dt;
        if (st.dwell <= 0) drop(chooseLower(st.level));
      } else if (st.glow) {
        st.glowWait -= dt;
        if (st.glowWait <= 0) { excite(2 + Math.floor(Math.random() * (NMAX - 1))); st.glowWait = 0.25; }
      }
      for (var i = photons.length - 1; i >= 0; i--) {
        var p = photons[i];
        p.t += dt / 0.85;
        if (p.t >= 1) { arrive(p.key); photons.splice(i, 1); }
      }
      for (i = arrows.length - 1; i >= 0; i--) { arrows[i].age += dt; if (arrows[i].age > 1.6) arrows.splice(i, 1); }
      for (var k in st.flashes) { st.flashes[k] -= dt / 0.8; if (st.flashes[k] <= 0) delete st.flashes[k]; }
    }

    function updateReadout() {
      var lines = [];
      if (st.last) {
        var l = st.last, band = l.nm < 380 ? 'ultraviolet, invisible' : l.nm > 750 ? 'infrared, invisible' : colourName(l.nm);
        lines.push('Last photon: level ' + l.n + ' to ' + l.m + ', ' + l.e.toFixed(2) + ' eV, ' + Math.round(l.nm) + ' nm (' + band + ')');
        lines.push(SERIES[l.m] + ' series: every drop that ends on level ' + l.m);
      } else {
        lines.push('Tap a higher level to give the electron energy.');
        lines.push('Only 15 different drops are possible between these six levels.');
      }
      var kinds = Object.keys(st.counts).length;
      lines.push('Photons caught: ' + st.total + '. Different lines: ' + kinds + ' of 15');
      readout.textContent = lines.join('\n');
    }

    /* ---------- drawing ---------- */
    function draw() {
      if (!L) return;
      var T = stage.T, c = ctx, W = stage.W, H = stage.H;
      c.clearRect(0, 0, W, H);
      roundRect(c, 0.5, 0.5, W - 1, H - 1, 12);
      c.fillStyle = T.stage; c.fill();

      // free electron line at zero energy
      var zy = zeroY();
      c.strokeStyle = T.stageLine; c.setLineDash([3, 4]); c.lineWidth = 1;
      c.beginPath(); c.moveTo(L.lx0, zy); c.lineTo(L.lx1, zy); c.stroke(); c.setLineDash([]);
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textBaseline = 'bottom'; c.textAlign = 'left';
      c.fillText('0 eV: the electron breaks free', L.lx0, zy - 4);

      // levels
      var lastLabelY = 1e9;
      var cur = st.level;
      for (var n = 1; n <= NMAX; n++) {
        var y = Math.round(levelY(n)) + 0.5;
        var on = n === cur && st.moveT >= 1;
        c.strokeStyle = on ? 'rgba(110,225,205,0.95)' : 'rgba(232,240,238,0.42)';
        c.lineWidth = on ? 2 : 1.4;
        c.beginPath(); c.moveTo(L.lx0, y); c.lineTo(L.lx1, y); c.stroke();
        if (lastLabelY - y >= 11) {
          c.font = '11px ' + T.mono; c.textBaseline = 'middle';
          c.fillStyle = on ? 'rgba(150,240,225,1)' : T.stageInk; c.textAlign = 'right';
          c.fillText('n=' + n, L.lx0 - 10, y);
          c.fillStyle = T.stageMuted; c.textAlign = 'left';
          c.fillText('−' + (RY / (n * n)).toFixed(2) + ' eV', L.lx1 + 8, y);
          lastLabelY = y;
        }
      }

      // transition arrows, fading
      for (var i = 0; i < arrows.length; i++) {
        var a = arrows[i], k = Math.max(0, 1 - a.age / 1.6);
        var ax = L.ex - 26 - (a.up ? 0 : 0);
        var ya = levelY(a.from), yb = levelY(a.to);
        var col = a.up ? rgba(T.gold, 0.85 * k) : lightColour(a.nm, 0.85 * k);
        c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 2;
        var x = a.up ? L.ex - 30 : L.ex + 30;
        c.beginPath(); c.moveTo(x, ya); c.lineTo(x, yb + (a.up ? 6 : -6)); c.stroke();
        var dir = a.up ? -1 : 1;
        c.beginPath(); c.moveTo(x, yb); c.lineTo(x - 4.5, yb - dir * 8); c.lineTo(x + 4.5, yb - dir * 8); c.closePath(); c.fill();
        if (a.up) {
          c.font = '10px ' + T.body; c.textAlign = 'right'; c.textBaseline = 'middle';
          c.fillText('energy in', x - 8, (ya + yb) / 2);
        }
      }

      // the electron
      var t = ease(st.moveT);
      var ey = levelY(st.from) + (levelY(st.level) - levelY(st.from)) * t;
      if (!stage.reduce) {
        var gl = c.createRadialGradient(L.ex, ey, 0, L.ex, ey, 14);
        gl.addColorStop(0, 'rgba(150,240,225,0.55)'); gl.addColorStop(1, 'rgba(150,240,225,0)');
        c.fillStyle = gl; c.beginPath(); c.arc(L.ex, ey, 14, 0, 6.283); c.fill();
      }
      c.fillStyle = 'rgba(170,250,235,1)';
      c.beginPath(); c.arc(L.ex, ey, 5, 0, 6.283); c.fill();

      if (L.legend) drawLegend();
      drawStrips();

      // photons in flight, as little wave packets
      c.lineWidth = 1.6; c.lineCap = 'round';
      for (i = 0; i < photons.length; i++) {
        var p = photons[i], tt = ease(Math.min(1, p.t));
        // a gentle arc: out to the right, then down to the strip
        var mx = (p.x0 + p.x1) / 2 + 40, my = p.y0 + (p.y1 - p.y0) * 0.2;
        var u = 1 - tt;
        var px = u * u * p.x0 + 2 * u * tt * mx + tt * tt * p.x1;
        var py = u * u * p.y0 + 2 * u * tt * my + tt * tt * p.y1;
        var dx = 2 * u * (mx - p.x0) + 2 * tt * (p.x1 - mx), dy = 2 * u * (my - p.y0) + 2 * tt * (p.y1 - my);
        var len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
        var lam = 3 + 8 * Math.min(1, p.nm / 1000);
        c.strokeStyle = lightColour(p.nm, 1);
        c.beginPath();
        for (var s = -12; s <= 12; s += 1.5) {
          var env = Math.exp(-(s * s) / 50), o = 3 * env * Math.sin(s / lam * 6.283);
          var X = px + ux * s - uy * o, Y = py + uy * s + ux * o;
          if (s === -12) c.moveTo(X, Y); else c.lineTo(X, Y);
        }
        c.stroke();
      }
    }

    function drawLegend() {
      var c = ctx, T = stage.T, x = L.legend.x, y = L.legend.y;
      c.font = '11px ' + T.body; c.textAlign = 'left'; c.textBaseline = 'top';
      var rows = [
        ['Drops to level 1', 'Lyman: ultraviolet'],
        ['Drops to level 2', 'Balmer: the visible lines'],
        ['Drops to level 3 and up', 'infrared']
      ];
      c.fillStyle = T.stageInk; c.fillText('Where each photon lands', x, y);
      for (var i = 0; i < rows.length; i++) {
        c.fillStyle = T.stageMuted; c.fillText(rows[i][0], x, y + 24 + i * 34);
        c.fillStyle = T.stageInk; c.fillText(rows[i][1], x, y + 39 + i * 34);
      }
    }

    function drawStrips() {
      var c = ctx, T = stage.T, S = L.strip, seg = L.seg, x;
      function frame(y, label) {
        c.fillStyle = 'rgba(0,0,0,0.55)';
        c.fillRect(seg.uv[0], y, seg.uv[1] - seg.uv[0], S.h);
        c.fillRect(seg.vis[0], y, seg.vis[1] - seg.vis[0], S.h);
        c.fillRect(seg.ir[0], y, seg.ir[1] - seg.ir[0], S.h);
        c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'bottom';
        c.fillText(label, S.x0, y - 4);
      }
      // continuous comparison
      if (st.rainbow) {
        frame(S.ry, 'A hot lamp filament: every colour, no gaps');
        for (x = Math.floor(seg.vis[0]); x < seg.vis[1]; x++) {
          var nm = Math.max(380, 380 + (x - seg.vis[0]) / (seg.vis[1] - seg.vis[0]) * 370);
          c.fillStyle = lightColour(nm, 1); c.fillRect(x, S.ry, 1.2, S.h);
        }
        // invisible parts glow too, shown as grey haze
        c.fillStyle = 'rgba(232,240,238,0.12)';
        c.fillRect(seg.ir[0], S.ry, seg.ir[1] - seg.ir[0], S.h);
        c.fillStyle = 'rgba(232,240,238,0.05)';
        c.fillRect(seg.uv[0], S.ry, seg.uv[1] - seg.uv[0], S.h);
      }
      frame(S.hy, 'Hydrogen: only these colours');
      // faint hint of where the visible colours sit
      for (x = Math.floor(seg.vis[0]); x < seg.vis[1]; x += 2) {
        var nm2 = Math.max(380, 380 + (x - seg.vis[0]) / (seg.vis[1] - seg.vis[0]) * 370);
        c.fillStyle = lightColour(nm2, 0.06); c.fillRect(x, S.hy, 2, S.h);
      }
      // section labels and breaks
      c.font = '10px ' + T.mono; c.fillStyle = T.stageMuted; c.textAlign = 'center'; c.textBaseline = 'top';
      var ly = S.hy + S.h + 5;
      c.fillText('UV', (seg.uv[0] + seg.uv[1]) / 2, ly);
      c.fillText('IR', (seg.ir[0] + seg.ir[1]) / 2, ly);
      // visible lines and their wavelengths
      for (var m = 1; m < NMAX; m++) {
        for (var n = m + 1; n <= NMAX; n++) {
          var key = m + ':' + n, cnt = st.counts[key] || 0;
          var wl = wavelength(m, n), lx = Math.round(stripX(wl)) + 0.5;
          var vis = wl >= 380 && wl <= 750;
          if (!cnt) continue;
          var a = 0.35 + 0.65 * (1 - Math.exp(-cnt / 3));
          var fl = st.flashes[key] || 0;
          if (vis) {
            c.fillStyle = lightColour(wl, 0.25 * a + 0.4 * fl);
            c.fillRect(lx - 3, S.hy, 6, S.h);
            c.fillStyle = lightColour(wl, a);
            c.fillRect(lx - 1.2, S.hy, 2.4, S.h);
            c.fillStyle = T.stageInk; c.textAlign = 'center';
            c.fillText(String(Math.round(wl)), lx, ly);
          } else {
            c.fillStyle = 'rgba(200,205,205,' + (0.4 + 0.5 * a + 0.3 * fl) + ')';
            c.fillRect(lx - 0.75, S.hy + 3, 1.5, S.h - 6);
          }
        }
      }
      // visible band end labels
      c.fillStyle = T.stageMuted; c.textAlign = 'left';
      if (!st.counts['2:6']) c.fillText('380', seg.vis[0], ly);
      c.textAlign = 'right';
      if (!st.counts['2:3']) c.fillText('750 nm', seg.vis[1], ly);
    }

    /* ---------- input: tap a level ---------- */
    function onDown(ev) {
      if (!L) return;
      var p = pointerPos(canvas, ev);
      if (p.x < L.lx0 - 50 || p.x > L.lx1 + 90 || p.y > L.bottom + 20 || p.y < L.top - 20) return;
      var best = 0, bd = 1e9;
      for (var n = 1; n <= NMAX; n++) { var d = Math.abs(levelY(n) - p.y); if (d < bd) { bd = d; best = n; } }
      if (bd > 30 || st.moveT < 1) return;
      if (best > st.level) excite(best);
      else if (best < st.level) drop(best);
    }
    canvas.addEventListener('pointerdown', onDown);

    layout();
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
    title: 'Hydrogen’s colours',
    blurb: 'An electron in hydrogen can only sit on certain energy levels, so when it drops it can only give out light of certain colours.',
    try: [
      'Tap level 3. When the electron falls back to level 2, a red line appears at 656 nm.',
      'Turn on Keep it glowing and let the spectrum fill in. You get four visible lines and no colours in between.',
      'Compare with a rainbow. A hot filament gives every colour; hydrogen gives a barcode.',
      'Try True spacing. The jump down to level 1 is so big that its photons are ultraviolet.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
