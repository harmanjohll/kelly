/* =========================================================
   learning/shared/motif.js
   Generative SVG art drawn from the studio's own content, so
   every picture means something:
     philosophy  thinkers on an arc through 2,500 years
     physics     a two slit interference pattern, dot by dot
     psychology  constructs joined by their real links
     english     a speech waveform shaped by a word
     all         four constellations joined by gold cross links
   Plus a constellation for any journey (its stops as stars).
   Deterministic: same input, same picture. No library.
   KLSMotif.room(domain, opts) / .journey(module, opts) / .sky(opts)
   ========================================================= */

(function (g) {
  const { data, allNodes, hashStr, DOMAINS } = g.KLS;
  const VAR = { philosophy: 'var(--phil)', physics: 'var(--phys)', psychology: 'var(--psy)', english: 'var(--eng)' };

  function rng(seed) {
    let a = (typeof seed === 'number' ? seed : hashStr(String(seed))) >>> 0;
    return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const f = (n) => Math.round(n * 10) / 10;
  const svg = (w, h, body, aspect) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="${aspect || 'xMidYMid slice'}" aria-hidden="true" focusable="false">${body}</svg>`;

  // A star: a soft halo plus a bright core.
  function star(x, y, r, col, lit) {
    return (lit ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 3.2)}" fill="${col}" opacity=".16"/>` : '') +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${col}" opacity="${lit ? 1 : .55}"/>`;
  }
  function dust(rand, w, h, n, col) {
    let s = '';
    for (let i = 0; i < n; i++) s += `<circle cx="${f(rand() * w)}" cy="${f(rand() * h)}" r="${f(.4 + rand() * .9)}" fill="${col || 'var(--ink)'}" opacity="${f(.12 + rand() * .3)}"/>`;
    return s;
  }

  // ---------- philosophy: thinkers on an arc of time ----------
  function philosophy(o) {
    const w = o.w || 800, h = o.h || 420, rand = rng('phil' + (o.seed || ''));
    const D = data('philosophy'); if (!D) return '';
    const eraF = (D.facets || []).find(x => x.id === 'era');
    const eras = eraF ? eraF.values.map(v => v.id) : [];
    const people = D.nodes.filter(n => n.kind === 'thinker');
    const pos = {};
    let body = dust(rand, w, h, 70);
    // The arc: lower left (antiquity) to upper right (now).
    const P = (t) => ({ x: w * (.06 + .9 * t), y: h * (.86 - .62 * Math.sin(t * Math.PI * .62)) });
    let d = ''; for (let i = 0; i <= 40; i++) { const p = P(i / 40); d += (i ? 'L' : 'M') + f(p.x) + ',' + f(p.y); }
    body += `<path d="${d}" fill="none" stroke="var(--phil)" stroke-opacity=".22" stroke-width="1"/>`;
    people.forEach((n) => {
      const e = eras.indexOf(((n.facets || {}).era || [])[0]);
      const t = Math.max(0, Math.min(1, (Math.max(0, e) + rand()) / Math.max(1, eras.length)));
      const p = P(t);
      pos[n.id] = { x: p.x + (rand() - .5) * 46, y: p.y + (rand() - .5) * 70 };
    });
    for (const n of people) for (const l of n.links || []) {
      const a = pos[n.id], b = pos[l.to]; if (!a || !b) continue;
      body += `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" stroke="var(--phil)" stroke-opacity=".28" stroke-width=".8"/>`;
    }
    people.forEach(n => { const p = pos[n.id]; body += star(p.x, p.y, 1.6 + rand() * 1.8, 'var(--phil)', rand() > .55); });
    return svg(w, h, body);
  }

  // ---------- physics: interference, built from single hits ----------
  function physics(o) {
    const w = o.w || 800, h = o.h || 420, rand = rng('phys' + (o.seed || ''));
    const I = (x) => { const u = (x - .5) * 34; const s = Math.abs(u) < 1e-6 ? 1 : Math.sin(u * .3) / (u * .3); return Math.pow(Math.cos(u), 2) * s * s; };
    let body = dust(rand, w, h, 40);
    for (let i = 0; i < 160; i++) { const x = i / 160; body += `<rect x="${f(x * w)}" y="0" width="${f(w / 160 + .6)}" height="${h}" fill="var(--phys)" opacity="${f(I(x) * .13)}"/>`; }
    // Dots sampled from the pattern: the stripes are made of particles.
    let placed = 0, tries = 0;
    while (placed < 900 && tries < 20000) {
      tries++; const x = rand(); if (rand() > I(x)) continue;
      placed++; body += `<circle cx="${f(x * w)}" cy="${f(rand() * h)}" r="${f(.7 + rand() * .7)}" fill="var(--phys)" opacity="${f(.35 + rand() * .55)}"/>`;
    }
    return svg(w, h, body);
  }

  // ---------- psychology: constructs and their real links ----------
  function psychology(o) {
    const w = o.w || 800, h = o.h || 420, rand = rng('psy' + (o.seed || ''));
    const nodes = allNodes('psychology').filter(n => n.kind !== 'psychologist').slice(0, 70);
    const pos = {};
    nodes.forEach(n => { const r = rng(n.id); const a = r() * Math.PI * 2, rr = Math.sqrt(r()); pos[n.id] = { x: w * (.5 + .46 * rr * Math.cos(a)), y: h * (.5 + .44 * rr * Math.sin(a)) }; });
    let body = dust(rand, w, h, 50);
    for (const n of nodes) for (const l of n.links || []) {
      const a = pos[n.id], b = pos[l.to]; if (!a || !b) continue;
      const mx = (a.x + b.x) / 2 + (rand() - .5) * 40, my = (a.y + b.y) / 2 + (rand() - .5) * 40;
      body += `<path d="M${f(a.x)},${f(a.y)}Q${f(mx)},${f(my)} ${f(b.x)},${f(b.y)}" fill="none" stroke="var(--psy)" stroke-opacity=".26" stroke-width=".9"/>`;
    }
    nodes.forEach(n => { const p = pos[n.id]; body += star(p.x, p.y, 1.4 + Math.min(3, (n.links || []).length * .35), 'var(--psy)', (n.links || []).length > 4); });
    return svg(w, h, body);
  }

  // ---------- english: a waveform shaped by a word ----------
  function english(o) {
    const w = o.w || 800, h = o.h || 420, word = String(o.word || 'the music of speech'), rand = rng('eng' + word);
    const codes = Array.from(word).map(c => c.charCodeAt(0));
    let body = dust(rand, w, h, 40);
    const bars = 96, mid = h * .55;
    for (let i = 0; i < bars; i++) {
      const t = i / (bars - 1);
      const c = codes[Math.floor(t * codes.length) % codes.length] || 100;
      const env = Math.pow(Math.sin(Math.PI * t), .8);
      const amp = env * (.35 + .65 * (((c * 37 + i * 11) % 97) / 97)) * h * .36;
      const x = w * (.04 + .92 * t);
      body += `<rect x="${f(x)}" y="${f(mid - amp)}" width="${f(w / bars * .42)}" height="${f(amp * 2)}" rx="${f(w / bars * .21)}" fill="var(--eng)" opacity="${f(.16 + env * .44)}"/>`;
    }
    return svg(w, h, body);
  }

  // ---------- all: four constellations and the gold threads between them ----------
  function all(o) {
    const w = o.w || 800, h = o.h || 420, rand = rng('all' + (o.seed || ''));
    const centre = { philosophy: [.24, .34], physics: [.76, .3], psychology: [.3, .74], english: [.74, .74] };
    const pos = {};
    let body = dust(rand, w, h, 90);
    const pick = {};
    for (const d of Object.keys(centre)) {
      const list = d === 'english' ? allNodes('english').filter(n => n.deck === 'from-ideas') : allNodes(d).filter(n => (n.links || []).length >= 3).slice(0, 34);
      pick[d] = list;
      list.forEach(n => { const r = rng(n.id); const a = r() * Math.PI * 2, rr = Math.sqrt(r()); pos[n.id] = { x: w * (centre[d][0] + .17 * rr * Math.cos(a)), y: h * (centre[d][1] + .2 * rr * Math.sin(a)), d }; });
    }
    let cross = '', inner = '';
    for (const d of Object.keys(pick)) for (const n of pick[d]) for (const l of n.links || []) {
      const a = pos[n.id], b = pos[l.to]; if (!a || !b) continue;
      if (a.d === b.d) inner += `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" stroke="${VAR[a.d]}" stroke-opacity=".3" stroke-width=".8"/>`;
      else { const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 30; cross += `<path d="M${f(a.x)},${f(a.y)}Q${f(mx)},${f(my)} ${f(b.x)},${f(b.y)}" fill="none" stroke="var(--accent-2)" stroke-opacity=".32" stroke-width=".9" stroke-dasharray="3 4"/>`; }
    }
    body += inner + cross;
    for (const id of Object.keys(pos)) { const p = pos[id]; body += star(p.x, p.y, 1.3 + rand() * 1.5, VAR[p.d], rand() > .7); }
    return svg(w, h, body);
  }

  // ---------- a journey: its stops as a constellation ----------
  function journey(m, o) {
    o = o || {};
    const w = o.w || 320, h = o.h || 170, rand = rng(m.id);
    const col = VAR[o.domain] || 'var(--dom)';
    const n = m.path.length;
    const pts = m.path.map((id, i) => {
      const t = n === 1 ? .5 : i / (n - 1);
      return { id, x: w * (.1 + .8 * t) + (rand() - .5) * 26, y: h * (.5 + .3 * Math.sin(t * Math.PI * 1.6 + rand() * 1.4)) + (rand() - .5) * 30 };
    });
    let body = dust(rand, w, h, 26);
    const lit = o.lit || {};
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i]; const on = lit[a.id] && lit[b.id];
      body += `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" stroke="${col}" stroke-opacity="${on ? .9 : .45}" stroke-width="${on ? 1.6 : 1.1}"${on ? '' : ' stroke-dasharray="3 4"'}/>`;
    }
    const sc = Math.max(1, w / 320);
    pts.forEach((p, i) => { body += star(p.x, p.y, (lit[p.id] ? 3.6 : 2.8) * Math.min(sc, 1.6), col, true); if (i === o.current) body += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="11" fill="none" stroke="${col}" stroke-width="1.2" opacity=".9"/>`; });
    return svg(w, h, body, o.aspect);
  }

  // Two stars and the line between them, for bridges and "one link, two worlds".
  function pair(a, b, o) {
    o = o || {};
    const w = o.w || 520, h = o.h || 170;
    const ca = VAR[a.domain] || 'var(--dom)', cb = VAR[b.domain] || 'var(--dom)';
    const cross = a.domain !== b.domain;
    const line = cross ? 'var(--accent-2)' : ca;
    const rand = rng(a.id + b.id);
    const y = h * .5, xa = w * .14, xb = w * .86;
    const short = (t) => { t = String(t); return t.length > 24 ? t.slice(0, 23) + '\u2026' : t; };
    const label = (x, t, anchor) => o.labels ? `<text x="${f(x)}" y="${f(y + 34)}" text-anchor="${anchor}" fill="var(--ink)" style="font-family:var(--font-display);font-weight:600;font-size:17px">${esc(short(t))}</text>` : '';
    let mid = '';
    if (o.via) mid = star(w * .5, h * .2, 3.4, VAR[o.via.domain] || ca, true) + (o.labels ? `<text x="${f(w * .5)}" y="${f(h * .2 - 14)}" text-anchor="middle" fill="var(--muted)" style="font-family:var(--font-body);font-size:13px">${esc(short(o.via.title))}</text>` : '');
    return svg(w, h, dust(rand, w, h, 24) +
      `<path d="M${f(xa)},${f(y)} Q${f(w * .5)},${f(o.via ? h * -.1 : h * .05)} ${f(xb)},${f(y)}" fill="none" stroke="${line}" stroke-width="1.6" ${cross ? 'stroke-dasharray="5 5"' : ''} stroke-linecap="round"/>` +
      mid + star(xa, y, 5, ca, true) + star(xb, y, 5, cb, true) + label(xa - 6, a.title, 'start') + label(xb + 6, b.title, 'end'), 'xMidYMid meet');
  }
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function room(domain, o) {
    o = o || {};
    try {
      if (domain === 'philosophy') return philosophy(o);
      if (domain === 'physics') return physics(o);
      if (domain === 'psychology') return psychology(o);
      if (domain === 'english') return english(o);
      return all(o);
    } catch (e) { return ''; }
  }

  // The brand mark: four stars, one per room, and the thread through them.
  const mark = `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 10 L22 7 L25 21 L10 24 Z" fill="none" stroke="var(--accent-2)" stroke-width="1" stroke-dasharray="2 2.4" opacity=".8"/><circle cx="8" cy="10" r="2.6" fill="var(--phil)"/><circle cx="22" cy="7" r="2.2" fill="var(--phys)"/><circle cx="25" cy="21" r="2.6" fill="var(--psy)"/><circle cx="10" cy="24" r="2.2" fill="var(--eng)"/></svg>`;

  g.KLSMotif = { room, journey, pair, mark, rng, DOMAINS };
})(window);
