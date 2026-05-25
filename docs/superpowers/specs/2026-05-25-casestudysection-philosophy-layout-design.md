# CaseStudySection → Philosophy-style layout

**Date:** 2026-05-25
**Status:** Approved (pending user spec review)

## Problem

The Cases section renders nothing on the page. Two causes:

1. `Cases` is not imported or rendered in `src/App.tsx`. Only `Hero`, `Chapters`, `Bento`, and `ContactCTA` are mounted.
2. The current `CaseStudySection` layout (display heading + counter + paragraphs + categorized metadata `<dl>`) is denser than the rest of the site. The user wants it to share the visual language of `Philosophy` — one bold statement on the left, a focused rail on the right.

## Goals

- Show `Cases` on the page with its existing three-layer scroll-wipe behavior preserved.
- Refactor `CaseStudySection` so its layout mirrors `Philosophy`: a 65/35 split with a large statement on the left and an informational rail on the right.
- Keep per-study theming (background, text, accent, band colors).
- Keep the sticky client/years band — it pairs with the animated band in `Cases.tsx` and is load-bearing for the wipe.

## Non-goals

- Final case-study copy. The statement is lorem ipsum for now (per-study, three distinct strings) and will be replaced later.
- Changing the scroll-wipe animation in `Cases.tsx`.
- Changing `Chapters` or any other section.

## Design

### 1. Wire Cases into the page

`src/App.tsx` — add the import and render `<Cases />` between `<Chapters />` and `<Bento />`:

```tsx
import { Cases } from '@/components/sections/Cases';
// ...
<Chapters />
<Cases />
<Bento />
```

### 2. Data model changes

`src/types/index.ts` — `CaseStudy` type after the change:

```ts
export type CaseStudy = {
  slug: string;
  client: string;
  years: string;
  statement: string;            // NEW — replaces punchWord/frame/description
  role: string;
  scale: readonly string[];
  stack: readonly string[];
  theme: { bg: string; text: string; accent: string; band: string };
};
```

Removed fields: `punchWord`, `frame`, `description`.

`src/data/projects.ts` — for each case study, drop `punchWord` / `frame` / `description` and add a `statement` with distinct lorem ipsum so the three sections are visually distinguishable while the wipe animates between them. Example:

```ts
{
  slug: 'fleetio',
  client: 'Fleetio',
  years: '2022 — 2026',
  statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  role: 'Lead Frontend Architect',
  scale: [...],
  stack: [...],
  theme: {...},
}
```

(Keystone and Curion get different lorem strings.)

### 3. `CaseStudySection.tsx` structure

Mirror `Philosophy.tsx`'s composition, keeping the case-specific sticky band and theme tokens:

```tsx
<section ref={ref} id={study.slug} className={styles.root} style={themeVars}>
  <div className={styles.band}>
    <Text variant="mono">{study.client}</Text>
    <Text variant="mono" className={styles.years}>{study.years}</Text>
  </div>

  <div className={styles.inner}>
    <div className={styles.grid}>
      <Text as="h2" variant="display-2" className={styles.statement} id={`${study.slug}-heading`}>
        {study.statement}
      </Text>

      <aside className={styles.rail}>
        <Text variant="mono" className={styles.counter}>
          <span className={styles.counterCurrent}>{padded(index)}</span>
          <span className={styles.counterTotal}>/{padded(total)}</span>
        </Text>

        <dl className={styles.meta}>
          <div className={styles.metaBlock}>
            <dt><Text variant="caption" muted>role</Text></dt>
            <dd><Text variant="body">{study.role}</Text></dd>
          </div>
          <div className={styles.metaBlock}>
            <dt><Text variant="caption" muted>scale</Text></dt>
            <dd>
              <ul className={styles.tagList} role="list">
                {study.scale.map((s) => <li key={s}><Text variant="caption">{s}</Text></li>)}
              </ul>
            </dd>
          </div>
          <div className={styles.metaBlock}>
            <dt><Text variant="caption" muted>stack</Text></dt>
            <dd>
              <ul className={styles.tagList} role="list">
                {study.stack.map((s) => <li key={s}><Text variant="caption">{s}</Text></li>)}
              </ul>
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  </div>
</section>
```

Props after the change:

```ts
type CaseStudySectionProps = {
  study: CaseStudy;
  index: number;
  total: number;
};
```

The `artifact?` prop is removed (unused by any caller).

### 4. `CaseStudySection.module.scss` changes

Adopt from Philosophy: `.inner` (container wrapper), `.grid` (65/35 split with `padding-top: $space-16`), `.statement` (`fluid-type(2rem, 5rem)`, `font-weight: $font-weight-black`, `max-width: 18ch`), `.rail` (`stack($space-6)`), `.tagList` styled as pills (`border: 1px solid` + `border-radius: $radius-full`).

Keep:
- `.root` with `position: absolute; inset: 0` and `grid-template-rows: 3rem 1fr` (load-bearing for the wipe in `Cases.module.scss`).
- `.band` sticky strip at top.
- `--case-bg` / `--case-text` / `--case-accent` / `--case-band` consumption.
- `.counter`, `.counterCurrent`, `.counterTotal`.

Delete: `.display`, `.frame`, `.frameSub`, `.paragraph`, `.artifact`, the `@supports (animation-timeline: view())` keyframe block.

Fix in passing: the existing `.band` block has a duplicate `background` / `border-block` declaration ([CaseStudySection.module.scss:22-27](src/components/sections/CaseStudySection/CaseStudySection.module.scss#L22-L27)) — the second pair overrides the themed `var(--case-band)` with `$color-surface`. Resolve by keeping the themed values.

### 5. What stays the same

- `Cases.tsx` — no changes. It already mounts `CaseStudySection` three times with the wipe.
- `Cases.module.scss` — no changes.
- `Philosophy` — no changes.

## Testing

Manual verification (no test suite for visual components in this repo):

1. `npm run dev`, open the page.
2. Scroll past `Chapters` — confirm Cases now renders.
3. Confirm the wipe transitions through three case-study sections with the animated band sliding down.
4. Confirm each section shows: themed background, sticky client/years band at top, large lorem statement on left, counter + role/scale/stack metadata on right.
5. Confirm distinct lorem text per study (visible during the wipe).
6. Resize to mobile width — grid collapses to single column (existing breakpoint behavior).
7. `npm run typecheck` — no type errors from removed fields.

## Risks

- Removing `description` / `punchWord` / `frame` from the type is a breaking change to the data shape. Mitigated by updating all three call sites in `projects.ts` atomically and by relying on TypeScript to surface any other consumers (grep confirms `CaseStudySection` is the only one).
- Lorem ipsum statements will look unfinished. Acceptable — the user explicitly asked for placeholders.
