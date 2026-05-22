# Portfolio

Single-page portfolio site. Vite + React 18 + TypeScript + SASS modules + Motion + Lenis.

## Stack

- **Vite** for build, dev server, HMR
- **React 18** with TypeScript strict mode
- **SASS modules** per component, with auto-injected design tokens (`@/styles/abstracts`)
- **Motion** (formerly Framer Motion) for component animations, scroll-driven reveals, layout transitions
- **Lenis** for smooth inertial scroll
- **Native CSS scroll-driven animations** (`animation-timeline`) as progressive enhancement where supported

## Structure

```
src/
├── components/
│   ├── atoms/        # Button, Text, Link, Icon
│   ├── molecules/    # NavItem, ProjectCard
│   ├── organisms/    # Header, Footer, ProjectGrid
│   ├── sections/     # Full-width page sections (Hero, Philosophy, Cases, etc.)
│   └── templates/    # PageLayout
├── data/             # projects.ts — case study content
├── hooks/            # useLenis
├── styles/
│   ├── abstracts/    # tokens, mixins, functions (auto-injected)
│   └── base/         # reset, typography, global
├── types/            # CaseStudy, NavAnchor
└── utils/            # cn (classname combiner)
```

## Page composition

`App.tsx` stacks five sections inside `PageLayout`:

1. **Hero** — massive docking wordmark, tagline, primary CTA
2. **Philosophy** — sticky band + 65/35 split for manifesto and bio
3. **Cases** — three `CaseStudySection` instances (Fleetio, Keystone, Curion)
4. **Bento** — stat grid
5. **ContactCTA** — accent-colored full-bleed close

## Case study pattern

Each `CaseStudySection` takes a `study` prop (typed `CaseStudy`) and renders the 65/35 layout with a sticky client band, a punch word in the theme accent color, a frame phrase ("without heroics"), and an info rail. Theme tokens (bg, text, accent, band) come from the study's `theme` object and apply as CSS custom properties scoped to the section.

To swap a placeholder for a real visual artifact, pass an `artifact` prop:

```tsx
<CaseStudySection
  study={study}
  index={1}
  total={3}
  artifact={<img src="/cases/fleetio.png" alt="" />}
/>
```

## Scroll behavior

`useLenis()` mounts at the root of `App.tsx` and enables inertial smooth scroll site-wide. It respects `prefers-reduced-motion`.

CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) are used in the Hero (wordmark dock) and CaseStudySection (frame rise on enter). Both are wrapped in `@supports` so unsupported browsers fall back to static layouts. For anything that needs JS-computed scroll values (color morphs between sections, progress counters), reach for Motion's `useScroll` + `useTransform`.

## Commands

```bash
npm install
npm run dev       # start dev server (default: http://localhost:5173)
npm run build     # production build to /dist
npm run preview   # preview production build locally
npm run typecheck # type-check without emitting
```
