# chore-design

Shared design guidance, CSS foundations, and shadcn/ui components for Elizabeth's projects.

**Status: Stage 1 completed October 29, 2026.** The audit, profiles, tooling decisions, normative data contracts, and PR-review research are documented. The shared library, design skill, update checker, and project integrations are not implemented yet.

[Repository](https://github.com/elisealcala/chore-design) · [Implementation project](https://github.com/users/elisealcala/projects/2) · [Issues](https://github.com/elisealcala/chore-design/issues) · [Tracking record](docs/TRACKING.md)

## Start here

Read [AGENTS.md](AGENTS.md), the [current handoff](docs/HANDOFF.md), and the [roadmap](ROADMAP.md). Each implementation stage has a standalone specification below. GitHub issues track live progress; the repository holds the durable requirements and decisions.

| Stage | Specification | Issue | Effort | Dependency |
| --- | --- | --- | --- | --- |
| 1 | [Audit and design contract](docs/stages/01-audit-and-contract.md) | [#1](https://github.com/elisealcala/chore-design/issues/1) | 1 day | Complete |
| 2 | [CSS foundations](docs/stages/02-css-foundations.md) | [#2](https://github.com/elisealcala/chore-design/issues/2) | 2 days | Ready after Stage 1 |
| 3 | [Component registry](docs/stages/03-component-registry.md) | [#3](https://github.com/elisealcala/chore-design/issues/3) | 3–4 days | Stage 2 |
| 4 | [Design agent and update reminders](docs/stages/04-agent-and-reminders.md) | [#4](https://github.com/elisealcala/chore-design/issues/4) | 2–3 days | Stage 3 |
| 5 | [Pilot integrations](docs/stages/05-pilot-integrations.md) | [#5](https://github.com/elisealcala/chore-design/issues/5) | 2 days | Stage 4 |
| 6 | [Release and adoption](docs/stages/06-release-and-adoption.md) | [#6](https://github.com/elisealcala/chore-design/issues/6) | 1–3 days | Stage 5 |

Estimated total: **11–15 working days** for one implementer. No dates or recurring automation are scheduled.

## What this will provide

- A reusable design agent that inspects a project's purpose and existing UI before recommending a direction.
- Shared semantic CSS tokens, with adapters for Tailwind 3 and 4.
- A versioned shadcn registry that installs component source into each project's existing structure.
- Bold Typography as the first profile, with an application profile for denser interfaces.
- A version check when Codex work starts or resumes in an onboarded project, offering relevant library updates with review, apply, and defer choices.
- A path for useful project improvements to return to the shared library.

## Stage 1 results

- [Current inventory](docs/stage-1/INVENTORY.md), [profiles and tooling](docs/stage-1/PROFILES-AND-TOOLING.md), and [data contracts](docs/stage-1/DATA-CONTRACTS.md).
- [PR review and cost research](docs/PR-REVIEW-RESEARCH.md), [validation evidence](docs/stage-1/VALIDATION.md).

## Project documents

- [Roadmap](ROADMAP.md): scope, sequence, and initial project inventory.
- [Architecture contract](docs/ARCHITECTURE.md): responsibilities, data contracts, and boundaries.
- [Decisions](docs/DECISIONS.md): accepted direction and choices still open.
- [Handoff](docs/HANDOFF.md): verified state and the next implementation task.
- [Original design brief](docs/reference/bold-typography-brief.md): the supplied starting design, with corrections tracked separately.
- [Implementation issue template](.github/ISSUE_TEMPLATE/implementation.md) and [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

## Continue from a new session

Open this repository in your coding assistant and ask:

> Read AGENTS.md and docs/HANDOFF.md. Verify the current GitHub issue states, then implement the earliest unblocked stage. Follow its acceptance criteria and update the handoff with the changes, validation evidence, and next action.

The implementation instructions live in this repository. No previous chat, attachment location, absolute machine path, or assistant memory is required to understand the work. Pilot source repositories still need to be available when their integrations begin.

## Development setup

This is currently a documentation repository; there is no application runtime or package installation step. Stage 1 selected Node 22.22.0/pnpm 10.9.0 and documented the workspace and fixture strategy; Stage 2 will create that toolchain. Do not run a guessed development command or treat an empty build as evidence of a working library.
