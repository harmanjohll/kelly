import type { Answers, Intention } from './types';

// Card drafts in Kelly's voice. Plain, warm, short. The customer always edits before sending.
const drafts: Record<Intention, string[]> = {
  sorry: [
    "I'm sorry. I should have said it sooner, and better. These are a start.",
    "No excuses, just this: I'm sorry, and I'd like to make it right.",
    'I got it wrong. Thank you for being patient with me.',
  ],
  thanks: [
    "Thank you, for more than I know how to put in a card.",
    'You made a difference, and I wanted you to know it.',
    'With thanks, and a little something to brighten your table.',
  ],
  proud: [
    "Look at what you did. I'm so proud of you.",
    'All those late nights, and here you are. Congratulations.',
    "This is only the beginning, and I can't wait to see what's next.",
  ],
  here: [
    "Thinking of you, and here whenever you need me.",
    'Something to keep you company until I can be there myself.',
    "Rest, heal, and know you're loved.",
  ],
  love: [
    'For no reason at all, except that I love you.',
    'Still you. Always you.',
    'Thank you for every ordinary day with you.',
  ],
  celebrate: [
    'Congratulations! This is wonderful news.',
    "Here's to you, and to everything ahead.",
    'Celebrating you today, and every day.',
  ],
  sympathy: [
    'With deepest sympathy. Thinking of you and your family.',
    'Holding you close in our thoughts at this difficult time.',
    'With love, and in gentle remembrance.',
  ],
  self: [
    'For me, because I deserve flowers too.',
    'A small celebration of an ordinary week.',
    'Note to self: keep making room for beautiful things.',
  ],
};

export function cardDrafts(a: Answers): string[] {
  if (!a.intention) return [];
  const base = drafts[a.intention].slice();
  const name = a.name?.trim();
  const detail = a.detail?.trim().replace(/[.\s]+$/, '');

  // Making the thought visible is what recipients notice (Zhang & Epley 2012).
  if (detail && a.intention !== 'self') {
    base.unshift(`I chose these because ${lowerFirst(detail)}. ${base[0]}`);
    base.pop();
  }
  return name ? base.map((d) => `${name}, ${lowerFirst(d)}`) : base;
}

function lowerFirst(s: string): string {
  if (s.startsWith('I ') || s.startsWith("I'")) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}
