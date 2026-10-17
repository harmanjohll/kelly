import { defineConfig } from 'astro/config';

// Static output. GitHub Pages builds set SITE_URL and BASE_PATH (e.g. /kelly) in the
// deploy workflow; locally and on a custom domain the site runs at the root.
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://harmanjohll.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
