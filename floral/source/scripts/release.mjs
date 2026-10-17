// Builds the site for GitHub Pages and writes it into the parent folder (floral/),
// which Pages serves at https://harmanjohll.github.io/kelly/floral/.
// Run after any change: `npm run release`, then commit and push.
import { execSync } from 'node:child_process';
import { cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

const here = resolve('.');
const out = resolve('..');
const keep = new Set(['source']);

execSync('npx astro build', {
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: '/kelly/floral', SITE_URL: 'https://harmanjohll.github.io' },
});

for (const entry of readdirSync(out)) if (!keep.has(entry)) rmSync(join(out, entry), { recursive: true, force: true });
cpSync(join(here, 'dist'), out, { recursive: true });
rmSync(join(here, 'dist'), { recursive: true, force: true });
console.log(`Released to ${out}. Commit and push to publish.`);
