# Stage 2 — CSS foundations

Effort: 2 working days. Dependency: Stage 1 accepted. Status: in progress; Stage 1 is complete.

## Outcome

Generate framework-neutral semantic CSS and Tailwind 3/4 adapters from one canonical token source, with Bold Typography and application profiles. Recommend Tailwind 4 for new projects; keep Tailwind 3 supported and emit a non-blocking migration recommendation when its preset is loaded.

## Stage 2 breakdown

1. Workspace and reproducible toolchain.
2. Executable v1 data-contract validators.
3. Canonical profiles, tokens, and generated CSS/adapters.
4. Tailwind 3/4 fixtures, fonts, and installation documentation.
5. Accessibility, responsive, contrast, and determinism validation.

Stage 2 child tickets are created only after this plan and its existing project issue are updated. No later-stage tickets are created here.

## Work

- [x] Implement the agreed tooling/layout and document reproducible install/build/check commands.
- [x] Implement executable schemas/validators for `docs/stage-1/DATA-CONTRACTS.md`, using its synthetic examples and failure cases; Stage 1 delivered normative field specifications.
- [x] Define colors and foreground pairs, type/fonts, spacing, container widths, borders, all radius sizes, motion, focus, status, and chart roles.
- [x] Extract the portfolio's current refinements with attribution to owning source paths; resolve conflicts with the original brief deliberately.
- [x] Keep brand accent separate from shadcn's subtle interaction-surface roles.
- [x] Generate light/dark CSS and adapters for both Tailwind versions without duplicated token values.
- [x] Set all Bold Typography radii to zero and represent the 1200px container explicitly.
- [x] Include font installation, loading, fallback, and license guidance.
- [x] Add meaningful generation, determinism, and theme/adapter checks and a small rendered fixture.

## Acceptance and validation

- [x] Clean Tailwind 3 and 4 fixtures compile using the documented adapters.
- [x] Token output is reproducible and a single source edit reaches both adapters.
- [x] Text and focus/interaction treatments are checked against their actual supported surfaces.
- [ ] Light/dark profiles, narrow screens, readable type, and reduced motion are verified with recorded evidence.
- [x] Tokens are usable in plain CSS without requiring React.
- [x] Document generated-file ownership and the token change/release procedure.
- [ ] Update the issue, decisions as needed, and `docs/HANDOFF.md` with commands/results.

## Scope limits

No full consumer redesign or framework migration. No remote publication is required yet. Production-ready shadcn distribution belongs to Stage 3.
