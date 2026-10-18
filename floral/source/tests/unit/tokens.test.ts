import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Reads the colour tokens straight from the stylesheet, so a palette change can't slip below WCAG AA.
const css = readFileSync(new URL('../../src/styles/global.css', import.meta.url), 'utf8');
const block = (start: number) => css.slice(start, css.indexOf('}', start));
const light = block(css.indexOf(':root {'));
const dark = block(css.indexOf(':root {', css.indexOf('prefers-color-scheme: dark')));
const quiet = block(css.indexOf("[data-register='quiet'] {"));
const token = (src: string, name: string) => src.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))![1];

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('colour tokens meet WCAG AA (4.5:1)', () => {
  for (const [mode, src] of [['light', light], ['dark', dark]] as const) {
    it(`${mode}: text, muted text and accent on paper; button text on accent`, () => {
      const paper = token(src, 'paper');
      expect(contrast(token(src, 'ink'), paper)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(src, 'ink-2'), paper)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(src, 'accent'), paper)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(src, 'accent-ink'), token(src, 'accent'))).toBeGreaterThanOrEqual(4.5);
    });
  }
  it('quiet register accent on light paper, with white button text', () => {
    const a = token(quiet, 'accent');
    expect(contrast(a, token(light, 'paper'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#ffffff', a)).toBeGreaterThanOrEqual(4.5);
  });
});
