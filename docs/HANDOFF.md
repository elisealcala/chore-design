# Implementation handoff

Snapshot: October 29, 2026. Verify live issue states and working-tree changes before continuing.

Publication status: the user explicitly approved publishing the full audit on October 29, 2026, including consumer names, versions, paths, revisions, hashes and working-tree status. Stage 1 artifacts are published; parent #1 and child tickets #7–#10 are complete. Stage 2 was accepted after the user reported verifying its remaining accessibility issue. Stage 3 is the current implementation task.

## Stage 2 accepted

Tailwind 4 is now recommended for new projects; Tailwind 3 remains supported. Its generated preset prints a non-blocking recommendation to review an optional upgrade. `pnpm check` passed after this change: 16 package tests, two fixture/package tests, typechecking and both fixture builds; the Tailwind 3 build displayed the notice and completed. Stage 4 must implement a brief, deferrable Tailwind 3 recommendation at session entry after the installed version is verified; that agent notice does not exist yet. See `docs/DECISIONS.md` and `docs/stages/04-agent-and-reminders.md`.

Parent issue #2 and sub-issues #11–#15 are complete. The pinned pnpm workspace, semantic profile token source, generated CSS and Tailwind 3/4 adapters, optional licensed font assets, fixture builds, and executable v1 schemas are implemented. These packages are private/unreleased and have not been installed in consumer projects. Source uses Node ESM JavaScript with pinned TypeScript 5.9.3 `checkJs` tooling and generated declarations; a TypeScript consumer fixture verifies the package entry point.

Detailed evidence: `docs/stage-2/VALIDATION.md`. Validation: Node 22.22.0, pnpm 10.9.0; `pnpm install --frozen-lockfile --offline --store-dir /private/tmp/chore-design-pnpm-store` passed using the existing local store; `pnpm check` passed 15 package tests plus two fixture/package tests and builds for Tailwind 3.4.17 and 4.3.3. Browser smoke checks covered both profiles and themes at 375px and 1440px in both fixtures; 48px controls, no horizontal overflow, 1200px max width and expected colors were observed. Keyboard focus on button/input was checked across both profiles and themes in both versions, and the font loaded. The assistant inspected the reduced-motion media rule without setting the browser preference; the subsequent preference check was reported by the user without environment or raw outputs. Tailwind 3 emitted an outdated Browserslist data warning.

The user reported verifying issue #15 on October 29, 2026; the browser, environment, profile matrix and raw output were not supplied. Temporary fixture CSS with the media condition replaced by `all` produced 0ms durations in all eight profile/theme/adapter combinations; this simulates a match and does not verify browser/OS preference handling. Issues #11–#15 and parent #2 are complete. Re-run `pnpm check` after any changes. Stage 4 will implement adoption freshness, version selection, migrations and transactional upgrades using the Stage 2 validators. Production shadcn component installation remains Stage 3.

## Stage 3 in progress

Process blocker (October 30, 2026): Stage 3 repeatedly stopped after partial implementation rather than completing its five subissues and acceptance criteria. Resolve this blocker only when #16–#20 are verified and all Stage 3 acceptance criteria pass; keep #3 in progress until then. The user requested one commit per completed subissue and automated installation, Playwright, and CI evidence.

Parent #3 is in progress; sub-issues #16–#20 are open. `shadcn` 4.21.1 is pinned and `pnpm registry:build` builds an experimental Button artifact. The Button has not been installed in a consumer, compiled with React, or tested for interactive behavior; it is not released. `pnpm check` passed the existing Stage 2 tests after the tool installation. Continue with item metadata, dependencies, clean installation fixtures and component implementation; see `docs/stage-3/VALIDATION.md`. The board was updated with #3 in progress.

## Playwright priority — October 29, 2026

A pinned Playwright suite now generates repeatable foundation screenshots and browser assertions before further Stage 3 work. `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/chore-design-playwright pnpm test:browser` passed 18 tests on macOS Chromium headless 141.0.7390.37 after installing the matching browser. Sixteen screenshots were generated locally under `test-results/browser/`; one mobile capture was inspected. That directory is ignored and cleared on the next run. Browser startup required execution outside the restricted environment. See `docs/stage-3/VALIDATION.md` for coverage and limitations.

This does not complete issue #3 or #20: only static token fixtures are covered, and registry components and installed React examples remain missing. Extend the suite as those components are implemented, then verify the full Stage 3 acceptance criteria. No issue was closed and no release or consumer adoption is claimed.

A read-only GitHub Actions workflow now runs `pnpm check`, registry build, and Playwright checks on relevant pull requests and main pushes. It uploads browser evidence for three days. The 18 browser checks passed locally and in [GitHub Actions run 40994204931](https://github.com/elisealcala/chore-design/actions/runs/40994204931); [the evidence artifact](https://github.com/elisealcala/chore-design/actions/runs/40994204931/artifacts/12950132935) uploaded successfully. Stage 3 requires extending Playwright to installed component examples in both Tailwind adapters and root/`src` layouts before closure. The automated foundation suite now provides stronger reduced-motion evidence than the earlier manual report, by emulating the browser preference in a repeatable test.

## Completed

Stage 1 (parent #1; child issues #7–#10) delivered the current five-consumer inventory, profile requirements, Node/pnpm and fixture strategy, precise v1 field schemas and migration/upgrade semantics, source hashes, synthetic examples, and PR-review/cost research. See `docs/stage-1/VALIDATION.md` and `README.md` for evidence and artifact links.

The project plan and roadmap were updated before the Stage 1 child tickets were created. Only Stage 1 tickets were added. The original six-stage sequence remains.

Consumer repositories were read-only. Existing changes in agents and finances-app were preserved. The portfolio config mismatch has an exact correction documented for the pilot; it is not fixed in the application.

## Next action

PR design-check execution is explicitly tracked in existing Stage 4 issue #4, real PR validation in Stage 5 issue #5, and release/onboarding in Stage 6 issue #6. Stage 1 delivered policy/research only. No new later-stage tickets or paid integrations were created by this scope clarification. Re-estimate Stage 4/pilot effort after selecting the check suite.

Continue **[Stage 3 — component registry, issue #3](https://github.com/elisealcala/chore-design/issues/3)** using `docs/stages/03-component-registry.md`. Verify current issue states and complete its acceptance criteria before marking it done.

## Validation and limits

- Passed: Git whitespace, relative document links, JSON parsing, source-evidence hashes rechecked against five consumers, and synthetic baseline digest/reference integrity.
- Stage 1 delivered normative specifications. Stage 2 has initial executable validators and rendered fixture checks, but no registry installation or consumer build has been performed.
- No paid PR reviewer, API key, automatic review workflow, or recurring automation was enabled. The PR contract recommends deterministic checks with optional maintainer-requested AI critique; execution is later-stage work.
- Personal subscription/billing allowances and a per-PR AI price were not established. Recheck official pricing and account settings before enabling model calls.

## Durable state

Public repository: `elisealcala/chore-design`. Private project: https://github.com/users/elisealcala/projects/2. Identifiers are in `.github/tracking.json` and `.github/stage-1-tickets.json`. The connector could read issues but could not write; the existing `gh` login performed issue updates. Its project scope is unavailable, so the signed-in browser manages project metadata.

Follow `AGENTS.md`; read the current issue, decisions and relevant stage files. Keep this handoff current with completed/pending work, exact checks, evidence, limitations and the next action. No originating chat is required.

## Registry metadata work in progress

Issue #16: `registry/versions.json` now records an unreleased draft item version, and `pnpm registry:build` checks that every catalog item has a valid version and readable, safe source paths before running shadcn. The registry build passed. This does not yet validate dependency declarations, installation paths, or release artifacts; #16 remains open. Continue with the remaining Stage 3 items and verify installed components with Playwright before closing issues.

## Accessibility checks — October 30, 2026

Added pinned axe-core Playwright checks and a local React component fixture. Nine checks passed and one is explicitly skipped: a full-page scan with Select open reports `aria-hidden-focus` on the background in all eight profile/theme/adapter combinations. Investigate the finding, focus containment, and assistive-technology behavior before considering it resolved. `pnpm check` passed; see `docs/stage-3/VALIDATION.md` for exact scope, commands, and limitations. These tests import source directly and do not replace installed-consumer validation or manual accessibility review. Hosted CI for this change has not been checked. No issue was closed. Live issue state could not be retrieved because GitHub was unreachable from this environment.

## Draft registry installation progress — October 30, 2026

The 16-item draft catalog, local installation guidance, four clean React installation fixtures, schema-validated draft baseline captures, and installed-example browser suite are in the working tree. `pnpm registry:fixtures` passed for Tailwind 3/4 with root/`src` layouts, `pnpm check` passed, and the installed suite passed 36/36. The full foundation/accessibility suite passed 27 with 37 skips: 36 installed tests run separately and the full-page select axe test remains intentionally unresolved. See `docs/stage-3/VALIDATION.md` for commands and evidence. The updated workflow has not been verified on GitHub Actions; none of these results establish release or consumer adoption.

Continue Stage 3 by investigating the documented select `aria-hidden-focus` finding and focus containment with appropriate accessibility review, verifying the updated hosted workflow and its artifacts, completing the remaining acceptance review, and recording per-subissue commits and issue/board updates only when justified. Issues #3 and #16–#20 remain open. Preserve other concurrent working-tree changes.

## Native Select follow-up — October 30, 2026

The draft Select now uses the native HTML control instead of the Radix popup, removing the mechanism behind the earlier full-page `aria-hidden-focus` finding. The former skipped test was removed; full-page axe checks pass on the focused native control in all eight adapter/profile/theme combinations. The installed-fixture suite verifies focus and selection with Playwright's `selectOption`; native popup arrow-key selection and screen-reader behavior remain unverified in this environment. See `docs/stage-3/VALIDATION.md` and `docs/DECISIONS.md`. Hosted CI and the subissue/parent status updates remain pending.
