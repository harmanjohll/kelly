/* Kelly's Learning Studio: photoelectric effect simulation.
   Light arrives as photons. Each photon carries E = h f. An electron escapes the
   metal only if one photon brings more than the work function. Brightness changes
   how many photons arrive, not how much energy each one carries. */
(function (g) {
  'use strict';
  var ID = 'photoelectric';
  var H_EV = 4.135667696e-3;   // Planck constant in eV per THz
  var C_NM = 299792.458;       // speed of light in nm times THz
  var F_MIN = 300, F_MAX = 1600; // THz: 1000 nm infrared to 187 nm ultraviolet
  var KE_AXIS = 5;             // eV, top of the plot
  var V_KMS = 593.1;           // electron speed in km/s for 1 eV
  // Work functions in eV (HyperPhysics table; real surfaces vary by a few tenths).
  var METALS = [
    { name: 'Caesium', phi: 2.1 },
    { name: 'Sodium', phi: 2.28 },
    { name: 'Calcium', phi: 2.9 },
    { name: 'Zinc', phi: 4.3 },
    { name: 'Copper', phi: 4.7 },
    { name: 'Platinum', phi: 6.35 }
  ];

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
      '.sim-' + ID + ' .sim-readout{white-space:pre-line;min-height:3.9em}';
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

  /* ---------- the simulation ---------- */
  function mount(el) {
    injectCss();
    var T = readTheme();
    var root = mk('div', 'sim sim-' + ID);
    var canvas = mk('canvas', 'sim-canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Light shines on a metal plate. Electrons fly off only when each photon carries enough energy. A plot records the fastest electron energy against the light frequency.');
    root.appendChild(canvas);
    var readout = mk('div', 'sim-readout');
    root.appendChild(readout);

    var st = { f: 470, bright: 70, metal: 1, rule: false };
    var photons = [], electrons = [], sparks = [], emitTimes = [], points = {};
    var nextPhoton = 0.2, clock = 0;

    // presets
    var presets = mk('div', 'sim-presets');
    var PRE = [
      ['Bright red light', { f: 440, bright: 100, metal: 1 }],
      ['Dim violet light', { f: 740, bright: 10, metal: 1 }],
      ['Ultraviolet on zinc', { f: 1300, bright: 70, metal: 3 }]
    ];
    PRE.forEach(function (p) {
      var b = chip(p[0], false, function () {
        st.f = p[1].f; st.bright = p[1].bright; st.metal = p[1].metal;
        fR.set(st.f); bR.set(st.bright); sel.value = String(st.metal);
        settingsChanged(true);
      });
      presets.appendChild(b);
    });
    root.appendChild(presets);

    var controls = mk('div', 'sim-controls');
    var fR = rangeControl('Colour of the light', F_MIN, F_MAX, 5, st.f, function (f) {
      var nm = C_NM / f;
      return Math.round(nm) + ' nm, ' + colourName(nm);
    }, function (v) { st.f = v; settingsChanged(false); });
    var bR = rangeControl('Brightness', 0, 100, 1, st.bright, function (v) { return v + '%'; },
      function (v) { st.bright = v; settingsChanged(false); });
    var selLab = mk('label', 'sim-control');
    selLab.appendChild(mk('span', 'sim-label', 'Metal'));
    var sel = mk('select');
    METALS.forEach(function (m, i) {
      var o = mk('option', null, m.name + ' (needs ' + m.phi.toFixed(2) + ' eV)');
      o.value = String(i); sel.appendChild(o);
    });
    sel.value = String(st.metal);
    sel.addEventListener('change', function () { st.metal = +sel.value; settingsChanged(true); });
    selLab.appendChild(sel);
    var row = mk('div', 'sim-row');
    var ruleChip = chip('Show the rule', false, function () { st.rule = !st.rule; setChip(ruleChip, st.rule); updateReadout(); draw(); });
    var clearBtn = mk('button', 'btn small', 'Clear plot');
    clearBtn.type = 'button';
    clearBtn.addEventListener('click', function () { points = {}; record(); draw(); });
    row.appendChild(ruleChip); row.appendChild(clearBtn);
    controls.appendChild(fR.el); controls.appendChild(bR.el); controls.appendChild(selLab); controls.appendChild(row);
    root.appendChild(controls);
    el.appendChild(root);

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, DPR = 1, L = null;
    var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    var darkMq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var raf = 0, last = 0, alive = true, onScreen = true;

    function photonE(f) { return H_EV * f; }
    function metal() { return METALS[st.metal]; }

    function layout() {
      var stacked = W < 600;
      var S, P;
      if (stacked) {
        S = { x: 0, y: 0, w: W, h: Math.round(H * 0.6) };
        P = { x: 44, y: S.h + 18, w: W - 58, h: H - S.h - 50 };
      } else {
        S = { x: 0, y: 0, w: Math.round(W * 0.58), h: H };
        P = { x: S.w + 52, y: 22, w: W - S.w - 66, h: H - 62 };
      }
      var plateY = S.y + S.h * 0.8;
      L = {
        S: S, P: P, stacked: stacked,
        lamp: { x: S.x + S.w * 0.1, y: S.y + S.h * 0.16 },
        plate: { x0: S.x + S.w * 0.26, x1: S.x + S.w * 0.86, y: plateY, h: Math.max(10, S.h * 0.06) },
        target: { x: S.x + S.w * 0.52, y: plateY },
        bar: { x: S.x + S.w - 34, y0: S.y + 16, y1: plateY - 26 }
      };
    }

    function size() {
      var w = Math.round(root.clientWidth || el.clientWidth || 360);
      if (w === W && L) return;
      W = w;
      H = W < 600 ? Math.round(clamp(W * 0.92, 300, 360)) : Math.round(clamp(W * 0.46, 330, 420));
      DPR = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      photons.length = 0; electrons.length = 0; sparks.length = 0;
      layout();
      draw();
    }

    function record() {
      if (st.bright <= 0) return;
      var key = st.metal + ':' + Math.round(st.f / 10);
      var E = photonE(st.f), phi = metal().phi;
      points[key] = { f: st.f, ke: Math.max(0, E - phi), metal: st.metal, out: E > phi };
    }

    var lastText = '';
    function updateReadout() {
      var E = photonE(st.f), m = metal(), ke = Math.max(0, E - m.phi);
      var nm = C_NM / st.f;
      var now = clock;
      while (emitTimes.length && emitTimes[0] < now - 2) emitTimes.shift();
      var perSec = Math.round(emitTimes.length / 2);
      var lines = [
        'Each photon: ' + E.toFixed(2) + ' eV (' + Math.round(nm) + ' nm, ' + colourName(nm) + ')',
        m.name + ' needs ' + m.phi.toFixed(2) + ' eV to free an electron',
        E > m.phi
          ? 'Fastest electron: ' + ke.toFixed(2) + ' eV, about ' + Math.round(V_KMS * Math.sqrt(ke)) + ' km/s. ' + (st.bright > 0 ? perSec + ' leaving each second' : 'No light, no electrons')
          : 'No electrons escape, however bright the light'
      ];
      if (st.rule) lines.push('Gold line: photon energy minus what the metal needs. Its slope is Planck\'s constant, the same for every metal.');
      var t = lines.join('\n');
      if (t !== lastText) { readout.textContent = t; lastText = t; }
    }

    function settingsChanged(big) {
      if (big) { electrons.length = 0; }
      record();
      updateReadout();
      nextPhoton = Math.min(nextPhoton, expWait(st.bright * 0.4));
      draw();
      schedule();
    }

    function spawnPhoton() {
      var lp = L.lamp, tg = L.target;
      var ex = tg.x + (Math.random() * 2 - 1) * (L.plate.x1 - L.plate.x0) * 0.16;
      var ey = tg.y;
      var sx = lp.x + (Math.random() * 2 - 1) * 5, sy = lp.y + (Math.random() * 2 - 1) * 5;
      var dx = ex - sx, dy = ey - sy, len = Math.hypot(dx, dy);
      photons.push({ sx: sx, sy: sy, ux: dx / len, uy: dy / len, len: len, s: 0, f: st.f, ex: ex, ey: ey, ph: Math.random() * 6.28 });
    }

    function hit(p) {
      var E = photonE(p.f), phi = metal().phi;
      if (E > phi) {
        var kmax = E - phi;
        // most electrons lose a little energy on the way out; the fastest carry the full excess
        var ke = kmax * Math.sqrt(Math.random());
        var ang = (Math.random() * 2 - 1) * 1.15;
        var sp = Math.max(14, L.S.h * 0.62 * Math.sqrt(ke));
        electrons.push({ x: p.ex, y: p.ey - L.plate.h * 0.1, vx: Math.sin(ang) * sp, vy: -Math.cos(ang) * sp, age: 0 });
        emitTimes.push(clock);
      } else {
        sparks.push({ x: p.ex, y: p.ey, age: 0 });
      }
    }

    function step(dt) {
      clock += dt;
      var rate = st.bright * 0.4;  // photons per second on screen (a stand in for intensity)
      nextPhoton -= dt;
      var guard = 0;
      while (nextPhoton <= 0 && guard++ < 20) { spawnPhoton(); nextPhoton += expWait(rate); }
      if (!isFinite(nextPhoton)) nextPhoton = expWait(rate);
      var v = L.S.h * 1.25 + 80;
      for (var i = photons.length - 1; i >= 0; i--) {
        var p = photons[i];
        p.s += v * dt;
        if (p.s >= p.len) { hit(p); photons.splice(i, 1); }
      }
      for (i = electrons.length - 1; i >= 0; i--) {
        var e = electrons[i];
        e.x += e.vx * dt; e.y += e.vy * dt; e.age += dt;
        if (e.y < L.S.y - 8 || e.x < L.S.x - 8 || e.x > L.S.x + L.S.w + 8 || e.age > 7) electrons.splice(i, 1);
      }
      for (i = sparks.length - 1; i >= 0; i--) { sparks[i].age += dt; if (sparks[i].age > 0.6) sparks.splice(i, 1); }
      if (Math.floor(clock * 5) !== Math.floor((clock - dt) * 5)) updateReadout();
    }

    /* ---------- drawing ---------- */
    function drawStage() {
      var S = L.S, c = ctx, nm = C_NM / st.f;
      c.save();
      roundRect(c, S.x + 0.5, S.y + 0.5, S.w - 1, S.h - 1, 12);
      c.fillStyle = T.stage; c.fill();
      c.clip();
      // soft beam
      var lp = L.lamp, tg = L.target, spread = (L.plate.x1 - L.plate.x0) * 0.16;
      if (st.bright > 0) {
        var a = 0.05 + 0.2 * st.bright / 100;
        c.beginPath();
        c.moveTo(lp.x - 6, lp.y + 4); c.lineTo(lp.x + 6, lp.y - 4);
        c.lineTo(tg.x + spread + 4, tg.y); c.lineTo(tg.x - spread - 4, tg.y); c.closePath();
        var gr = c.createLinearGradient(lp.x, lp.y, tg.x, tg.y);
        gr.addColorStop(0, lightColour(nm, a * 1.4)); gr.addColorStop(1, lightColour(nm, a * 0.6));
        c.fillStyle = gr; c.fill();
      }
      // lamp
      c.fillStyle = 'rgba(232,240,238,0.12)';
      c.beginPath(); c.arc(lp.x, lp.y, 13, 0, 6.283); c.fill();
      c.fillStyle = st.bright > 0 ? lightColour(nm, 0.35 + 0.65 * st.bright / 100) : 'rgba(232,240,238,0.2)';
      c.beginPath(); c.arc(lp.x, lp.y, 7, 0, 6.283); c.fill();
      c.font = '11px ' + T.body; c.fillStyle = T.stageMuted; c.textAlign = 'left'; c.textBaseline = 'middle';
      var invisible = nm < 380 ? 'ultraviolet light, invisible' : nm > 750 ? 'infrared light, invisible' : 'light source';
      c.fillText(invisible, lp.x + 20, lp.y - 4);

      // plate
      var pl = L.plate;
      var mg = c.createLinearGradient(0, pl.y, 0, pl.y + pl.h);
      mg.addColorStop(0, '#c9cfd2'); mg.addColorStop(0.5, '#8d969b'); mg.addColorStop(1, '#5d6569');
      c.fillStyle = mg;
      roundRect(c, pl.x0, pl.y, pl.x1 - pl.x0, pl.h, 3); c.fill();
      c.fillStyle = T.stageMuted; c.textBaseline = 'top'; c.textAlign = 'center';
      c.fillText(metal().name + ' plate', (pl.x0 + pl.x1) / 2, pl.y + pl.h + 6);

      // sparks: energy absorbed as warmth
      for (var i = 0; i < sparks.length; i++) {
        var sp = sparks[i], k = 1 - sp.age / 0.6;
        c.fillStyle = 'rgba(255,170,90,' + (0.5 * k) + ')';
        c.beginPath(); c.arc(sp.x, sp.y + 1, 2 + (reduce.matches ? 0 : 4 * (1 - k)), 0, 6.283); c.fill();
      }
      // photons as wave packets
      c.lineWidth = 1.6; c.lineCap = 'round';
      for (i = 0; i < photons.length; i++) {
        var p = photons[i], pnm = C_NM / p.f;
        var cx = p.sx + p.ux * p.s, cy = p.sy + p.uy * p.s;
        var nx = -p.uy, ny = p.ux;
        var lam = 3 + 9 * (pnm / 1000);        // screen wavelength tracks the real one
        var half = 13, amp = reduce.matches ? 0 : 3.2;
        c.strokeStyle = lightColour(pnm, 0.95);
        c.beginPath();
        for (var s = -half; s <= half; s += 1.5) {
          var env = Math.exp(-(s * s) / (half * half * 0.35));
          var o = amp * env * Math.sin((s / lam) * 6.283 + p.ph);
          var x = cx + p.ux * s + nx * o, y = cy + p.uy * s + ny * o;
          if (s === -half) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.stroke();
        if (amp === 0) { c.fillStyle = lightColour(pnm, 0.95); c.beginPath(); c.arc(cx, cy, 2.4, 0, 6.283); c.fill(); }
      }
      // electrons
      for (i = 0; i < electrons.length; i++) {
        var e = electrons[i], fade = e.age > 5 ? Math.max(0, 1 - (e.age - 5) / 2) : 1;
        var spd = Math.hypot(e.vx, e.vy);
        if (!reduce.matches) {
          c.strokeStyle = rgba(T.phys, 0.35 * fade); c.lineWidth = 2;
          c.beginPath(); c.moveTo(e.x, e.y); c.lineTo(e.x - e.vx / spd * Math.min(22, spd * 0.06), e.y - e.vy / spd * Math.min(22, spd * 0.06)); c.stroke();
        }
        c.fillStyle = 'rgba(150,240,225,' + fade + ')';
        c.beginPath(); c.arc(e.x, e.y, 2.8, 0, 6.283); c.fill();
      }
      drawBar();
      c.restore();
    }

    // Energy bar: one photon's energy split into "cost to escape" and "left over as motion"
    function drawBar() {
      var c = ctx, B = L.bar, E = photonE(st.f), phi = metal().phi;
      var top = 7;   // eV at the top of the bar
      var hgt = B.y1 - B.y0;
      function yOf(ev) { return B.y1 - hgt * Math.min(ev, top) / top; }
      var w = 14, x = B.x;
      c.fillStyle = 'rgba(232,240,238,0.07)';
      c.fillRect(x, B.y0, w, hgt);
      // energy of one photon
      c.fillStyle = 'rgba(232,240,238,0.28)';
      c.fillRect(x, yOf(Math.min(E, phi)), w, B.y1 - yOf(Math.min(E, phi)));
      if (E > phi) {
        c.fillStyle = rgba(T.phys, 1);
        c.fillStyle = 'rgba(110,225,205,0.95)';
        c.fillRect(x, yOf(E), w, yOf(phi) - yOf(E));
      }
      // work function line
      c.strokeStyle = T.gold; c.lineWidth = 1.5; c.setLineDash([3, 3]);
      c.beginPath(); c.moveTo(x - 6, yOf(phi) + 0.5); c.lineTo(x + w + 4, yOf(phi) + 0.5); c.stroke();
      c.setLineDash([]);
      c.font = '10px ' + T.mono; c.textAlign = 'right'; c.textBaseline = 'middle';
      c.fillStyle = T.gold;
      c.fillText('needs ' + phi.toFixed(1), x - 8, yOf(phi));
      c.fillStyle = T.stageInk;
      var ey = yOf(E);
      if (Math.abs(ey - yOf(phi)) < 12) ey = yOf(phi) + (E > phi ? -12 : 12);
      c.fillText('photon ' + E.toFixed(1), x - 8, ey);
      c.textAlign = 'center'; c.textBaseline = 'top'; c.fillStyle = T.stageMuted;
      c.fillText('eV', x + w / 2, B.y1 + 4);
    }

    function drawPlot() {
      var P = L.P, c = ctx;
      function X(f) { return P.x + (f - F_MIN) / (F_MAX - F_MIN) * P.w; }
      function Y(ke) { return P.y + P.h - ke / KE_AXIS * P.h; }
      c.save();
      c.font = '10px ' + T.mono; c.fillStyle = T.muted; c.strokeStyle = rgba(T.line, 1); c.lineWidth = 1;
      // grid
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (var k = 0; k <= KE_AXIS; k++) {
        var y = Math.round(Y(k)) + 0.5;
        c.strokeStyle = rgba(T.line, k === 0 ? 1 : 0.55);
        c.beginPath(); c.moveTo(P.x, y); c.lineTo(P.x + P.w, y); c.stroke();
        c.fillText(String(k), P.x - 6, y);
      }
      // visible band under the axis
      var by = P.y + P.h + 3;
      for (var px = 0; px <= P.w; px += 1) {
        var f = F_MIN + px / P.w * (F_MAX - F_MIN), nm = C_NM / f, w = waveRGB(nm);
        if (w) { c.fillStyle = 'rgb(' + w[0] + ',' + w[1] + ',' + w[2] + ')'; c.fillRect(P.x + px, by, 1.2, 4); }
      }
      c.textAlign = 'center'; c.textBaseline = 'top'; c.fillStyle = T.muted;
      [400, 800, 1200, 1600].forEach(function (f) { c.fillText(String(f), X(f), by + 7); });
      c.fillText('frequency (THz)', P.x + P.w / 2 + (L.stacked ? 0 : 0), by + 19);
      c.save();
      c.translate(P.x - 30, P.y + P.h / 2); c.rotate(-Math.PI / 2);
      c.textBaseline = 'middle'; c.fillText('fastest electron (eV)', 0, 0);
      c.restore();
      c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = T.muted;
      c.fillText('IR', P.x + 2, by - 7);
      c.textAlign = 'right';
      c.fillText('UV', P.x + P.w - 2, by - 7);

      var m = metal(), f0 = m.phi / H_EV;
      // threshold marker: a faint vertical line labelled at the top
      if (f0 <= F_MAX) {
        c.strokeStyle = rgba(T.gold, 0.55); c.lineWidth = 1; c.setLineDash([2, 3]);
        c.beginPath(); c.moveTo(Math.round(X(f0)) + 0.5, Y(0)); c.lineTo(Math.round(X(f0)) + 0.5, P.y + 4); c.stroke();
        c.setLineDash([]);
        c.fillStyle = T.gold;
        c.beginPath(); c.moveTo(X(f0), Y(0) - 1); c.lineTo(X(f0) - 5, Y(0) - 9); c.lineTo(X(f0) + 5, Y(0) - 9); c.closePath(); c.fill();
        var right = f0 > F_MAX - 220;
        c.font = '10px ' + T.body; c.textAlign = right ? 'right' : 'left'; c.textBaseline = 'top';
        c.fillText('threshold', X(f0) + (right ? -5 : 5), P.y + 2);
      }
      // the rule KE = h f minus work function
      if (st.rule && f0 < F_MAX) {
        c.strokeStyle = T.gold; c.lineWidth = 1.5; c.setLineDash([5, 4]);
        c.beginPath(); c.moveTo(X(f0), Y(0)); c.lineTo(X(F_MAX), Y(H_EV * F_MAX - m.phi)); c.stroke();
        c.setLineDash([]);
      }
      // recorded points: other metals faint, this metal bold
      var keys = Object.keys(points);
      for (var i = 0; i < keys.length; i++) {
        var p = points[keys[i]], mine = p.metal === st.metal;
        var x = X(p.f), yy = Y(p.ke);
        if (mine) {
          if (p.out) { c.fillStyle = T.phys; c.beginPath(); c.arc(x, yy, 3.2, 0, 6.283); c.fill(); }
          else { c.strokeStyle = T.phys; c.lineWidth = 1.2; c.beginPath(); c.arc(x, yy - 3, 2.6, 0, 6.283); c.stroke(); }
        } else {
          c.fillStyle = rgba(T.muted, 0.45); c.beginPath(); c.arc(x, yy - (p.out ? 0 : 3), 2.2, 0, 6.283); c.fill();
        }
      }
      // current setting
      var E = H_EV * st.f, cur = Math.max(0, E - m.phi);
      c.strokeStyle = T.ink; c.lineWidth = 1.5;
      c.beginPath(); c.arc(X(st.f), Y(cur) - (cur > 0 ? 0 : 3), 6, 0, 6.283); c.stroke();
      c.restore();
    }

    function draw() {
      if (!L) return;
      ctx.clearRect(0, 0, W, H);
      drawStage();
      drawPlot();
    }

    /* ---------- loop, observers, input ---------- */
    function frame(t) {
      raf = 0;
      if (!alive) return;
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      if (L) step(dt);
      draw();
      schedule();
    }
    function schedule() {
      if (!raf && alive && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }

    // drag across the plot to choose a frequency
    var dragging = false;
    function plotF(ev) {
      var r = canvas.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
      var P = L.P;
      if (!dragging && (x < P.x - 10 || x > P.x + P.w + 10 || y < P.y - 10 || y > P.y + P.h + 30)) return false;
      st.f = Math.round(clamp(F_MIN + (x - P.x) / P.w * (F_MAX - F_MIN), F_MIN, F_MAX) / 5) * 5;
      fR.set(st.f);
      settingsChanged(false);
      return true;
    }
    function onDown(ev) { if (L && plotF(ev)) { dragging = true; try { canvas.setPointerCapture(ev.pointerId); } catch (e) {} } }
    function onMove(ev) { if (dragging) plotF(ev); }
    function onUp() { dragging = false; }
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    var ro = new ResizeObserver(function () { size(); });
    ro.observe(root);
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      onScreen = es[es.length - 1].isIntersecting;
      if (onScreen) schedule(); else stop();
    }) : null;
    if (io) io.observe(root);
    function onVis() { if (document.hidden) stop(); else schedule(); }
    document.addEventListener('visibilitychange', onVis);
    var themeTimer = 0;
    function onTheme() {
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () { if (!alive) return; colourCache = {}; T = readTheme(); draw(); }, 30);
    }
    document.addEventListener('kls-theme', onTheme);
    if (darkMq) { if (darkMq.addEventListener) darkMq.addEventListener('change', onTheme); else if (darkMq.addListener) darkMq.addListener(onTheme); }

    size();
    record();
    updateReadout();
    schedule();

    return {
      destroy: function () {
        alive = false;
        stop();
        clearTimeout(themeTimer);
        ro.disconnect();
        if (io) io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        document.removeEventListener('kls-theme', onTheme);
        if (darkMq) { if (darkMq.removeEventListener) darkMq.removeEventListener('change', onTheme); else if (darkMq.removeListener) darkMq.removeListener(onTheme); }
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'The photoelectric effect',
    blurb: 'Shine light on a metal and watch for electrons: the colour of the light decides whether any escape, the brightness only decides how many.',
    try: [
      'Choose bright red light. Not a single electron leaves the sodium, however bright you make it.',
      'Now try dim violet. A few electrons escape at once, and they are fast. One photon frees one electron.',
      'Slide the colour slowly from red to ultraviolet and watch the plot build. Every metal gives a straight line with the same slope.',
      'Switch to zinc or copper. Visible light is no longer enough; they need ultraviolet photons.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
