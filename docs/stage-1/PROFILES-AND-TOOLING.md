# Profiles and tooling contract

Stage 1 decision, October 29, 2026. This specifies the implementation target; no generator or registry is built yet.

## Profiles

| Requirement | bold-typography | application |
| --- | --- | --- |
| Purpose | Editorial portfolio, writing, prominent product presentation | Task-focused dashboards, forms, data, navigation |
| Typography | Inter Tight headings/body; JetBrains Mono labels; Playfair only for quotations | System/installed sans with mono for technical values; tabular numerals for comparable data |
| Hierarchy | Fluid large headlines; tight display tracking; generous whitespace | Compact page titles, strong section hierarchy, restrained display scale |
| Colors | Near-black/warm-white; vermillion brand; explicit light counterpart | Neutral surfaces, restrained primary action, separate status and chart roles; project brand override |
| Surfaces | Zero radius at every size, dividers, no shadows | Readable surface separation; radius scale allowed; avoid decoration that obscures density |
| Layout | Explicit 1200px maximum; 24/48/64px gutters; asymmetric editorial grids | Responsive navigation and content width; tables may scroll in a labeled region; forms stack on mobile |
| Motion | Crisp 150–200ms interactions; content visible without reveal JS | Brief feedback supporting tasks; preserve input/focus during transitions |
| Examples | PageIntro + article list; hero + section | Sidebar + table + filters; labeled form + validation + empty/error states |

Shared gates: WCAG AA text contrast against actual surfaces; visible keyboard focus; logical headings; accessible names and error relationships; minimum 16px body/form text; 44px touch targets for touch layouts; reduced-motion support. Dense desktop controls can use a compact presentation but must provide usable target spacing and a touch-friendly size variant. Validate actual rendered states, not just token declarations.

Portfolio refinements take precedence over inconsistent starting values: secondary text #a0a0a0 on dark surfaces, darker #bb2d00 light-theme accent, explicit 1200px width, local licensed font files, and reduced-motion progressive enhancement. Recalculate paired contrast during Stage 2; the original brief's ratios are not verification evidence. Decorative layers must not affect reading order or horizontal scrolling.

Use `brand` for editorial emphasis and deliberate primary-action mappings. Use `accent` for appropriate interaction surfaces, with its own foreground. Do not globally map every shadcn accent surface to vermillion. Application status/chart colors are semantic information, so the editorial limited-palette rule does not remove them.

## Toolchain

- Development baseline: Node 22.22.0, pnpm 10.9.0 (both verified available in this environment). Pin these in Stage 2 configuration and keep generated artifacts usable without pnpm in consuming projects.
- Use a pnpm workspace, TypeScript ESM tooling, and Node's built-in test runner for framework-neutral generation/contracts. Pin TypeScript and schema validation dependencies when implementing Stage 2; exact dependency choices require installation/build evidence before declaring them supported.
- Proposed ownership: `packages/tokens` owns canonical values and generated CSS; `packages/contracts` owns schema validation; `registry` owns component source and registry manifests; `skills/design-orchestrator` owns reusable guidance; `fixtures/tailwind-3` and `fixtures/tailwind-4` own independent integration checks. Package names remain private/unpublished until release configuration is selected.
- Generator output goes into ignored build directories; commit canonical source and release metadata. CI checks deterministic generation. Consumer managers remain npm or pnpm as already used.

## Compatibility fixtures

Start from the audited manifests and lockfiles; pin a clean fixture dependency graph in Stage 2. Tailwind 3 fixture targets 3.4.17 + React 19.3.1 as in the portfolio. Tailwind 4 fixture targets the resolved Studio lockfile Tailwind 4 version + React 19.2.8. Record the actual resolved versions and lockfile hashes when constructing fixtures, rather than pretending the manifest's `^4` is an exact version.

React 19, Tailwind 3.4/4, and current Next.js consumers are the initial test matrix. This is a target support matrix until both fixtures and real pilots pass. React 16 receives guidance/tokens only. No change to a consumer's Next.js/Vinext stack is required.

Fixture gates: generated CSS compiles; all declared registry dependencies resolve; root and src/ alias layouts install; light/dark examples render at mobile/desktop widths; controls work by keyboard; project customizations survive a sample upgrade. Install the selected shadcn CLI at an exact verified version during Stage 3 rather than invoking mutable `latest` in reproducible instructions.

Stage 2 starts by creating the workspace/toolchain, implementing the contract validators, and generating the two adapters. There is no development server or package-install requirement for the Stage 1 specifications themselves.
