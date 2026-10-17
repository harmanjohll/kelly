import { defineConfig } from 'astro/config';

// Static output. Deploys to Cloudflare Pages: build `npm run build`, output `dist`.
export default defineConfig({
  output: 'static',
  site: 'https://kelly.pages.dev',
  build: { format: 'directory' },
});
