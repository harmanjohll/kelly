#!/usr/bin/env node
/* Validates shared/content/*.js against docs/content-schema.md.
   Usage (inside apps/learning): npm test, or node docs/validate.js [domain ...]
   Exits 1 on any error. Warnings do not fail. */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CONTENT = path.join(__dirname, '..', 'shared', 'content');
const SIMS = path.join(__dirname, '..', 'physics', 'sims');
const ALL = ['philosophy', 'physics', 'psychology', 'english'];
const only = process.argv.slice(2);

const ANCHORS = {
  phil: 'determinism free-will realism causation mind-body consciousness knowledge empiricism rationalism induction falsification paradigm stoicism no-self personal-identity utilitarianism virtue-ethics existentialism phenomenology pragmatism socrates plato aristotle descartes hume kant spinoza nietzsche confucius laozi buddha epicureanism cynicism',
  phys: 'measurement-problem superposition entanglement uncertainty wave-particle copenhagen many-worlds pilot-wave qbism decoherence bell randomness schrodinger-cat observer complementarity quantum-leap einstein bohr schrodinger heisenberg',
  psy: 'consciousness self cognitive-dissonance behaviourism psychoanalysis freud pavlov william-james heuristics cbt mindfulness flow attachment growth-mindset perception memory libet hawthorne placebo maslow learned-helplessness confirmation-bias stanford-prison milgram kahneman jung',
  eng: 'from-ideas',
};
const PREFIX = { philosophy: 'phil', physics: 'phys', psychology: 'psy', english: 'eng' };
const LINK_TYPES = new Set(['part-of', 'example-of', 'leads-to', 'influenced', 'responds-to', 'contrasts', 'links-to']);
const EVIDENCE = new Set(['strong', 'moderate', 'mixed', 'contested', 'weak', 'failed']);
const SIM_IDS = ['photoelectric', 'spectra', 'double-slit', 'polarisers', 'stern-gerlach', 'tunnelling', 'box', 'uncertainty', 'bell-game', 'measurement'];

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const ctx = { console };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);
for (const d of ALL) {
  const f = path.join(CONTENT, d + '.js');
  if (!fs.existsSync(f)) { if (!only.length || only.includes(d)) warn(`missing ${d}.js`); continue; }
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); }
  catch (e) { err(`${d}.js does not parse: ${e.message}`); }
}
const DATA = ctx.KLS_DATA || {};

// Every id in every loaded domain, so cross links resolve when files exist.
const ids = new Set();
for (const d of Object.keys(DATA)) {
  for (const n of DATA[d].nodes || []) ids.add(n.id);
  for (const w of DATA[d].words || []) ids.add(w.id);
  for (const k of ['tricky', 'stress', 'pairs', 'shadow', 'passages']) for (const x of DATA[d][k] || []) ids.add(x.id);
}
ids.add('eng.from-ideas');
const anchorIds = new Set();
for (const [p, list] of Object.entries(ANCHORS)) for (const a of list.split(' ')) anchorIds.add(`${p}.${a}`);

function prose(where, s) {
  if (typeof s !== 'string') return;
  if (/[–—]/.test(s)) err(`${where}: en or em dash in "${s.slice(0, 60)}"`);
  if (/[A-Za-z]-[A-Za-z]/.test(s)) err(`${where}: hyphenated prose in "${s.match(/\S*[A-Za-z]-[A-Za-z]\S*/)[0]}"`);
  if (/\s-\s/.test(s)) err(`${where}: spaced hyphen used as a dash`);
  if (/\b(delve|tapestry|embark)/i.test(s)) err(`${where}: banned word`);
}

function checkLinks(where, links, domainPrefix) {
  for (const l of links || []) {
    if (!LINK_TYPES.has(l.type)) err(`${where}: bad link type ${l.type}`);
    prose(`${where} why`, l.why);
    if (!l.why) err(`${where}: link to ${l.to} has no why`);
    const p = String(l.to).split('.')[0];
    if (p !== domainPrefix) {
      if (!anchorIds.has(l.to)) err(`${where}: cross domain link to non anchor ${l.to}`);
      else if (!ids.has(l.to)) warn(`${where}: anchor ${l.to} not yet present (other domain file missing?)`);
    } else if (!ids.has(l.to)) err(`${where}: link to unknown ${l.to}`);
  }
}

for (const d of ALL) {
  if (only.length && !only.includes(d)) continue;
  const D = DATA[d];
  if (!D) continue;
  const P = PREFIX[d];
  prose(`${d} tagline`, D.domain && D.domain.tagline);
  for (const p of (D.domain && D.domain.intro) || []) prose(`${d} intro`, p);

  if (d === 'english') {
    const decks = new Set((D.decks || []).map(x => x.id));
    const themes = new Set((D.themes || []).map(x => x.id));
    const seen = new Set();
    for (const w of D.words || []) {
      const at = `english word ${w.id}`;
      if (seen.has(w.id)) err(`${at}: duplicate`); seen.add(w.id);
      if (!/^eng\.w\./.test(w.id)) err(`${at}: id must start eng.w.`);
      if (!decks.has(w.deck)) err(`${at}: unknown deck ${w.deck}`);
      if (!themes.has(w.theme)) err(`${at}: unknown theme ${w.theme}`);
      for (const k of ['term', 'meaning', 'example', 'register', 'region', 'origin']) if (!w[k]) err(`${at}: missing ${k}`);
      for (const k of ['meaning', 'example', 'origin']) prose(`${at} ${k}`, w[k]);
      if (w.deck === 'vocab' && !(w.say && w.say.ipa)) err(`${at}: vocab needs say.ipa`);
      if (w.deck === 'from-ideas' && !(w.links || []).length) err(`${at}: from-ideas needs a link`);
      for (const s of w.see || []) if (!ids.has(s)) err(`${at}: see unknown ${s}`);
      checkLinks(at, w.links, 'eng');
    }
    for (const k of ['tricky', 'stress', 'pairs', 'shadow', 'passages']) {
      if (!(D[k] || []).length) err(`english: ${k} is empty`);
      for (const x of D[k] || []) {
        for (const f of ['trap', 'tip', 'sentence', 'marks', 'focus']) prose(`english ${k} ${x.id} ${f}`, x[f]);
        if (k === 'passages') prose(`english passage ${x.id}`, x.text);
        if (k === 'shadow') prose(`english shadow ${x.id}`, x.text);
      }
    }
    console.log(`english: ${(D.words || []).length} words, ${(D.tricky || []).length} tricky, ${(D.stress || []).length} stress, ${(D.pairs || []).length} pair sets, ${(D.shadow || []).length} shadow, ${(D.passages || []).length} passages`);
    continue;
  }

  const kinds = new Set((D.kinds || []).map(k => k.id));
  const facetVals = {};
  for (const f of D.facets || []) facetVals[f.id] = new Set(f.values.map(v => v.id));
  if (D.groupBy && !facetVals[D.groupBy]) err(`${d}: groupBy ${D.groupBy} is not a facet`);
  const seen = new Set();
  const degree = {};
  for (const n of D.nodes || []) {
    const at = `${d} ${n.id}`;
    if (seen.has(n.id)) err(`${at}: duplicate id`); seen.add(n.id);
    if (!n.id.startsWith(P + '.')) err(`${at}: wrong prefix`);
    if (!kinds.has(n.kind)) err(`${at}: unknown kind ${n.kind}`);
    if (!n.title || !n.line || !Array.isArray(n.body) || !n.body.length) err(`${at}: needs title, line, body`);
    if (n.line && n.line.length > 120) warn(`${at}: line is ${n.line.length} chars`);
    prose(`${at} line`, n.line);
    for (const p of n.body || []) { prose(`${at} body`, p); if (/<(?!\/?em>)/.test(p)) err(`${at}: HTML other than <em> in body`); }
    for (const p of n.prompts || []) prose(`${at} prompt`, p);
    for (const r of n.recall || []) { prose(`${at} recall q`, r.q); prose(`${at} recall a`, r.a); }
    prose(`${at} objection`, n.objection);
    prose(`${at} evidenceNote`, n.evidenceNote);
    if (!(n.recall || []).length) warn(`${at}: no recall items`);
    for (const [f, vals] of Object.entries(n.facets || {})) {
      if (!facetVals[f]) { err(`${at}: unknown facet ${f}`); continue; }
      for (const v of vals) if (!facetVals[f].has(v)) err(`${at}: unknown ${f} value ${v}`);
    }
    if (D.groupBy && !((n.facets || {})[D.groupBy] || []).length) err(`${at}: missing groupBy facet ${D.groupBy}`);
    for (const p of n.people || []) if (!ids.has(p) && !(anchorIds.has(p))) err(`${at}: unknown person ${p}`);
    if ((n.links || []).length < 2) warn(`${at}: fewer than 2 links`);
    checkLinks(at, n.links, P);
    for (const l of n.links || []) { degree[n.id] = (degree[n.id] || 0) + 1; degree[l.to] = (degree[l.to] || 0) + 1; }
    if (d === 'psychology' && ['construct', 'theory', 'study'].includes(n.kind) && !EVIDENCE.has(n.evidence)) err(`${at}: needs evidence label`);
    if (n.evidence && !EVIDENCE.has(n.evidence)) err(`${at}: bad evidence ${n.evidence}`);
    if (n.sim && !SIM_IDS.includes(n.sim)) err(`${at}: unknown sim ${n.sim}`);
    if (n.sim && !fs.existsSync(path.join(SIMS, n.sim + '.js'))) warn(`${at}: sim file ${n.sim}.js not present yet`);
  }
  for (const n of D.nodes || []) if (!degree[n.id]) err(`${d} ${n.id}: isolated node`);
  for (const a of ANCHORS[P].split(' ')) if (!seen.has(`${P}.${a}`)) err(`${d}: missing anchor ${P}.${a}`);
  for (const m of D.modules || []) {
    prose(`${d} module ${m.id}`, m.blurb);
    for (const id of m.path || []) if (!seen.has(id) && !ids.has(id)) err(`${d} module ${m.id}: unknown ${id}`);
  }
  console.log(`${d}: ${(D.nodes || []).length} nodes, ${(D.modules || []).length} modules`);
}

for (const w of warnings) console.log('warn  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(errors.length ? `\n${errors.length} errors` : '\nOK');
process.exit(errors.length ? 1 : 0);
