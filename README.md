# Kelly's apps

| Folder | Project | Live address |
|---|---|---|
| [`floral/`](floral) | Kelly's floral studio | https://harmanjohll.github.io/kelly/floral/ |
| [`learning/`](learning) | Kelly's Learning Studio | https://harmanjohll.github.io/kelly/learning/ |

https://harmanjohll.github.io/kelly/ lists both.

## Hosting

GitHub Pages, deployed from the `main` branch. No other server.

- **Setting:** Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**.
- **Build:** on every push to `main`, GitHub runs its Jekyll build (Actions → "pages build and deployment"). `_config.yml` keeps source code and notes off the public site.
- **The repo holds built sites.** Jekyll copies them as they are. The floral site is built from `floral/source/` with `npm run release`, which writes the result into `floral/`. Commit both.


Test
