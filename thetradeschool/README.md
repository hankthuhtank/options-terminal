# TradeSchool

Static, GitHub-Pages-friendly skilled-trades learning site. No build step.

**Core idea:** learn the system, then recognize it in the field. Real equipment
photos and honest technical diagrams, not toy simulations.

## Curriculum

428 concepts across Electrical, HVAC, Plumbing, Industrial Maintenance, Welding
and Construction.

## What V15 changed

The full findings are in `docs/AUDIT_V15.md`. In short:

- **The V13 "modernity" pass had never rendered.** It wrote to `c.deep.*`, which
  nothing reads. Replaced with `js/content/v15-currency.js`, which writes to the
  real schema, plus a `#/standards` page stating what edition each claim is
  written against.
- **19 images removed** for not showing what they claimed, including a bottle
  jack captioned as a hydraulic cylinder (which was also the Industrial hero), a
  museum exhibit captioned as a compressor, and a watermarked vendor ad.
  **10 original technical diagrams** built to replace them.
- **6 labs rebuilt** with geometry that can physically exist and readouts
  computed from the relationship being taught. Industrial's Practice tab is no
  longer empty.
- **Filler removed.** One safety sentence had been repeated on 104 concepts;
  416 of 428 knowledge checks shared three option sets. Both are gone.
- **Redesign** around the equipment data plate, with a palette taken from real
  field colour coding.

## Run

```bash
python3 -m http.server 8080
node tools/validate.js        # integrity checks
python3 tools/media/build_diagrams.py   # rebuild the SVG diagrams
```

Pure static. See `docs/DEPLOY_GITHUB.md`.

## Layout

```
index.html              load order matters; validate.js asserts it
css/main.css            V7-V14 styles
css/v15.css             V15 design layer, overrides main.css
js/content/*.js         curriculum + editorial passes, applied in order
js/core/app.js          router, rendering, search, progress, legacy labs
js/core/labs-v15.js     rebuilt labs, registered via window.TS.labs
js/legacy/              retired passes, kept for history, not loaded
tools/validate.js       integrity checks
tools/media/            diagram builder + Wikimedia sourcing helper
docs/AUDIT_V15.md       current audit
```

## Standing rules

- No fake, simulated or placeholder data anywhere.
- A visual earns its place by teaching recognition or mechanism. See
  `docs/MEDIA_POLICY.md`.
- A sentence that is true of every topic belongs on no topic.
- Education only. Workplace tasks require proper training, procedures,
  qualifications and the adopted code in your jurisdiction.
