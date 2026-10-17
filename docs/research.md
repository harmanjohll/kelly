# Research basis

The evidence behind the site's design. Compiled October 2026. Vendor statistics are labelled as such. Most sources were read as abstracts or summaries; check effect sizes against the originals before quoting them publicly.

## 1. Where the market is open

What every florist does: a grid of bouquets, an occasion menu, a countdown to the cutoff, Small, Medium and Large sizes with a bear add on, and a blank card box.

What nobody does:

1. **Navigation that starts from intention.** Everyone sorts by occasion ("Birthday") or product ("Roses"). Nobody asks what the customer wants the recipient to feel.
2. **Fresh and crochet together.** No shop presents fleeting and forever as a deliberate choice, or offers the hybrid ("The One That Stays").
3. **Premium crochet.** Singapore crochet is either S$10 to S$25 imports on Shopee or about S$75 artisan bouquets sold by DM on Carousell and Instagram. Nobody shows provenance: hours per stem, the yarn, the maker.
4. **Sensitive contexts.** Some hospital wards ban fresh flowers; lilies are toxic to cats; Singapore's traditions read colour and number differently. Crochet answers the first two, and nobody markets it that way.
5. **The card.** Nobody helps the customer write it.

Local signals: graduation and convocation (NUS, NTU) is the biggest seasonal driver; Teachers' Day and Mother's Day favour carnations; fresh florists sell on same day delivery, so crochet must sell on planning ahead, never urgency.

## 2. Psychology that holds up, and what the site does with it

| Finding | Source | On the site |
|---|---|---|
| Choice overload is real when the decision is hard, the options complex, preferences unclear and effort low. Gift buyers meet all four. | Chernev, Böckenholt & Goodman 2015 (meta analysis); Scheibehenne et al. 2010 found no average effect, so conditions matter | The coach narrows to three picks; the full catalogue stays browsable |
| Givers aim for the "wow" moment; recipients value usefulness and how the gift lives with them | Galak, Givi & Williams 2016; Baskin et al. 2014 | Every piece shows how it lives: lifespan, care, size |
| Price does not raise appreciation | Flynn & Adams 2009 | Nothing equates expensive with meaningful; budget is a filter, not a ranking |
| Recipients prefer what they asked for | Gino & Flynn 2011 | The coach asks for one true thing about them |
| Thoughtfulness counts only when it is visible | Zhang & Epley 2012 | The card draft weaves in that detail: "I chose these because..." |
| Handmade objects are felt to contain the maker's love, most for close relationships | Fuchs, Schreier & van Osselaer 2015 | Crochet sold as made by Kelly, with hours and yarn shown |
| People resist AI advice on emotional choices unless a human is visibly involved | Longoni & Cian 2022 | The coach speaks as Kelly; every brief goes to Kelly personally |
| People value what they help make, if it is finished | Norton, Mochon & Ariely 2012; Franke, Schreier & Kaiser 2010 | Ribbon, keepsake bloom, card choice, all ending in a finished brief |
| Experiences are remembered by their peak and their end | Alaybek et al. 2022 (meta analysis) | Design effort goes into the reveal and the card |
| Showing the work raises perceived value | Buell & Norton 2011 | "How I chose" shows the real reasoning; nothing is faked |
| Experiential framing deepens connection | Chan & Mogilner 2017 | Copy frames flowers as a week on the table, a keepsake on the shelf |
| Flowers lift mood | Haviland-Jones et al. 2005 (part funded by florists, modest samples) | Claims stay modest: no health claims |

**Treated as myth or overclaim:** colour "effects" (colour associations are robust, effects are not: Elliot & Maier 2014; Jonauskaite et al. 2020), the Zeigarnik effect (failed replication, 2025), decision fatigue as a mechanism (Hagger et al. 2016, d = 0.04), fixed Victorian meanings (Seaton 1995), vendor quiz conversion figures (RevenueHunt, Octane AI: unaudited, self selected).

## 3. Guardrails

- **Singapore consumer protection.** CCCS has acted under the CPFTA against fake countdown timers, fake reviews and subscription traps (2025). A review of "misleading and manipulative interfaces" was consulted on in March to April 2026, with recommendations due in H2 2026; check before launch. Price transparency guidelines (since November 2020) require mandatory fees in the headline price.
- **PDPA.** The recipient's details are a third party's personal data: use them for delivery only, never for marketing. Reminders must be opt in, held against the sender. Appoint a Data Protection Officer.
- **AI liability.** A business is liable for what its chatbot says (Moffatt v. Air Canada, 2024). In Phase 3 the model may only recommend from the catalogue; taboos, prices and delivery stay in code.

## 4. Operations

- Fresh: Far East Flora Market (Thomson Road) is the main wholesaler, with no minimum order. Pasir Panjang has no flower sector. Vase life is about 5 to 7 days in Singapore's heat, so the plan is fixed delivery days and just in time buying.
- Couriers: Lalamove or GrabExpress, about S$12 to S$20 per fresh delivery; Ninja Van for crochet.
- Payments: PayNow first (HitPay about 0.65% to 0.9%, vendor figures), cards second. Shopify Payments does not support PayNow natively.
- Admin: ACRA sole proprietorship about S$115; Home Based Business scheme (no signage, no frequent loading); GST only above S$1M turnover.

## 5. Cultural rules: check before launch

The rules in `src/data/rules.json` come from etiquette and florist sources, not scholarship. Have each tradition's rules read by someone from that community, especially the Malay entries, which are marked `verify` in `src/data/flowers.json`. Sources disagree on odd versus even stem counts, so that is deliberately not a rule.
