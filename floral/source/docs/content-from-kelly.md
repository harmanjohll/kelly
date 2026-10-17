# What only Kelly can supply

The site runs today on placeholders. Each item below replaces one. When all are done, set `draft: false` in `src/config/site.ts` to remove the preview notice.

## Business settings (`src/config/site.ts`)

- [ ] WhatsApp number (international format, digits only, e.g. `6591234567`), then set `whatsappIsPlaceholder: false`
- [ ] Instagram handle, if any
- [ ] Fresh delivery days and the weekly order cutoff
- [ ] Crochet lead time
- [ ] Delivery note: zones, fees, hospital and Sentosa surcharges (these must be stated up front)
- [ ] Budget bands for the consultation (currently Under S$60, S$60 to S$120, S$120 and above)

## Each piece (`src/data/products.json`)

- [ ] Keep, rename or remove each of the 13 sample pieces; add Kelly's own
- [ ] `priceFrom` in SGD, delivery included (currently "Price on request")
- [ ] `summary` and `story` in Kelly's words. The current text is a draft written to show tone.
- [ ] For crochet: real `makeHours` and `yarn`. The current hours are estimates, not facts.
- [ ] `leadDays`, `size`, `care`, `stems`
- [ ] Photographs (see `docs/shot-list.md`)

How the coach uses each field:

- `intentions`: 0 to 3, how well the piece says each thing. 3 is the strongest.
- `pollen`, `fragrant`, `potted`, `mourningCoded`: drive the safety rules. Mark them honestly.
- `colors` and `palette`: drive the colour rules and the colour question.

## Kelly's story (`src/pages/kelly.astro`)

- [ ] Answer the four prompts on the page, in Kelly's own voice
- [ ] Portrait and process photographs

## Cultural review

- [ ] One person from each of the Chinese, Malay, Indian and Japanese communities reads `src/data/rules.json` and the customs in `src/data/flowers.json`
- [ ] Remove `verify` flags once checked

## Before taking real orders

- [ ] Register with ACRA
- [ ] Name a Data Protection Officer and add a short privacy notice
- [ ] Confirm the Home Based Business rules fit the planned volume of courier pickups
