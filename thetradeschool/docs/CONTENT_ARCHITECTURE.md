# TradeSchool Content Architecture

## Loading order
`index.html` loads content before the UI engine:
1. `js/content/base-data.js` — original worlds and core concepts
2. `js/content/electrical.js` — Electrical deep-content expansion and references
3. `js/content/hvac-plumbing.js` — HVAC + Plumbing deep-content expansion and references
4. `js/content/industrial-welding-construction.js` — remaining three world expansions and references
5. `js/core/app.js` — rendering, navigation, labs, search and progress

## Concept schema
Every concept can contain:
- `world`, `id`, `category`, `title`, `eyebrow`
- `oneLine`, `plain`, `analogy`
- `why`
- `steps[]`
- `recognize[]`
- `where[]`
- `failures[]`
- `verify[]`
- `fieldScenario`
- `misconceptions[]`
- `safety`
- `related[]`
- `lesson`
- `check { q, options[], answer, explain }`

The shared concept renderer uses this schema across every trade, which lets future content be added without creating a bespoke HTML page for each term.

## Visual assets
`TRADE_DATA.visualAssets` maps concept IDs to bundled local images. Reference images are grouped by trade under `assets/reference/<trade>/`.

## Adding another trade
1. Add the world metadata.
2. Add its categories under `worldCategories`.
3. Add concept objects using the shared schema.
4. Add learning paths under `worldLearningPaths`.
5. Add any field-reference assets under a trade-specific asset folder.
6. Add custom diagrams or labs only where interaction materially improves learning.

The goal is to reuse the education engine and build custom interaction only where it explains something better than text/diagram alone.
