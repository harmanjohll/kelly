import { expect, test } from '@playwright/test';
import products from '../../src/data/products.json' with { type: 'json' };

// Relative to baseURL, so the same tests run at the root or under /kelly/.
const pages = ['./', 'consult/', 'fleeting/', 'forever/', 'meanings/', 'kelly/', ...products.map((p) => `pieces/${p.slug}/`)];

for (const path of pages) {
  test(`${path} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    // House style: no em dashes or en dashes in visible copy.
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/[–—]/);
    // No horizontal scroll at any width.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test('reduced motion stops the wilting', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-reduced-motion');
  await page.goto('./');
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  await page.waitForTimeout(300);
  const anims = await page.locator('.wilt-word .l').evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
  expect(anims.every((a) => a === 'none')).toBe(true);
});

test('fleeting wilts, and watering revives it', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop');
  await page.goto('./');
  const word = page.locator('.hero .wilt-word');
  await expect(word).toHaveClass(/go/);
  await page.getByRole('button', { name: /Fleeting\. Tap to water/ }).click();
  await expect(word).toHaveClass(/water/);
  await expect(word).toHaveClass(/go/, { timeout: 3000 });
});

test('every internal link resolves', async ({ page, request }, info) => {
  test.skip(info.project.name !== 'desktop');
  const seen = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const h of hrefs) if (h.startsWith('http://localhost')) seen.add(h.split('?')[0]);
  }
  for (const h of seen) expect((await request.get(h)).status(), h).toBe(200);
});
