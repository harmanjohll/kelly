import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Cloud sessions ship a preinstalled Chromium; elsewhere Playwright uses its own download.
const chromium = '/opt/pw-browsers/chromium';
const launchOptions = existsSync(chromium) ? { executablePath: chromium } : {};

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  // Set BASE_PATH=/kelly to test the site exactly as GitHub Pages serves it.
  use: { baseURL: `http://localhost:4322${process.env.BASE_PATH ?? ''}/`, launchOptions },
  webServer: {
    command: 'npm run build && npx astro preview --port 4322',
    url: `http://localhost:4322${process.env.BASE_PATH ?? ''}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
    { name: 'desktop-reduced-motion', use: { viewport: { width: 1280, height: 900 }, colorScheme: 'dark', contextOptions: { reducedMotion: 'reduce' } } },
  ],
});
