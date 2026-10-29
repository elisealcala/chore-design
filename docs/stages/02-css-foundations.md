# Stage 2 — CSS foundations

Effort: 2 working days. Dependency: Stage 1 accepted. Initial state: waiting for dependency.

## Outcome

Generate framework-neutral semantic CSS and Tailwind 3/4 adapters from one canonical token source, with Bold Typography and application profiles.

## Work

- [ ] Implement the agreed tooling/layout and document reproducible install/build/check commands.
- [ ] Define colors and foreground pairs, type/fonts, spacing, container widths, borders, all radius sizes, motion, focus, status, and chart roles.
- [ ] Extract the portfolio's current refinements with attribution to owning source paths; resolve conflicts with the original brief deliberately.
- [ ] Keep brand accent separate from shadcn's subtle interaction-surface roles.
- [ ] Generate light/dark CSS and adapters for both Tailwind versions without duplicated token values.
- [ ] Set all Bold Typography radii to zero and represent the 1200px container explicitly.
- [ ] Include font installation, loading, fallback, and license guidance.
- [ ] Add meaningful generation, determinism, and theme/adapter checks and a small rendered fixture.

## Acceptance and validation

- [ ] Clean Tailwind 3 and 4 fixtures compile using the documented adapters.
- [ ] Token output is reproducible and a single source edit reaches both adapters.
- [ ] Text and focus/interaction treatments are checked against their actual supported surfaces.
- [ ] Light/dark profiles, narrow screens, readable type, and reduced motion are verified with recorded evidence.
- [ ] Tokens are usable in plain CSS without requiring React.
- [ ] Document generated-file ownership and the token change/release procedure.
- [ ] Update the issue, decisions as needed, and `docs/HANDOFF.md` with commands/results.

## Scope limits

No full consumer redesign or framework migration. No remote publication is required yet. Production-ready shadcn distribution belongs to Stage 3.
