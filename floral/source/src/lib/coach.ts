import productsData from '../data/products.json';
import rulesData from '../data/rules.json';
import intentionsData from '../data/intentions.json';
import { applyRules } from './rules';
import type { Answers, CoachResult, IntentionDef, Pick, Product, Rule } from './types';

export const products = productsData as Product[];
export const rules = rulesData as Rule[];
export const intentions = intentionsData as IntentionDef[];

// Offered when the catalogue can't give three good fits: Kelly designs it from the brief.
export const bespoke: Product = {
  slug: 'design-with-kelly',
  name: 'Design it with Kelly',
  line: 'bespoke',
  summary: 'Tell me about them and I will design something only for this moment, fresh, crochet or both.',
  story: '',
  priceFrom: null,
  budget: 'considered',
  intentions: {},
  relationships: [],
  palette: 'soft',
  colors: [],
  flowers: [],
  stems: 0,
  potted: false,
  pollen: false,
  fragrant: false,
  mourningCoded: false,
  leadDays: 0,
  lifespan: 'Whatever suits the moment.',
  care: '',
  size: '',
};

const BUDGET_ORDER = { gentle: 0, considered: 1, generous: 2 } as const;
const PICKS = 3;

export function intentionDef(id: Answers['intention']): IntentionDef | undefined {
  return intentions.find((i) => i.id === id);
}

export function daysUntil(isoDate: string, today: Date): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = Date.UTC(y, m - 1, d);
  const base = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target - base) / 86_400_000);
}

interface Scored {
  product: Product;
  score: number;
  factors: string[];
}

function score(p: Product, a: Answers, boost: number): Scored {
  const factors: string[] = [];
  let s = boost;
  const def = intentionDef(a.intention);

  const fit = a.intention ? (p.intentions[a.intention] ?? 0) : 0;
  s += fit === 0 ? -6 : fit * 3;
  if (fit >= 2 && def) factors.push(`Made for saying ${def.phrase}.`);

  if (a.relationship && p.relationships.includes(a.relationship)) s += 1;

  switch (a.lifespan) {
    case 'fleeting':
      if (p.line === 'fresh') { s += 4; factors.push('Fresh, for about a week.'); }
      if (p.line === 'stays') s += 2;
      break;
    case 'forever':
      if (p.line === 'forever') { s += 4; factors.push('Crocheted by hand, so it stays.'); }
      if (p.line === 'stays') s += 2;
      break;
    case 'both':
      if (p.line === 'stays') { s += 5; factors.push('Fresh now, with one crochet bloom that stays.'); }
      else s += 1;
      break;
    default:
      if (p.line === 'stays') s += 1;
  }

  if (a.palette && p.palette === a.palette) { s += 2; factors.push('In the colours you chose.'); }

  if (a.budget) {
    const diff = BUDGET_ORDER[p.budget] - BUDGET_ORDER[a.budget];
    if (diff > 0) s -= 4 * diff;
    else if (diff === 0) s += 2;
  }

  if (a.setting === 'hospital' && p.line === 'forever') factors.unshift('Welcome on any ward, and it comes home with them.');
  if (a.household.includes('allergies') && p.line === 'forever') factors.push('No pollen, no scent.');

  return { product: p, score: s, factors };
}

function reasonFor(x: Scored): string {
  if (x.factors.length === 0) return x.product.summary;
  return x.factors.slice(0, 2).join(' ');
}

export function consult(a: Answers, opts: { catalogue?: Product[]; ruleset?: Rule[]; today?: Date } = {}): CoachResult {
  const catalogue = opts.catalogue ?? products;
  const ruleset = opts.ruleset ?? rules;
  const today = opts.today ?? new Date();
  const def = intentionDef(a.intention);

  const trail: string[] = [`I started with everything I make: ${catalogue.length} pieces.`];
  if (def) trail.push(`I looked for the ones that say "${def.say}" best.`);

  const outcome = applyRules(ruleset, catalogue, a);
  const notes: string[] = [];
  for (const { rule, affected } of outcome.fired) {
    if (rule.action === 'note') notes.push(rule.explain);
    else if (rule.action === 'exclude') {
      const removed = affected.filter((s) => outcome.excluded.get(s) === rule).length;
      if (removed > 0) trail.push(rule.explain);
    } else if (rule.action === 'boost' && affected.length > 0) trail.push(rule.explain);
  }

  // Lead time: a piece that can't be ready by the date is set aside.
  const late = new Set<string>();
  if (a.date) {
    const days = daysUntil(a.date, today);
    for (const p of catalogue) if (!outcome.excluded.has(p.slug) && p.leadDays > days) late.add(p.slug);
    if (late.size > 0) trail.push(`${late.size === 1 ? 'One piece needs' : `${late.size} pieces need`} more time than we have before your date, so I set ${late.size === 1 ? 'it' : 'them'} aside.`);
  }

  if (a.budget) trail.push('I kept to your budget.');

  const eligible = catalogue.filter((p) => !outcome.excluded.has(p.slug) && !late.has(p.slug));
  const ranked = eligible
    .map((p) => score(p, a, outcome.boosts.get(p.slug) ?? 0))
    .sort((x, y) => y.score - x.score);

  const strong = ranked.filter((x) => (a.intention ? (x.product.intentions[a.intention] ?? 0) > 0 : true));
  const chosen: Scored[] = strong.slice(0, PICKS);

  if (chosen.length < PICKS) {
    chosen.push({ product: bespoke, score: 0, factors: ['Nothing on my shelf fits perfectly, so I will make one for this moment.'] });
    trail.push('Fewer than three pieces fit well, so I have offered to design one for you.');
  }
  for (const x of ranked) {
    if (chosen.length >= PICKS) break;
    if (!chosen.includes(x)) chosen.push(x);
  }

  trail.push('Then I ranked what was left by how well each fits.');

  const picks: Pick[] = chosen.slice(0, PICKS).map((x) => ({ product: x.product, score: x.score, reason: reasonFor(x) }));
  return { picks, trail, notes, register: def?.register ?? 'open' };
}
