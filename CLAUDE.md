# Rules for every session working in this repo

This repo holds several independent projects. More than one session may be working here at once.

1. **Stay inside your project's folder.** Every project lives in `apps/<name>/`. Create, edit and delete files only inside your own folder.
2. **New project? New folder.** Start a new project in `apps/<name>/` with its own `package.json`, README and tests. Never put project files at the repo root.
3. **The root is shared.** Only this file, `README.md`, `.gitignore` and `.github/workflows/pages.yml` live at the root. Change them only to add your project to the README table, add a shared ignore pattern, or add your app's build step to the Pages workflow.
7. **Hosting is GitHub Pages**, one site for the whole repo. The floral site sits at the root of it; any other app publishes under its own subfolder (`_site/<app-name>/`). Build with the `BASE_PATH` the workflow provides, and make every internal link respect it, or the app breaks once deployed.
4. **Never move, rename or delete another project's folder.**
5. **Run commands from your folder** (`cd apps/<name>`), so installs and builds stay local to it.
6. Each project may have its own `CLAUDE.md` with project rules; read it before working there.

Current projects:

- `apps/floral`: Kelly's floral studio website. See `apps/floral/CLAUDE.md`.
