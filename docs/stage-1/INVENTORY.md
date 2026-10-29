# Stage 1 inventory

Inspected October 29, 2026. Paths below are relative to each project's root. Versions are manifest declarations, not a claim that dependencies were freshly installed. This audit read source and configuration; it did not run consumer builds or inspect rendered screens.

| Consumer / revision | Stack and tooling | Owning sources | Adoption path |
| --- | --- | --- | --- |
| portfolio-nextjs / `7130bf5` | Next 16.4.2, React 19.3.1, Tailwind ^3.4.17; npm/package-lock.json | package.json, components.json, tailwind.config.ts, src/app/globals.css, src/app/layout.tsx, docs/design-system.md, src/components/page-intro.tsx | Bold Typography reference; Tailwind 3 adapter; preserve existing CSS components and local fonts |
| occ / `3d28f89` | Next ^16.3.4, React ^19.3.1, Tailwind ^4.1.0; pnpm 10.9.0/pnpm-lock.yaml; separate Vinext worker scripts | package.json, src/app/globals.css, src/app/layout.tsx, AGENTS.md | Map --bg/--ink/--paper/--line to semantic roles before adopting React primitives; custom CSS has no discovered shadcn config |
| agents/studio / `a552273` (agents repository) | Next 16.3.8, React 19.2.8, Tailwind ^4; pnpm 10.9.0/pnpm-lock.yaml; shadcn ^4.21.1, radix-nova | package.json, components.json, app/globals.css, app/layout.tsx, components/ui/button.tsx, AGENTS.md and parent AGENTS.md | Isolated Tailwind 4 pilot; retain Radix Slot and current `cn` utility convention |
| finances-app / `5948b05` | Next 16.1.6, React 19.2.3, Tailwind ^4; npm/package-lock.json; shadcn ^3.8.4, new-york | package.json, components.json, src/app/globals.css, src/app/layout.tsx, src/components/ui/button.tsx, src/components/app-sidebar.tsx | Application profile; keep status/chart roles and explicit button customizations; no automatic overwrite |
| jdp / `185dd31` | Next 16.2.6/Vinext, React 19.2.6, Tailwind 4.2.1; npm/package-lock.json | package.json, app/globals.css, app/layout.tsx | Semantic mapping for its existing green identity; adopt tokens first; no discovered shadcn config |

Portfolio, OCC, and JDP were clean during this audit. Agents had existing memory-bank changes; finances-app had existing code and manifest changes. Those working trees were preserved. Their revision identifiers alone do not identify the inspected working-tree state; re-read sources before a pilot. No consumer configuration was changed.

## Styles, components, themes

- Portfolio: dark default/light override, semantic hex tokens, Inter Tight/JetBrains Mono/Playfair loaded locally. Native details/summary and CSS button classes coexist with React compositions. `ScrollReveal` documents progressive enhancement and reduced motion. Keep these refinements instead of reintroducing animation dependencies.
- Studio: CSS-first Tailwind 4 `@theme inline`, shadcn semantic/sidebar/chart tokens, Geist fonts loaded through next/font/google. Button uses Radix Slot, class-variance-authority and `cn` from the `cn` package. A `.dark` variant exists in CSS; actual runtime theme switching remains a pilot check.
- Finances: Tailwind 4 semantic theme and next-themes provider, Geist fonts, customized Radix/cva primitives, separate positive/warning/info colors and chart tokens. Derived radius sizes mean changing only --radius will not make every corner square.
- OCC: custom near-black/orange palette, Arial stack, CSS controls and collaboration-specific colors. `outline: var(--line)` in the focus rule is a potential invalid outline shorthand; verify and correct focus visibility during its later adoption, not by copying it into the library.
- JDP: light green/white surfaces and dark green sidebar, Inter/system fallback, custom status colors and focus treatment. No application-wide theme switch was established by this audit. Preserve its identity as an intentional override/profile mapping.

## Commands observed in package scripts

Commands below are identified, not reported as passing. Run from each consumer root using its existing manager.

| Consumer | Relevant checks for later integration |
| --- | --- |
| Portfolio | npm run lint; npm run typecheck; npm test; npm run build |
| OCC | pnpm check; pnpm test; pnpm build; pnpm test:e2e. Worker deployment path additionally uses check:worker/build:worker/test:worker scripts |
| Studio | pnpm check; pnpm build. No test script is declared; add targeted fixture/interaction coverage for the pilot |
| Finances | npm run lint; npm test; npm run build (Prisma generation required). No typecheck script is declared; choose a documented check rather than assuming one |
| JDP | npm run lint; npm run build. No test/typecheck scripts declared |

## Findings resolved in the contract

The portfolio's components.json points to `tailwind.config.js`, which is absent; its actual file is `tailwind.config.ts`. The exact pilot prerequisite is to change `tailwind.config` to `tailwind.config.ts` before any registry install. This resolves the adoption decision while respecting Stage 1's read-only consumer scope. It is not a claim that the portfolio file has been fixed.

Keep Studio and finances utility aliases distinct. Keep the existing primitive family (Radix in both inspected Button sources), while handling their differing shadcn styles and utility conventions in installation adapters. Framework upgrades are not part of adoption.

## Additional known candidates

`electron-react-ts/package.json` identifies a personal React ^16.13.1/Electron ^8.2.2/Webpack 4 example with npm build scripts and no declared Tailwind. Classify it as guidance/tokens-only candidate; React 19 registry components are unsupported until a separate compatibility decision. It is not onboarded.

`agents/project-manager/package.json` and `agents/ingest-classifier/package.json` describe CLI/server/MCP runtimes with no declared React UI dependency; their UI consumer is Studio. They need no component installation.

Other directories visible in the Sites workspace were not enrolled or deeply scanned. Ownership and adoption intent must be established before expanding the catalog. This is not a claim to have audited every repository on the machine.
