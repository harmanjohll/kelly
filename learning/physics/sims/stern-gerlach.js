/* Kelly's Learning Studio: Stern Gerlach magnets in a chain.
   A silver atom behaves as a spin one half particle. A magnet set to Z asks "up or
   down?", one set to X asks "right or left?". An atom with a definite answer to one
   question gives the same answer if asked again, but a perfectly random answer to the
   other question, and asking the other question wipes out the first answer. */
(function (g) {
  'use strict';
  var ID = 'stern-gerlach';
  var EXTRA_CSS =
    '.sim-stern-gerlach .sg-mag{display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
    '.sim-stern-gerlach .sg-mag .sg-name{min-width:5.2em;font-size:.92em;color:var(--muted)}' +
    '.sim-stern-gerlach .sg-mag .sg-gap{width:6px}';

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

  var WORDS = { Z: ['up', 'down'], X: ['right', 'left'] };
  function fmtInt(n) { return n.toLocaleString('en-GB'); }
  function pct(x) { return Math.round(x * 100) + '%'; }

  function mount(el) {
    injectCss();
    var root = mk('div', 'sim sim-' + ID);
    var canvas = mk('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Silver atoms leave an oven and pass through a chain of up to three magnets. Each magnet splits the beam in two; one beam goes on to the next magnet and the other is stopped and counted.');
    root.appendChild(canvas);
    var readout = mk('div', 'sim-readout');
    root.appendChild(readout);

    var st = {
      n: 2, axis: ['Z', 'X', 'Z'], keep: [0, 0, 0], rate: 'slow',
      sent: 0, entered: [0, 0, 0], out: [[0, 0], [0, 0], [0, 0]], flash: {}
    };
    var atoms = [], nextShot = 0.3;

    /* ----- controls ----- */
    var presets = mk('div', 'sim-presets');
    var PRE = [
      ['Z then Z', 2, ['Z', 'Z', 'Z']],
      ['Z then X', 2, ['Z', 'X', 'Z']],
      ['Z, then X, then Z', 3, ['Z', 'X', 'Z']]
    ];
    PRE.forEach(function (p) {
      var b = mk('button', 'chip', p[0]); b.type = 'button';
      b.addEventListener('click', function () {
        st.n = p[1]; st.axis = p[2].slice(); st.keep = [0, 0, 0];
        if (st.rate === 'pause') setRate('slow');
        syncControls(); changed();
      });
      presets.appendChild(b);
    });
    root.appendChild(presets);

    var controls = mk('div', 'sim-controls');
    var countRow = mk('div', 'sg-mag');
    countRow.appendChild(mk('span', 'sg-name', 'Magnets'));
    var countChips = [];
    [1, 2, 3].forEach(function (k) {
      var c = chip(String(k), st.n === k, function () { st.n = k; syncControls(); changed(); });
      c.setAttribute('aria-label', k + (k === 1 ? ' magnet' : ' magnets'));
      countChips.push(c); countRow.appendChild(c);
    });
    controls.appendChild(countRow);
    var magRows = [];
    for (var i = 0; i < 3; i++) (function (i) {
      var row = mk('div', 'sg-mag');
      row.appendChild(mk('span', 'sg-name', 'Magnet ' + (i + 1)));
      var z = chip('Z', false, function () { st.axis[i] = 'Z'; syncControls(); changed(); });
      var x = chip('X', false, function () { st.axis[i] = 'X'; syncControls(); changed(); });
      z.setAttribute('aria-label', 'Magnet ' + (i + 1) + ' set to Z');
      x.setAttribute('aria-label', 'Magnet ' + (i + 1) + ' set to X');
      row.appendChild(z); row.appendChild(x);
      row.appendChild(mk('span', 'sg-gap'));
      var keepLab = mk('span', 'sg-name', 'pass on');
      var k0 = chip('up', false, function () { st.keep[i] = 0; syncControls(); changed(); });
      var k1 = chip('down', false, function () { st.keep[i] = 1; syncControls(); changed(); });
      row.appendChild(keepLab); row.appendChild(k0); row.appendChild(k1);
      magRows.push({ row: row, z: z, x: x, keepLab: keepLab, k0: k0, k1: k1 });
      controls.appendChild(row);
    })(i);
    var rateRow = mk('div', 'sim-row');
    var rateChips = {};
    function setRate(r) {
      st.rate = r;
      for (var k in rateChips) setChip(rateChips[k], k === st.rate);
      nextShot = 0.1; stage.kick();
    }
    [['pause', 'Paused'], ['slow', 'One at a time'], ['fast', 'Fast']].forEach(function (r) {
      rateChips[r[0]] = chip(r[1], st.rate === r[0], function () { setRate(r[0]); });
      rateRow.appendChild(rateChips[r[0]]);
    });
    var resetBtn = mk('button', 'btn small', 'Reset counts'); resetBtn.type = 'button';
    resetBtn.addEventListener('click', function () { changed(); });
    rateRow.appendChild(resetBtn);
    controls.appendChild(rateRow);
    root.appendChild(controls);
    el.appendChild(root);

    function syncControls() {
      countChips.forEach(function (c, k) { setChip(c, st.n === k + 1); });
      magRows.forEach(function (m, i) {
        m.row.style.display = i < st.n ? '' : 'none';
        setChip(m.z, st.axis[i] === 'Z'); setChip(m.x, st.axis[i] === 'X');
        var last = i === st.n - 1;
        m.keepLab.style.display = m.k0.style.display = m.k1.style.display = last ? 'none' : '';
        m.k0.textContent = WORDS[st.axis[i]][0]; m.k1.textContent = WORDS[st.axis[i]][1];
        setChip(m.k0, st.keep[i] === 0); setChip(m.k1, st.keep[i] === 1);
      });
    }

    /* ----- physics ----- */
    // state: null (unpolarised, straight from the oven) or { axis, s } with s = 0 for up or right, 1 for down or left
    function probFirst(state, axis) {
      if (!state) return 0.5;
      if (state.axis === axis) return state.s === 0 ? 1 : 0;
      return 0.5;   // Z and X are at right angles: cos^2(45 degrees) = 1/2
    }
    // predicted probability of reaching each magnet and of each output, per atom sent
    function predict() {
      var reach = [], split = [], p = 1, state = null;
      for (var i = 0; i < st.n; i++) {
        reach.push(p);
        var pu = probFirst(state, st.axis[i]);
        split.push([pu, 1 - pu]);
        if (i < st.n - 1) {
          p *= st.keep[i] === 0 ? pu : 1 - pu;
          state = { axis: st.axis[i], s: st.keep[i] };
        }
      }
      return { reach: reach, split: split };
    }

    function changed() {
      if (L) layout();   // the number of magnets may have changed
      st.sent = 0; st.entered = [0, 0, 0]; st.out = [[0, 0], [0, 0], [0, 0]]; st.flash = {};
      atoms.length = 0;
      updateReadout(); draw(); stage.kick();
    }

    /* ----- layout ----- */
    var L = null;
    var stage = makeStage(root, canvas, {
      height: function (w) { return w < 600 ? clamp(w * 0.8, 280, 320) : clamp(w * 0.4, 320, 380); },
      onSize: layout, step: step, draw: draw,
      busy: function () { return st.rate !== 'pause' || atoms.length > 0 || Object.keys(st.flash).length > 0; }
    });
    var ctx = stage.ctx;

    function layout() {
      var W = stage.W, H = stage.H;
      var y0 = Math.round(H * 0.47);
      var bw = clamp(W * 0.12, 42, 92), bh = clamp(H * 0.26, 58, 92);
      var ovenX = Math.max(26, W * 0.05);
      var endX = W - Math.max(28, W * 0.05);
      var left = ovenX + 34, right = endX - 46;
      var n = st.n, cx = [];
      for (var i = 0; i < n; i++) cx.push(left + (right - left) * (n === 1 ? 0.45 : (i + 0.5) / n) - (n === 1 ? 0 : bw * 0.1));
      L = { W: W, H: H, y0: y0, bw: bw, bh: bh, ovenX: ovenX, endX: endX, cx: cx, spread: bh * 0.27, cw: clamp(W * 0.1, 40, 64), ch: 26 };
    }
    function boxL(i) { return L.cx[i] - L.bw / 2; }
    function boxR(i) { return L.cx[i] + L.bw / 2; }
    function portY(s) { return L.y0 + (s === 0 ? -1 : 1) * L.spread; }
    // where a stopped or final beam is counted
    function counterPos(i, s) {
      if (i === st.n - 1) return { x: L.endX, y: L.y0 + (s === 0 ? -1 : 1) * L.H * 0.27 };
      var gapMid = (boxR(i) + boxL(i + 1)) / 2;
      return { x: gapMid, y: L.y0 + (s === 0 ? -1 : 1) * L.H * 0.32 };
    }
    function quad(p0, p1, p2, steps) {
      var out = [];
      for (var k = 1; k <= steps; k++) {
        var t = k / steps, u = 1 - t;
        out.push({ x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y });
      }
      return out;
    }
    // path after leaving magnet i through output s
    function exitPath(i, s) {
      var start = { x: boxR(i), y: portY(s) };
      if (i < st.n - 1 && st.keep[i] === s) {
        var end = { x: boxL(i + 1), y: L.y0 };
        var mid = { x: (start.x + end.x) / 2, y: start.y };
        return [start].concat(quad(start, mid, end, 10));
      }
      var c = counterPos(i, s);
      var tgt = { x: c.x - L.cw / 2, y: c.y };
      return [start].concat(quad(start, { x: start.x + (tgt.x - start.x) * 0.4, y: start.y + (tgt.y - start.y) * 0.25 }, tgt, 8));
    }
    function throughPath(i, s) {
      var a = { x: boxL(i), y: L.y0 }, b = { x: L.cx[i] - L.bw * 0.1, y: L.y0 }, c = { x: boxR(i), y: portY(s) };
      return [a].concat(quad(a, b, c, 6));
    }

    /* ----- atoms ----- */
    function emit() {
      st.sent++;
      atoms.push({ pts: [{ x: L.ovenX + 12, y: L.y0 }, { x: boxL(0), y: L.y0 }], seg: 0, t: 0, stage: 'to', i: 0, state: null });
    }
    function advance(a) {
      // called when an atom reaches the end of its current path
      if (a.stage === 'to') {
        var i = a.i;
        st.entered[i]++;
        var pu = probFirst(a.state, st.axis[i]);
        var s = Math.random() < pu ? 0 : 1;   // the magnet asks; the answer is random where quantum mechanics says so
        a.state = { axis: st.axis[i], s: s };
        a.s = s;
        a.pts = throughPath(i, s).concat(exitPath(i, s).slice(1)); a.seg = 0; a.t = 0;
        a.stage = 'out';
        return true;
      }
      if (a.stage === 'out') {
        if (a.i < st.n - 1 && st.keep[a.i] === a.s) {
          st.out[a.i][a.s]++;
          a.i++; a.stage = 'to';
          return advance(a);
        }
        st.out[a.i][a.s]++;
        st.flash[a.i + ':' + a.s] = 1;
        return false;
      }
      return false;
    }

    var readoutTimer = 0;
    function step(dt) {
      if (!L) return;
      if (st.rate !== 'pause') {
        nextShot -= dt;
        var guard = 0;
        while (nextShot <= 0 && guard++ < 20) { emit(); nextShot += st.rate === 'fast' ? expWait(24) : 0.55 + Math.random() * 0.3; }
      }
      var v = L.W * (st.rate === 'fast' ? 0.5 : 0.3) * dt;
      for (var j = atoms.length - 1; j >= 0; j--) {
        var a = atoms[j], move = v, alive = true;
        while (move > 0 && alive) {
          var p0 = a.pts[a.seg], p1 = a.pts[a.seg + 1];
          if (!p1) { alive = advance(a); continue; }
          var len = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 0.001;
          var left = (1 - a.t) * len;
          if (move < left) { a.t += move / len; move = 0; }
          else { move -= left; a.seg++; a.t = 0; }
        }
        if (!alive) atoms.splice(j, 1);
      }
      for (var k in st.flash) { st.flash[k] -= dt / 0.35; if (st.flash[k] <= 0) delete st.flash[k]; }
      readoutTimer -= dt;
      if (readoutTimer <= 0) { updateReadout(); readoutTimer = 0.25; }
    }

    var lastText = '';
    function updateReadout() {
      var last = st.n - 1, o = st.out[last], tot = o[0] + o[1], w = WORDS[st.axis[last]];
      var lines = ['Atoms sent: ' + fmtInt(st.sent) + '. Reaching the last magnet: ' + fmtInt(st.entered[last])];
      lines.push('Last magnet (' + st.axis[last] + '): ' + w[0] + ' ' + fmtInt(o[0]) + (tot ? ' (' + pct(o[0] / tot) + ')' : '') + ', ' + w[1] + ' ' + fmtInt(o[1]) + (tot ? ' (' + pct(o[1] / tot) + ')' : ''));
      lines.push(story());
      var t = lines.join('\n');
      if (t !== lastText) { readout.textContent = t; lastText = t; }
    }
    function story() {
      var n = st.n, last = n - 1;
      if (n === 1) return 'Straight from the oven the atoms have no preference: half go each way.';
      var prevAxis = st.axis[last - 1], kept = WORDS[prevAxis][st.keep[last - 1]];
      if (prevAxis === st.axis[last]) return 'Every atom arriving was just found ' + kept + '. Ask the same question again and you get the same answer every time.';
      if (n === 3 && st.axis[0] === st.axis[2] && st.axis[1] !== st.axis[2]) {
        return 'These atoms were all ' + WORDS[st.axis[0]][st.keep[0]] + ' at magnet 1, yet now it is half and half again. Measuring ' + prevAxis + ' in between wiped out the earlier answer.';
      }
      return 'Being ' + kept + ' tells you nothing about ' + st.axis[last] + ', so each atom chooses at random: about half and half.';
    }

    /* ----- drawing ----- */
    function draw() {
      if (!L) return;
      var T = stage.T, c = ctx, W = L.W, H = L.H, y0 = L.y0, i, s;
      c.clearRect(0, 0, W, H);
      roundRect(c, 0.5, 0.5, W - 1, H - 1, 12);
      c.fillStyle = T.stage; c.fill();
      var pr = predict();

      // beams, brightness following the predicted share of atoms
      c.lineCap = 'round';
      function beam(pts, p) {
        c.strokeStyle = 'rgba(200,215,220,' + (0.06 + 0.3 * p) + ')';
        c.lineWidth = 1 + 3 * p;
        c.beginPath(); c.moveTo(pts[0].x, pts[0].y);
        for (var k = 1; k < pts.length; k++) c.lineTo(pts[k].x, pts[k].y);
        c.stroke();
      }
      beam([{ x: L.ovenX + 12, y: y0 }, { x: boxL(0), y: y0 }], 1);
      for (i = 0; i < st.n; i++) {
        for (s = 0; s < 2; s++) {
          var p = pr.reach[i] * pr.split[i][s];
          beam(throughPath(i, s), p);
          beam(exitPath(i, s), p);
        }
      }

      // oven
      c.fillStyle = 'rgba(232,140,90,0.22)';
      roundRect(c, L.ovenX - 14, y0 - 16, 26, 32, 5); c.fill();
      c.fillStyle = 'rgba(240,160,100,0.9)';
      c.beginPath(); c.arc(L.ovenX - 1, y0, 4, 0, 6.283); c.fill();
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'center'; c.textBaseline = 'top';
      c.fillText('oven', L.ovenX - 1, y0 + 22);

      // magnets
      for (i = 0; i < st.n; i++) drawMagnet(i, T);

      // counters
      for (i = 0; i < st.n; i++) {
        for (s = 0; s < 2; s++) {
          var passOn = i < st.n - 1 && st.keep[i] === s;
          if (passOn) drawPassLabel(i, s, T);
          else drawCounter(i, s, T, pr);
        }
      }

      // atoms
      for (var j = 0; j < atoms.length; j++) {
        var a = atoms[j], q0 = a.pts[a.seg], q1 = a.pts[a.seg + 1] || q0;
        var ax = q0.x + (q1.x - q0.x) * a.t, ay = q0.y + (q1.y - q0.y) * a.t;
        if (!stage.reduce) {
          c.fillStyle = 'rgba(220,230,235,0.18)';
          c.beginPath(); c.arc(ax, ay, 6, 0, 6.283); c.fill();
        }
        c.fillStyle = '#e4eaec';
        c.beginPath(); c.arc(ax, ay, 2.8, 0, 6.283); c.fill();
      }

      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText(W < 520 ? 'Tap a magnet or a stopped beam to change it' : 'Tap a magnet to switch Z and X. Tap a stopped beam to pass it on instead.', 12, 10);
    }

    function drawMagnet(i, T) {
      var c = ctx, x = boxL(i), y = L.y0 - L.bh / 2, w = L.bw, h = L.bh, ax = st.axis[i];
      c.fillStyle = ax === 'Z' ? 'rgba(110,200,190,0.13)' : 'rgba(220,180,90,0.13)';
      roundRect(c, x, y, w, h, 8); c.fill();
      c.strokeStyle = ax === 'Z' ? 'rgba(110,200,190,0.55)' : 'rgba(220,180,90,0.55)'; c.lineWidth = 1.2;
      roundRect(c, x, y, w, h, 8); c.stroke();
      var cx = L.cx[i];
      c.fillStyle = 'rgba(200,210,215,0.35)';
      if (ax === 'Z') {
        // pointed north pole above the beam, grooved south pole below: a field that is stronger near the top
        c.beginPath(); c.moveTo(x + 6, y + 5); c.lineTo(x + w - 6, y + 5); c.lineTo(x + w - 6, y + h * 0.2); c.lineTo(cx, y + h * 0.36); c.lineTo(x + 6, y + h * 0.2); c.closePath(); c.fill();
        c.beginPath(); c.moveTo(x + 6, y + h - 5); c.lineTo(x + w - 6, y + h - 5); c.lineTo(x + w - 6, y + h * 0.66); c.lineTo(cx + w * 0.12, y + h * 0.66); c.lineTo(cx, y + h * 0.74); c.lineTo(cx - w * 0.12, y + h * 0.66); c.lineTo(x + 6, y + h * 0.66); c.closePath(); c.fill();
      } else {
        // the same magnet turned a quarter turn: seen end on, its poles sit in front of and behind the beam
        c.beginPath(); c.arc(cx, L.y0, Math.min(w, h) * 0.24, 0, 6.283); c.fill();
        c.fillStyle = T.stage;
        c.beginPath(); c.arc(cx, L.y0, Math.min(w, h) * 0.12, 0, 6.283); c.fill();
      }
      c.font = '600 15px ' + T.body; c.fillStyle = T.stageInk; c.textAlign = 'center'; c.textBaseline = 'bottom';
      c.fillText(ax, cx, y - 5);
      // port labels
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'middle';
    }

    function drawCounter(i, s, T, pr) {
      var c = ctx, pos = counterPos(i, s), w = L.cw, h = L.ch;
      var f = st.flash[i + ':' + s] || 0;
      var count = st.out[i][s], ent = st.out[i][0] + st.out[i][1];
      var blocked = i < st.n - 1;
      c.fillStyle = f > 0 ? 'rgba(110,225,205,' + (0.2 + 0.5 * f) + ')' : (blocked ? 'rgba(232,240,238,0.08)' : 'rgba(110,225,205,0.12)');
      roundRect(c, pos.x - w / 2, pos.y - h / 2, w, h, 6); c.fill();
      if (blocked) { c.fillStyle = 'rgba(232,240,238,0.4)'; c.fillRect(pos.x - w / 2, pos.y - h / 2 + 3, 2.5, h - 6); }
      c.font = '12px ' + T.mono; c.fillStyle = T.stageInk; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(fmtInt(count), pos.x + 1, pos.y + 0.5);
      // word and share under or above the counter
      var lab = WORDS[st.axis[i]][s] + (ent ? ' ' + pct(count / ent) : '');
      c.font = '10px ' + T.body; c.fillStyle = T.stageMuted;
      c.textBaseline = s === 0 ? 'bottom' : 'top';
      var ly = s === 0 ? pos.y - h / 2 - 3 : pos.y + h / 2 + 3;
      c.fillText(lab, pos.x, ly);
      c.fillStyle = rgba(T.gold, 0.9);
      c.fillText('expect ' + pct(pr.split[i][s]), pos.x, ly + (s === 0 ? -12 : 12));
    }

    function drawPassLabel(i, s, T) {
      var c = ctx, x = boxR(i) + 4, y = portY(s) + (s === 0 ? -9 : 9);
      var ent = st.out[i][0] + st.out[i][1];
      c.font = '10px ' + T.body; c.fillStyle = T.stageInk; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText(WORDS[st.axis[i]][s] + (ent ? ' ' + pct(st.out[i][s] / ent) : ''), x, y);
    }

    /* ----- input: tap a magnet to switch axis, tap a counter to pass that beam on ----- */
    function onDown(ev) {
      if (!L) return;
      var p = pointerPos(canvas, ev), i, s;
      for (i = 0; i < st.n; i++) {
        if (Math.abs(p.x - L.cx[i]) <= L.bw / 2 + 4 && Math.abs(p.y - L.y0) <= L.bh / 2 + 22) {
          st.axis[i] = st.axis[i] === 'Z' ? 'X' : 'Z'; syncControls(); changed(); return;
        }
      }
      for (i = 0; i < st.n - 1; i++) {
        for (s = 0; s < 2; s++) {
          if (st.keep[i] === s) continue;
          var c = counterPos(i, s);
          if (Math.abs(p.x - c.x) <= L.cw / 2 + 10 && Math.abs(p.y - c.y) <= L.ch / 2 + 16) {
            st.keep[i] = s; syncControls(); changed(); return;
          }
        }
      }
    }
    canvas.addEventListener('pointerdown', onDown);

    syncControls();
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
    title: 'Stern and Gerlach’s magnets',
    blurb: 'Send silver atoms through magnets that ask a question: up or down, right or left. Watch which answers are certain and which are pure chance.',
    try: [
      'Z then Z: atoms found up at the first magnet are found up again, every single time.',
      'Z then X: the up atoms split half and half into right and left. Knowing up tells you nothing about right.',
      'Z, then X, then Z: keep only up, then only right. At the last magnet the up atoms come out half down again.',
      'Tap a stopped beam to send the other answer on instead, and predict what happens before you look.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
