# Footer Wordmark Files

## Where each file goes

### Public assets (served as URLs)

Drop the **14 PNGs** into:
```
public/wordmarks/letters/
```

These render at runtime via the `<img src="/wordmarks/letters/...">` URLs the component builds.

### Component source

Drop the **3 files** into your Footer folder (or anywhere you keep components):
```
src/components/organisms/Footer/FooterWordmark/
  FooterWordmark.tsx
  FooterWordmark.module.scss
  letters.json
```

The component imports `letters.json` directly (Vite handles JSON imports via `resolveJsonModule`). If you'd rather keep the JSON next to the PNGs in `public/`, you'd need to `fetch()` it at runtime instead — staying with the import keeps it synchronous and type-checked.

## Usage

```tsx
import { FooterWordmark } from './FooterWordmark/FooterWordmark';

<Footer>
  ...nav columns, subscribe form, etc.

  <FooterWordmark surface="dark" />
</Footer>
```

## Props

- `surface` — `'light'` (default) or `'dark'`. Picks which color variant to render.
  - `'light'` surface → dark wordmark
  - `'dark'` surface → light platinum wordmark
- `cascade` — `0–1`, default `0.7`. Portion of total scroll progress over which the letter cascade unfolds.
- `perLetter` — `0–1`, default `0.3`. How long each individual letter takes to land within the cascade.

## Behavior

- Animation tied to scroll: starts when the wordmark's top edge enters the viewport bottom, finishes when the wordmark's bottom edge meets the viewport bottom.
- Each letter has a staggered slice of the scroll progress. Z lands first, the second L lands last, with overlap between adjacent letters for a fluid cascade.
- Respects `prefers-reduced-motion`: if the user opts out of motion, all letters render at their final position immediately.
- Single `aria-label="Zoë Hall"` on the container; individual letter images are `aria-hidden`, so screen readers announce the wordmark as one logical unit.

## Manifest fields you can use

The `letters.json` also exposes:

- `text` — the full reading string (used for `aria-label`)
- `source.width` / `source.height` — original canvas dimensions
- `baseline_y` / `cap_height_y` — reference lines for aligning other elements to the wordmark
- `padding` — pixel cushion added around each letter crop
- `words` — letter index groups for "Zoë" and "Hall", useful if you ever want word-level animation instead of letter-level

## Sizing

The component fills 100% of its parent's width and sets its own height via `aspect-ratio: 2750 / 576`. To make it the massive bottom-of-footer slab in the Happly reference, just give its parent the desired width — typically `100%` of the footer.