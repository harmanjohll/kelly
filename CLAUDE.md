# Rules for every session working in this repo

This repo holds several independent projects, each in its own top level folder. More than one session may be working here at once.

1. **Stay inside your project's folder.** Create, edit and delete files only inside it. Run commands from it.
2. **New project? New top level folder** (`<name>/`), with its own README. Never put project files at the repo root.
3. **The root is shared.** Only this file, `README.md`, `.gitignore` and `.github/workflows/pages.yml` live there. Change them only to add your project.
4. **Never move, rename or delete another project's folder.**
5. **One Pages workflow.** A repo has a single GitHub Pages site, so every project deploys through `.github/workflows/pages.yml`. Add your project as a step there. Never add a second Pages workflow; it would overwrite everyone else's site.
6. Each project may have its own `CLAUDE.md`; read it before working there. Where it conflicts with this file on shared things (the root, deployment), this file wins.

## Projects

| Folder | Project | Address |
|---|---|---|
| `learning/` | Kelly's Learning Studio (static) | https://harmanjohll.github.io/kelly/ |
| `floral/` | Kelly's floral studio (Astro) | https://harmanjohll.github.io/kelly/floral/ |
