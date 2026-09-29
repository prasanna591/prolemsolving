# PSM Website — Codebase & Site Documentation

> Problem Solving Mind (PSM). Position: **"We start with the problem, not the technology."** Product-first technology company. A real product portfolio (LECOM, EYD, BOOWA, AURA, Founder OS) plus a solutions/agency arm.

---

## 1. Stack & Versions

| Layer      | Tech / Version                                              |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16.3.5 (App Router, Turbopack) — all routes static   |
| React      | 19.3.0                                                       |
| TypeScript | 7.0.2 with `strict: true`, `moduleResolution: "bundler"`     |
| Styling    | Tailwind CSS v4.3.3 (CSS-first via `@theme` in `globals.css`) + custom plain CSS |
| Animation  | GSAP 3.15 + ScrollTrigger, IntersectionObserver, CSS keyframes |
| WebGL      | three 0.186.0 (only the home hero & old ecosystem scene)     |
| Icons      | lucide-react                                                 |
| Fonts      | Manrope via `next/font/google`, exposed as `--font-manrope`  |

Scripts: `npm run dev` · `npm run build` · `npm run start`. There is **no lint script** (Next 16 removed `next lint`).

`next.config.mjs`: `reactStrictMode: true`, `images.unoptimized: true` (no remote/static images configured yet; all visuals are procedural SVG/CSS).

---

## 2. Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export check — output prints all routes as "○ (Static)"
npm run start    # serve the production build
```

Deployment target assumed: Node server with `next start` (or a static host).

---

## 3. Repository Structure

```
app/
  layout.tsx           Root layout: Manrope font, metadata/OG, viewport,
                       skip-link, Navbar/Footer, js-class bootstrap script
  page.tsx             Home                        (~325 lines)
  products/page.tsx    Product portfolio page
  solutions/page.tsx   Solutions / capabilities page
  work/page.tsx        Work / case studies page
  about/page.tsx       About storytelling page (12 sections)
  contact/page.tsx     Contact form (client component)
  globals.css          The single stylesheet — design system + all sections (~930 lines)
components/
  navbar.tsx           Sticky/condensing nav, mobile menu (client)
  footer.tsx
  button.tsx           <Button> primitive (variants/sizes/arrow)
  magnetic.tsx         Magnetic hover wrapper (client)
  reveal.tsx           IntersectionObserver fade/slide-up wrapper (client)
  section-heading.tsx  Eyebrow + title + lede block
  page-header.tsx      Interior page hero header
  cta-band.tsx         Reusable navy CTA band
  product-card.tsx     Portfolio card (uses ProductArt)
  product-art.tsx      Procedural per-product preview visuals (8 shown)
  eyd-showcase.tsx     Interactive 6-stage EYD house journey (client)
  psm-system.tsx       Reusable PSM geometric "fragmented→connected" SVG (client)
  hero-scene.tsx       3D WebGL hero visual (dynamic three import, client)
  ecosystem-scene.tsx  3D ecosystem visual — ⚠ DEAD CODE, not imported anywhere
  case-study.tsx       <CaseStudyEditorial>
  cap-visual.tsx       <CapVisual> visual per Capability
lib/
  site.tsx             Global site constants, nav, brandMark SVG
  products.ts          Product model + 5 products (featured/inDevelopment/allProducts)
  content.ts           problems, capabilities, values, journey (⚠ journey unused)
  caseStudies.ts       CaseStudy type + caseStudies, benchPatterns, resultsSummary
legacy/                Original static HTML/CSS/JS site — reference only
package.json, tsconfig.json, next.config.mjs, postcss.config.mjs
```

---

## 4. Design System

Single source: `app/globals.css`, layered as **`@theme` block (Tailwind v4 tokens) → base styles → per-page component CSS**, appended in chronological section blocks. No CSS modules, no styled-components — one global stylesheet.

### Color tokens

| Token              | Value     | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `--color-brand`    | `#0d6efd` | Primary blue                       |
| `--color-brand-deep` | `#0b5fd8` | Blue hover                         |
| `--color-brand-light` | `#4f9bff` | Navy-section highlight / edges     |
| `--color-navy`     | `#07162b` | Deep navy (dark sections, footer)  |
| `--color-navy-2`   | `#0a2142` | Navy gradient step                 |
| `--color-accp`     | `#7c3aed` | Purple accent                      |
| `--color-accg`     | `#16a34a` | Green accent                       |
| `--color-warm`     | `#fffdf8` | Warm section background            |
| `--color-softblue` / `--color-lightblue` / `--color-softpurple` / `--color-softgreen` | tints | chips, eyebrow pills, card icons |
| `--color-ink`      | `#07162b` | Body text                          |
| `--color-sub` / `--color-faint` | `#64748b` / `#94a3b8` | Muted text       |
| `--color-line` / `--color-linesoft` | border shades |                    |

### Shadows, radii, motion

```
--shadow-soft  · --shadow-raised · --shadow-lift   (three elevation tiers)
--radius-xl/2xl/3xl (1.5/1.75/2rem)
--ease-out: cubic-bezier(0.22, 0.8, 0.28, 1)
--gutter: clamp(1.25rem, 4.2vw, 3rem)   → .container-x width
--sec-pad: clamp(4.5rem, 10vw, 8.5rem)  → .sec vertical padding
```

### Reusable type/element classes

- `.display` — hero headline (clamp to 4.9rem, weight 800)
- `.h2` / `.h3` — heading scale
- `.lede` / `.dek` — intro paragraph / body paragraph (both `--color-sub`)
- `.eyebrow` (+ modifiers `--p` purple, `--g` green, `--ink`) — pill label
- `.grad-text` — brand→purple→green gradient text on an `em`
- `.sec` (+ `--white`, `--warm`, `--soft`, and inline `bg-navy text-white noise`) — section band
- `.card` (`--raised`, `--flat`, `--feature`), `.card-icon` (`--brand/--p/--g/--ink`), `.badge` (`--brand/--accp/--accg/--navy`), `.link-line`
- `.btn` (`.btn--primary/--dark/--ghost/--light`, `.btn--sm/--lg`) — rendered by `<Button>`
- `.noise` — subtle grain overlay used on navy sections

### ☀️ Visual language

- Warm light background website; navy used as deliberate contrast bands (mindset, vision, CTA).
- All product/founder visuals are **procedural SVG/CSS placeholders** — no photographs or 3D renders shipped yet (honest placeholders policy; no invented metrics).
- Real founders now named on About (photos still pending).

---

## 5. Motion & Interaction System

Three deliberately bounded levels (per design brief — never animation showcase).

1. **Level 1 (everywhere):** `Reveal` — fade + slide-up on first intersection. Client component with `delay` (ms) and `as` props. No-JS users see content because hiding is scoped: `.js [data-reveal]` — a tiny inline script in `layout.tsx` adds the `js` class to `<html>` (hence `suppressHydrationWarning` on the `<html>` tag).
2. **Level 2 (important sections):** hover micro-interactions + staggered reveals; `Magnetic` buttons; breathing/glow dots.
3. **Level 3 (signature moments):** home hero WebGL scene; About hero + fragmented→connected `PsmSystem`; About vision expanding rings.

Key behaviour:

- `components/reveal.tsx` — IntersectionObserver, `threshold 0.05`, `rootMargin 0 0 -36px 0`; adds `.is-revealed`. Respects `prefers-reduced-motion` (shows immediately).
- `components/magnetic.tsx` — pointer-follow magnetic wrapper (hover only).
- `components/psm-system.tsx` — client SVG; 7 modules that assemble (transition on `transform`) when scrolled into view; `start` prop renders already-connected (About hero); `prefers-reduced-motion` skips the observer and renders connected.
- `components/hero-scene.tsx` — **dynamic-imported three** scene. Uses `performance.now()` timer (THREE.Clock removed for deprecation-clean output). `poster` prop renders static fallback until canvas ready.
- Animated CSS keyframes: `nm-pulse`, `psm-spin`, `fx-breathe`, `fx-soft-pulse`, `fx-shimmer`, `vg-expand`, plus product-art animations (lecom bubbles, boowa route/bike, aura rings, eyd orbit/dots).
- **Reduced motion policy:** a consolidated `@media (prefers-reduced-motion: reduce)` block disables all ambient animations and transitions (`animation: none !important` + `transition: none` on interactive classes). There is **no scroll-scrubbing / pinned ScrollTrigger on the live site** (the old Journey was removed for causing layout issues; GSAP remains as a dependency but only used by nothing client-visible currently).

---

## 6. Routes & Pages

All routes statically generated: `/`, `/products`, `/solutions`, `/work`, `/about`, `/contact` (+ `/_not-found`). Titles use `%s — PSM` template except home.

### `/` Home (`app/page.tsx`)

1. **Hero** — headline "We Build Technology That Solves Real Problems." + 3D `HeroScene` poster + scroll cue.
2. **Quiet editorial** — why PSM exists.
3. **Problems** — 6 problem cards (`lib/content.ts#problems`).
4. **Product showcase** — EYD flagship (via `ProductArt`), featured row (EYD, LECOM, BOOWA), "Two more on the shelf" (AURA + Founder OS → `/products#aura`).
5. **Solutions preview** — links to `/solutions`.
6. **Work preview** — three case-study cards → `/work`.
7. **Philosophy band** — navy statement.
8. **Vision + CTA** — closing `CtaBand`.

### `/products` Products (`app/products/page.tsx`)

1. **Minimal hero** — "Products Built Around Real Problems." + **NodeMap** SVG ecosystem (hub PSM + 5 node links `#lecom #boowa #eyd #aura #founder-os`; hover lights edges).
2. **EYD showcase** — `EydShowcase` interactive 6-stage house journey (Explore→Choose→Buy→Build→Connect→Complete), auto-cycles 4.2s, reduced-motion aware.
3. **Portfolio** — LECOM, Boowa, Aura, Founder OS cards via `ProductArt`.
4. **ONE COMPANY band** — "One company. Many problems." / Real problems. / Clear thinking. / Practical technology.
5. **HOW WE BUILD** — 6-step `.hwb-grid` (Discover→Define→Design→Build→Learn→Evolve).
6. **Product philosophy** — navy band ("Technology should disappear into the experience.").
7. **Building for what's next** — closing CTAs → `/work`, `/contact`.

### `/solutions` Solutions (`app/solutions/page.tsx`)

1. `PageHeader` hero.
2. **Business problems we solve** — 6 problem cards.
3. **Capabilities** — 5 alternating editorial rows (business software / AI & automation / ERP-CRM integration / web-mobile / digital transformation), each with `CapVisual`.
4. **Navy approach band** + `CtaBand` (presumably via final section).

### `/work` Work (`app/work/page.tsx`)

1. `PageHeader` hero.
2. **Case studies** — 3 `CaseStudyEditorial` cards (Relay / Clarion / Bridge), each with Problem→Approach→Technology→Solution blocks, outcome, quote.
3. **More from the bench** — `benchPatterns` (6) with icon chips.
4. **Results summary** — `resultsSummary` badges (tone-coloured), honest non-metric framing.
5. `CtaBand`.

### `/about` About (`app/about/page.tsx`)

Storytelling page — 12 sections in the required narrative order:

1. **Hero** — "We Believe Every Problem Is an Opportunity to Build Something Better." + production flow (Problem→Understanding→Ideas→Technology→Product→Impact).
2. **Why PSM exists** (warm) — Complexity→Connected transformation (Complex/Disconnected/Manual/Slow → Connected/Simple/Intelligent/Scalable).
3. **Problem-solving mindset** (navy) — "We Don't Start With Technology. We start with the problem." + 6 stages (Understand→Question→Design→Build→Validate→Evolve) + `PsmSystem`.
4. **What we build** (white) — 5 domain cards around a PSM hub (`DomainCluster`), each linking into `/products#`.
5. **Product + service model** (warm) — loop ring SVG (Problems→Insights→Products→Solutions→Experience→New Insights).
6. **How we work** (white) — small team statement + 4 asymmetric principle cards.
7. **People** (warm) — Prasanna Venkatesan R. (Founder) + Maniyarasan S. (Co-founder), monogram photo placeholders ("photograph to follow").
8. **Our journey** (white) — factual 6-step timeline (horizontal desktop / vertical mobile), no fabricated dates.
9. **We're already building** (soft) — 5 product previews via `ProductArt` → `/products#`.
10. **Vision** (navy, full viewport) — "From Local Problems to Global Products." + Build. Learn. Scale. + expanding rings.
11. **Final statement** (white) — "We Don't Want to Build More Technology. We Want to Build Technology That Matters."
12. **Final CTA** — `CtaBand` "Have a Problem Worth Solving?"

About is **intentionally Three.js-free**; it reuses the single `PsmSystem` object and CSS/SVG so there is one recognisable geometric identity rather than five 3D experiments.

### `/contact` Contact (`app/contact/page.tsx`)

- Client component form (name/email/phone/message), native validation, on submit shows "Thanks — we got it." success state (no backend wiring yet).
- Contact details: **Emails hello@problemsolvingmind.com · founder@problemsolving.com · ceo@problemsolving.com · contact@problemsolvingmind.com · Phone/WhatsApp +91 93602 07861 · Based in Pondicherry, Tamil Nadu**.
- All of the above are driven by `lib/site.tsx` (`site.email`, `site.emails`, `site.phone`, `site.phoneDisplay`) — edit there, not in pages.

---

## 7. Product Portfolio Model (`lib/products.ts`)

```ts
interface Product {
  id: string;                       // "eyd" | "lecom" | "boowa" | "aura" | "founder-os"
  name: string;
  category: string;
  status: string;                   // e.g. "In Development"
  statusTone: "brand" | "accp" | "accg" | "neutral";
  tagline: string;
  description: string;
  tone: string;                     // "product-visual__tone--*" (legacy class)
  visual: "lecom" | "eyd" | "boowa" | "aura" | "founder";
  focus: string[];
}
```

Exports: `featured` = [EYD, LECOM, BOOWA], `inDevelopment` = [AURA, FOUNDER OS], `allProducts = [...featured, ...inDevelopment]`.

**Product Art registry** (`components/product-art.tsx`): `ProductArt({ product, stage? })` maps `visual` → a distinct procedural preview: LecomArt (stepper), BoowaArt (map + animated route), AuraArt (calm rings), FounderArt (OS dashboard mock), EydArt family (house; stage-aware via `EydStage`).

> ⚠ Copy caution for **Aura** (health): public copy stays at *awareness / assistance / preventive* framing — no diagnosis/treatment/outcome claims, per explicit instruction.

---

## 8. Known Notes / Outstanding Items

- **`components/ecosystem-scene.tsx` is dead code** — the products page no longer imports it (replaced by the SVG NodeMap). Candidates for deletion.
- **`lib/content.ts#journey` is unused** — the `components/journey.tsx` (GSAP pinned scroll-story) was removed from the site after causing blank-space issues; the data export is now dead.
- **GSAP/ScrollTrigger installed but not used on the live site.** Keeping the dependency is not required for the current build.
- **No lint/typecheck script** — verification is `npm run build` (its TS check) + manual browser check. Firefox headless screenshot verification fails (SWGL renderer error), so visual checks are done in a real browser via `npm run dev`.
- **Homepage hero depends on WebGL** (`three`); fallback poster renders until canvas is ready (works with reduced-motion/WebGL-off).
- Contact email inconsistency (see /contact) needs a decision.
- Images all `unoptimized: true`; the design relies on procedural art until real screenshots/photos replace them (About founder portraits are monogram placeholders).

---

## 9. Common Changes

| Task | Where |
| ---- | ----- |
| Edit product copy/order | `lib/products.ts` (add products → update `featured`/`inDevelopment`) |
| Add a product visual style | `components/product-art.tsx` + matching `art--*` CSS in `globals.css` |
| Change nav links | `lib/site.tsx` `nav` array |
| Edit solutions copy | `lib/content.ts` `problems`, `capabilities` |
| Edit work/case copy | `lib/caseStudies.ts` |
| Edit About copy | `app/about/page.tsx` (data arrays at top of file) |
| Tweak tokens (colors/shadows/radii) | `globals.css` `@theme` block |
| Respect reduced motion | add new animations to the `prefers-reduced-motion` block |
| Verify build | `npm run build` — expect all routes `○ (Static)` |