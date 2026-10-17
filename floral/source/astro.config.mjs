import { defineConfig } from 'astro/config';

// Static output. `npm run release` builds with BASE_PATH=/kelly/floral for GitHub Pages;
// locally the site runs at the root. Assets go in assets/, not _astro/, because Jekyll
// (which GitHub Pages runs on every push) drops folders that start with an underscore.
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://harmanjohll.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets' },
});
