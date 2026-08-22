# Safi Solutions

Independent digital product studio and portfolio site for **safisolutions.org**.

## Structure

```text
/
├─ index.html                 # Safi Solutions homepage
├─ CNAME                      # GitHub Pages custom domain
├─ assets/
│  ├─ css/
│  │  └─ site.css             # Homepage styles
│  ├─ js/
│  │  └─ site.js              # Homepage interactions
│  └─ images/
│     ├─ logo-mark.png
│     ├─ logo-lockup.png
│     ├─ logo-social.png
│     └─ profile.png
├─ overtone/                  # Standalone project — intentionally isolated
└─ vellum/                    # Standalone project — intentionally isolated
```

## Homepage direction

Safi Solutions is positioned as a **small product studio / build lab**, not a generic marketing agency. The site focuses on:

- SaaS and product concepts
- distinctive business websites
- interactive educational tools
- prototypes and unusual digital ideas
- selected real-world work

## Editing

Homepage markup lives in `index.html`. Keep shared visual rules in `assets/css/site.css` and interactions in `assets/js/site.js` rather than putting everything back into one large HTML file.

`overtone/` and `vellum/` are separate projects and should remain self-contained.
