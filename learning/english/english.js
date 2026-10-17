/* =========================================================
   learning/english/english.js
   Shared pieces for the English speaking tools: a recorder
   widget (record, level meter, timer, playback, optional live
   pitch line) and the "send this take to the Coach" helper.
   Needs core.js and shared/audio.js (pitch.js optional).
   ========================================================= */

(function (g) {
  const { esc, ICON } = KLS;

  // KLSRec.mount(el, { maxMs, pitch: bool, label, onTake(take) }) -> { reset() }
  function mount(el, opts) {
    const o = Object.assign({ maxMs: 90000, pitch: false, label: 'Record' }, opts);
    el.innerHTML = `
      <div class="row" style="flex-wrap:nowrap">
        <button type="button" class="btn rec" data-rec>${ICON.mic}<span>${esc(o.label)}</span></button>
        <div style="flex:1;min-width:60px"><div class="meter"><i></i></div><div class="small muted mono" data-time style="margin-top:4px">0:00</div></div>
      </div>
      ${o.pitch ? '<canvas class="pitch" data-pitch style="margin-top:12px" aria-label="Your pitch line"></canvas><p class="small muted" style="margin:6px 0 0">The line is your pitch. Rises go up, falls go down. Gaps are silence or unvoiced sounds.</p>' : ''}
      <div data-play style="margin-top:12px;display:none"><audio controls style="width:100%"></audio></div>
      <p class="notice" data-err style="display:none;margin-top:10px"></p>`;
    const btn = el.querySelector('[data-rec]');
    const meter = el.querySelector('.meter > i');
    const time = el.querySelector('[data-time]');
    const playWrap = el.querySelector('[data-play]');
    const audio = playWrap.querySelector('audio');
    const errEl = el.querySelector('[data-err]');
    const line = o.pitch && g.KLSPitch ? new KLSPitch.Line(el.querySelector('[data-pitch]')) : null;
    if (line) line.redraw();
    let rec = null, stopPitch = null, take = null;

    const showErr = (m) => { errEl.textContent = m; errEl.style.display = m ? 'block' : 'none'; };
    const fmt = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
    function setIdle() { btn.classList.remove('on'); btn.querySelector('span').textContent = take ? 'Record again' : o.label; meter.style.width = '0'; }

    async function finish() {
      if (!rec) return;
      const r = rec; rec = null;
      try {
        const t = await r.stop();
        if (stopPitch) { stopPitch(); stopPitch = null; }
        setIdle();
        if (!t || !t.blob || t.durationMs < 600) { showErr('That take was too short. Try again.'); return; }
        take = t;
        audio.src = t.url; playWrap.style.display = 'block';
        setIdle();
        if (o.onTake) o.onTake(t);
      } catch (e) { setIdle(); showErr(e.message); }
    }

    btn.addEventListener('click', async () => {
      if (rec) { finish(); return; }
      showErr('');
      KLS.speech.stop();
      rec = JglAudio.createRecorder({
        maxMs: o.maxMs,
        onLevel: (v) => { meter.style.width = Math.round(v * 100) + '%'; },
        onTick: (ms) => { time.textContent = fmt(ms) + (o.maxMs ? ' / ' + fmt(o.maxMs) : ''); },
        onAutoStop: () => finish(),
        onStream: (stream) => { if (line) { line.clear(); stopPitch = KLSPitch.track(stream, (hz, lv) => line.push(hz, lv)); } },
      });
      try {
        await rec.start();
        btn.classList.add('on'); btn.querySelector('span').textContent = 'Stop';
      } catch (e) { rec = null; setIdle(); showErr(e.message); }
    });
    return { reset() { take = null; playWrap.style.display = 'none'; time.textContent = '0:00'; if (line) line.clear(); setIdle(); showErr(''); }, get take() { return take; } };
  }

  // Send a take plus a prompt to the Coach; renders into out.
  async function coachTake(out, take, promptSpec, logEntry) {
    out.style.display = 'block';
    out.innerHTML = KLS.thinking();
    try {
      const base64 = take.base64 || await JglAudio.blobToBase64(take.blob);
      await KLS.loadScript('shared/coach.js');
      const spec = typeof promptSpec === 'function' ? promptSpec(g.KLSCoach.P) : promptSpec;
      const text = await KLS.ai(Object.assign({}, spec, { audio: { base64, mimeType: JglAudio.geminiMime(take.mimeType) } }));
      out.innerHTML = `<div class="msg ai">${KLS.coachHtml(text)}</div><p class="small muted" style="margin:8px 2px 0">AI listening is good on pace and clarity, less exact on single sounds. Trust your ear too.</p>`;
      if (logEntry) KLS.store.update(s => { s.speaking.push(Object.assign({ iso: new Date().toISOString(), feedback: text }, logEntry)); if (s.speaking.length > 200) s.speaking.shift(); });
      return text;
    } catch (e) {
      out.innerHTML = `<p class="notice">${esc(e.message)}</p>`;
    }
  }

  // Normalise for comparing recognised speech to a target word.
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-zÀ-ɏ' ]/g, ' ').replace(/\s+/g, ' ').trim();

  g.KLSRec = { mount, coachTake, norm };
})(window);
