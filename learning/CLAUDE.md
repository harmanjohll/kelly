# CLAUDE.md
# Kelly's Learning Studio
# Build contract for Claude Code

Folder: `learning/` inside `harmanjohll/kelly` (public repo)
Live: https://harmanjohll.github.io/kelly/learning/
Owner: Harman Johll
Learner: Kelly, 40, a mother, wife, daughter and sister. Good in English, wants to be even better. Learning for depth and curiosity, not for an exam.
AI provider: Google Gemini, learner supplies her own key (same flow as Harman's other platforms)
Sister project for reference: `harmanjohll/johllygoodlearning` (`/lab/`, `/studio/`, `/english/`)

Read this file fully before every session. It adds to the root `CLAUDE.md` for work inside `learning/`.

---

## 1. Living alongside other projects

The repo holds several independent projects, each in its own top level folder. Read the root `CLAUDE.md` first; on shared things (the root, hosting) it wins. The studio is `learning/`.

- Everything for the studio lives under `learning/`. Never move, rename or edit another project's folder or the shared root files.
- The studio is plain static files. No build step, no npm dependency. `npm test` (run inside `learning/`) runs the content validator; run it before every push.
- Hosting follows the root rules. Live at `https://harmanjohll.github.io/kelly/learning/`.
- Every internal link is relative, and `core.js` derives the site root from its own script address, so the studio works under any base path.
- No published file or folder starts with `_`, and no published file has front matter, so a Jekyll build copies the studio untouched.
- Because `harmanjohll.github.io` is shared with johllygoodlearning, localStorage is shared on the same browser. Studio keys are namespaced `kls.*`. The Gemini key deliberately reuses `jgl.geminiKey` so Harman's existing key works.

---

## 2. Mission

A calm, beautiful, phone first studio where a curious adult can wander through ideas and see how they connect, then practise speaking English with more precision and colour.

Four domains:

1. **Philosophy.** All traditions (Western, Chinese, Indian, Islamic, African, Japanese and more). Filter by construct, thinker, era, tradition, branch.
2. **Physics.** Quantum physics first. Phenomenon first, maths optional (a closed "maths drawer"). Interactive simulations. Explicit links to the philosophy of quantum mechanics.
3. **Psychology.** All fields. Filter by construct, theory, school of thought, psychologist, study, field, era. Every empirical claim carries an evidence label.
4. **English.** Vocabulary, pronunciation, enunciation, idioms, sayings and slang. Speaking practice with recording, AI feedback, shadowing and a live pitch line.

---

## 3. Design theses

### 3.1 A web of ideas, not folders
The unit of content is the **node** (an idea card). Every node carries facet tags and typed links. Modules are curated routes through nodes. Filters narrow the web; they never fight the structure.

### 3.2 The Mind Web is the backbone
Every domain has its own Mind Web, and there is one Super Web across all four. Cross domain links (quantum measurement and realism, Stoicism and CBT, Buddhism and mindfulness, eponyms like "Freudian slip") are drawn in a distinct dashed style. On a phone the primary view is **Focus**: one node in the centre, its neighbours around it, tap to travel, breadcrumb trail behind you. **Overview** shows the whole web with pan and zoom.

### 3.3 Every link says why
A link is `{ to, type, why }`. The `why` sentence is shown when a connection is tapped and is what the Coach probes. Connections are where understanding lives.

### 3.4 Adult autonomy
No streak guilt, no gamified pressure. Streaks are off by default (toggle in Settings). The session opener asks how much time Kelly has today (5, 15, 30 minutes), because time, not mood, is the binding constraint for a busy parent. It proposes a short plan; she can ignore it.

### 3.5 Honest about evidence
Psychology nodes carry `evidence`: `strong`, `moderate`, `mixed`, `contested`, `weak`, or `failed` (failed to replicate). Physics nodes separate settled experiment from contested interpretation. Philosophy presents positions and the best objection to each.

### 3.6 Speaking needs more than an AI opinion
AI audio feedback is good on pace, clarity and expression, weaker on single sounds. So English pairs it with: minimal pair drills (ship, sheep), tricky word drills with respelling and IPA, stress shift pairs, shadowing, and a live pitch line from the microphone.

---

## 4. Architecture

```
learning/
  CLAUDE.md                  this file
  package.json               npm test runs the validator (CommonJS; no dependencies)
  README.md
  index.html                 Today (time based session plan, word of the day, idea of the day, one cross domain link)
  docs/architecture.md       build note
  docs/content-schema.md     node, link, module, English and simulation schemas (source of truth)
  docs/validate.js           content validator (npm test)
  shared/
    studio.css               tokens and components (light and dark)
    core.js                  KLS namespace: storage, chrome (top bar, tab bar, settings), node lookup,
                             review scheduler, speech (text to speech and recognition), AI loader, helpers
    gemini.js                askGemini (ported from johllygoodlearning, with model fallback)
    coach.js                 Coach voice and every prompt builder (loaded on demand)
    audio.js                 microphone recorder (ported; Safari safe; onStream hook for pitch)
    pitch.js                 live pitch tracking and the pitch line
    graph.js                 Mind Web renderer (D3 v7 from cdnjs)
    motif.js                 generative SVG art drawn from the content
    lesson.js                the guided lesson engine
    domain.js                renders a domain page: journeys plus filterable browser
    content/
      philosophy.js  physics.js  psychology.js  english.js
  explore/                   the four rooms plus search across everything
  philosophy/ physics/ psychology/   thin shells over shared/domain.js
  physics/sims/              ten simulations, one file each, plus a gallery page
  english/                   hub; english.js (recorder widget); words, say, sounds, shadow, aloud, wordlab
  learn/                     guided lesson for a journey: ?j=<moduleId>&s=<step> (shared/lesson.js)
  idea/                      renders any node: ?id=phil.determinism[&m=<moduleId>]
  web/                       Mind Web: ?d=all|philosophy|physics|psychology|english&mode=focus|overview&focus=<id>
  practise/                  practice hub
  review/                    spaced review across ideas and words
  you/                       progress story, settings, export and import
```

Content files are JavaScript (`KLS_DATA.philosophy = {...}`) rather than fetched JSON, so pages also open from `file://` and load instantly on mobile.

### 4.1 Progress state
One key: `kls.progress`.

```
{
  version: 1,
  profile:  { name: "Kelly", voice: "en-GB", streaks: false, rate: 1 },
  seen:     { "<nodeId>": "<iso>" },
  saved:    { "<nodeId>": true },
  review:   { "<itemKey>": { step, due, attempts, lapses, lastIso } },
  modules:  { "<moduleId>": { done: { "<nodeId>": true } } },
  minutes:  { "2026-10-17": 23 },
  sessions: [ { startIso, plan, minutes } ],
  explains: [ { id, iso, text, feedback } ],
  speaking: [ { kind, ref, iso, feedback } ]
}
```

Item keys: `node:<nodeId>:<recallIndex>`, `word:<wordId>`. Word Lab cards live separately in `kls.wordlab`. Scheduler: intervals 1, 2, 4, 8, 16, 30, 60 days; "Not yet" resets to 1 day; "Shaky" repeats the current interval.

Export and import of `kls.progress` as a JSON file lives in You, because localStorage does not sync between phone and laptop.

---

## 5. Gemini

- Key in `jgl.geminiKey`. Model override in `jgl.geminiModel`. Wrapper walks fallback models on retirement errors (ported behaviour).
- Never send anything but the learner's own text or recording and the prompt. No server, no analytics.
- Missing key: features still render; AI buttons open Settings with a one line explanation.
- Caps: 1500 characters for explanations, 300 per dialogue turn, recordings under 90 seconds.

---

## 6. The Coach voice

An intellectual companion for a curious adult. Peer to peer, warm, never condescending.

- Two to five sentences. One question at a time.
- Specific: name what was strong ("you separated the experiment from the interpretation"), name what is missing.
- Causal first: when a chain is broken, ask what connects A to C.
- Honest about uncertainty: say when a question is open, when a finding failed to replicate.
- Bring the other domains in when it helps ("a Stoic would push back here").
- No emoji. No "Great job". No feelings claimed by the Coach. No hyphens or dashes in replies.
- Never diagnose. If Kelly's writing indicates distress, respond once, briefly and kindly, suggest talking to someone she trusts, and offer to pause.

Pronunciation feedback is specific: the word, what was heard, the target (respelling plus IPA), and one physical tip (tongue, lips, stress).

---

## 7. Writing rules for all visible copy

- No hyphens, no em dashes, no en dashes in prose. Write "self esteem", "twentieth century", "well known" or rephrase. Code identifiers, file names and IPA are exempt; a hyphen that is part of the English item being taught (an idiom such as "dog eat dog" is written without it where a spaced form is accepted) should be avoided where possible.
- No AI tells: "delve", "tapestry", "embark on a journey", forced doublets.
- No heavy bold or italic for emphasis.
- British spelling (colour, behaviour), matching Singapore usage.

---

## 8. Visual language

"The Observatory", recorded in full in `docs/design.md` (tokens, motifs, page patterns and the review checklist). In short:

- Night by default, warm paper as the alternative (`data-theme` night, paper or auto). Lineage: Alexey's Science Studio.
- One luminous colour per room: Philosophy violet, Physics cyan, Psychology coral, English gold green; gold for links across rooms.
- Fraunces for display, Source Serif 4 for reading, Inter Tight for interface, IBM Plex Mono for labels, numbers, IPA and maths.
- Every picture is generated from the content (`shared/motif.js`): rooms, journeys and bridges are constellations.
- Journeys are guided lessons (`learn/`), one step per screen.
- Phone first: bottom tab bar, 44px targets, no horizontal scroll at 360px; on wide screens the tab bar moves to the top.
- Motion is gentle and respects `prefers-reduced-motion`.

---

## 9. Ethics

- No dark patterns, no guilt, no variable rewards.
- Everything stays in the browser.
- The Coach claims no feelings and gives no diagnosis.
- Quotes must be well attested with a source; if unsure, leave it out.
- Contested science and open philosophical questions are labelled as such.

---

## 10. Phases

1. **Foundation (this build).** Contract, schema, shared core, Mind Web, all four domains seeded, Quantum simulations, English speaking tools, review, You.
2. **Depth.** More nodes per domain, more modules, more sims (quantum eraser, delayed choice), richer English decks, Coach dialogues on connections.
3. **Habit layer.** Optional reminders, weekly reflection, reading lists.

Disagreements with this file go to Harman as a question, not resolved silently.

*Created 17 October 2026.*
