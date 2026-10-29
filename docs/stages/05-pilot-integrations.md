# Stage 5 — Pilot integrations

Effort: 2 working days. Dependency: Stage 4 accepted. Initial state: waiting for dependency.

## Outcome

Prove the complete workflow in two real projects: portfolio-nextjs for Tailwind 3/Bold Typography and one isolated agents/Studio example for Tailwind 4.

## Work

- [ ] Read current instructions and inspect working-tree changes in each consumer before planning an integration.
- [ ] Choose one representative screen/component group per pilot and record the starting state.
- [ ] Onboard both projects using their existing package manager, component layout, theme conventions, and primitive family.
- [ ] Integrate shared CSS and selected registry components with a reviewable diff.
- [ ] Verify the skill can identify the project, retrieve current shared guidance, and record its design choices in a fresh session.
- [ ] Exercise a sample library update: check → notice → defer → return → review/apply → verify → record versions.
- [ ] Include a locally customized component and demonstrate preservation/conflict reporting and rollback.
- [ ] Verify actual startup/resume behavior in the target desktop setup, including the hook trust flow or documented fallback.
- [ ] Feed reusable pilot corrections back into the central sources and update onboarding guidance.
- [ ] Run the Stage 4 PR checks on representative UI pull requests in both pilots, including a seeded accessibility/token regression and a clean change. Start with advisory results and record noise, runtime and artifact storage.
- [ ] Exercise missing screenshots, backend-only changes and superseded PR revisions. Verify findings refer to the current head and the project's adopted design profile.
- [ ] Validate optional AI critique with synthetic responses; run a live paid/subscription review only after its billing route is explicitly enabled and its usage limits are understood.

## Acceptance and validation

- [ ] Both pilots pass relevant project lint/type/build/behavior checks; document pre-existing failures separately.
- [ ] Mobile/desktop, keyboard, focus, supported themes, and reduced motion have recorded review evidence.
- [ ] Update/reminder behavior works in a new session without relying on the current chat.
- [ ] Local overrides remain intact or explicit conflicts are resolved without losing user changes.
- [ ] Both pilots have PR check evidence, documented limitations and measured runner usage. Advisory findings are useful before any check becomes required; paid AI execution is not a prerequisite for completing the pilot.
- [ ] Update the issue and `docs/HANDOFF.md` with consumer commit/PR references and verified limitations.

## Scope limits

Keep pilots small. A full portfolio or Studio redesign and the finance/OCC/JDP rollout are separate follow-up work. Fixture success alone does not satisfy these integration gates.
