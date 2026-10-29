# Shared tokens

`src/tokens.json` is the canonical source. Run `pnpm build` at the workspace root to generate ignored `dist/tokens.css`, `dist/tailwind-v3.cjs`, `dist/tailwind-v4.css`, and `dist/fonts.css`. Do not edit generated files; change the source, run `pnpm check`, and rebuild both fixtures. No token package has been published.

Use `data-design-profile="bold-typography"` or `"application"` and `data-design-theme="light"` or `"dark"` on the same root element. Include the generated `tokens.css`. Tailwind 3 consumers add the generated preset to their config; Tailwind 4 consumers import the generated adapter after `tailwindcss`. The fixture packages demonstrate each configuration; paths must be adapted to the consuming project's chosen distribution method.

`fonts.css` is optional. It uses the packaged WOFF2 files and includes Inter Tight, JetBrains Mono and italic Playfair Display. The accompanying `fonts/*-LICENSE.txt` files are SIL Open Font License 1.1 and must remain with any redistributed fonts. Assets were copied from the portfolio's `public/fonts`, whose `docs/design-system.md` documents their licenses and subsets. Font families fall back to system fonts when assets are unavailable; applications may supply `--font-design-sans`, `--font-design-mono`, and `--font-design-display`. The application profile uses system-oriented defaults.

The source carries the portfolio's #a0a0a0 dark muted text, #bb2d00 light brand color, zero editorial radius, and 1200px maximum. `brand` is distinct from the shadcn `accent` surface. See `docs/stage-1/PROFILES-AND-TOOLING.md` for intended behavior and remaining validation gates.

For a local package smoke test, run `pnpm --dir packages/tokens pack --pack-destination <directory>` after `pnpm build`, then install the resulting tarball in the consumer. Tailwind 3:

```js
// tailwind.config.cjs
module.exports = { presets: [require('@chore-design/tokens/tailwind-v3')], content: ['./src/**/*.{js,ts,jsx,tsx}'] };
```

```css
@import '@chore-design/tokens/tokens.css';
@import '@chore-design/tokens/fonts.css'; /* optional */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind 4:

```css
@import 'tailwindcss';
@import '@chore-design/tokens/tokens.css';
@import '@chore-design/tokens/fonts.css'; /* optional */
@import '@chore-design/tokens/tailwind-v4.css';
```

Package-root CSS forwarding files are intentionally included because Tailwind 3's importer resolves physical package paths differently from Tailwind 4. The packed-consumer regression test compiles both. `data-design-theme` must be kept in sync with the host application's theme state; a host's `.dark` class alone is not an implemented adapter.
