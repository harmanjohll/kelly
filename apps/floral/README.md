# Kelly

Fresh flowers for the week, crochet flowers to keep. The website for Kelly's floral studio in Singapore.

Instead of a grid of bouquets, the site starts from what the customer wants to say. A short consultation asks six questions and respects Singapore's flower customs. It suggests three pieces with its reasons, drafts a card, and hands the whole brief to Kelly on WhatsApp. Kelly confirms and sends a PayNow request.

**Phase 1** (this code): the site, the rule based consultation, and the WhatsApp handoff. No checkout and no AI calls; free to host. See `docs/research.md` for the evidence behind the design.

## Run it

From this folder (`apps/floral`):

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # unit tests for the coach, rules, card and brief
npm run test:e2e     # browser tests: five customer journeys, every page, mobile and desktop
npm run build        # static site in dist/
```

## Where things live

| What | Where |
|---|---|
| Kelly's settings: WhatsApp, delivery days, budgets, draft notice | `src/config/site.ts` |
| The pieces | `src/data/products.json` |
| What customers can say | `src/data/intentions.json` |
| Cultural and safety rules | `src/data/rules.json` |
| Flower meanings and customs | `src/data/flowers.json` |
| The coach: rules first, then scoring | `src/lib/coach.ts`, `src/lib/rules.ts` |
| Card drafts | `src/lib/card.ts` |
| WhatsApp brief | `src/lib/brief.ts` |
| Drawings standing in for photographs | `src/lib/bloom.ts` |
| Pages | `src/pages/` |

Adding a rule needs no code: add an entry to `rules.json` with `when` (all conditions must hold), an `action` (`exclude`, `boost` or `note`), a `match` (any listed property counts) and an `explain` line in Kelly's voice. The unit tests check that every combination of answers still returns three valid pieces.

## Deploy (Cloudflare Pages, free, commercial use allowed)

1. In Cloudflare: Workers & Pages, then Create, then Pages, then Connect to Git, and pick this repository.
2. Framework preset: Astro. **Root directory `apps/floral`.** Build command `npm run build`. Output directory `dist`.
3. Every push to `main` redeploys. To skip rebuilds when only other apps change, set Build watch paths to `apps/floral/*`. Add a custom domain under the project's settings.

## Before launch

Work through `docs/content-from-kelly.md`: real prices, Kelly's WhatsApp number, Kelly's story and photographs (`docs/shot-list.md`), and a community review of the cultural rules. Then set `draft: false`.

## Later phases

- **Phase 2:** Shopify Basic as the back office (orders, stock) behind this front end; checkout with PayNow through HitPay; delivery slots with cutoffs; opt in anniversary reminders.
- **Phase 3:** a Claude powered coach in a Cloudflare Worker that reads "tell me about them" in the customer's own words and drafts the card. It recommends only from the catalogue, and the rules stay in code.
- **Phase 4:** a crochet builder using real photographed stems, 3D views of signature pieces, and "the bouquet that grows": one crochet stem added each anniversary.
