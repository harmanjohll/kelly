import { site, waLink } from '../config/site';
import { intentionDef } from './coach';
import type { Answers, Product } from './types';

export const labels = {
  relationship: { partner: 'my partner', parent: 'my parent', family: 'family', friend: 'a friend', colleague: 'a colleague', teacher: 'a teacher', self: 'me' },
  setting: { home: 'at home', hospital: 'in hospital', wake: 'a wake or funeral', office: 'an office', ceremony: 'a ceremony or event' },
  culture: { chinese: 'Chinese', malay: 'Malay', indian: 'Indian', japanese: 'Japanese', other: 'other or mixed' },
  lifespan: { fleeting: 'fresh, for the week', forever: 'crochet, to keep', both: 'both: fresh with one bloom that stays', unsure: 'not sure yet' },
  palette: { soft: 'soft and blush', bright: 'bright and sunny', deep: 'deep and romantic', white: 'white and calm', green: 'green and natural' },
  budget: site.budgets,
  household: { allergies: 'allergies', pets: 'cats or other pets' },
} as const;

export interface BriefInput {
  answers: Answers;
  chosen: Product;
  others: Product[];
  touches: { ribbon?: string; keepsake?: boolean };
  card: string;
}

export function briefText({ answers: a, chosen, others, touches, card }: BriefInput): string {
  const lines: string[] = ['Hello Kelly, I used the consultation on your site.', ''];
  const def = intentionDef(a.intention);
  if (def) lines.push(`I want to say: ${def.say}`);
  if (a.relationship) lines.push(`For: ${labels.relationship[a.relationship]}${a.name ? ` (${a.name})` : ''}`);
  if (a.setting) lines.push(`Where: ${labels.setting[a.setting]}`);
  if (a.culture) lines.push(`Family background: ${labels.culture[a.culture]}`);
  if (a.household.length) lines.push(`Please note: ${a.household.map((h) => labels.household[h]).join(', ')}`);
  if (a.lifespan) lines.push(`Lasting: ${labels.lifespan[a.lifespan]}`);
  if (a.palette) lines.push(`Colours: ${labels.palette[a.palette]}`);
  if (a.budget) lines.push(`Budget: ${labels.budget[a.budget]}`);
  lines.push(`Date: ${a.date ? formatDate(a.date) : 'no fixed date'}`);
  lines.push('');
  lines.push(`My choice: ${chosen.name}`);
  if (others.length) lines.push(`Also considered: ${others.map((o) => o.name).join(', ')}`);
  if (touches.ribbon) lines.push(`Ribbon: ${touches.ribbon}`);
  if (touches.keepsake) lines.push('Add one crochet bloom that stays: yes');
  if (card.trim()) {
    lines.push('');
    lines.push('Card:');
    lines.push(card.trim());
  }
  lines.push('');
  lines.push('Could you confirm the price and delivery? Thank you.');
  return lines.join('\n');
}

export function briefLink(input: BriefInput): string {
  return waLink(briefText(input));
}

export function formatDate(iso: string): string {
  // Formatted by hand so the brief reads the same on every phone, whatever its locale.
  const [y, m, d] = iso.split('-').map(Number);
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1];
  return `${day} ${d} ${month} ${y}`;
}
