# Architecture note: Kelly's Learning Studio

Date: 17 October 2026. Phase 1 (Foundation).

## 1. What was carried over from johllygoodlearning, and what changed

| From | Kept | Changed |
|---|---|---|
| `/english/shared/gemini.js` | Whole wrapper, including the model fallback walk and audio and image parts | Key lookup reads only `jgl.geminiKey` |
| `/english/shared/audio.js` | Whole recorder (Safari codec negotiation, auto stop, level meter) | Added an `onStream` hook so the pitch line listens to the same microphone stream |
| Coach voice (`coach.js`, CLAUDE.md section 12) | One voice constant prepended to every prompt; one probe at a time; no emoji, no dashes | Rewritten for an adult peer, with honesty about contested evidence and cross domain prompting |
| Science Lab Mega Map | A web of typed links, deductive (hub, cluster, node) and inductive (node outward) travel | Phone first: Focus view (ego graph, tap to travel, trail) is the default on phones; Overview is a cached deterministic force layout with zoom dependent labels |
| Compass, Mirror | Session opener and an honest progress story | Opener asks about time (5, 15, 30 minutes), not mood; streaks off by default; Mirror is "You" with neutral sentences and a 28 day heatmap |
| Spaced repetition | Doubling intervals, reset on a miss | Three grades (Not yet, Shaky, Knew it), steps to 60 days |
| Reading Aloud, Word Lab, Listening voices | Record, play back, AI feedback; any word to a card; browser voices | Adult register; Word Lab returns nuance, collocations and US IPA; accent choice in Settings |

Left behind: everything PSLE specific (papers, marks, countdown, SBC, examiner mode).

## 2. New in this studio

- One content model across three idea domains: node, facets, typed links with a `why`, modules as routes (`docs/content-schema.md`).
- A validator (`docs/validate.js`) that enforces ids, link targets, cross domain anchors, evidence labels and the house writing rules. It also runs in the deploy workflow, so broken content cannot publish.
- Ten quantum simulations, all canvas, all theme aware, paused off screen.
- English speaking tools beyond AI opinion: minimal pairs with an ear mode (text to speech) and a mouth mode (speech recognition), tricky words with respelling and IPA, stress shift pairs, shadowing with a live pitch line, and reading aloud with Coach feedback.
- Super Web: all four domains in one graph, with English words that began as ideas ("Freudian slip", "quantum leap", "stoic") bridging into the idea domains.

## 3. State

| Key | Holds |
|---|---|
| `kls.progress` | Everything about Kelly's learning (CLAUDE.md section 4.1) |
| `kls.wordlab` | Word Lab cards she has looked up |
| `kls.web.*` | Cached Mind Web layouts (safe to delete) |
| `jgl.geminiKey`, `jgl.geminiModel`, `jgl.geminiModelOk` | Shared with Harman's other studios on the same origin |

No server. Export and import in You moves progress between devices.

## 4. Living alongside other apps

The repo holds several apps under `apps/`. The studio is `apps/learning/`, plain static files. The shared `.github/workflows/pages.yml` runs this folder's `npm test` (the validator), then copies it to `_site/learning/`, so broken content cannot publish. Internal links are relative and `core.js` finds the site root from its own script address, so the base path `/kelly/learning/` needs no configuration.

## 5. Known limits

- Browser voices vary by device. Minimal pair ear training is only as good as the voice; the accent setting helps.
- Speech recognition (mouth mode, quick check) needs Chrome or Safari; Firefox shows a message instead.
- AI audio feedback is reliable on pace, clarity and expression, less so on single phonemes. The page says so.
- Progress does not sync between devices automatically.
