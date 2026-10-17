# Notes for AI assistants working on the floral site

Source lives in `floral/source`; run commands from there. `floral/` itself holds the built site that GitHub Pages serves: never edit it by hand, regenerate it with `npm run release` and commit it with every change. Repo wide rules are in the root `CLAUDE.md`.

- The business belongs to Kelly. Credit all work and story to Kelly. Use they/them for Kelly unless told otherwise.
- House style for all visible copy: no em dashes or en dashes (tests enforce this), and avoid hyphens in prose. First person singular, as Kelly. See `docs/brand-voice.md`.
- No dark patterns: no fake urgency, no fake stock counts, prices shown in full. This is a brand stance and a legal requirement in Singapore (CCCS).
- Never invent facts about Kelly (anecdotes, hours, customers). Use placeholders and list them in `docs/content-from-kelly.md`.
- Coach logic is pure and tested (`src/lib/*.ts`, `tests/unit`). Safety and cultural rules live in data (`src/data/rules.json`), never in model output.
- Before pushing: `npm test`, `npm run test:e2e`, then `npm run release` and commit `floral/`.
