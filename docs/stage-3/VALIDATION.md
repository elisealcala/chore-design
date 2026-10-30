# Stage 3 validation snapshot

October 29, 2026. Work is in progress. No component or registry release has been published or adopted by a consumer.

- Reviewed the official [registry setup](https://ui.shadcn.com/docs/registry/getting-started) and [registry schema](https://ui.shadcn.com/docs/registry/registry-json). The documentation describes `registry:ui` items, explicit file paths, and the `shadcn build` command.
- Pinned `shadcn` 4.21.1 in the workspace. `pnpm registry:build` builds `registry/dist/button.json` from `registry.json` and `registry/ui/button.tsx`. Output is generated and ignored.
- The initial Button source is experimental. Its installation, compilation in clean React consumers, keyboard states, profile behavior, variants and dependency/layout compatibility have not yet been validated. Do not treat it as a release or production-ready component.
- Remaining work includes all other items, source version metadata, dependencies and baseline capture, clean Tailwind 3/4 installation, accessibility and responsive testing. See issues #16–#20 and `docs/stages/03-component-registry.md`.

## Automated browser evidence — October 29, 2026

`pnpm test:browser` builds the tokens and Tailwind fixtures and runs pinned Playwright 1.56.1 against Chromium headless 141.0.7390.37 on macOS. All 18 tests passed: 16 combinations of Tailwind 3/4, Bold Typography/application, light/dark, and 375/1440px, plus reduced-motion preference checks for each adapter. The matrix asserts background color, no horizontal overflow, container width, control heights, keyboard focus and visible outline properties. Each passing matrix case saves a named full-page screenshot under `test-results/browser/`; one mobile screenshot was visually inspected. The reduced-motion tests emulate both preference states and verify duration tokens; they do not test an OS setting.

Install browsers with `pnpm exec playwright install chromium --only-shell`; run `pnpm test:browser`. Set `PLAYWRIGHT_BROWSERS_PATH` consistently for installation and execution if using a custom cache. Outputs are local, ignored and overwritten by the next run. They are evidence captures, not approved visual regression baselines; rendering varies by environment, as explained in [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots). Failure screenshots and traces are also retained locally. The CI workflow is described below.

These are the existing static token fixtures, not installed registry components. They do not establish component installation, interactive behavior, contrast compliance, all focus states, or Stage 3 acceptance. Extend the suite against runnable installed components in both layouts and adapters as issues #17–#20 are implemented, capture and inspect representative states, and test keyboard interaction and absence of style leakage. A screenshot cannot replace those assertions or human review of design correctness.

## Pull request automation

`.github/workflows/stage-3-browser.yml` runs on relevant pull requests, pushes to `main`, or manual dispatch. It installs the pinned dependencies and headless Chromium, runs `pnpm check`, builds the registry, then runs the 18 Playwright browser checks. It uploads browser evidence for three days, including passing captures. The workflow uses read-only repository permissions, one browser worker, a ten-minute Playwright timeout, and cancellation of superseded runs. No model API or paid AI reviewer is involved.

The same browser command passed locally on October 29 after this workflow was added: 18/18 tests. [GitHub Actions run 40994204931](https://github.com/elisealcala/chore-design/actions/runs/40994204931) also passed its install, unit/build, registry build, browser test and evidence upload steps. The [browser evidence artifact](https://github.com/elisealcala/chore-design/actions/runs/40994204931/artifacts/12950132935) is retained for three days. This hosted run replaces manual foundation checks with repeatable coverage, including emulated reduced motion; it does not establish that an operating system preference was changed. Future Stage 3 component work must add installed-example Playwright checks; current coverage is still limited to token fixtures.
