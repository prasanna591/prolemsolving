# PSM Website — Codebase Notes

Current-state reference. Every value below was read from the code; if the two ever
disagree, the code is right and this file is stale — fix the file.

The previous version of this document described the pre-redesign palette
(`--color-brand: #0d6efd`, `--color-navy: #07162b`, 1320px containers, `.hh-grad`,
`ui-*` hero mockups) and has been removed.

## 1. Stack

Next.js 16.3 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4
· GSAP · Framer Motion · Lucide.

## 2. Commands

```bash
npm run dev            # dev server
npx tsc --noEmit       # typecheck
npm run build          # static export → out/
```

No lint or test runner is configured. Verification is `tsc` + `build` + a browser
check of the exported `out/` directory.

`npm run build` logs a warning that `headers()` in `next.config.mjs` is inert under
`output: "export"`. It is expected and harmless on GitHub Pages.

## 3. Design tokens

Defined in `app/globals.css` inside `@theme`/`@layer components`. Core palette:

| Token | Value | Role |
| --- | --- | --- |
| `--color-page` | `#fbfcfe` | page background |
| `--color-room-cool` | `#f1f5fb` | cool band background |
| `--color-navy` / `--color-ink` | `#0b1b3a` | dark bands, body text |
| `--color-sub` / `--color-faint` | `#5b6b85` / `#7c8aa3` | muted text |
| `--color-brand` | `#2563eb` | primary blue |
| `--color-teal` | `#14b8a6` | accent |
| `--color-line` / `-linesoft` / `-strong` | ink at `.08` / `.05` / `.14` | borders |

Scale: `--radius-card` 20px · `--radius-card-lg` 30px · `--radius-feature` 24px ·
container `.container-x` max 1200px · `--gutter` `clamp(1.25rem, 4.2vw, 3rem)` ·
`--sec-pad` 72px mobile / 112px at ≥1024px.

### Three traps in this stylesheet

1. **Hex and RGB triplets must move together.** `--color-{brand-vivid,accp,navy,ink}-rgb`
   exist so translucent variants can be written `rgb(var(--color-navy-rgb) / .14)` and
   stay bound to their hue. Mirroring channels by hand is how a malformed
   `var(----color-brand-vivid-rgb)` once landed and silently dropped every border,
   shadow and gradient in a whole section. Change a hex, change its triplet.

2. **`--color-line` is ink-based, so it disappears on dark bands.** On any navy
   background use an explicit light alpha instead. There is no inverted line token yet.

3. **Tailwind radius variables collided with the design scale.** `--radius-xl/2xl/3xl`
   are now namespaced `--radius-card*` so `rounded-xl` cannot silently mean
   "20px card" somewhere and "24px shell" elsewhere.

## 4. Routes

`/` · `/products` · `/products/[slug]` · `/solutions` · `/work` · `/about` ·
`/about/founders` · `/about/founders/[slug]` · `/about/motives` · `/careers` ·
`/contact` · `/privacy` · `/eyd`

`/eyd` is a second entry point for the EYD product and duplicates `/products/eyd`.
Content is defined in `lib/products.ts`; people and roles in `lib/careers.ts`.

## 5. Scroll-pinned sections

The homepage "What We Do" section pins its cards and crossfades them. It is gated by
one media query that **must stay byte-identical in CSS and JS**:

```
(min-width: 1180px) and (min-height: 840px) and (prefers-reduced-motion: no-preference)
```

- `components/what-we-do.tsx` matches it via `matchMedia` and sets `data-pinned`.
- CSS keys the pinned layout on `.wds[data-pinned]` — never on `html.js`, which is
  also true when the section is simply short.
- `--wds-tall` is computed as pin height + travel distance, and ScrollTrigger's `end`
  uses that same distance. Deriving one from the other keeps the pin ending flush with
  the section.
- The section uses `overflow: clip`, not `hidden`; `hidden` kills `position: sticky`
  and produced a blank viewport.
- Short viewports, mobile and reduced-motion all fall through to a stacked layout
  where all three cards are visible without scrolling.

Verified at 1440×900 (pinned), 1280×800, 820, 390×844, reduced-motion and 1440×620.

## 6. Known outstanding items

- Fonts are still the defaults; the intended Sora / Plus Jakarta Sans + Inter pairing
  is not applied in `app/layout.tsx`.
- `/eyd` duplicates `/products/eyd`; decide whether to redirect or differentiate it.
- `/careers` is reachable from the footer but not the navbar.
- No inverted border token for dark bands (see trap 2).
- Contrast has not been machine-audited. Computed-style and rendered-pixel probes
  both produced false positives — `backgroundColor` misses gradients, and
  `fullPage` screenshots displace `position: fixed` overlays. Check contrast by hand.
