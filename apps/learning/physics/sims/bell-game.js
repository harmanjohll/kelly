/* Kelly's Learning Studio: the CHSH game.
   A referee gives Alice a coin x and Bob a coin y. Without talking they
   answer bits a and b, and win when a XOR b equals x AND y. Any fixed
   (deterministic) pair of rules wins at most 3 of the 4 coin pairs: 75%.
   Sharing entangled pairs and measuring at 0° or 45° (Alice) and
   22.5° or −22.5° (Bob) gives cos²(22.5°) ≈ 85.4%. Quantum outcomes are
   sampled with the correct joint probabilities: each answer alone is a
   fair coin, and P(a = b) = cos²(α − β). Self contained. */
(function (g) {
  'use strict';
  var ID = 'bell-game';

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
    '.sim-bell-game .sim-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center}',
    '.sim-bell-game .sim-group{display:flex;flex-wrap:wrap;gap:8px}',
    '.sim-bell-game .sim-control{flex-basis:150px}',
    '.sim-bell-game .sim-note{font-size:.88rem;color:var(--ink);margin:10px 2px 0;line-height:1.5}',
    '.sim-bell-game [hidden]{display:none !important}'
  ].join('\n');

  var RULES = [
    { id: 'zero', label: 'Always say 0', short: 'always 0', f: function () { return 0; } },
    { id: 'one', label: 'Always say 1', short: 'always 1', f: function () { return 1; } },
    { id: 'copy', label: 'Say my coin', short: 'says coin', f: function (x) { return x; } },
    { id: 'flip', label: 'Say the opposite of my coin', short: 'says opposite', f: function (x) { return 1 - x; } }
  ];
  var QA = [0, 45], QB = [22.5, -22.5];
  var BEST_Q = Math.pow(Math.cos(Math.PI / 8), 2);

  function mount(el) {
    injectCSS(CSS);
    var inSim = el.classList.contains('sim') || (el.closest && el.closest('.sim'));
    var root = h('div', 'sim-' + ID + (inSim ? '' : ' sim'));
    el.appendChild(root);

    function blank() { return { n: 0, wins: 0, aOnes: 0, bOnes: 0, hist: [] }; }
    var s = {
      mode: 'classical', ra: 0, rb: 0,
      data: { classical: blank(), quantum: blank() },
      last: null, flip: 0, queue: 0, perSec: 0, acc: 0
    };

    function exactClassical() {
      var w = 0;
      for (var x = 0; x < 2; x++) for (var y = 0; y < 2; y++)
        if ((RULES[s.ra].f(x) ^ RULES[s.rb].f(y)) === (x & y)) w++;
      return w;
    }
    function playRound() {
      var x = Math.random() < 0.5 ? 0 : 1, y = Math.random() < 0.5 ? 0 : 1, a, b;
      if (s.mode === 'classical') { a = RULES[s.ra].f(x); b = RULES[s.rb].f(y); }
      else {
        var d = (QA[x] - QB[y]) * Math.PI / 180;
        a = Math.random() < 0.5 ? 0 : 1;
        b = Math.random() < Math.cos(d) * Math.cos(d) ? a : 1 - a;
      }
      var win = (a ^ b) === (x & y);
      var D = s.data[s.mode];
      D.n++; if (win) D.wins++; D.aOnes += a; D.bOnes += b;
      D.hist.push(D.wins / D.n);
      s.last = { x: x, y: y, a: a, b: b, win: win, mode: s.mode };
    }

    /* ---------- drawing ---------- */
    function draw(ctx, st) {
      var C = st.C, W = st.W, H = st.H;
      ctx.clearRect(0, 0, W, H);
      var sceneH = 178;
      drawScene(ctx, C, W, sceneH);
      drawChart(ctx, C, W, H, sceneH);
    }
    function coin(ctx, C, cx, cy, r, bit, spin) {
      var sx = Math.abs(Math.cos(spin * Math.PI));
      ctx.save(); ctx.translate(cx, cy); ctx.scale(Math.max(0.08, sx), 1);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = C.surface; ctx.fill();
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r - 4, 0, Math.PI * 2); ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
      if (bit != null && sx > 0.3) {
        ctx.fillStyle = C.ink; ctx.font = '600 14px ' + C.mono; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(bit), 0, 1);
      }
      ctx.restore(); ctx.textBaseline = 'alphabetic';
    }
    function drawPlayer(ctx, C, cx, name, coinBit, setting, out, spin) {
      ctx.fillStyle = C.ink; ctx.font = '600 13px ' + C.body; ctx.textAlign = 'center';
      ctx.fillText(name, cx, 18);
      // coin from the referee
      coin(ctx, C, cx - 30, 46, 14, coinBit, spin);
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText('coin', cx - 10, 50);
      // what they do with it
      var dy = 90;
      if (s.mode === 'quantum') {
        ctx.strokeStyle = C.phys; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(cx - 30, dy, 13, 0, Math.PI * 2); ctx.stroke();
        if (setting != null) {
          var ang = (90 - setting) * Math.PI / 180;
          ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(cx - 30 - 13 * Math.cos(ang), dy + 13 * Math.sin(ang)); ctx.lineTo(cx - 30 + 13 * Math.cos(ang), dy - 13 * Math.sin(ang)); ctx.stroke();
        }
        ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'left';
        ctx.fillText(setting != null ? 'measure ' + fmtAngle(setting) : 'measure', cx - 10, dy + 4);
      } else {
        ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'center';
        ctx.fillText('rule: ' + (name === 'Alice' ? RULES[s.ra].short : RULES[s.rb].short), cx, dy + 4);
      }
      // answer
      var oy = 132;
      ctx.strokeStyle = out != null ? C.ink : C.line; ctx.lineWidth = 1.5;
      roundRect(ctx, cx - 44, oy - 15, 28, 28, 6); ctx.stroke();
      if (out != null) {
        ctx.fillStyle = C.ink; ctx.font = '600 15px ' + C.mono; ctx.textAlign = 'center';
        ctx.fillText(String(out), cx - 30, oy + 5);
      }
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText('answer', cx - 10, oy + 4);
    }
    function fmtAngle(a) { return (a < 0 ? '−' + Math.abs(a) : String(a)) + '°'; }
    function roundRect(ctx, x, y, w, hh, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + hh, r); ctx.arcTo(x + w, y + hh, x, y + hh, r);
      ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function drawScene(ctx, C, W, sceneH) {
      var L = s.last && s.last.mode === s.mode ? s.last : null;
      var spinning = s.flip > 0;
      var ax = W * 0.25, bx = W * 0.75;
      // the wall
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(W / 2, s.mode === 'quantum' ? 40 : 8); ctx.lineTo(W / 2, sceneH - 30); ctx.stroke(); ctx.setLineDash([]);
      ctx.save(); ctx.translate(W / 2 - 6, (sceneH - 30 + 50) / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'center'; ctx.fillText('no talking', 0, 0); ctx.restore();
      if (s.mode === 'quantum') {
        ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(W / 2, 24, 6, 0, Math.PI * 2); ctx.fill();
        ctx.font = '10px ' + C.body; ctx.textAlign = 'center'; ctx.fillStyle = C.gold;
        ctx.fillText('shared pairs', W / 2, 11);
        if (spinning) {
          var k = 1 - s.flip;
          ctx.beginPath(); ctx.arc(W / 2 - (W / 2 - ax + 30) * k, 24 + 66 * k, 4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(W / 2 + (bx - 30 - W / 2) * k, 24 + 66 * k, 4, 0, Math.PI * 2); ctx.fill();
        }
      }
      var show = L && !spinning;
      drawPlayer(ctx, C, ax, 'Alice', L ? L.x : null, L && s.mode === 'quantum' ? QA[L.x] : null, show ? L.a : null, spinning ? s.flip * 2 : 0);
      drawPlayer(ctx, C, bx, 'Bob', L ? L.y : null, L && s.mode === 'quantum' ? QB[L.y] : null, show ? L.b : null, spinning ? s.flip * 2 + 0.3 : 0);
      // verdict
      var vy = sceneH - 8;
      ctx.font = '12px ' + C.body; ctx.textAlign = 'center';
      if (show) {
        var need = (L.x & L.y) ? 'both coins 1, so answers must differ' : 'answers must match';
        var res = L.win ? 'win' : 'lose';
        ctx.font = '12px ' + C.body; var w1 = ctx.measureText(need + ': ').width;
        ctx.font = '600 12px ' + C.body; var w2 = ctx.measureText(res).width;
        var sx0 = W / 2 - (w1 + w2) / 2;
        ctx.textAlign = 'left'; ctx.font = '12px ' + C.body; ctx.fillStyle = C.muted;
        ctx.fillText(need + ': ', sx0, vy);
        ctx.font = '600 12px ' + C.body; ctx.fillStyle = L.win ? C.phys : C.gold;
        ctx.fillText(res, sx0 + w1, vy);
      } else if (!L) {
        ctx.fillStyle = C.muted; ctx.fillText('They win if answers match, unless both coins are 1.', W / 2, vy);
      }
    }
    function drawChart(ctx, C, W, H, sceneH) {
      var left = 38, right = W - 10, top = sceneH + 22, bot = H - 20;
      var c = s.data.classical, q = s.data.quantum;
      var lo = 0.5;
      [c, q].forEach(function (D) { if (D.n >= 20 && D.wins / D.n < 0.6) lo = 0; });
      var Y = function (v) { return bot - (v - lo) / (1 - lo) * (bot - top); };
      var nMax = Math.max(100, c.n, q.n);
      var X = function (i) { return left + (i / nMax) * (right - left); };
      ctx.fillStyle = C.muted; ctx.font = '11px ' + C.body; ctx.textAlign = 'left';
      ctx.fillText('Win rate so far', left, top - 9);
      // grid
      ctx.lineWidth = 1; ctx.strokeStyle = C.line;
      (lo ? [0.5, 1] : [0, 0.5, 1]).forEach(function (v) {
        ctx.beginPath(); ctx.moveTo(left, Math.round(Y(v)) + 0.5); ctx.lineTo(right, Math.round(Y(v)) + 0.5); ctx.stroke();
        ctx.fillStyle = C.muted; ctx.font = '10px ' + C.mono; ctx.textAlign = 'right';
        ctx.fillText(Math.round(v * 100) + '%', left - 5, Y(v) + 3);
      });
      // reference lines
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(left, Y(0.75)); ctx.lineTo(right, Y(0.75)); ctx.stroke();
      ctx.strokeStyle = C.phys; ctx.beginPath(); ctx.moveTo(left, Y(BEST_Q)); ctx.lineTo(right, Y(BEST_Q)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.save(); ctx.beginPath(); ctx.rect(left - 4, top - 4, right - left + 8, bot - top + 8); ctx.clip();
      series(ctx, c.hist, X, Y, C.ink, 1.6);
      series(ctx, q.hist, X, Y, C.phys, 2);
      ctx.restore();
      ctx.font = '10px ' + C.mono; ctx.textAlign = 'right';
      ctx.fillStyle = C.muted; ctx.fillText('75%', left - 5, Y(0.75) + 9);
      ctx.fillStyle = C.phys; ctx.fillText('85%', left - 5, Y(BEST_Q) - 1);
      ctx.font = '10px ' + C.body; ctx.textAlign = 'right';
      ctx.lineWidth = 4; ctx.strokeStyle = C.bg; ctx.lineJoin = 'round';
      ctx.strokeText('best with fixed rules', right - 2, Y(0.75) + 12);
      ctx.fillStyle = C.muted; ctx.fillText('best with fixed rules', right - 2, Y(0.75) + 12);
      ctx.strokeText('entangled, cos²22.5° = 85.4%', right - 2, Y(BEST_Q) - 4);
      ctx.fillStyle = C.phys; ctx.fillText('entangled, cos²22.5° = 85.4%', right - 2, Y(BEST_Q) - 4);
      ctx.fillStyle = C.muted; ctx.font = '10px ' + C.body; ctx.textAlign = 'right';
      ctx.fillText(nMax + ' rounds', right, bot + 14);
      ctx.textAlign = 'left'; ctx.fillText('0', left, bot + 14);
    }
    function series(ctx, hist, X, Y, col, lw) {
      var n = hist.length;
      if (!n) return;
      var step = Math.max(1, Math.floor(n / 500));
      ctx.beginPath();
      for (var i = 0; i < n; i += step) { if (i === 0) ctx.moveTo(X(i + 1), Y(hist[i])); else ctx.lineTo(X(i + 1), Y(hist[i])); }
      ctx.lineTo(X(n), Y(hist[n - 1]));
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke();
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(n), Y(hist[n - 1]), 3, 0, Math.PI * 2); ctx.fill();
    }

    /* ---------- loop ---------- */
    function tick(dt) {
      if (s.flip > 0) {
        s.flip = Math.max(0, s.flip - dt / 0.55);
        if (s.flip === 0) updateReadout();
      }
      if (s.queue > 0) {
        s.acc += dt * s.perSec;
        var k = Math.min(s.queue, Math.floor(s.acc));
        s.acc -= k;
        for (var i = 0; i < k; i++) playRound();
        s.queue -= k;
        if (k) updateReadout();
      }
      if (s.flip === 0 && s.queue === 0) st.setAnimating(false);
    }

    var stageWrap = h('div');
    root.appendChild(stageWrap);
    var st = stage(stageWrap, {
      label: 'Alice and Bob each get a coin and answer without talking; a chart shows their running win rate',
      touch: 'pan-y',
      height: function (w) { return clamp(Math.round(w * 1.05), 380, 430); },
      draw: draw, tick: tick
    });

    var readout = h('div', 'sim-readout');
    readout.setAttribute('aria-live', 'polite');
    root.appendChild(readout);

    var modeRow = h('div', 'sim-presets');
    var mC = chip('Fixed rules', true), mQ = chip('Entangled pairs', false);
    modeRow.appendChild(mC); modeRow.appendChild(mQ);
    root.appendChild(modeRow);

    var controls = h('div', 'sim-controls');
    function ruleSelect(label, who) {
      var wrap = h('label', 'sim-control');
      wrap.appendChild(h('span', null, label));
      var sel = document.createElement('select');
      RULES.forEach(function (r, i) { var o = document.createElement('option'); o.value = i; o.textContent = r.label; sel.appendChild(o); });
      sel.addEventListener('change', function () {
        if (who === 'a') s.ra = +sel.value; else s.rb = +sel.value;
        s.data.classical = blank(); if (s.last && s.last.mode === 'classical') s.last = null;
        updateReadout(); st.redraw();
      });
      wrap.appendChild(sel);
      return wrap;
    }
    var selA = ruleSelect("Alice's rule", 'a'), selB = ruleSelect("Bob's rule", 'b');
    controls.appendChild(selA); controls.appendChild(selB);
    var qInfo = h('p', 'sim-note', 'Each round they share one entangled pair, made before the coins are tossed. Alice measures hers at 0° if her coin is 0, or 45° if it is 1. Bob uses 22.5° or −22.5°. Each answers with what their own measurement shows.');
    qInfo.hidden = true;
    root.appendChild(controls);
    root.appendChild(qInfo);

    var row = h('div', 'sim-row');
    var b1 = button('Play 1', 'primary'), b100 = button('Play 100'), b1000 = button('Play 1000'), bR = button('Reset');
    var grp = h('div', 'sim-group');
    grp.appendChild(b1); grp.appendChild(b100); grp.appendChild(b1000); grp.appendChild(bR);
    row.appendChild(grp);
    root.appendChild(row);

    var note = h('p', 'sim-note', 'No message passes between Alice and Bob, and each one’s answers on their own look like fair coin tosses. The extra wins only appear when the two lists are compared afterwards.');
    root.appendChild(note);

    function pct(x, d) { return (x * 100).toFixed(d == null ? 1 : d) + '%'; }
    function updateReadout() {
      var D = s.data[s.mode], lines = [];
      if (s.mode === 'classical') {
        var w = exactClassical();
        lines.push('These rules win ' + w + ' of the 4 coin pairs, so ' + (w * 25) + '% in the long run. No fixed rules win all 4.');
      } else {
        lines.push('Entangled pairs: expected ' + pct(BEST_Q) + ' in the long run.');
      }
      if (D.n) {
        lines.push(D.n + ' rounds, won ' + D.wins + ' (' + pct(D.wins / D.n) + '). Alice said 1 in ' + pct(D.aOnes / D.n, 0) + ' of rounds, Bob in ' + pct(D.bOnes / D.n, 0) + '.');
      }
      var other = s.data[s.mode === 'classical' ? 'quantum' : 'classical'];
      if (other.n) lines.push((s.mode === 'classical' ? 'Entangled' : 'Fixed rules') + ' so far: ' + pct(other.wins / other.n) + ' over ' + other.n + ' rounds.');
      readout.textContent = lines.join(' ');
    }
    function setMode(m) {
      s.mode = m; s.queue = 0; s.flip = 0;
      setChip(mC, m === 'classical'); setChip(mQ, m === 'quantum');
      controls.hidden = m !== 'classical'; qInfo.hidden = m === 'classical';
      updateReadout(); st.redraw();
    }
    function run(n) {
      if (n === 1) {
        if (s.queue) return;
        playRound();
        if (st.reduced) { updateReadout(); st.redraw(); return; }
        s.flip = 1; st.setAnimating(true);
        return;
      }
      if (st.reduced) { for (var i = 0; i < n; i++) playRound(); updateReadout(); st.redraw(); return; }
      s.flip = 0;
      s.queue += n; s.perSec = n <= 100 ? 120 : 700; s.acc = 0;
      st.setAnimating(true);
    }
    mC.addEventListener('click', function () { setMode('classical'); });
    mQ.addEventListener('click', function () { setMode('quantum'); });
    b1.addEventListener('click', function () { run(1); });
    b100.addEventListener('click', function () { run(100); });
    b1000.addEventListener('click', function () { run(1000); });
    bR.addEventListener('click', function () {
      s.data = { classical: blank(), quantum: blank() }; s.last = null; s.queue = 0; s.flip = 0;
      updateReadout(); st.redraw();
    });

    setMode('classical');

    return {
      destroy: function () {
        st.destroy();
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS[ID] = {
    title: 'The Bell game',
    blurb: 'Two players who cannot talk try to coordinate their answers, and shared entangled particles let them win more often than any plan could.',
    try: [
      'Try every pair of fixed rules and play 1000 rounds each. None beats 75%.',
      'Switch to Entangled pairs and play 1000. The win rate settles near 85%, above the line no plan can cross.',
      'Look at how often Alice and Bob each say 1. On their own, their answers are as random as coin tosses.',
      'Play single rounds and watch for the case where both coins are 1. That is where the angles earn their keep.'
    ],
    mount: mount
  };
})(typeof window !== 'undefined' ? window : globalThis);
