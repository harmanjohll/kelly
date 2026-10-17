// Everything in this file is Kelly's to fill in. Values marked PLACEHOLDER are not real yet.
// See docs/content-from-kelly.md for the full list of what is needed.

export const site = {
  // While true, a quiet notice tells visitors that prices, photos and stories are placeholders.
  draft: true,

  name: 'Kelly',
  tagline: 'Fresh for the week, crocheted to keep.',

  // WhatsApp number in international format, digits only (65 is Singapore). PLACEHOLDER.
  whatsapp: '6500000000',
  whatsappIsPlaceholder: true,

  instagram: '', // e.g. 'kelly.flowers'. Leave empty to hide.

  payment: 'Kelly will reply to confirm your order and send a PayNow request.',

  // Fresh flowers are bought from the wholesale market for set delivery days, so nothing is wasted.
  fresh: {
    deliveryDays: ['Friday', 'Saturday'], // PLACEHOLDER
    orderBy: 'Wednesday, 6pm', // PLACEHOLDER: the cutoff for that week's delivery
  },

  // Crochet is made to order.
  crochet: {
    leadNote: 'Each piece is made to order, usually within 5 to 10 days.', // PLACEHOLDER
  },

  // Budget bands shown in the consultation. PLACEHOLDER amounts.
  budgets: {
    gentle: 'Under S$60',
    considered: 'S$60 to S$120',
    generous: 'S$120 and above',
  },

  delivery: {
    note: 'Delivery across Singapore. The delivery fee is quoted in the price before you confirm.', // PLACEHOLDER
  },
} as const;

export function waLink(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
