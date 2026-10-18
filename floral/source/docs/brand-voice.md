# Voice

The site speaks as Kelly: one maker talking to one customer. Warm, plain, unhurried.

## Rules

- **First person, singular.** "I'll help you choose", not "We're here to help".
- **Short sentences.** One idea each.
- **Plain words.** Say "lasts about a week", not "boasts exceptional longevity".
- **No dashes of any kind** in visible copy. Use a full stop, a comma, a colon or a semicolon. The end to end tests check for em and en dashes on every page.
- **No pressure.** No "hurry", "only 2 left", "don't miss out". Real cutoffs are fine: "Order by Wednesday, 6pm."
- **Honest claims.** Flowers may lift a mood; they do not "reduce anxiety". Crochet "needs no water"; it is not "eco friendly" unless that can be shown.
- **Explain, don't scold.** When a rule removes something, say why kindly: "Lilies are toxic to cats, so they're out."
- **Respect the occasion.** For grief and apology the site's register quietens. Copy there is shorter, softer, and never upbeat.

## Card messages

Drafts in `src/lib/card.ts` follow three patterns:

1. The plain truth of the intention ("I'm sorry.")
2. One concrete image ("Something to keep you company until I can be there myself.")
3. When the customer gives a detail, the thought made visible ("I chose these because...")

Keep each under 25 words. The customer always edits before sending.

# Visual language

The brand idea, fresh fades and crochet stays, is set in the type itself.

- **FLEETING wilts.** Its letters narrow, thin and droop over a few seconds, like stems over a week. Tapping it waters it and the letters spring back.
- **FOREVER is stitched.** A dashed outline like a crochet chain. It never moves.
- **Emotion is colour.** Each thing a customer can say has its own colour field (`src/data/intentions.json`), and the consultation floods the page with it. Every colour carries its text at 4.5:1 contrast or better; a unit test checks this.
- **Type:** Anybody (display, a variable width face), Hanken Grotesk (text), Newsreader italic (Kelly's voice: the card, the asides).
- **Shapes:** square. Hairline and two pixel rules. Pill buttons are the only rounded shape.
- **Posters stand in for photographs**, showing a piece's name, its lifespan (seven fading day ticks for fresh, ∞ for crochet) and its stems. A photograph replaces the poster when it exists.
- **Motion has a meaning or it goes.** Wilting, watering, the colour flood and fading stems each say something about the product. Everything respects reduced motion.
