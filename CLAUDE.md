# Notes for AI assistants working on this repo

- The business belongs to Kelly. Credit all work and story to Kelly. Use they/them for Kelly unless told otherwise.
- House style for all visible copy: no em dashes or en dashes (tests enforce this), and avoid hyphens in prose. First person singular, as Kelly. See `docs/brand-voice.md`.
- No dark patterns: no fake urgency, no fake stock counts, prices shown in full. This is a brand stance and a legal requirement in Singapore (CCCS).
- Never invent facts about Kelly (anecdotes, hours, customers). Use placeholders and list them in `docs/content-from-kelly.md`.
- Coach logic is pure and tested (`src/lib/*.ts`, `tests/unit`). Safety and cultural rules live in data (`src/data/rules.json`), never in model output.
- Before pushing: `npm test`, `npm run build`, `npm run test:e2e`.
