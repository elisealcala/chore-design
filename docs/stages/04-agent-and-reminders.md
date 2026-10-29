# Stage 4 — Design agent and update reminders

Effort: 2–3 working days. Dependency: Stage 3 accepted. Initial state: waiting for dependency.

## Outcome

Implement reusable design guidance, explicit project onboarding, and concise library-update reminders when Codex begins or resumes work in an onboarded project.

## Work

- [ ] Create the reusable design skill and project instruction template, with portable references to profiles, components, and release metadata.
- [ ] Support recommendation, onboarding, audit, release review, and explicitly requested upgrades.
- [ ] Inspect actual project purpose/stack/current UI before selecting a profile or component.
- [ ] Implement project-record initialization and read-only release/compatibility checks against the Stage 1 contracts.
- [ ] Implement notice deduplication, next-session default deferral, explicit deferral date, and release skipping.
- [ ] Distinguish compatible, incompatible, irrelevant, partially adopted, and unknown/offline states.
- [ ] Add a session-entry hook where supported and a first-turn instruction fallback; document actual installation and trust requirements.
- [ ] Implement baseline/local/incoming comparison and conflict reporting for requested updates; preserve local overrides.
- [ ] Advance adoption metadata only after successful validation. Keep a recovery/rollback path for failed or interrupted upgrades.
- [ ] Record project design decisions and contributions that may be proposed upstream.

## Acceptance and validation

- [ ] New portfolio, dense dashboard, customized shadcn app, and unsupported-stack scenarios produce justified, traceable recommendations.
- [ ] A compatible relevant release produces one short notice; current/irrelevant/deferred/skipped releases do not produce unwanted notices.
- [ ] Incompatible releases and unavailable sources are reported accurately without blocking unrelated project work.
- [ ] Tests cover per-item versions, local edits, conflicts, failed validation, and interrupted/repeated upgrades.
- [ ] Instructions and fixtures work from a clean session without the original chat or absolute machine paths.
- [ ] Document which startup/resume behavior is verified and what still requires the real pilots in Stage 5.
- [ ] Update the issue, decisions, and `docs/HANDOFF.md`.

## Scope limits

The first notice is conversational; native app buttons or folder-open popups are separate work. No automatic UI propagation, background auditing, or persistent MCP service is required.
