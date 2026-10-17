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

## Deploying

Each project deploys separately. In Cloudflare Pages, create one Pages project per app and set **Root directory** to that app's folder (for example `apps/floral`). Each app gets its own address, and a change in one folder never redeploys the other unless you configure it to.
