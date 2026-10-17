import { expect, test, type Page } from '@playwright/test';

interface Walk {
  say: string;
  who?: string;
  where: string;
  home?: string[];
  culture?: string;
  last: string;
  colour: string;
  budget: string;
  daysAhead?: number;
  detail?: string;
}

function isoIn(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function cont(page: Page) {
  await page.locator('.step:not([hidden]) .next').click();
}

async function walk(page: Page, w: Walk) {
  await page.goto('/consult/');
  await page.locator('.step[data-step="say"] .choice', { hasText: w.say }).click();
  if (w.who) {
    await expect(page.locator('.step[data-step="who"]')).toBeVisible();
    await page.locator('.step[data-step="who"] .choice', { hasText: w.who }).click();
    await cont(page);
  }
  await expect(page.locator('.step[data-step="context"]')).toBeVisible();
  await page.locator('.step[data-step="context"] .choice', { hasText: w.where }).click();
  for (const h of w.home ?? []) await page.locator('.step[data-step="context"] .choice', { hasText: h }).click();
  if (w.culture) await page.locator('.step[data-step="context"] .choice', { hasText: w.culture }).click();
  await cont(page);
  await page.locator('.step[data-step="last"] .choice', { hasText: w.last }).click();
  await expect(page.locator('.step[data-step="feel"]')).toBeVisible();
  await page.locator('.step[data-step="feel"] .choice', { hasText: w.colour }).click();
  await page.locator('.step[data-step="feel"] .choice', { hasText: w.budget }).click();
  await cont(page);
  if (w.daysAhead !== undefined) await page.locator('#date').fill(isoIn(w.daysAhead));
  else await page.locator('[name="nodate"]').check();
  if (w.detail) await page.locator('#detail').fill(w.detail);
  await page.getByRole('button', { name: 'Show me' }).click();
  await expect(page.locator('.result')).toBeVisible();
  await expect(page.locator('.pick')).toHaveCount(3);
}

async function brief(page: Page): Promise<string> {
  const href = await page.locator('.send-btn').getAttribute('href');
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  return decodeURIComponent(href!.split('?text=')[1]);
}

test('apology to a partner', async ({ page }, info) => {
  await walk(page, { say: "I'm sorry", who: 'My partner', where: 'At home', home: ['Cats or other pets'], last: 'Both', colour: 'Soft', budget: 'S$60 to S$120', detail: 'you always forgive me first' });
  await expect(page.locator('body')).toHaveAttribute('data-register', 'quiet');
  await expect(page.locator('.pick.first .pick-name')).toHaveText('The One That Stays');
  await expect(page.locator('#card')).toHaveValue(/I chose these because you always forgive me first/);
  const text = await brief(page);
  expect(text).toContain("I want to say: I'm sorry");
  expect(text).toContain('cats or other pets');
  expect(text).not.toContain('Lily');
  await page.screenshot({ path: info.outputPath('apology.png'), fullPage: true, animations: 'disabled' });
});

test('condolence to a Chinese family at a wake', async ({ page }, info) => {
  await walk(page, { say: 'With sympathy', who: 'A colleague', where: 'A wake or funeral', culture: 'Chinese', last: "I'm not sure", colour: 'White', budget: 'S$60 to S$120', daysAhead: 3 });
  await expect(page.locator('.notes')).toContainText('wreath');
  await expect(page.locator('.pick.first .pick-name')).toHaveText('Quiet Field');
  await page.locator('.trail summary').click();
  await expect(page.locator('.trail')).toContainText('four');
  const names = await page.locator('.pick-name').allTextContents();
  expect(names).not.toContain('Twelve Reds');
  await page.screenshot({ path: info.outputPath('condolence.png'), fullPage: true, animations: 'disabled' });
});

test('hospital visit', async ({ page }, info) => {
  await walk(page, { say: "I'm thinking of you", who: 'My parent', where: 'In hospital', culture: 'Japanese', last: "I'm not sure", colour: 'Soft', budget: 'S$60 to S$120' });
  await expect(page.locator('.pick.first .pick-meta')).toContainText('Crochet');
  const names = await page.locator('.pick-name').allTextContents();
  expect(names).not.toContain('Potted Orchid');
  expect(names).not.toContain('Lily and Linen');
  expect(await brief(page)).toContain('Where: in hospital');
  await page.screenshot({ path: info.outputPath('hospital.png'), fullPage: true, animations: 'disabled' });
});

test('NUS graduation', async ({ page }, info) => {
  await walk(page, { say: "I'm proud of you", who: 'A friend', where: 'A ceremony or event', last: 'A week', colour: 'Bright', budget: 'S$60 to S$120', daysAhead: 12 });
  await expect(page.locator('.pick.first .pick-name')).toHaveText('Graduation Armful');
  await expect(page.locator('.keepsake')).toBeVisible();
  await page.locator('.keepsake input').check();
  expect(await brief(page)).toContain('Add one crochet bloom that stays: yes');
  await page.screenshot({ path: info.outputPath('graduation.png'), fullPage: true, animations: 'disabled' });
});

test('a gift for myself skips the relationship question', async ({ page }, info) => {
  await walk(page, { say: 'Something for me', where: 'At home', last: 'A lifetime', colour: 'Green', budget: 'Under S$60' });
  await expect(page.locator('.pick.first .pick-meta')).toContainText('Crochet');
  expect(await brief(page)).toContain('For: me');
  await page.screenshot({ path: info.outputPath('self.png'), fullPage: true, animations: 'disabled' });
});

test('landing page phrases start the consultation at question two', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Thank you', exact: true }).click();
  await expect(page.locator('.step[data-step="who"]')).toBeVisible();
  await expect(page.locator('.count')).toHaveText('2 of 6');
});

test('progress survives a reload', async ({ page }) => {
  await page.goto('/consult/');
  await page.locator('.step[data-step="say"] .choice', { hasText: 'Congratulations' }).click();
  await expect(page.locator('.step[data-step="who"]')).toBeVisible();
  await page.reload();
  await expect(page.locator('.step[data-step="who"]')).toBeVisible();
});
