import type { ArtSpec, BloomKind } from './types';

// Line illustrations drawn in code. They stand in for Kelly's photographs until those exist,
// and they are labelled as illustrations wherever they appear.
//
// Two hands: 'fresh' is a single fine line with a light wash; 'crochet' is a heavier stitched
// line (a dashed stroke with round caps reads as a chain of stitches) with a fuller fill.

export type Hand = 'fresh' | 'crochet';

const TONES: Record<ArtSpec['tone'], string> = {
  blush: 'var(--bloom-blush)',
  sun: 'var(--bloom-sun)',
  wine: 'var(--bloom-wine)',
  ivory: 'var(--bloom-ivory)',
  sage: 'var(--bloom-sage)',
};

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const f = (n: number) => n.toFixed(1);

function petal(cx: number, cy: number, angle: number, len: number, width: number): string {
  const c = Math.cos(angle), s = Math.sin(angle);
  const tipX = cx + c * len, tipY = cy + s * len;
  const px = -s * width, py = c * width;
  const m1x = cx + c * len * 0.5 + px, m1y = cy + s * len * 0.5 + py;
  const m2x = cx + c * len * 0.5 - px, m2y = cy + s * len * 0.5 - py;
  return `M${f(cx)} ${f(cy)} Q${f(m1x)} ${f(m1y)} ${f(tipX)} ${f(tipY)} Q${f(m2x)} ${f(m2y)} ${f(cx)} ${f(cy)}Z`;
}

interface Parts { shapes: string[]; lines: string[] }

function ring(cx: number, cy: number, r: number, k: number, amp: number, squash: number, rand: () => number): string {
  let d = '';
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * Math.PI * 2;
    const rr = r * (1 + amp * Math.sin(k * t) + (rand() - 0.5) * 0.03);
    const x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr * squash;
    d += i === 0 ? `M${f(x)} ${f(y)}` : ` L${f(x)} ${f(y)}`;
  }
  return d + 'Z';
}

function rose(cx: number, cy: number, r: number, rand: () => number): Parts {
  let spiral = '';
  const turns = 2.4;
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * turns * Math.PI * 2;
    const rr = (r * 0.7 * i) / 64;
    const x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr * 0.86;
    spiral += i === 0 ? `M${f(x)} ${f(y)}` : ` L${f(x)} ${f(y)}`;
  }
  const cups: string[] = [];
  for (let k = 0; k < 5; k++) {
    const a0 = (k / 5) * Math.PI * 2 + rand() * 0.3;
    const a1 = a0 + Math.PI * 0.55;
    const x0 = cx + Math.cos(a0) * r * 0.86, y0 = cy + Math.sin(a0) * r * 0.78;
    const x1 = cx + Math.cos(a1) * r * 0.86, y1 = cy + Math.sin(a1) * r * 0.78;
    const am = (a0 + a1) / 2;
    cups.push(`M${f(x0)} ${f(y0)} Q${f(cx + Math.cos(am) * r * 1.12)} ${f(cy + Math.sin(am) * r * 1.02)} ${f(x1)} ${f(y1)}`);
  }
  return { shapes: [ring(cx, cy, r, 5, 0.06, 0.9, rand)], lines: [spiral, ...cups] };
}

function daisy(cx: number, cy: number, r: number, rand: () => number): Parts {
  const n = 12 + Math.floor(rand() * 4);
  const shapes: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.08;
    shapes.push(petal(cx + Math.cos(a) * r * 0.18, cy + Math.sin(a) * r * 0.18, a, r * (0.85 + rand() * 0.15), r * 0.17));
  }
  const c = r * 0.24;
  shapes.push(`M${f(cx + c)} ${f(cy)} A${f(c)} ${f(c)} 0 1 1 ${f(cx - c)} ${f(cy)} A${f(c)} ${f(c)} 0 1 1 ${f(cx + c)} ${f(cy)}Z`);
  return { shapes, lines: [] };
}

function ruffle(cx: number, cy: number, r: number, rand: () => number): Parts {
  const k = 9 + Math.floor(rand() * 3);
  return {
    shapes: [ring(cx, cy, r, k, 0.1, 0.92, rand)],
    lines: [ring(cx, cy, r * 0.68, k + 1, 0.12, 0.92, rand), ring(cx, cy, r * 0.36, k - 2, 0.14, 0.92, rand)],
  };
}

function tulip(cx: number, cy: number, r: number): Parts {
  const top = cy - r * 1.05, base = cy + r * 0.75;
  const cup = `M${f(cx - r * 0.72)} ${f(cy - r * 0.4)} Q${f(cx - r * 0.86)} ${f(base)} ${f(cx)} ${f(base)} Q${f(cx + r * 0.86)} ${f(base)} ${f(cx + r * 0.72)} ${f(cy - r * 0.4)} L${f(cx + r * 0.42)} ${f(cy - r * 0.15)} L${f(cx + r * 0.2)} ${f(top)} L${f(cx)} ${f(cy - r * 0.3)} L${f(cx - r * 0.2)} ${f(top)} L${f(cx - r * 0.42)} ${f(cy - r * 0.15)}Z`;
  return {
    shapes: [cup],
    lines: [
      `M${f(cx - r * 0.2)} ${f(top)} Q${f(cx - r * 0.3)} ${f(cy + r * 0.2)} ${f(cx)} ${f(base)}`,
      `M${f(cx + r * 0.2)} ${f(top)} Q${f(cx + r * 0.3)} ${f(cy + r * 0.2)} ${f(cx)} ${f(base)}`,
    ],
  };
}

function lily(cx: number, cy: number, r: number, rand: () => number): Parts {
  const shapes: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + rand() * 0.1;
    shapes.push(petal(cx, cy, a, r * 1.1, r * 0.26));
  }
  const lines: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * 0.32;
    lines.push(`M${f(cx)} ${f(cy)} L${f(cx + Math.cos(a) * r * 0.6)} ${f(cy + Math.sin(a) * r * 0.6)}`);
  }
  return { shapes, lines };
}

function orchid(cx: number, cy: number, r: number): Parts {
  return {
    shapes: [
      petal(cx, cy, -Math.PI / 2, r * 0.9, r * 0.32),
      petal(cx, cy, -Math.PI / 2 + 2.2, r * 0.9, r * 0.32),
      petal(cx, cy, -Math.PI / 2 - 2.2, r * 0.9, r * 0.32),
      petal(cx, cy, -0.35, r, r * 0.5),
      petal(cx, cy, Math.PI + 0.35, r, r * 0.5),
    ],
    lines: [`M${f(cx - r * 0.25)} ${f(cy + r * 0.1)} Q${f(cx)} ${f(cy + r * 0.7)} ${f(cx + r * 0.25)} ${f(cy + r * 0.1)}`],
  };
}

function sprig(cx: number, cy: number, r: number, rand: () => number): Parts {
  const lines = [`M${f(cx)} ${f(cy + r * 1.4)} Q${f(cx + r * 0.3)} ${f(cy)} ${f(cx - r * 0.1)} ${f(cy - r * 1.3)}`];
  const shapes: string[] = [];
  for (let i = 0; i < 7; i++) {
    const t = i / 7;
    const x = cx + r * 0.12 - t * r * 0.2, y = cy + r * 1.2 - t * r * 2.4;
    const side = i % 2 === 0 ? -1 : 1;
    shapes.push(petal(x, y, -Math.PI / 2 + side * (0.95 + rand() * 0.2), r * 0.62, r * 0.22));
  }
  return { shapes, lines };
}

function bloomParts(kind: BloomKind, cx: number, cy: number, r: number, rand: () => number): Parts {
  switch (kind) {
    case 'rose': return rose(cx, cy, r, rand);
    case 'daisy': return daisy(cx, cy, r, rand);
    case 'ruffle': return ruffle(cx, cy, r, rand);
    case 'tulip': return tulip(cx, cy, r);
    case 'lily': return lily(cx, cy, r, rand);
    case 'orchid': return orchid(cx, cy, r);
    case 'sprig': return sprig(cx, cy, r, rand);
  }
}

interface Placed { kind: BloomKind; x: number; y: number; r: number; hand: Hand; tone: string }

function group(items: Placed[], gatherX: number, gatherY: number, rand: () => number, cls: string): string {
  const out: string[] = [];
  // stems first, so blooms sit over them
  for (const b of items) {
    const bend = (rand() - 0.5) * 30;
    const stemCls = b.hand === 'crochet' ? 'stem stitch' : 'stem';
    out.push(`<path class="${stemCls}" d="M${f(gatherX)} ${f(gatherY)} Q${f((gatherX + b.x) / 2 + bend)} ${f((gatherY + b.y) / 2)} ${f(b.x)} ${f(b.y + b.r * 0.6)}"/>`);
  }
  for (const b of items) {
    const handCls = b.hand === 'crochet' ? 'bloom crochet' : 'bloom fresh';
    const tone = b.kind === 'sprig' ? TONES.sage : b.tone;
    const { shapes, lines } = bloomParts(b.kind, b.x, b.y, b.r, rand);
    const body = shapes.map((d) => `<path class="shape" d="${d}"/>`).join('');
    const knit = b.hand === 'crochet' ? shapes.map((d) => `<path class="knit" d="${d}"/>`).join('') : '';
    out.push(`<g class="${handCls}" style="--tone:${tone}">${body}${knit}${lines.map((d) => `<path d="${d}"/>`).join('')}</g>`);
  }
  return `<g class="${cls}">${out.join('')}</g>`;
}

function layout(blooms: BloomKind[], cx: number, top: number, spread: number, rand: () => number) {
  const n = blooms.length;
  return blooms.map((kind, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const arc = Math.sin(t * Math.PI);
    return {
      kind,
      x: cx + (t - 0.5) * spread + (rand() - 0.5) * 10,
      y: top + (1 - arc) * 70 + (i % 2) * 34 + (rand() - 0.5) * 12,
      r: kind === 'sprig' ? 34 : 34 + rand() * 10,
    };
  });
}

function tie(x: number, y: number): string {
  return `<g class="tie"><path d="M${x - 16} ${y - 6} Q${x} ${y + 4} ${x + 16} ${y - 6}"/><path d="M${x - 4} ${y} Q${x - 22} ${y + 26} ${x - 14} ${y + 46}"/><path d="M${x + 4} ${y} Q${x + 20} ${y + 24} ${x + 18} ${y + 44}"/></g>`;
}

// One arrangement in a single hand. Used for product cards and pages.
export function arrangementSVG(spec: ArtSpec, hand: Hand, title: string): string {
  const rand = rng(spec.seed);
  const W = 320, H = 360;
  const placed = layout(spec.blooms, W / 2, 80, spec.blooms.length === 1 ? 0 : 200, rand).map((p) => ({ ...p, hand, tone: TONES[spec.tone] }));
  return svg(W, H, title, group(placed, W / 2, 300, rand, 'arrangement') + tie(W / 2, 296));
}

// A hybrid arrangement: the last bloom is crocheted, the rest are fresh.
export function staysSVG(spec: ArtSpec, title: string): string {
  const rand = rng(spec.seed);
  const W = 320, H = 360;
  const pos = layout(spec.blooms, W / 2, 80, 200, rand);
  const keep = Math.floor(pos.length / 2);
  const placed = pos.map((p, i) => ({ ...p, hand: (i === keep ? 'crochet' : 'fresh') as Hand, tone: i === keep ? TONES.wine : TONES[spec.tone] }));
  return svg(W, H, title, group(placed, W / 2, 300, rand, 'arrangement') + tie(W / 2, 296));
}

// The threshold: one arrangement, fresh on the left half and crochet on the right.
export function thresholdSVG(): string {
  const rand = rng(23);
  const W = 640, H = 560, gx = 320, gy = 500;
  const left: Placed[] = [
    { kind: 'sprig', x: 70, y: 285, r: 44, hand: 'fresh', tone: TONES.sage },
    { kind: 'lily', x: 190, y: 92, r: 48, hand: 'fresh', tone: TONES.ivory },
    { kind: 'daisy', x: 115, y: 190, r: 46, hand: 'fresh', tone: TONES.sun },
    { kind: 'rose', x: 262, y: 168, r: 54, hand: 'fresh', tone: TONES.blush },
    { kind: 'daisy', x: 118, y: 360, r: 34, hand: 'fresh', tone: TONES.ivory },
    { kind: 'ruffle', x: 200, y: 282, r: 52, hand: 'fresh', tone: TONES.blush },
    { kind: 'tulip', x: 282, y: 330, r: 36, hand: 'fresh', tone: TONES.sun },
  ];
  const right: Placed[] = [
    { kind: 'sprig', x: 572, y: 285, r: 44, hand: 'crochet', tone: TONES.sage },
    { kind: 'tulip', x: 452, y: 96, r: 46, hand: 'crochet', tone: TONES.blush },
    { kind: 'daisy', x: 528, y: 190, r: 46, hand: 'crochet', tone: TONES.sun },
    { kind: 'rose', x: 380, y: 168, r: 54, hand: 'crochet', tone: TONES.wine },
    { kind: 'daisy', x: 524, y: 360, r: 34, hand: 'crochet', tone: TONES.ivory },
    { kind: 'ruffle', x: 444, y: 282, r: 52, hand: 'crochet', tone: TONES.blush },
    { kind: 'tulip', x: 360, y: 330, r: 36, hand: 'crochet', tone: TONES.sun },
  ];
  const body =
    group(left, gx - 4, gy, rand, 'half half-fresh') +
    group(right, gx + 4, gy, rand, 'half half-crochet') +
    tie(gx, gy - 4);
  return svg(W, H, 'Illustration: one arrangement, fresh flowers on the left and crocheted flowers on the right', body, 'threshold-art');
}

// Rows of small v stitches, laid over crochet blooms so they read as yarn.
const KNIT = '<defs><pattern id="knit" width="5" height="5" patternUnits="userSpaceOnUse"><path class="knit-v" d="M0.6 0.8 L2.5 3.6 L4.4 0.8"/></pattern></defs>';

function svg(w: number, h: number, title: string, body: string, cls = 'art'): string {
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title.replace(/"/g, '&quot;')}" xmlns="http://www.w3.org/2000/svg">${KNIT}${body}</svg>`;
}

export function artFor(p: { line: string; art: ArtSpec; name: string }): string {
  const title = `Illustration of ${p.name}`;
  if (p.line === 'stays') return staysSVG(p.art, title);
  return arrangementSVG(p.art, p.line === 'forever' ? 'crochet' : 'fresh', title);
}
