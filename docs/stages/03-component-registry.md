# Stage 3 — Component registry

Effort: 3–4 working days. Dependency: Stage 2 accepted. Initial state: waiting for dependency.

## Outcome

Provide installable, documented component source and reusable sections through a reproducible shadcn registry build.

## Work

- [ ] Verify the current registry schema/CLI and pin compatible tool versions.
- [ ] Build Button, Input, Textarea, Label, Select, Checkbox, Dialog, Tabs, Card, Badge, Table, and Separator.
- [ ] Add Container, PageIntro, Section, and EmptyState compositions.
- [ ] Use the agreed tokens/profiles and preserve appropriate existing primitive conventions.
- [ ] Declare runtime dependencies, portable install paths/aliases, registry dependencies, and versioned item metadata.
- [ ] Provide runnable examples for variants, supported profiles, focus, disabled/error states where applicable, and keyboard behavior.
- [ ] Build registry artifacts locally and test installation into clean fixtures for both Tailwind adapters.
- [ ] Specify baseline capture for installed items, so later upgrades can compare original/local/incoming source.

## Acceptance and validation

- [ ] All first-release items install and compile from documented artifacts without manual missing-file fixes.
- [ ] Dependency resolution and installation paths work for both root and `src/` component layouts used by consumers.
- [ ] Interactive components pass meaningful keyboard/focus and state checks.
- [ ] Representative screens show correct responsive/profile behavior, with no accidental radius/shadow or global-style leakage.
- [ ] Component/source ownership, compatibility limits, and local customization guidance are documented.
- [ ] Update the issue and `docs/HANDOFF.md` with artifact locations and validation evidence.

## Scope limits

Keep application business logic and finance-specific charts in their projects. Remote hosting is selected in Stage 6. Do not claim existing projects are integrated because fixtures install successfully.
