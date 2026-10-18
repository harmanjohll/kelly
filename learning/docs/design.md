# Design: The Observatory

The rule behind every screen: each room is a constellation, and learning is drawing lines between stars. Pictures are generated from the content itself, so they always mean something.

Lineage: Alexey's Science Studio (`johllygoodlearning/studio/`): night ground, luminous room colours, Fraunces display, a colour bar on tappable cards, Cornell notes, underline tabs. Calmed for an adult reader: serif reading text, more air, no emoji, fewer boxes.

## Tokens (shared/studio.css)

| Token | Night (default) | Paper |
|---|---|---|
| `--bg` | `#0b1120` | `#f5efe4` |
| `--surface` | `#131c30` | `#fdf9f2` |
| `--ink` | `#e8ecf4` | `#1d1a16` |
| `--muted` | `#98a3b9` | `#625a4d` |
| `--phil` | `#b9a6ff` | `#5a47a6` |
| `--phys` | `#63d6e8` | `#0e6b7c` |
| `--psy` | `#ff9d7f` | `#ad4a2c` |
| `--eng` | `#cbe06e` | `#586b17` |
| `--accent-2` (gold, cross links) | `#f3c56b` | `#94661a` |

Theme is set on `<html data-theme="night|paper|auto">` by `core.js`. `--dom` is the current room's colour.

Type: Fraunces (display, titles, quotes, list titles), Source Serif 4 (reading: `.prose`, `.lede`, Coach replies), Inter Tight (interface), IBM Plex Mono (eyebrows, counts, IPA, maths). Spacing steps 4, 8, 12, 16, 24, 32, 48, 72.

## Motifs (shared/motif.js)

| Where | Picture | Drawn from |
|---|---|---|
| Philosophy | thinkers on an arc of 2,500 years | thinker nodes by era, their real links |
| Physics | a two slit pattern made of single hits | the interference formula |
| Psychology | constructs joined by their links | construct nodes and links |
| English | a waveform | the letters of a word |
| Today, Explore | four constellations and gold threads | every room's best connected nodes and cross links |
| Journey covers | the journey's stops as stars | the module path; lit when visited |
| Bridges | two stars and the line between | the two nodes; gold dashed when crossing rooms |

## Page patterns

- **Hero:** eyebrow (mono, small dot), title (Fraunces; gradient only on Today, Explore and room names), tagline (Fraunces italic), one sentence lede, one primary action, motif behind (right on laptop, faded above text on phone).
- **Covers and shelves:** journeys are covers with their constellation; shelves scroll sideways on phones and become a grid on laptops. Shelves of fewer than three fold into "More journeys".
- **Index rows:** hairline lists with Fraunces titles, not boxed cards.
- **Idea card:** Cornell notes (questions in the margin, reading column, one line summary), tabs Read, Connections, Practise.
- **Lesson:** one thing per screen: cover, hook, idea, try, check, thread, close. Progress hairline on top, Back and Next at the thumb.

## Review checklist (used every iteration)

1. One primary action per screen; everything else visibly secondary.
2. Hierarchy by size and space, not by boxes. No walls of chips; filters live in a sheet.
3. Reading text in Source Serif at 60 to 70 characters a line.
4. The motif is present, meaningful and never under body text.
5. Contrast 4.5:1 for text in both themes; muted text never on a tinted surface below 4.5:1.
6. Touch targets at least 44px; no horizontal scroll at 360px.
7. Nothing reads as a template: if two sections look the same, one of them is wrong.
8. Copy follows the house rules (no hyphens or dashes, British spelling, no AI tells).
