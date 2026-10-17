import { describe, expect, it } from 'vitest';
import { consult, products, intentions, bespoke, daysUntil } from '../../src/lib/coach';
import { cardDrafts } from '../../src/lib/card';
import { briefLink, briefText } from '../../src/lib/brief';
import type { Answers, Culture, Household, Intention, Setting } from '../../src/lib/types';

const today = new Date(2026, 9, 17); // 17 Oct 2026
const base = (a: Partial<Answers>): Answers => ({ household: [], ...a });
const slugs = (a: Answers) => consult(a, { today }).picks.map((p) => p.product.slug);
const pieces = (a: Answers) => consult(a, { today }).picks.map((p) => p.product);

describe('consult', () => {
  const allIntentions = intentions.map((i) => i.id) as Intention[];
  const settings: (Setting | undefined)[] = [undefined, 'home', 'hospital', 'wake', 'office', 'ceremony'];
  const cultures: (Culture | undefined)[] = [undefined, 'chinese', 'malay', 'indian', 'japanese', 'other'];
  const households: Household[][] = [[], ['allergies'], ['pets'], ['allergies', 'pets']];

  it('always returns exactly three distinct, real picks, for every combination', () => {
    const known = new Set([...products.map((p) => p.slug), bespoke.slug]);
    for (const intention of allIntentions)
      for (const setting of settings)
        for (const culture of cultures)
          for (const household of households) {
            const s = slugs(base({ intention, setting, culture, household }));
            expect(s).toHaveLength(3);
            expect(new Set(s).size).toBe(3);
            s.forEach((x) => expect(known.has(x)).toBe(true));
          }
  });

  it('never offers four stems to a Chinese family', () => {
    for (const intention of allIntentions)
      pieces(base({ intention, culture: 'chinese' })).forEach((p) => expect(p.stems).not.toBe(4));
  });

  it('only offers soil free, pollen free pieces in hospital', () => {
    for (const intention of allIntentions)
      pieces(base({ intention, setting: 'hospital' })).forEach((p) => {
        expect(p.potted).toBe(false);
        expect(p.pollen).toBe(false);
      });
  });

  it('puts crochet first for a hospital visit', () => {
    expect(pieces(base({ intention: 'here', setting: 'hospital' }))[0].line).toBe('forever');
  });

  it('never offers lilies when there are cats at home', () => {
    for (const intention of allIntentions)
      pieces(base({ intention, household: ['pets'] })).forEach((p) => expect(p.flowers).not.toContain('lily'));
  });

  it('keeps mourning whites away from Chinese celebrations, and red away from sympathy', () => {
    pieces(base({ intention: 'celebrate', culture: 'chinese' })).forEach((p) => expect(p.mourningCoded).toBe(false));
    pieces(base({ intention: 'sympathy' })).forEach((p) => expect(p.colors).not.toContain('red'));
  });

  it('never offers a mourning piece outside sympathy', () => {
    for (const intention of allIntentions.filter((i) => i !== 'sympathy'))
      for (const setting of settings)
        pieces(base({ intention, setting })).forEach((p) => expect(p.mourningCoded).toBe(false));
  });

  it('leads with white for a Chinese family in mourning and explains the wreath custom at a wake', () => {
    const r = consult(base({ intention: 'sympathy', culture: 'chinese', setting: 'wake' }), { today });
    expect(r.picks[0].product.palette).toBe('white');
    expect(r.notes.join(' ')).toMatch(/wreath/);
    expect(r.register).toBe('quiet');
  });

  it('sets aside pieces that cannot be made in time', () => {
    const tomorrow = '2026-10-18';
    expect(daysUntil(tomorrow, today)).toBe(1);
    pieces(base({ intention: 'proud', date: tomorrow })).forEach((p) => expect(p.leadDays).toBeLessThanOrEqual(1));
  });

  it('honours the lifespan choice', () => {
    expect(pieces(base({ intention: 'love', lifespan: 'both' }))[0].line).toBe('stays');
    expect(pieces(base({ intention: 'love', lifespan: 'forever' }))[0].line).toBe('forever');
    expect(pieces(base({ intention: 'proud', lifespan: 'fleeting' }))[0].line).toBe('fresh');
  });

  it('explains what it did', () => {
    const r = consult(base({ intention: 'sorry', culture: 'chinese' }), { today });
    expect(r.trail[0]).toMatch(/13 pieces/);
    expect(r.trail.join(' ')).toMatch(/four/);
    r.picks.forEach((p) => expect(p.reason.length).toBeGreaterThan(0));
  });
});

describe('cardDrafts', () => {
  it('weaves in the detail and the name', () => {
    const d = cardDrafts(base({ intention: 'thanks', name: 'Mrs Tan', detail: 'you never gave up on me.' }));
    expect(d[0]).toBe('Mrs Tan, I chose these because you never gave up on me. Thank you, for more than I know how to put in a card.');
    expect(d).toHaveLength(3);
  });
});

describe('brief', () => {
  it('builds an encoded WhatsApp link with the full brief', () => {
    const a = base({ intention: 'sorry', relationship: 'partner', culture: 'chinese', date: '2026-10-24', household: ['pets'] });
    const [chosen, ...others] = pieces(a);
    const input = { answers: a, chosen, others, touches: { ribbon: 'Sage', keepsake: true }, card: 'I am sorry & I mean it.' };
    const text = briefText(input);
    expect(text).toContain("I want to say: I'm sorry");
    expect(text).toContain('Sat 24 Oct 2026');
    expect(text).toContain('cats or other pets');
    const url = briefLink(input);
    expect(url.startsWith('https://wa.me/')).toBe(true);
    expect(url).toContain('%26');
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(text);
  });
});
