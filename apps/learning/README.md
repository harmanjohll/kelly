# Kelly's Learning Studio

Philosophy, quantum physics, psychology and English, connected in one Mind Web. Phone first, static files, no build step.

Live: https://harmanjohll.github.io/kelly/learning/

## Run it locally

```bash
cd apps/learning
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Test

```bash
cd apps/learning
npm test   # validates every content file against docs/content-schema.md
```

## Read first

- `CLAUDE.md`: the build contract (mission, design theses, Coach voice, writing rules).
- `docs/content-schema.md`: how ideas, links, journeys, English items and simulations are written.
- `docs/architecture.md`: what was carried over from johllygoodlearning and why.

The Coach uses Google Gemini with the learner's own key, set in Settings. Everything else stays in the browser.
