# GitHub implementation tracking

Setup snapshot: October 28, 2026. Use live GitHub issue states for current progress.

- Repository: [elisealcala/chore-design](https://github.com/elisealcala/chore-design), private.
- Project: [chore-design — Implementation](https://github.com/users/elisealcala/projects/2), private.
- Machine-readable identifiers: [tracking.json](../.github/tracking.json).

| Stage | Issue | Initial readiness | Prerequisite |
| --- | --- | --- | --- |
| 1 — Audit and design contract | [#1](https://github.com/elisealcala/chore-design/issues/1) | Ready | None |
| 2 — CSS foundations | [#2](https://github.com/elisealcala/chore-design/issues/2) | Waiting | #1 |
| 3 — Component registry | [#3](https://github.com/elisealcala/chore-design/issues/3) | Waiting | #2 |
| 4 — Design agent and update reminders | [#4](https://github.com/elisealcala/chore-design/issues/4) | Waiting | #3 |
| 5 — Pilot integrations | [#5](https://github.com/elisealcala/chore-design/issues/5) | Waiting | #4 |
| 6 — Release and adoption | [#6](https://github.com/elisealcala/chore-design/issues/6) | Waiting | #5 |

All stage issues include implementation checklists, acceptance/validation criteria, scope limits, source links, and prerequisite links. Stage 1 carries `ready`; later stages carry `blocked` until their prerequisite acceptance criteria are complete. Update labels when dependencies change. Board status records execution state and does not replace prerequisite checks.

## Preparation checks

- Passed: relative document links, all six stage references, tracking identifiers, and preservation of the original supplied brief.
- Passed: remote repository is private with `main` as its default branch; all 18 preparation files are published.
- Passed: six open issue bodies match their checked-in specifications, with the expected readiness labels and prerequisite links.
- Project creation, private visibility, description/README, default repository, and addition of all six stage issues were verified in GitHub's browser interface. All six cards are in Todo; their `ready`/`blocked` labels are displayed and the view persisted after reload.
- Passed: final preparation changes clear Git whitespace checks. There is no runtime to build or test yet.

## Continuing elsewhere

Clone the repository, open it in your coding assistant, and follow `AGENTS.md` and `docs/HANDOFF.md`. Access to private GitHub resources and pilot source repositories is required when those operations begin; chat history is not.
