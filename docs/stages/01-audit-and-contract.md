# Stage 1 — Audit and design contract

Effort: 1 working day. Dependency: none. Completed: October 29, 2026 (audit and normative specifications).

## Outcome

Define the shared design contract from current project evidence so later stages can build one compatible system. Read `AGENTS.md`, `ROADMAP.md`, `docs/ARCHITECTURE.md`, and `docs/DECISIONS.md` first.

## Work

- [x] Reinspect portfolio-nextjs, agents/studio, finances-app, OCC, and JDP; record source paths, stack/tool versions, CSS entry points, component conventions, primitive family, themes, and relevant validation commands.
- [x] Identify any additional eligible projects explicitly and distinguish UI consumers from backend-only projects.
- [x] Review the original brief and portfolio refinements; define Bold Typography and application-profile requirements with examples and accessibility constraints.
- [x] Resolve the portfolio shadcn path mismatch in the adoption contract: record the exact correction for its pilot while keeping consumer repositories read-only.
- [x] Define pull-request design checks, evidence, trigger/billing boundaries, and an opt-in AI review policy based on official documentation.
- [x] Choose package manager, supported runtime/tool versions, workspace layout, and clean Tailwind 3/4 fixture strategy. Record the reasons.
- [x] Specify the versioned project record, release index, component baseline, local catalog, reminder state, and adoption report schemas, including schema migration behavior.
- [x] Define compatible-release selection, partial adoption, override ownership, and upstream contribution rules.
- [x] Record decisions, source evidence, open compatibility questions, and the Stage 2 handoff.

## Deliverables

A current inventory, profile contract, documented tooling/package layout, data schemas or precise schema specifications, and updated decisions/handoff. Record any schema choices as implementation decisions before code in later stages depends on them.

## Acceptance and validation

- [x] Every initial UI consumer has verified source references and an adoption path or explicit compatibility limit.
- [x] Exact schemas cover installed versus available versions, per-item versions, customizations, unavailable sources, and reminder deferral.
- [x] Configuration is portable; no committed contract requires a particular checkout path or this chat.
- [x] Both initial profiles have explicit purpose and constraints. Dense applications retain readable data/status roles.
- [x] Stage 2 can start without guessing token ownership, project identity, or toolchain setup.
- [x] Update the GitHub issue and `docs/HANDOFF.md` with evidence and the next action.

## Scope limits

Audit consumer repositories read-only. Do not install the shared skill, broadly refactor applications, publish packages, or enable hooks in this stage.

## Evidence

See `docs/stage-1/INVENTORY.md`, `PROFILES-AND-TOOLING.md`, `DATA-CONTRACTS.md`, `source-evidence.json`, `examples.json`, and `VALIDATION.md`. PR research is in `docs/PR-REVIEW-RESEARCH.md`. Child tickets: #7–#10. Executable validators and rendered compatibility checks remain future implementation.
