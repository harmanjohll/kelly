# Content schema

Source of truth for every content file in `learning/shared/content/`. Validate with `node learning/docs/validate.js` (checks ids, link targets, facets, prose rules).

## 1. File shape

Each file is plain JavaScript that registers one domain:

```js
/* learning/shared/content/philosophy.js */
(function (g) {
  g.KLS_DATA = g.KLS_DATA || {};
  g.KLS_DATA.philosophy = {
    domain:  { id: 'philosophy', name: 'Philosophy', tagline: '...', intro: ['paragraph', 'paragraph'] },
    kinds:   [ { id: 'idea', label: 'Idea', plural: 'Ideas' }, ... ],
    facets:  [ { id: 'branch', label: 'Branch', values: [ { id: 'metaphysics', label: 'Metaphysics', blurb: 'one line' }, ... ] }, ... ],
    groupBy: 'branch',          // facet used to cluster the Mind Web
    nodes:   [ ... ],
    modules: [ ... ],
  };
})(typeof window !== 'undefined' ? window : globalThis);
```

## 2. Node

```js
{
  id: 'phil.determinism',            // '<prefix>.<slug>'; prefixes: phil, phys, psy, eng
  kind: 'idea',                      // one of the domain's kinds
  title: 'Determinism',
  line: 'Every event is fixed by what came before it.',   // one sentence, under 110 characters; tooltip and card subtitle
  facets: { branch: ['metaphysics'], era: ['early-modern'], tradition: ['western'] },  // arrays of facet value ids
  body: [                            // 2 to 5 short paragraphs, plain text; <em> allowed sparingly; no other HTML
    'Paragraph one.',
    'Paragraph two.'
  ],
  people: ['phil.spinoza'],          // optional: ids of person nodes (any domain) associated with this node
  links: [                           // typed links; at least 2 per node, ideally 3 to 6
    { to: 'phil.free-will', type: 'contrasts', why: 'If everything is fixed in advance, it is hard to see where a free choice could enter.' }
  ],
  quote: { text: '...', source: 'Spinoza, Ethics (1677), Part I' },   // optional; well attested only
  prompts: ['A question worth sitting with.'],          // 1 to 3 open reflection prompts
  recall:  [ { q: 'Short retrieval question?', a: 'Short model answer.' } ],  // 1 to 3; used by spaced review
  objection: 'The strongest objection, in one or two sentences.',   // philosophy ideas; optional elsewhere
  say: { text: 'Nietzsche', respell: 'NEE chuh', ipa: 'ˈniːtʃə' },  // optional: how to pronounce the title (names, foreign terms)
  further: ['Author, Title (year)'],  // optional reading, real works only
  // person nodes only:
  life: '1632 to 1677', place: 'Amsterdam, Dutch Republic',
  // psychology only (required on empirical nodes: construct, theory, study):
  evidence: 'strong',                // strong | moderate | mixed | contested | weak | failed
  evidenceNote: 'One sentence on why the label is what it is.',
  // physics only:
  sim: 'double-slit',                // optional: id of a simulation in physics/sims/
  maths: ['Plain text maths line, e.g. E = h f', 'second line'],   // optional: shown in a closed drawer; Unicode, no LaTeX
  status: 'settled'                  // physics only: settled | interpretation | open
}
```

### Link types

| type | meaning (source to target) |
|---|---|
| `part-of` | source is a part or sub idea of target |
| `example-of` | source is an instance of target |
| `leads-to` | source causes, implies or historically led to target |
| `influenced` | source (usually a person or school) shaped target |
| `responds-to` | source is a reply, critique or answer to target |
| `contrasts` | source stands in tension with target |
| `links-to` | a looser connection; used for most cross domain links |

Every link's `to` must exist. Links are directional in data but drawn undirected; do not duplicate the reverse link.

## 3. Module (a curated route)

```js
{ id: 'mod.phil.who-am-i', title: 'Who am I?', kind: 'construct',  // construct | thinker | era | tradition | field | school | journey
  blurb: 'One or two sentences.', path: ['phil.personal-identity', 'phil.descartes', ...] }   // 4 to 9 node ids, in teaching order
```

## 4. Cross domain anchors

Cross domain links may only target these ids. Each domain must create the anchors with its own prefix (and may create many more nodes of its own).

**Philosophy** (`phil.`): `determinism`, `free-will`, `realism`, `causation`, `mind-body`, `consciousness`, `knowledge`, `empiricism`, `rationalism`, `induction`, `falsification`, `paradigm`, `stoicism`, `no-self`, `personal-identity`, `utilitarianism`, `virtue-ethics`, `existentialism`, `phenomenology`, `pragmatism`, `socrates`, `plato`, `aristotle`, `descartes`, `hume`, `kant`, `spinoza`, `nietzsche`, `confucius`, `laozi`, `buddha`, `epicureanism`, `cynicism`

**Physics** (`phys.`): `measurement-problem`, `superposition`, `entanglement`, `uncertainty`, `wave-particle`, `copenhagen`, `many-worlds`, `pilot-wave`, `qbism`, `decoherence`, `bell`, `randomness`, `schrodinger-cat`, `observer`, `complementarity`, `quantum-leap`, `einstein`, `bohr`, `schrodinger`, `heisenberg`

**Psychology** (`psy.`): `consciousness`, `self`, `cognitive-dissonance`, `behaviourism`, `psychoanalysis`, `freud`, `pavlov`, `william-james`, `heuristics`, `cbt`, `mindfulness`, `flow`, `attachment`, `growth-mindset`, `perception`, `memory`, `libet`, `hawthorne`, `placebo`, `maslow`, `learned-helplessness`, `confirmation-bias`, `stanford-prison`, `milgram`, `kahneman`, `jung`

**English** (`eng.`): `from-ideas` (the "words from ideas" theme hub; English words like Platonic, stoic, cynical, quantum leap, Freudian slip, Pavlovian)

## 5. English data

```js
g.KLS_DATA.english = {
  domain: { id: 'english', name: 'English', tagline: '...', intro: [...] },
  decks: [ { id: 'idioms', label: 'Idioms', blurb: '...' }, { id: 'sayings', ... }, { id: 'slang', ... }, { id: 'vocab', ... }, { id: 'phrasal', ... }, { id: 'from-ideas', ... } ],
  themes: [ { id: 'body', label: 'The body' }, ... ],   // clusters for the English Mind Web
  words: [ {
    id: 'eng.w.bite-the-bullet', deck: 'idioms', term: 'bite the bullet',
    meaning: 'To make yourself do something unpleasant that you have been avoiding.',
    example: 'She bit the bullet and booked the dentist.',
    register: 'neutral',             // formal | neutral | informal | slang
    region: 'general',               // general | uk | us | au | sg
    theme: 'body',                   // a themes[].id
    origin: 'One sentence, honest; say "uncertain" when it is.',
    say: { respell: 'bite thuh BUL it', ipa: 'baɪt ðə ˈbʊlɪt' },   // optional for idioms, required for vocab
    see: ['eng.w.grasp-the-nettle'], // optional related word ids
    links: [ { to: 'phil.stoicism', type: 'links-to', why: '...' } ]  // optional; from-ideas deck must link to its anchor
  } ],
  tricky:  [ { id: 'eng.t.epitome', word: 'epitome', respell: 'ih PIT uh mee', ipa: 'ɪˈpɪtəmi', trap: 'Said as "EPP ih tome".', tip: 'Four syllables; stress the second.' } ],
  stress:  [ { id: 'eng.s.record', word: 'record', noun: 'REC ord', verb: 're CORD', nounEx: 'a world record', verbEx: 'record a song' } ],
  pairs:   [ { id: 'eng.p.i-ee', contrast: 'ɪ / iː', label: 'ship or sheep', tip: 'Physical tip for making the difference.', pairs: [['ship','sheep'], ...], sentence: 'A sentence using both.' } ],
  shadow:  [ { id: 'eng.sh.1', text: 'Sentence to shadow.', focus: 'rising question', marks: 'Do you take SUgar? (rise at the end)' } ],
  passages:[ { id: 'eng.a.1', title: 'Title', level: 'warm up | steady | stretch', text: 'Original passage, 80 to 180 words.', watch: ['word', 'word'] } ]
};
```

## 6. Simulations

One file per sim at `learning/physics/sims/<id>.js`:

```js
(function (g) {
  g.KLS_SIMS = g.KLS_SIMS || {};
  g.KLS_SIMS['double-slit'] = {
    title: 'Double slit', blurb: 'One sentence.',
    try: ['Something to try and notice.', '...'],     // 2 to 4 prompts shown under the sim
    mount(el) {            // el: an empty block element; build the UI inside it
      // ...
      return { destroy() { /* stop animation frames, remove listeners */ } };
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
```

Rules: canvas based, sized to `el.clientWidth` and responsive (ResizeObserver), crisp on high DPI (scale by `devicePixelRatio`), touch and mouse via Pointer Events, controls as native `<input type="range">`, `<button>`, `<select>` with labels, colours read from CSS custom properties at mount (`--ink`, `--muted`, `--line`, `--surface`, `--bg`, `--phys`, `--accent-2`), pause animation when off screen (IntersectionObserver) and respect `prefers-reduced-motion`. No external libraries. Class names prefixed `sim-`.

Sim ids: `photoelectric`, `spectra`, `double-slit`, `polarisers`, `stern-gerlach`, `tunnelling`, `box`, `uncertainty`, `bell-game`, `measurement`.

## 7. CSS tokens available to all content and sims

`--bg`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--line`, `--phil`, `--phys`, `--psy`, `--eng`, `--accent-2` (warm gold highlight), `--good`, `--warn`, `--radius`, `--font-display`, `--font-body`, `--font-mono`. Buttons: `.btn`, `.btn.primary`, `.btn.ghost`, `.btn.small`. Chips: `.chip`, `.chip.on`.
