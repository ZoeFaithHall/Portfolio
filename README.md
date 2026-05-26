# Portfolio

Single-page portfolio. Vite + React 18 + TypeScript + SCSS modules + Motion + Lenis.

Sections act as pages on one SPA — no router. Scroll drives transitions between sections instead of route changes.

---

## Stack

- **Vite** — build, dev server, HMR
- **React 18** — TypeScript strict mode
- **SCSS modules** — one `*.module.scss` per component, design tokens shared via `@use '../../../styles/abstracts'`
- **Motion** (formerly Framer Motion) — `useScroll` / `useTransform` for scroll-driven clip wipes & surface detection
- **Lenis** — smooth inertial scroll, mounted once at the template level
- **`prefers-reduced-motion`** — respected by `useLenis()` and `useCarouselScroll()`

---

## Repo map

```
src/
├── App.tsx                              # ONLY the project skin: SEO, security, global providers, then <PageLayout />
├── main.tsx                             # React root mount + global styles import
│
├── components/
│   ├── atoms/                           # primitive elements — wrap one HTML tag
│   │   ├── Button/                      # <button> with variants + sizes
│   │   ├── Icon/                        # <svg> wrapper, accessible
│   │   ├── Image/                       # <img> wrapper
│   │   ├── Link/                        # <a> with external/internal detection
│   │   ├── Text/                        # polymorphic typography (display/heading/body/caption/mono)
│   │   └── Wordmark/                    # branded logo (light/dark surfaces)
│   │
│   ├── molecules/                       # 2–3 atoms composed into a named UI pattern
│   │   ├── IconButton/                  # Button + Icon, round, fixed size
│   │   ├── IntroGrid/                   # 65/35 statement + rail grid (+ optional band)
│   │   ├── MetaBlock/                   # <dt>/<dd> label + value pair
│   │   ├── NavItem/                     # nav-styled Link
│   │   ├── SectionBand/                 # sticky band header (label + meta)
│   │   └── TagList/                     # pill list (caption-styled <li>s)
│   │
│   ├── organisms/                       # full UI units with state/logic
│   │   ├── Carousel/                    # horizontal scroll-snap track + IconButton controls
│   │   ├── CaseDetail/                  # one full case study (band + intro + pinned hero + carousel)
│   │   ├── Footer/                      # site footer
│   │   ├── Header/                      # sticky header w/ scroll-driven wordmark + nav
│   │   └── PinnedHero/                  # 200vh sticky bg + scrolling title for case studies
│   │
│   ├── sections/                        # page-equivalents — wire data to organisms
│   │   ├── Bento/                       # "by the numbers" stat grid
│   │   ├── CaseStudies/                 # loops casestudies data → CaseDetail
│   │   ├── ContactCTA/                  # closing CTA + contact metadata
│   │   ├── Hero/                        # opening tagline + CTA
│   │   ├── Intro/                       # philosophy + case-studies-announce wipe stack
│   │   └── TechStack/                   # tech stack announce
│   │
│   └── templates/
│       └── PageLayout/                  # Header + <main>{sections}</main> + Footer; owns useLenis()
│
├── data/                                # data shared across multiple sections
│   ├── casestudies.ts                   # CaseStudy[] consumed by CaseStudies section
│   └── intro.ts                         # philosophy, case-studies-announce, tech-stack announce content
│
├── hooks/
│   ├── useCarouselScroll.ts             # ref + scroll-by-card for Carousel
│   └── useLenis.ts                      # mount smooth scroll once
│
├── styles/
│   ├── abstracts/                       # tokens, mixins, functions (no output — @use only)
│   ├── base/                            # reset, typography, global selectors
│   └── main.scss                        # imported by main.tsx
│
├── types/
│   └── index.ts                         # CaseStudy, CarouselItem, NavAnchor
│
└── utils/
    ├── cn.ts                            # classname combiner (clsx-style)
    └── themeVars.ts                     # case-study theme tokens → CSS custom properties
```

---

## The atomic rules

**One direction of dependency.** Each tier may import from the tiers *below* it, never from the tiers above or at the same level (with one tolerated exception below).

```
Atoms      ←  raw HTML wrappers, no business logic
   ↑
Molecules  ←  compose 2–3 atoms into a named pattern (+ light logic)
   ↑
Organisms  ←  compose molecules + atoms; own state, scroll logic, side effects
   ↑
Sections   ←  page-equivalent units; wire data to organisms; one per scroll anchor
   ↑
Templates  ←  page skeleton; owns site-wide concerns (smooth scroll)
   ↑
App        ←  SEO, security/error boundaries, theme provider; renders <PageLayout />
```

**Tolerated exception**: a leaf molecule (no dependencies of its own) may be composed by another molecule. `IntroGrid` uses `SectionBand` — both are molecules, but `SectionBand` is a leaf, so the dependency stays acyclic.

**One source of truth per component.** Each component lives in its own folder with:
- `Component.tsx` — implementation
- `Component.module.scss` — styles
- `index.ts` — barrel export: `export { Component } from './Component';`

**Variants live in the same folder** under one component name with an `index.ts` re-export. Don't scatter variants across separate top-level files.

---

## How sections work

Sections are page-equivalents in an SPA. Instead of a router moving between routes, the user scrolls and sections transition into view. Each section:

- Has an `id` matching its nav anchor (`#hero`, `#philosophy`, `#case-studies`, `#tech-stack`, `#numbers`, `#contact`)
- Imports its own data (either from a co-located `*.data.ts` or, when shared, from `src/data/`)
- Composes organisms and molecules — never reaches into another section
- Renders a `data-surface` attribute (`"light"` / `"dark"`) so the `Header` can adapt its wordmark color

`PageLayout` is responsible only for *order* and *site-wide concerns* (smooth scroll, header, footer). It doesn't pass data into sections — sections own their content imports.

---

## Wipe transitions (announce sections)

A few sections use a clip-path "wipe" to layer over the previous content without pushing it out of view. The base pattern (in `Intro`):

1. Outer container is `200vh` tall — total scroll range.
2. Inside it, a `position: sticky; top: 0; height: 100vh` pinned viewport.
3. Two layers sit absolutely positioned at `inset: 0`. Both occupy the same space.
4. The top layer's `clipPath` animates from `inset(100% 0 0 0)` → `inset(0)` as you scroll.
5. The previous layer never moves; the new one reveals over it.

Each layer carries its own `SectionBand`, so the band visually "replaces" the previous as the wipe completes.

---

## Where data lives

| Scope | Location | Examples |
|---|---|---|
| Shared across multiple sections | `src/data/*.ts` | `casestudies.ts`, `intro.ts` |
| Single-consumer (just one section) | Inside the section folder | (planned — see follow-ups) |
| Global chrome (nav, footer) | `src/data/navigation.ts` | (planned) |

---

## How to add a new component

Walk down the ladder and stop at the first tier where the answer is *yes*:

| Question | → Tier |
|---|---|
| Is it a primitive HTML element with styles only? | **Atom** |
| Is it 2–3 atoms glued together with a tiny presentational pattern? | **Molecule** |
| Does it have state, hooks, business logic, or compose other molecules into a feature? | **Organism** |
| Is it a scroll-target/route-equivalent that wires data to organisms? | **Section** |
| Is it the page skeleton (header + slots + footer)? | **Template** |
| Is it global (SEO, error boundary, theme provider)? | **App** |

If a component is hard to place, it's usually doing too much — split it.

When the same JSX pattern appears in **2+ places**, promote it to a molecule. (Recent examples: the duplicated tag-pill `<ul>` became `TagList`; the duplicated `<div><dt><dd>` pair became `MetaBlock`.)

---

## Commands

```bash
npm install
npm run dev        # start dev server (default: http://localhost:5173)
npm run build      # tsc -b && vite build → /dist
npm run preview    # preview production build locally
npm run typecheck  # tsc --noEmit
```
