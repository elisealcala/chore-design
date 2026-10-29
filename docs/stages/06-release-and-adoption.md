# Stage 6 — Release and adoption

Effort: 1–3 working days. Dependency: Stage 5 accepted. Initial state: waiting for dependency.

## Outcome

Publish the first validated shared release and provide a reproducible path for fresh adoption, later upgrades, and rollback.

## Work

- [ ] Select artifact hosting and access configuration, and document the rationale and installation requirements.
- [ ] Build and publish an immutable coordinated release of tokens, adapters, registry items, profiles/guidance, and machine-readable release metadata.
- [ ] Include compatibility requirements, affected items/profiles, changelog, migration notes, and per-item versions.
- [ ] Write new-project onboarding and existing-project upgrade instructions with validated commands.
- [ ] Demonstrate a fresh project installing the compatible release from the documented source.
- [ ] Demonstrate an existing installation detecting, deferring, selectively upgrading, and rolling back a release without losing customizations.
- [ ] Produce the adoption report with stale/unavailable states and create scoped follow-up issues for finance, OCC, JDP, and any additional eligible projects.
- [ ] Define maintenance ownership and the upstream contribution/release process.
- [ ] Release versioned PR rules, the check runner and workflow templates with opt-in onboarding, permissions, billing boundaries, artifact retention and troubleshooting instructions.
- [ ] Document how each additional project enables checks against its adopted design, and how proven checks can become required. AI critique stays a separate opt-in integration.

## Acceptance and validation

- [ ] Both clean fixtures and real pilots satisfy their release gates using the actual release artifacts.
- [ ] A clean session follows the README and onboarding guide successfully without prior chat history.
- [ ] Release metadata is accurate for partial adoption, compatibility, and offline/unavailable sources.
- [ ] Changelog, migration/recovery instructions, and contribution guidance are complete.
- [ ] A newly onboarded project can run a documented PR check using the published release; updating shared review rules follows the same explicit version/adoption process as UI components.
- [ ] Update the issue, adoption records, and `docs/HANDOFF.md` with exact release references and remaining rollout work.

## Scope limits

This stage enables adoption; it does not silently update all projects. No periodic automation, public hosting requirement, or full consumer redesign is implied.
