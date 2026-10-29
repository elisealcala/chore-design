# Stage 2 validation snapshot

October 29, 2026. Stage 2 is accepted based on the checks below and the user-reported verification of the remaining accessibility issue.

## Reproducible setup

- Node v22.22.0; pnpm 10.9.0.
- `pnpm install --frozen-lockfile --offline --store-dir /private/tmp/chore-design-pnpm-store` passed using an already-populated local store. A fresh online install on another machine has not been checked.
- `pnpm check` passed TypeScript checking, declaration generation, 15 package tests, two fixture/package tests, a TypeScript consumer fixture, and Tailwind 3.4.17/4.3.3 fixture builds.
- Tailwind 4.3.3 was selected from the audited Studio pnpm lockfile. SHA-256 of the Studio lockfile at this observation: `796aac27882da0567477e84b47becc8ddf2f76659ed54fa9447404851f1fdc10`. Current workspace lockfile SHA-256: `e16342fa2767b6c52e1fd1bbfed79d5c927b4a16c8b0a6000165601a8ce4b115`.
- Tailwind 3 reports outdated Browserslist data; the build completed. Do not update its lockfile implicitly just to silence the warning.

## Browser smoke checks

Using the generated static fixtures in the in-app browser, both Tailwind versions, both profiles, both themes, and 375px/1440px viewports were checked (16 combinations). Computed backgrounds and foregrounds matched expected values; main max width was 1200px; button/input heights were 48px; no horizontal overflow was observed. Body and input text were 16px; the bold profile's Inter Tight font loaded. Across both profiles and themes, Tab reached the button then the input; each displayed a 2px profile ring outline in both fixtures.

`prefers-reduced-motion: reduce` rules were present in the browser CSSOM, but the browser reported its current preference as no-preference. A temporary fixture with the media condition forced to match produced 0ms durations in all eight profile/theme/adapter combinations. Actual reduced-motion preference behavior has **not** been verified. The fixtures are minimal CSS-only examples, not installed React/shadcn consumers, and no consumer repository was modified or built.

## Remaining gates

- Zod schema tests cover all v1 record types, invalid values, catalog identity, baseline ownership, references, cycles and migration target checks. Stage 4 still owns runtime adoption-freshness calculation, version selection, migrations and transactional upgrades.
- The implementation uses Node ESM JavaScript with TypeScript 5.9.3 `checkJs` and generated declarations; implicit-any checking is disabled. A TypeScript consumer fixture checks the exported entry point. Tightening implicit-any checking is future quality work.
- The user reports verifying the remaining accessibility issue; detailed environment and outputs were not supplied.
- A clean workspace copy with no node_modules or dist passed frozen offline install and `pnpm check`; this uses an already-populated store. Separate npm consumers installed the packed tokens tarball and compiled Tailwind 3 and 4 using the packaged CSS and adapters. The test uses fixture-installed Tailwind binaries via local symlinks; it does not prove a fresh online installation on another machine.
- Re-run `pnpm check` and record any new evidence before closing Stage 2 or its remaining tickets.
- The packaged Tailwind 3 CSS import initially failed because its importer could not resolve the package export map. Physical package-root CSS forwarding files fixed this; the standalone package regression test now covers both Tailwind versions.

## User verification

On October 29, 2026, the user reported verifying the remaining Stage 2 accessibility issue. No browser, operating system, profile matrix, or raw output was provided; do not represent those details as independently observed. The earlier automated and simulated checks remain as documented above.
