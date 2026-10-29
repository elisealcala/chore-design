# Architecture contract

Status: implementation target. This document defines behavior to build, not functionality already present.

## Responsibilities

`chore-design` owns reusable design knowledge, profiles, canonical tokens, component registry sources, release metadata, and agent instructions. Each consuming project owns its application, installed component files, chosen profile, adopted versions, and intentional overrides.

Flow: project request → inspect current project → select profile and compatible release → explain design and affected components → implement requested work → verify → record decisions and adoption.

Update flow: central change → validation → tagged release → project session check → relevant notice → requested upgrade → compare baseline/local/incoming changes → verify → record adopted versions.

## Data contracts to implement

| Contract | Required information | Rule |
| --- | --- | --- |
| Project design record | Schema version, stable project ID, framework/React/Tailwind requirements, profile, token release, registry release, installed items, per-item versions, overrides | Portable and committed with the consumer; never identify a project solely by an absolute path |
| Installed baseline | Registry item, original release, original source or retrievable immutable reference, hashes | Enables a three-way comparison with local and incoming code |
| Release index | Release ID/version, immutable source, compatible stacks, affected items/profiles, changes, migrations | Publish only validated releases; do not use an untagged working tree as the update channel |
| Local catalog | Stable project IDs mapped to available checkout locations | Machine-specific and excluded from Git |
| Reminder state | Last check, source freshness, last notified release/session, defer-until or skipped release | Local user/session state; no repeated notice within the same session |
| Adoption report | Per-project and per-item versions, last verification, available updates, stale/unavailable status | Report partial adoption and uncertainty accurately |

Stage 1 defines the exact schemas, migration strategy, file ownership, and package layout. Do not invent incompatible parallel formats in later stages.

## CSS and components

Generate portable CSS and Tailwind adapters from a single token source. Model paired foreground colors, typography, spacing, motion, focus, container widths, borders, radii, and status/chart roles. Keep brand color separate from subtle interaction surfaces.

Build components in existing React/shadcn conventions, with explicit runtime dependencies and portable install locations. Preserve the consumer's primitive family where compatible. Treat the built registry and token artifacts as one coordinated release; retain per-item versions for selective adoption.

The first profiles are Bold Typography and an application profile. Exact application styling is a Stage 1 design decision. A non-React consumer may reuse tokens and guidance, but React component installation must be reported as unsupported unless an adapter is implemented.

## Reminder contract

Check at startup/resume where supported, with a first-turn instruction fallback. Verify hook support and trust requirements against the current target environment. The first version delivers a conversational notice, not a native application banner.

| Situation | Expected behavior |
| --- | --- |
| Current installation | No update notice |
| Applicable compatible release | Brief version/change summary with review, apply, or defer choices |
| Irrelevant item/profile update | No notice |
| Major or incompatible release | Explain the migration or compatibility limit separately |
| New project without adoption record | Offer onboarding with the latest compatible release |
| Deferred or skipped release | Honor the recorded choice; default deferral is the next session |
| Unavailable release source | Record uncertainty; never declare the project current from a failed lookup |
| Locally edited component | Compare installed baseline, local source, and incoming source; preserve changes or surface conflicts |
| Partially upgraded project | Record per-item versions; do not call it fully current |
| Failed upgrade validation | Keep adoption state unchanged; document the failure and rollback/recovery path |

Release checks inspect metadata; they do not modify UI. Explicitly requested upgrades produce reviewable changes and relevant checks. A useful consumer improvement may be contributed upstream, reviewed, and released before it is offered to other projects.

## Verification boundaries

Use clean Tailwind 3 and 4 fixtures for generation and install tests, plus portfolio/Studio pilots for integration evidence. Check actual component states, keyboard behavior, responsive screens, themes, and reduced motion. Document limitations that fixtures cannot prove.

Initial estimates cover the shared system and small pilots. Full application redesigns, a hosted dashboard, a persistent orchestration server, MCP integration, and recurring background audits are separate scope.
