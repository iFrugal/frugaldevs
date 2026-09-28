# frugaldevs.com

Static landing page for FrugalDevs, implemented from the Claude Design project "FrugalDevs Landing D" (Porcelain & Copper palette, Industry design system).

## Stack

Plain HTML + CSS, no build step.
Fonts are IBM Plex Sans and IBM Plex Mono via Google Fonts.

## Run locally

```bash
python3 -m http.server 8734
```

Then open http://localhost:8734.

## Deploy to Vercel (free)

No configuration is needed - Vercel serves static files from the project root as-is.

Option A, CLI:

```bash
npx vercel --prod
```

Option B, dashboard: import the repo at https://vercel.com/new and deploy with framework preset "Other" (defaults are fine).

## Notes

- The three case-study images under "Receipts" are styled placeholders (`.work-media`).
  Replace each block with a real `<img>` when case-study images are ready.
- Testimonial attributions are marked as placeholders in the copy, same as the design.
- The contact CTA links to `mailto:hello@frugaldevs.com`.
