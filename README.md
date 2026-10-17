# Kelly's apps

One repository, several independent projects. Each lives in its own folder under `apps/`, with its own dependencies, tests and deployment.

| Project | Folder | What it is |
|---|---|---|
| Floral studio | [`apps/floral`](apps/floral) | Kelly's fresh and crochet flower website, with the consultation coach |

To add a project, create `apps/<name>/` and add a row to this table.

## Working on a project

```bash
cd apps/floral
npm install
npm run dev
```

## Hosting

Everything is hosted on **GitHub Pages**, free, from this repo. No other server is needed.

- Live address: **https://harmanjohll.github.io/kelly/** (the floral site)
- Every merge to `main` rebuilds and redeploys, through `.github/workflows/pages.yml`.
- Another app publishes under its own path, e.g. `https://harmanjohll.github.io/kelly/<app-name>/`, by adding a build step to that workflow.

One time setup: in the repo on GitHub, go to **Settings, then Pages**, and set **Source** to **GitHub Actions**.

A custom domain (e.g. `kellyflowers.sg`) can be added later under the same Settings page; the workflow picks up the new address automatically.
