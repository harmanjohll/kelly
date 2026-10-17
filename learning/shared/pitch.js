/* =========================================================
   learning/shared/pitch.js
   Live pitch line for speaking practice. Autocorrelation pitch
   detection on the microphone stream, drawn as a contour so
   rises and falls in intonation become visible.

   KLSPitch.track(stream, onFrame(hz|null, level)) -> stop()
   new KLSPitch.Line(canvas) -> { push(hz, level), clear(), redraw() }
   ========================================================= */

(function (g) {
  // Autocorrelation with a clarity threshold; returns Hz or null.
  function detect(buf, rate) {
    const n = buf.length;
    let rms = 0;
    for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / n);
    if (rms < 0.012) return { hz: null, level: rms };
    const minLag = Math.floor(rate / 500), maxLag = Math.floor(rate / 70);
    let best = -1, bestCorr = 0;
    const corr = new Float32Array(maxLag + 2);
    for (let lag = minLag; lag <= maxLag; lag++) {
      let s = 0, e1 = 0, e2 = 0;
      for (let i = 0; i + lag < n; i++) { s += buf[i] * buf[i + lag]; e1 += buf[i] * buf[i]; e2 += buf[i + lag] * buf[i + lag]; }
      const c = s / Math.sqrt(e1 * e2 || 1);
      corr[lag] = c;
      if (c > bestCorr) { bestCorr = c; best = lag; }
    }
    if (bestCorr < 0.82 || best < 0) return { hz: null, level: rms };
    // Prefer the first strong peak, which avoids octave errors.
    for (let lag = minLag; lag < best; lag++) {
      if (corr[lag] > 0.92 * bestCorr && corr[lag] >= corr[lag - 1] && corr[lag] >= corr[lag + 1]) { best = lag; break; }
    }
    const a = corr[best - 1] || 0, b = corr[best], c = corr[best + 1] || 0;
    const shift = (a - c) / (2 * (a - 2 * b + c) || 1);
    return { hz: rate / (best + (isFinite(shift) ? shift : 0)), level: rms };
  }

  function track(stream, onFrame) {
    const Ctx = g.AudioContext || g.webkitAudioContext;
    if (!Ctx) return () => {};
    const ctx = new Ctx();
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume().catch(() => {});
    const src = ctx.createMediaStreamSource(stream);
    const an = ctx.createAnalyser();
    an.fftSize = 2048;
    src.connect(an);
    const buf = new Float32Array(an.fftSize);
    let raf = 0, last = 0;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 33) return; // about 30 frames a second is plenty
      last = t;
      an.getFloatTimeDomainData(buf);
      const r = detect(buf, ctx.sampleRate);
      onFrame(r.hz, r.level);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); try { src.disconnect(); } catch (_) {} try { ctx.close(); } catch (_) {} };
  }

  // Contour in semitones around the speaker's own running median,
  // so it works for any voice without calibration.
  function Line(canvas) {
    const pts = [];
    const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    function size() {
      const dpr = Math.min(2, g.devicePixelRatio || 1);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      const c = canvas.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { c, w, h };
    }
    function median() {
      const v = pts.filter(p => p.hz).map(p => p.hz).sort((a, b) => a - b);
      return v.length ? v[Math.floor(v.length / 2)] : 180;
    }
    function redraw() {
      const { c, w, h } = size();
      c.clearRect(0, 0, w, h);
      const mid = h / 2, perSemi = h / 26;
      c.strokeStyle = css('--line'); c.lineWidth = 1;
      [-8, 0, 8].forEach(s => { c.beginPath(); c.moveTo(0, mid - s * perSemi); c.lineTo(w, mid - s * perSemi); c.stroke(); });
      c.fillStyle = css('--muted'); c.font = '11px ' + css('--font-body');
      c.fillText('higher', 6, 14); c.fillText('lower', 6, h - 6);
      if (!pts.length) return;
      const m = median();
      const step = Math.max(1.5, w / Math.max(160, pts.length));
      const x0 = Math.max(0, w - pts.length * step);
      // Loudness as a soft band, pitch as the line.
      c.fillStyle = css('--surface');
      pts.forEach((p, i) => { const bh = Math.min(h * 0.9, p.level * h * 6); c.fillRect(x0 + i * step, mid - bh / 2, step, bh); });
      c.strokeStyle = css('--eng') || css('--ink'); c.lineWidth = 3; c.lineJoin = 'round'; c.lineCap = 'round';
      c.beginPath(); let on = false;
      pts.forEach((p, i) => {
        if (!p.hz) { on = false; return; }
        const semi = 12 * Math.log2(p.hz / m);
        const y = Math.max(4, Math.min(h - 4, mid - semi * perSemi));
        const x = x0 + i * step;
        if (on) c.lineTo(x, y); else c.moveTo(x, y);
        on = true;
      });
      c.stroke();
    }
    return {
      push(hz, level) { pts.push({ hz: hz && hz > 60 && hz < 520 ? hz : null, level: level || 0 }); if (pts.length > 600) pts.shift(); redraw(); },
      clear() { pts.length = 0; redraw(); },
      redraw,
      get points() { return pts.slice(); },
    };
  }

  g.KLSPitch = { track, Line, detect };
})(window);
