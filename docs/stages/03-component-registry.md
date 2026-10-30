# Stage 3 — Component registry

Effort: 3–4 working days. Dependency: Stage 2 accepted. Status: verified on PR #21; merge to main pending. Stage 2 accepted based on user verification.

## Outcome

Provide installable, documented component source and reusable sections through a reproducible shadcn registry build.

## Stage 3 breakdown

1. Pin and validate the shadcn registry build and item metadata.
2. Implement basic controls and content primitives.
3. Implement interactive accessible primitives.
4. Build reusable page compositions and runnable examples.
5. Verify installation, compatibility, accessibility and baseline capture.

Playwright browser checks are a required gate for the installed examples. Extend the suite when each component group is added; the foundation fixtures alone do not satisfy this gate.

## Work

- [x] Verify the current registry schema/CLI and pin compatible tool versions.
- [x] Build Button, Input, Textarea, Label, Select, Checkbox, Dialog, Tabs, Card, Badge, Table, and Separator.
- [x] Add Container, PageIntro, Section, and EmptyState compositions.
- [x] Use the agreed tokens/profiles and preserve appropriate existing primitive conventions.
- [x] Declare runtime dependencies, portable install paths/aliases, registry dependencies, and versioned item metadata.
- [x] Provide runnable examples for variants, supported profiles, focus, disabled/error states where applicable, and keyboard behavior.
- [x] Build registry artifacts locally and test installation into clean fixtures for both Tailwind adapters.
- [x] Run automated browser checks on installed examples in both adapters and root/`src` layouts, covering keyboard interaction, disabled/error states, responsive profiles, and themes. Keep a CI workflow and review its evidence.
- [x] Specify baseline capture for installed items, so later upgrades can compare original/local/incoming source.

## Acceptance and validation

- [x] All first-release items install and compile from documented artifacts without manual missing-file fixes.
- [x] Dependency resolution and installation paths work for both root and `src/` component layouts used by consumers.
- [x] Interactive components pass meaningful keyboard/focus and state checks.
- [x] Representative screens show correct responsive/profile behavior, with no accidental radius/shadow or global-style leakage. Use the Playwright suite for reproducible screenshots and extend it to installed registry examples; review captures and test interactive states rather than treating screenshots alone as proof.
- [x] Component/source ownership, compatibility limits, and local customization guidance are documented.
- [x] Update the issue and `docs/HANDOFF.md` with artifact locations and validation evidence.

## Scope limits

Keep application business logic and finance-specific charts in their projects. Remote hosting is selected in Stage 6. Do not claim existing projects are integrated because fixtures install successfully.
