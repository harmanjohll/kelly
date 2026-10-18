/* =========================================================
   learning/shared/core.js
   The KLS namespace: storage, page chrome (top bar, tab bar,
   settings), node lookup across domains, review scheduler,
   speech (text to speech and recognition), AI loader, helpers.
   Every page loads this first.
   ========================================================= */

(function (g) {
  if (g.KLS) return;

  const here = document.currentScript && document.currentScript.src;
  const ROOT = here ? here.replace(/shared\/core\.js(\?.*)?$/, '') : './';

  // ---------- helpers ----------
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Body text may carry <em> only; everything else is escaped.
  const rich = (s) => esc(s).replace(/&lt;(\/?)em&gt;/g, '<$1em>');
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const param = (k) => new URLSearchParams(location.search).get(k);
  function todayIso(d) {
    const x = d || new Date();
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  }
  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    return todayIso(new Date(y, m - 1, d + n));
  }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  // Same pick all day, different tomorrow.
  function dailyPick(list, salt) {
    if (!list || !list.length) return null;
    return list[hashStr(todayIso() + (salt || '')) % list.length];
  }
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------- icons (stroke icons, 24 grid) ----------
  const ICON = {
    today: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    explore: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
    web: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5"/><circle cx="4.5" cy="6" r="2"/><circle cx="19.5" cy="6" r="2"/><circle cx="5" cy="18.5" r="2"/><circle cx="19" cy="18" r="2"/><path d="M6.3 7.1l3.6 3.3M17.7 7.1l-3.6 3.3M6.7 17.3l3.4-3.6M17.3 16.8l-3.3-3"/></svg>',
    practise: '<svg viewBox="0 0 24 24"><path d="M4 19V9M9.3 19V5M14.7 19v-7M20 19V8"/></svg>',
    you: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    philosophy: '<svg viewBox="0 0 24 24"><path d="M5 21h14M6 21V9M10 21V9M14 21V9M18 21V9M3.5 9h17L12 3.5z"/></svg>',
    physics: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
    psychology: '<svg viewBox="0 0 24 24"><path d="M9.5 21v-3.2c-2.7-.7-5-3.1-5-6.6A7.3 7.3 0 0 1 12 4a7 7 0 0 1 7.3 6.6l1.7 3.2h-2v2.6a1.6 1.6 0 0 1-1.6 1.6H15V21"/><path d="M10 10.5a2.3 2.3 0 0 1 4.3-1.2"/></svg>',
    english: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8.5 8h7M8.5 11.5h5"/></svg>',
  };
  const playBtn = (text, label) => `<button type="button" class="play" data-say="${esc(text)}" aria-label="${esc(label || 'Hear ' + text)}">${ICON.play}</button>`;

  // ---------- domains ----------
  const DOMAINS = {
    philosophy: { id: 'philosophy', name: 'Philosophy', prefix: 'phil', colourVar: '--phil', href: 'philosophy/', blurb: 'What is real, what can we know, how should we live.' },
    physics:    { id: 'physics', name: 'Quantum Physics', prefix: 'phys', colourVar: '--phys', href: 'physics/', blurb: 'The strange, exact rules of the very small.' },
    psychology: { id: 'psychology', name: 'Psychology', prefix: 'psy', colourVar: '--psy', href: 'psychology/', blurb: 'How minds perceive, remember, feel and decide.' },
    english:    { id: 'english', name: 'English', prefix: 'eng', colourVar: '--eng', href: 'english/', blurb: 'Words, sounds, idioms and the music of speech.' },
  };
  const PREFIX_TO_DOMAIN = { phil: 'philosophy', phys: 'physics', psy: 'psychology', eng: 'english' };
  const domainOf = (id) => PREFIX_TO_DOMAIN[String(id).split('.')[0]] || null;

  // ---------- storage ----------
  const KEY = 'kls.progress';
  const DEFAULTS = () => ({
    version: 1,
    profile: { name: 'Kelly', voice: 'en-GB', rate: 1, theme: 'night', streaks: false },
    seen: {}, saved: {}, review: {}, modules: {}, minutes: {}, sessions: [], explains: [], speaking: [],
  });
  let cache = null;
  function load() {
    if (cache) return cache;
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) { raw = null; }
    const d = DEFAULTS();
    cache = raw && typeof raw === 'object' ? Object.assign(d, raw, { profile: Object.assign(d.profile, raw.profile || {}) }) : d;
    return cache;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (_) {} }
  const store = {
    get: load,
    update(fn) { const s = load(); fn(s); save(); return s; },
    replace(obj) { cache = null; try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (_) {} return load(); },
    reset() { cache = null; try { localStorage.removeItem(KEY); } catch (_) {} return load(); },
  };

  function markSeen(id) { store.update(s => { if (!s.seen[id]) s.seen[id] = new Date().toISOString(); }); }
  function toggleSaved(id) { let on; store.update(s => { on = !s.saved[id]; if (on) s.saved[id] = true; else delete s.saved[id]; }); return on; }

  // Minutes studied: count half minutes while the page is visible and touched recently.
  let lastActivity = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastActivity = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState !== 'visible' || Date.now() - lastActivity > 120000) return;
    store.update(s => { const t = todayIso(); s.minutes[t] = Math.round(((s.minutes[t] || 0) + 0.5) * 10) / 10; });
  }, 30000);

  // ---------- review scheduler ----------
  // Steps in days. "Not yet" resets to the first step; "Shaky" repeats the current one.
  const STEPS = [1, 2, 4, 8, 16, 30, 60];
  const spaced = {
    STEPS,
    has(key) { return !!load().review[key]; },
    add(key) { store.update(s => { if (!s.review[key]) s.review[key] = { step: 0, due: todayIso(), attempts: 0, lapses: 0, lastIso: null }; }); },
    remove(key) { store.update(s => { delete s.review[key]; }); },
    rate(key, grade) { // grade: 0 not yet, 1 shaky, 2 knew it
      store.update(s => {
        const r = s.review[key] || { step: 0, attempts: 0, lapses: 0 };
        r.attempts++;
        if (grade === 0) { r.step = 0; r.lapses++; }
        else if (grade === 2) r.step = Math.min(r.step + 1, STEPS.length - 1);
        r.due = addDays(todayIso(), grade === 0 ? 1 : STEPS[r.step]);
        r.lastIso = new Date().toISOString();
        s.review[key] = r;
      });
    },
    due(on) { const t = on || todayIso(); return Object.entries(load().review).filter(([, r]) => r.due <= t).map(([k]) => k); },
    // "Settled": reviewed successfully at least twice in a row past the first step.
    settled() { return Object.values(load().review).filter(r => r.step >= 2).length; },
  };

  // ---------- content lookup ----------
  function data(domain) { return (g.KLS_DATA || {})[domain] || null; }
  // English words, tricky words and the from-ideas hub expressed as nodes.
  let engNodes = null;
  function englishNodes() {
    const E = data('english');
    if (!E) return [];
    if (engNodes) return engNodes;
    const deckLabel = Object.fromEntries((E.decks || []).map(d => [d.id, d.label]));
    engNodes = (E.words || []).map(w => ({
      id: w.id, kind: 'word', deck: w.deck, title: w.term, line: w.meaning, domain: 'english', theme: w.theme,
      body: [w.meaning, 'For example: ' + w.example], links: w.links || [], word: w, kindLabel: deckLabel[w.deck] || 'Word',
    }));
    engNodes.push({ id: 'eng.from-ideas', kind: 'hub', title: 'Words from ideas', line: 'Everyday English that began as philosophy, psychology or physics.', domain: 'english', links: [], body: [] });
    return engNodes;
  }
  let index = null;
  function buildIndex() {
    index = new Map();
    for (const d of ['philosophy', 'physics', 'psychology']) {
      const D = data(d); if (!D) continue;
      const kinds = Object.fromEntries((D.kinds || []).map(k => [k.id, k.label]));
      for (const n of D.nodes || []) { n.domain = d; n.kindLabel = kinds[n.kind] || n.kind; index.set(n.id, n); }
    }
    for (const n of englishNodes()) index.set(n.id, n);
    return index;
  }
  function node(id) { return (index || buildIndex()).get(id) || null; }
  function allNodes(domain) { const m = index || buildIndex(); return Array.from(m.values()).filter(n => !domain || n.domain === domain); }
  // Undirected neighbourhood with the link that joins them.
  let adj = null;
  function neighbours(id) {
    if (!adj) {
      adj = new Map();
      const add = (a, b, l, dir) => { if (!adj.has(a)) adj.set(a, []); adj.get(a).push({ id: b, type: l.type, why: l.why, dir }); };
      for (const n of allNodes()) {
        for (const l of n.links || []) { if (!node(l.to)) continue; add(n.id, l.to, l, 'out'); add(l.to, n.id, l, 'in'); }
        if (n.kind === 'word' && n.deck === 'from-ideas') {
          const l = { type: 'part-of', why: 'An English word that began as an idea.' };
          add(n.id, 'eng.from-ideas', l, 'out'); add('eng.from-ideas', n.id, l, 'in');
        }
      }
    }
    const seen = new Set();
    return (adj.get(id) || []).filter(x => !seen.has(x.id) && seen.add(x.id));
  }
  const TYPE_LABEL = {
    'part-of': ['Part of', 'Includes'], 'example-of': ['Example of', 'Examples'], 'leads-to': ['Leads to', 'Comes from'],
    'influenced': ['Influenced', 'Influenced by'], 'responds-to': ['Responds to', 'Answered by'], 'contrasts': ['In tension with', 'In tension with'],
    'links-to': ['Connected', 'Connected'],
  };
  const linkLabel = (type, dir) => (TYPE_LABEL[type] || ['Connected', 'Connected'])[dir === 'in' ? 1 : 0];
  const nodeHref = (id) => domainOf(id) === 'english' && id !== 'eng.from-ideas'
    ? `${ROOT}english/words/?id=${encodeURIComponent(id)}`
    : `${ROOT}idea/?id=${encodeURIComponent(id)}`;

  // ---------- speech ----------
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (_) { voices = []; } }
  if ('speechSynthesis' in g) { loadVoices(); try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (_) { speechSynthesis.onvoiceschanged = loadVoices; } }
  function pickVoice(lang) {
    if (!voices.length) loadVoices();
    const want = (lang || 'en-GB').toLowerCase();
    const en = voices.filter(v => /^en/i.test(v.lang));
    const exact = en.filter(v => v.lang.toLowerCase().replace('_', '-') === want);
    const pool = exact.length ? exact : en;
    // Prefer the better quality voices most platforms ship.
    return pool.find(v => /natural|premium|enhanced|google|siri|daniel|serena|kate|samantha|karen/i.test(v.name)) || pool[0] || null;
  }
  const speech = {
    canSpeak: () => 'speechSynthesis' in g,
    speak(text, opts) {
      if (!('speechSynthesis' in g)) { toast('This browser cannot read aloud.'); return Promise.resolve(); }
      const p = load().profile;
      const o = Object.assign({ lang: p.voice, rate: p.rate || 1 }, opts || {});
      return new Promise(res => {
        try { speechSynthesis.cancel(); } catch (_) {}
        const u = new SpeechSynthesisUtterance(String(text));
        const v = pickVoice(o.lang);
        if (v) u.voice = v;
        u.lang = v ? v.lang : o.lang;
        u.rate = o.rate;
        u.onend = u.onerror = () => res();
        speechSynthesis.speak(u);
      });
    },
    stop() { try { speechSynthesis.cancel(); } catch (_) {} },
    canListen: () => !!(g.SpeechRecognition || g.webkitSpeechRecognition),
    // One utterance. Resolves { transcript, alternatives:[...] }.
    listen(opts) {
      const R = g.SpeechRecognition || g.webkitSpeechRecognition;
      if (!R) return Promise.reject(Object.assign(new Error('Speech recognition is not available in this browser. Chrome or Safari work best.'), { code: 'UNSUPPORTED' }));
      return new Promise((resolve, reject) => {
        const r = new R();
        r.lang = (opts && opts.lang) || load().profile.voice || 'en-GB';
        r.interimResults = false;
        r.maxAlternatives = 5;
        let done = false;
        r.onresult = (e) => {
          done = true;
          const alts = Array.from(e.results[0] || []).map(a => a.transcript.trim());
          resolve({ transcript: alts[0] || '', alternatives: alts });
        };
        r.onerror = (e) => { if (!done) { done = true; reject(Object.assign(new Error(e.error === 'not-allowed' ? 'Microphone permission was blocked.' : 'Did not catch that. Try again.'), { code: e.error })); } };
        r.onend = () => { if (!done) { done = true; resolve({ transcript: '', alternatives: [] }); } };
        try { r.start(); } catch (err) { reject(err); }
        if (opts && opts.signal) opts.signal.stop = () => { try { r.stop(); } catch (_) {} };
      });
    },
  };
  // Any element with data-say speaks its text.
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]');
    if (!b) return;
    e.preventDefault();
    speech.speak(b.getAttribute('data-say'), b.dataset.rate ? { rate: Number(b.dataset.rate) } : undefined);
  });

  // ---------- AI ----------
  function loadScript(src) {
    return new Promise((res, rej) => {
      if ($(`script[data-src="${src}"]`)) return res();
      const s = document.createElement('script');
      s.src = ROOT + src; s.dataset.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('Could not load ' + src));
      document.head.appendChild(s);
    });
  }
  const hasKey = () => { try { return !!localStorage.getItem('jgl.geminiKey'); } catch (_) { return false; } };
  async function ai(opts) {
    if (!hasKey()) { openSettings('ai'); const e = new Error('Add a Gemini key in Settings to use the Coach.'); e.code = 'NO_KEY'; throw e; }
    await loadScript('shared/gemini.js');
    await loadScript('shared/coach.js');
    const o = Object.assign({}, opts);
    if (o.coach !== false) o.system = g.KLSCoach.VOICE + (o.system ? '\n\n' + o.system : '');
    try {
      return await g.askGemini(o);
    } catch (e) {
      if (e.code === 'RATE_LIMIT') e.message = 'Gemini is busy or the free quota is used up for now. Wait a minute and try again.';
      else if (e.code === 'NETWORK') e.message = 'Could not reach Gemini. Check the connection and try again.';
      else if (/API key not valid|API_KEY_INVALID|permission/i.test(e.message)) e.message = 'Gemini did not accept the key. Check it in Settings.';
      throw e;
    }
  }
  const thinking = () => '<div class="thinking" aria-label="Thinking"><i></i><i></i><i></i></div>';
  // Coach replies are plain text; light formatting for "Heading:" lines.
  function coachHtml(text) {
    return esc(String(text || '').trim())
      .replace(/^(Strong|Solid|Missing|Gaps?|Try|Next|One question|Question|Heard|Target|Tip|Pace|Clarity|Expression|Words to watch|Sounds|Overall|Natural|Register|Better)\s*:/gim, '<h4>$1</h4>')
      .replace(/\n{2,}/g, '\n');
  }

  // ---------- theme ----------
  // Night is the default; paper is the warm light alternative; auto follows the device.
  function themeName() {
    const t = load().profile.theme;
    if (t === 'dark') return 'night';
    if (t === 'light') return 'paper';
    return t === 'paper' || t === 'auto' ? t : 'night';
  }
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', themeName());
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0b1120');
    document.dispatchEvent(new CustomEvent('kls-theme'));
  }
  applyTheme();
  try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => document.dispatchEvent(new CustomEvent('kls-theme'))); } catch (_) {}

  // ---------- toast ----------
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2600);
  }

  // ---------- modal ----------
  function modal(html, opts) {
    const scrim = document.createElement('div'); scrim.className = 'scrim';
    const m = document.createElement('div'); m.className = 'modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    if (opts && opts.label) m.setAttribute('aria-label', opts.label);
    m.innerHTML = '<div class="grab"></div>' + html;
    document.body.append(scrim, m);
    const prev = document.activeElement;
    requestAnimationFrame(() => { scrim.classList.add('on'); m.classList.add('on'); const f = m.querySelector('input,button,select,textarea'); if (f) f.focus({ preventScroll: true }); });
    function close() {
      scrim.classList.remove('on'); m.classList.remove('on');
      setTimeout(() => { scrim.remove(); m.remove(); }, 250);
      removeEventListener('keydown', onKey);
      if (prev && prev.focus) prev.focus({ preventScroll: true });
      if (opts && opts.onClose) opts.onClose();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    addEventListener('keydown', onKey);
    scrim.addEventListener('click', close);
    m.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    return { el: m, close };
  }

  // ---------- settings ----------
  function openSettings(focus) {
    const s = load();
    const p = s.profile;
    let key = ''; let model = '';
    try { key = localStorage.getItem('jgl.geminiKey') || ''; model = localStorage.getItem('jgl.geminiModel') || ''; } catch (_) {}
    const voiceOpts = [['en-GB', 'British'], ['en-US', 'American'], ['en-AU', 'Australian'], ['en-IE', 'Irish'], ['en-IN', 'Indian'], ['en-SG', 'Singaporean']];
    const m = modal(`
      <div class="spread"><h2 style="margin:0">Settings</h2><button class="btn ghost small" data-close>Done</button></div>
      <p class="muted small" style="margin-top:6px">Everything is saved in this browser only.</p>
      <label class="field"><span>Your name</span><input class="input" id="set-name" value="${esc(p.name)}" autocomplete="given-name"></label>
      <h3 style="margin-top:18px" id="set-ai">The Coach (Gemini)</h3>
      <p class="small muted">The Coach uses your own free Gemini key. Get one at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">aistudio.google.com</a>, then paste it here. It never leaves this browser except to talk to Google.</p>
      <label class="field"><span>Gemini API key</span><input class="input mono" id="set-key" type="password" value="${esc(key)}" placeholder="Paste key" autocomplete="off" spellcheck="false"></label>
      <div class="row" style="margin:-4px 0 14px"><button class="btn small" id="set-show">Show</button><button class="btn small" id="set-test">Test the key</button><span class="small muted" id="set-status"></span></div>
      <label class="field"><span>Model</span><select class="input" id="set-model">
        <option value="">Automatic (recommended)</option>
        ${['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.5-flash', 'gemini-3.5-pro', 'gemini-pro-latest'].map(x => `<option ${x === model ? 'selected' : ''}>${x}</option>`).join('')}
      </select></label>
      <h3 style="margin-top:18px">Voice</h3>
      <label class="field"><span>Accent for read aloud (depends on the voices your device has)</span><select class="input" id="set-voice">
        ${voiceOpts.map(([v, l]) => `<option value="${v}" ${v === p.voice ? 'selected' : ''}>${l}</option>`).join('')}
      </select></label>
      <label class="field"><span>Speaking speed: <b id="set-rate-v">${p.rate}</b></span><input type="range" id="set-rate" min="0.6" max="1.3" step="0.05" value="${p.rate}" style="width:100%"></label>
      <button class="btn small" id="set-hear">Hear a sample</button>
      <h3 style="margin-top:22px">Look and feel</h3>
      <label class="field"><span>Theme</span><select class="input" id="set-theme">
        ${[['night', 'Night'], ['paper', 'Paper'], ['auto', 'Match my device']].map(([v, l]) => `<option value="${v}" ${v === themeName() ? 'selected' : ''}>${l}</option>`).join('')}
      </select></label>
      <label class="row" style="min-height:44px"><input type="checkbox" id="set-streaks" ${p.streaks ? 'checked' : ''} style="width:20px;height:20px"> Show a day streak on Today</label>
      <p class="small muted" style="margin-top:20px">Backups, export and reset live in <a href="${ROOT}you/">You</a>.</p>
    `, { label: 'Settings', onClose: applyTheme });
    const el = m.el;
    const upd = (fn) => store.update(st => fn(st.profile));
    $('#set-name', el).addEventListener('input', e => upd(pp => { pp.name = e.target.value.trim() || 'Kelly'; }));
    $('#set-key', el).addEventListener('input', e => { try { const v = e.target.value.trim(); if (v) localStorage.setItem('jgl.geminiKey', v); else localStorage.removeItem('jgl.geminiKey'); } catch (_) {} });
    $('#set-show', el).addEventListener('click', e => { const k = $('#set-key', el); k.type = k.type === 'password' ? 'text' : 'password'; e.target.textContent = k.type === 'password' ? 'Show' : 'Hide'; });
    $('#set-model', el).addEventListener('change', e => { try { if (e.target.value) localStorage.setItem('jgl.geminiModel', e.target.value); else localStorage.removeItem('jgl.geminiModel'); } catch (_) {} });
    $('#set-test', el).addEventListener('click', async () => {
      const st = $('#set-status', el); st.textContent = 'Testing...';
      try { const r = await ai({ prompt: 'Reply with the single word: ready', maxTokens: 20, coach: false }); st.textContent = /ready/i.test(r) ? 'Working.' : 'Connected.'; }
      catch (e) { st.textContent = e.message; }
    });
    $('#set-voice', el).addEventListener('change', e => upd(pp => { pp.voice = e.target.value; }));
    $('#set-rate', el).addEventListener('input', e => { upd(pp => { pp.rate = Number(e.target.value); }); $('#set-rate-v', el).textContent = e.target.value; });
    $('#set-hear', el).addEventListener('click', () => speech.speak('The quick brown fox jumps over the lazy dog. Do you take sugar in your tea?'));
    $('#set-theme', el).addEventListener('change', e => { upd(pp => { pp.theme = e.target.value; }); applyTheme(); });
    $('#set-streaks', el).addEventListener('change', e => upd(pp => { pp.streaks = e.target.checked; }));
    if (focus === 'ai') setTimeout(() => { $('#set-ai', el).scrollIntoView({ block: 'start' }); $('#set-key', el).focus({ preventScroll: true }); }, 280);
  }

  // ---------- page chrome ----------
  const TABS = [
    ['today', 'Today', ''], ['explore', 'Explore', 'explore/'], ['web', 'Web', 'web/'], ['practise', 'Practise', 'practise/'], ['you', 'You', 'you/'],
  ];
  function chrome() {
    const b = document.body;
    const tab = b.dataset.tab || '';
    const back = b.dataset.back;
    const top = document.createElement('header');
    top.className = 'topbar';
    top.innerHTML = `<div class="inner">
      ${back ? `<a class="back" href="${esc(back)}" aria-label="Back">${ICON.back}</a>` : ''}
      <a class="brand" href="${ROOT}">
        <svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 10 L22 7 L25 21 L10 24 Z" fill="none" stroke="var(--accent-2)" stroke-width="1" stroke-dasharray="2 2.4" opacity=".8"/><circle cx="8" cy="10" r="2.6" fill="var(--phil)"/><circle cx="22" cy="7" r="2.2" fill="var(--phys)"/><circle cx="25" cy="21" r="2.6" fill="var(--psy)"/><circle cx="10" cy="24" r="2.2" fill="var(--eng)"/></svg>
        <span class="name">${esc(b.dataset.title || "Kelly's Learning Studio")}</span>
      </a>
      <div class="actions">
        <button class="icon-btn" id="kls-theme" aria-label="Switch between night and paper">${ICON.moon}</button>
        <button class="icon-btn" id="kls-settings" aria-label="Settings">${ICON.gear}</button>
      </div></div>`;
    b.prepend(top);
    const nav = document.createElement('nav');
    nav.className = 'tabbar';
    nav.setAttribute('aria-label', 'Main');
    nav.innerHTML = TABS.map(([id, label, href]) => `<a href="${ROOT}${href}" ${id === tab ? 'aria-current="page"' : ''}>${ICON[id]}<span>${label}</span></a>`).join('');
    b.appendChild(nav);
    $('#kls-settings').addEventListener('click', () => openSettings());
    $('#kls-theme').addEventListener('click', () => {
      const t = themeName();
      const night = t === 'night' || (t === 'auto' && !matchMedia('(prefers-color-scheme: light)').matches);
      store.update(s => { s.profile.theme = night ? 'paper' : 'night'; });
      applyTheme();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chrome); else chrome();

  function greeting() {
    const h = new Date().getHours();
    const part = h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    return `${part}, ${load().profile.name || 'Kelly'}`;
  }

  g.KLS = {
    ROOT, ICON, DOMAINS, esc, rich, $, $$, param, todayIso, addDays, dailyPick, shuffle, hashStr, playBtn,
    store, markSeen, toggleSaved, spaced, data, node, allNodes, neighbours, domainOf, linkLabel, nodeHref, englishNodes,
    speech, ai, hasKey, loadScript, thinking, coachHtml, toast, modal, openSettings, greeting,
  };
})(window);
