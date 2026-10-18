import type { Palette, Product } from './types';

// Every piece is shown as a typographic poster until Kelly's photograph of it exists.
// The poster carries what matters: its name, how long it lives, and how many stems.

export const paletteColor: Record<Palette, { bg: string; ink: string }> = {
  soft: { bg: '#F2C4D0', ink: '#151515' },
  bright: { bg: '#F2B632', ink: '#151515' },
  deep: { bg: '#6E1F3A', ink: '#F1F1EC' },
  white: { bg: '#E3E1D8', ink: '#151515' },
  green: { bg: '#A9C9A0', ink: '#151515' },
};

export const lineLabel: Record<Product['line'], string> = {
  fresh: 'Fresh',
  forever: 'Crochet',
  stays: 'Fresh, with one crochet bloom',
  bespoke: 'Made for you',
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

// Seven day ticks that fade for fresh flowers; an infinity mark for crochet; both for a hybrid.
export function lifespanMarkup(line: Product['line']): string {
  const days = Array.from({ length: 7 }, (_, i) => `<i style="--d:${i}"></i>`).join('');
  if (line === 'forever') return `<span class="life forever" role="img" aria-label="Lasts for as long as you keep it"><b>&infin;</b></span>`;
  if (line === 'stays') return `<span class="life stays" role="img" aria-label="Fresh for about a week, one bloom stays"><span class="days">${days}</span><b>+&infin;</b></span>`;
  if (line === 'bespoke') return `<span class="life bespoke" role="img" aria-label="Whatever suits the moment"><b>?</b></span>`;
  return `<span class="life fresh" role="img" aria-label="Fresh for about a week"><span class="days">${days}</span></span>`;
}

export function posterMarkup(p: Product, opts: { base?: string; size?: 'sm' | 'lg' } = {}): string {
  const c = paletteColor[p.palette];
  const size = opts.size ?? 'sm';
  if (p.photo) {
    const src = `${opts.base ?? ''}/${p.photo}`.replace(/\/{2,}/g, '/');
    return `<span class="poster has-photo ${size}"><img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy" /></span>`;
  }
  const stems = p.stems > 0 ? `<span class="stems" role="img" aria-label="${p.stems} stems">${'<i></i>'.repeat(Math.min(p.stems, 15))}</span>` : '';
  return `<span class="poster ${size}" style="--pbg:${c.bg};--pink:${c.ink}">
    <span class="p-line">${esc(lineLabel[p.line])}</span>
    <span class="p-name">${esc(p.name)}</span>
    <span class="p-foot">${lifespanMarkup(p.line)}${stems}</span>
  </span>`;
}
