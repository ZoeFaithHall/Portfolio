# Case study long-form layout (Apple-style hybrid)

**Date:** 2026-05-25
**Status:** Approved (pending user spec review)

## Problem

The current Cases section shows three case studies as a wipe of 100vh intro cards (`CaseStudySection` in Philosophy-style). This works as an at-a-glance overview but offers no room to actually *tell each case's story*. The user wants the Apple Vision Pro pattern adopted: per case, a multi-stage scroll experience (intro → pinned hero with title scrolling over → "Take a closer look" image carousel).

## Goals

- Keep the existing wipe-of-3-intros at the top of the Cases section as a teaser.
- Below the wipe, render each case as its own long-form section using the Apple pattern.
- Preserve per-case theming throughout (intro, hero, carousel).
- Track wordmark surface tone correctly through each sub-section.
- Zero new image assets — use themed color stand-ins until real photography exists.

## Non-goals

- Real case-study imagery (themed color fills suffice).
- Final case-study copy (lorem ipsum for hero overlays and carousel captions).
- Routing or per-case detail URLs (single-page experience).
- Carousel features beyond horizontal scroll + arrow buttons (no thumbnails, lightbox, autoplay, etc.).

## Architecture

### App-level structure

`App.tsx` is unchanged. The Cases section's outer JSX gains a `caseStudies.map(...)` of the new `CaseDetail` component below the existing wipe:

```tsx
<section id="case-studies" data-surface="light">
  <div className={pinned}>                       {/* existing wipe — unchanged */}
    [CaseStudySection — Fleetio]
    [CaseStudySection — Keystone wipes over]
    [CaseStudySection — Curion wipes over]
  </div>

  {caseStudies.map((study, i) => (
    <CaseDetail key={study.slug} study={study} index={i + 1} total={caseStudies.length} />
  ))}
</section>
```

### File structure

```
src/components/sections/CaseDetail/         NEW
  CaseDetail.tsx                            (intro + hero + carousel inline)
  CaseDetail.module.scss
  index.ts

src/components/sections/CaseStudySection/   MODIFIED
  CaseStudySection.tsx                      (add layout: 'overlay' | 'flow' prop)
  CaseStudySection.module.scss              (add .flow modifier)

src/components/sections/Cases/              MODIFIED
  Cases.tsx                                 (render CaseDetail list below the wipe)

src/types/index.ts                          MODIFIED
src/data/projects.ts                        MODIFIED
```

## Component design

### `CaseDetail` (new)

One outer wrapper element scoped with the case's theme custom properties, three child `<section>` sub-sections.

```tsx
<div className={root} style={themeVars}>
  {/* Intro: light, ~1vh */}
  <CaseStudySection study={study} index={index} total={total} layout="flow" />

  {/* Pinned hero: dark, ~2vh */}
  <section data-surface="dark" className={hero} aria-label={`${study.client} hero`}>
    <div className={heroBg} />
    <div className={heroTitle}>
      <span className={eyebrow}>{study.client}</span>
      <h3 className={statement}>{study.statement}</h3>
    </div>
  </section>

  {/* Carousel: light, ~1vh */}
  <section data-surface="light" className={carousel} aria-labelledby={`${study.slug}-closer`}>
    <h3 id={`${study.slug}-closer`} className={carouselHeading}>Take a closer look.</h3>
    <div className={track} ref={trackRef}>
      {study.carousel.map((item, i) => (
        <article key={i} className={card}>
          <div className={cardImage} aria-hidden />
          <div className={cardCopy}>
            <h4>{item.title}</h4>
            <p>{item.caption}</p>
          </div>
        </article>
      ))}
    </div>
    <div className={controls}>
      <button type="button" onClick={prev} aria-label="Previous">‹</button>
      <button type="button" onClick={next} aria-label="Next">›</button>
    </div>
  </section>
</div>
```

Theme tokens:

```ts
const themeVars = {
  '--case-bg':         study.theme.bg,
  '--case-text':       study.theme.text,
  '--case-accent':     study.theme.accent,
  '--case-band':       study.theme.band,
  '--case-on-accent':  '#EDF2F4',  // platinum, hardcoded — works on all 3 reds
} as CSSProperties;
```

The `--case-on-accent` token covers the text overlaid on the hero's red `accent` fill. The existing `theme.text` is dark indigo, wrong for that overlay. Hardcoded platinum works for all three existing cases (all accents are red). If a future case uses a light accent, promote this into the data model.

### Pinned hero mechanic

The hero pin is pure CSS. No `useScroll` / `useTransform` / rAF listeners.

```scss
.hero {
  position: relative;
  height: 200vh;
}
.heroBg {
  position: sticky;
  top: 0;
  height: 100vh;
  background: linear-gradient(180deg,
    color-mix(in oklab, var(--case-accent) 88%, white),
    var(--case-accent));
  // future: replace with <img> when real assets arrive
}
.heroTitle {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: var(--case-on-accent);
  max-width: 80%;
  pointer-events: none;
}
.eyebrow {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  opacity: 0.85;
  display: block;
  margin-bottom: $space-4;
}
.statement {
  @include fluid-type(2.5rem, 6rem);
  font-weight: $font-weight-black;
  line-height: 0.95;
  letter-spacing: -0.025em;
}
```

`heroBg` is `position: sticky` so it pins to the viewport while the outer `.hero` (200vh tall) scrolls past underneath. `heroTitle` is `position: absolute` *inside* the same outer container, so it participates in the outer's natural scroll flow — the user scrolling down naturally translates the title up over the still-pinned background. When the title clears the top edge, only the pinned bg remains; when the outer 200vh runs out, the pin releases and the carousel enters.

### Carousel mechanic

Native horizontal scroll with snap, plus arrow buttons for click-paginated control.

```scss
.carousel {
  background: var(--case-bg);
  color: var(--case-text);
  padding: $space-16 0;
}
.carouselHeading {
  @include fluid-type(2rem, 4rem);
  font-weight: $font-weight-black;
  padding: 0 $gutter;
  margin: 0 0 $space-8;
}
.track {
  display: flex;
  gap: $space-4;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: $gutter;
  padding: 0 $gutter $space-4;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
.card {
  flex: 0 0 auto;
  width: min(70vw, 60rem);
  scroll-snap-align: start;
}
.cardImage {
  aspect-ratio: 4 / 3;
  border-radius: $radius-lg;
  background: color-mix(in oklab, var(--case-bg) 70%, var(--case-band));
}
.cardCopy {
  padding-top: $space-6;
}
.controls {
  display: flex;
  gap: $space-3;
  padding: 0 $gutter;
  margin-top: $space-6;
}
```

```ts
const prev = () => trackRef.current?.scrollBy({ left: -cardWidth(), behavior: scrollBehavior() });
const next = () => trackRef.current?.scrollBy({ left:  cardWidth(), behavior: scrollBehavior() });

const cardWidth = () => trackRef.current?.querySelector<HTMLElement>('article')?.offsetWidth ?? 0;
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
```

### `CaseStudySection` modification

Add an optional `layout` prop:

```ts
type CaseStudySectionProps = {
  study: CaseStudy;
  index: number;
  total: number;
  layout?: 'overlay' | 'flow';   // default 'overlay'
};
```

Apply a `.flow` modifier class on the root when `layout === 'flow'`:

```scss
.root.flow {
  position: relative;
  inset: auto;
  height: auto;
}
```

This overrides the existing `position: absolute; inset: 0` (kept as default for the wipe overlay usage). The grid and inner styles are shared between both modes.

Existing call site in `Cases.tsx` passes no `layout` prop — defaults to `'overlay'`, behavior unchanged. `CaseDetail` passes `layout="flow"` for the intro.

## Data model

`src/types/index.ts`:

```ts
export type CarouselItem = {
  title: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  years: string;
  statement: string;
  role: string;
  scale: readonly string[];
  stack: readonly string[];
  carousel: readonly CarouselItem[];   // NEW — 3 items per case
  theme: { bg: string; text: string; accent: string; band: string };
};
```

`src/data/projects.ts` — add a `carousel: [...]` field with three distinct lorem-ipsum items to each case (fleetio, keystone, curion). Distinct strings per item so the 9 cards across the page aren't identical.

## Surface tones (for Header wordmark)

Each sub-section is its own `<section data-surface="...">` element, picked up by Header's existing scroll detector. Sequence inside one CaseDetail:

| Sub-section | `data-surface` |
|---|---|
| Intro    | `light` |
| Hero     | `dark`  |
| Carousel | `light` |

End-to-end Cases sequence as a user scrolls: `light` (wipe) → `light` (case 1 intro) → **dark** (case 1 hero) → `light` (case 1 carousel) → `light` (case 2 intro) → **dark** (case 2 hero) → `light` (case 2 carousel) → repeat for case 3. The wordmark crossfades to light-ink on each hero and back.

## Wipe → long-form ordering

The wipe currently ends at `scrollYProgress=1` revealing Curion (caseStudies[2]). The first long-form below the wipe starts at caseStudies[0] (Fleetio), so the visible content shifts Curion → Fleetio at the wipe-end boundary.

**Decision:** Accept the transition. Render `CaseDetail` for `caseStudies` in source order (Fleetio, Keystone, Curion). Leave the wipe ordering alone. Each long-form's intro re-introduces the case (eyebrow + statement + role/scale/stack), so a content reset at the wipe-end → first long-form boundary reads as intentional pacing rather than a glitch. If it visually feels wrong on screen, the cheapest mitigation later is to add a brief separator/divider between the wipe and the first long-form.

## Testing & verification

No automated tests for visual components in this repo. Manual checks:

1. `npm run typecheck` — clean.
2. Dev server: scroll through Cases. Verify wipe still works at top. Then for each long-form case:
   - Intro renders the Philosophy-style layout.
   - Hero image pins, title scrolls up over it, releases when title is gone.
   - Carousel scrolls horizontally with snap; arrow buttons advance one card.
3. Wordmark surface tracks: light through intro → dark on hero → light on carousel.
4. Resize to mobile width — carousel still scrolls horizontally; cards cap at `min(70vw, 60rem)` so mobile shows roughly one card per viewport with the next peeking.
5. `prefers-reduced-motion: reduce` — carousel uses `behavior: 'auto'` instead of `'smooth'`. Hero is pure CSS positioning, no motion to disable.

## Risks

- **Page length:** Cases section grows from 300vh (wipe alone) to ~1500vh (wipe + 3 long-forms × 400vh). Total page approaches ~20 viewport-heights. Acceptable for editorial layouts; flagging for awareness.
- **Sticky-inside-section nesting:** the Cases outer section has a `position: sticky` pinned area at the top (the wipe). Below that, each CaseDetail has its own `position: sticky` hero. Sticky positioning is scoped to the nearest scrolling ancestor, which in our case is the document — both work independently. Pre-verified mentally; will confirm on screen.
- **Carousel arrow positioning on first/last card:** clicking `next` past the last card no-ops (native scroll caps). Buttons stay enabled but inert. Acceptable; can add disabled state later if it feels broken.
- **`color-mix(in oklab, ...)`:** browser support is Chrome 111+, Safari 16.4+, Firefox 113+ (all 2023). All modern. Acceptable.

## Out of scope (future work)

- Real photography for hero + carousel (drop `<img>` into `.heroBg` and `.cardImage`).
- Carousel keyboard nav (Arrow keys), focus rings on cards.
- Disabled state on prev/next at boundaries.
- Per-case eyebrow override (currently uses `study.client`).
- Lightbox / fullscreen carousel zoom.
