# Rules for every session working in this repo

This repo holds several independent projects. More than one session may be working here at once.

1. **Stay inside your project's folder.** Every project lives in `apps/<name>/`. Create, edit and delete files only inside your own folder.
2. **New project? New folder.** Start a new project in `apps/<name>/` with its own `package.json`, README and tests. Never put project files at the repo root.
3. **The root is shared.** Only this file, `README.md` and `.gitignore` live at the root. Change them only to add your project to the README table or to add a shared ignore pattern.
4. **Never move, rename or delete another project's folder.**
5. **Run commands from your folder** (`cd apps/<name>`), so installs and builds stay local to it.
6. Each project may have its own `CLAUDE.md` with project rules; read it before working there.

Current projects:

- `apps/floral`: Kelly's floral studio website. See `apps/floral/CLAUDE.md`.
