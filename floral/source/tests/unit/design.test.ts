import { describe, expect, it } from 'vitest';
import { intentions } from '../../src/lib/coach';
import { paletteColor } from '../../src/lib/poster';

// WCAG relative luminance and contrast ratio.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('colour fields', () => {
  it('every intention colour carries text at 4.5:1 or better', () => {
    for (const i of intentions) expect(contrast(i.color, i.ink), `${i.id} ${i.color}/${i.ink}`).toBeGreaterThanOrEqual(4.5);
  });

  it('every poster colour carries text at 4.5:1 or better', () => {
    for (const [name, c] of Object.entries(paletteColor)) expect(contrast(c.bg, c.ink), name).toBeGreaterThanOrEqual(4.5);
  });

  it('every intention has its own colour', () => {
    expect(new Set(intentions.map((i) => i.color)).size).toBe(intentions.length);
  });
});

describe('posters', () => {
  it('swap to the photograph when one exists, under the site base path', async () => {
    const { posterMarkup } = await import('../../src/lib/poster');
    const { products } = await import('../../src/lib/coach');
    const piece = { ...products[0], photo: 'photos/test.jpg' };
    expect(posterMarkup(piece, { base: '/kelly/floral/' })).toContain('src="/kelly/floral/photos/test.jpg"');
    expect(posterMarkup(products[0])).toContain('class="p-name"');
  });
});
