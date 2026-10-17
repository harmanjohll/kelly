# Rules for every session working in this repo

This repo holds several independent projects, each in its own top level folder. More than one session may be working here at once.

1. **Stay inside your project's folder.** Create, edit and delete files only inside it. Run commands from it.
2. **New project? New top level folder** (`<name>/`), with its own README. Never put project files at the repo root.
3. **The root is shared.** Only this file, `README.md`, `.gitignore`, `_config.yml` and `index.html` (the list of projects) live there. Change them only to add your project.
4. **Never move, rename or delete another project's folder.**
5. **Hosting is GitHub Pages, deployed from `main`**, with GitHub's built in Jekyll build. There is no Actions workflow; do not add one, as it would fight the branch deploy.
   - Each folder is served as it sits in the repo: `<name>/index.html` becomes `https://harmanjohll.github.io/kelly/<name>/`. So the repo must hold the **built** site, not just its source.
   - Jekyll drops files and folders that start with `_`, and runs Liquid on files with front matter. Avoid both in published files.
   - Keep source code and notes off the site by adding them to `exclude` in `_config.yml`.
6. Each project may have its own `CLAUDE.md`; read it before working there. Where it conflicts with this file on shared things (the root, hosting), this file wins.

## Projects

| Folder | Project | Address | Built from |
|---|---|---|---|
| `floral/` | Kelly's floral studio (Astro) | /kelly/floral/ | `floral/source/`, via `npm run release` |
| `learning/` | Kelly's Learning Studio (static) | /kelly/learning/ | itself (no build) |
