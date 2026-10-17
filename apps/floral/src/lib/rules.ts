import type { Answers, Product, Rule, RuleMatch } from './types';

// A rule applies when every condition in `when` holds. Within one condition, any listed value counts.
export function ruleApplies(rule: Rule, a: Answers): boolean {
  const w = rule.when;
  if (w.culture && !(a.culture && w.culture.includes(a.culture))) return false;
  if (w.intention && !(a.intention && w.intention.includes(a.intention))) return false;
  if (w.notIntention && a.intention && w.notIntention.includes(a.intention)) return false;
  if (w.setting && !(a.setting && w.setting.includes(a.setting))) return false;
  if (w.household && !w.household.some((h) => a.household.includes(h))) return false;
  return true;
}

// A product matches when ANY of the listed properties holds.
export function productMatches(m: RuleMatch, p: Product): boolean {
  if (m.stems?.includes(p.stems)) return true;
  if (m.flowers?.some((f) => p.flowers.includes(f))) return true;
  if (m.colors?.some((c) => p.colors.includes(c))) return true;
  if (m.palette?.includes(p.palette)) return true;
  if (m.lines?.includes(p.line)) return true;
  if (m.potted && p.potted) return true;
  if (m.pollen && p.pollen) return true;
  if (m.fragrant && p.fragrant) return true;
  if (m.mourningCoded && p.mourningCoded) return true;
  return false;
}

export interface RuleOutcome {
  excluded: Map<string, Rule>; // product slug -> first rule that removed it
  boosts: Map<string, number>; // product slug -> total boost
  fired: { rule: Rule; affected: string[] }[];
}

export function applyRules(rules: Rule[], products: Product[], a: Answers): RuleOutcome {
  const excluded = new Map<string, Rule>();
  const boosts = new Map<string, number>();
  const fired: RuleOutcome['fired'] = [];

  for (const rule of rules) {
    if (!ruleApplies(rule, a)) continue;
    if (rule.action === 'note') {
      fired.push({ rule, affected: [] });
      continue;
    }
    const affected = products.filter((p) => rule.match && productMatches(rule.match, p)).map((p) => p.slug);
    for (const slug of affected) {
      if (rule.action === 'exclude' && !excluded.has(slug)) excluded.set(slug, rule);
      if (rule.action === 'boost') boosts.set(slug, (boosts.get(slug) ?? 0) + (rule.boost ?? 0));
    }
    fired.push({ rule, affected });
  }
  return { excluded, boosts, fired };
}
