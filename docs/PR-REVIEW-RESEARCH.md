# Design checks on pull requests

Investigated October 29, 2026. This is a proposed integration contract; no paid reviewer, API key, or automatic workflow has been enabled.

| Option | What it can check | Cost boundary |
| --- | --- | --- |
| Deterministic CI | Token/schema use, accessibility tests, component behavior, screenshots compared with a baseline | No model calls. Standard runners are free in public repositories; private repository compute draws from the owner's allowance. Storage has separate allowances. |
| Codex GitHub review | Diff-aware code review using repository guidance, invoked manually or configured automatically | Uses eligible Codex subscription usage/credits; account eligibility and remaining allowances must be checked before enabling. |
| Custom Codex Action | A tailored design-review prompt, project rules, and supplied screenshots/test evidence | The documented API-key workflow uses API billing as well as any applicable Actions charges. |

GitHub documents public standard-runner compute as free and separate storage allowances; larger runners can cost money even for public repositories. Public visibility does not make model calls free. [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

Codex supports automatic reviews and `@codex review` with repository-specific rules. Its documented GitHub review focuses on P0/P1 issues; broad aesthetic suggestions should not depend on that channel. These reviews are code-focused evidence, not proof that a page was rendered or visually inspected. [Codex GitHub integration](https://learn.chatgpt.com/docs/third-party/github).

Codex subscription usage depends on the task and plan; API-key usage is separately billed. The user's plan, credit settings, actual PR volume, and private repository allowances were not verified, so an exact personal monthly cost cannot be established here. [Codex pricing](https://learn.chatgpt.com/docs/pricing). The documented custom Action accepts a committed prompt file and API credentials. [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action).

## Recommended contract

Plan automatic deterministic checks for relevant UI changes, and optional AI critique requested by a maintainer. Start advisory during pilots; promote only proven, low-noise checks to required status. This recommendation adds a design contract in Stage 1; execution is future implementation in the agent/pilot stages and does not imply a new delivery stage.

- A consumer's committed design record selects `review.mode`: `off`, `checks`, or `checks-and-manual-ai`; default `off` until onboarded. AI review requires separate enablement and a chosen billing route.
- Pin shared review rules to the adopted release. Never silently review against mutable latest design rules.
- Check changed UI files and their affected routes/components. Skip backend-only changes unless shared styles or UI contracts are affected.
- Compare PR screenshots with the base revision at matched viewport, theme, data, and browser settings. Include mobile and desktop; record missing screenshots as missing evidence rather than a pass.
- Return rule ID, severity, file/route, evidence, and a concrete suggestion. Distinguish accessibility/behavior regressions, design consistency, and optional aesthetic advice.
- Keep an existing project on its adopted profile; the review does not redesign it or install an update.
- Run untrusted PR tests without billing credentials or write permissions. A later AI integration must use trusted rules/configuration, explicit maintainer triggering, and limited changed-file input; do not execute PR code with secrets through `pull_request_target`.
- Use one current result per PR/head commit, cancel superseded runs, cap duration and AI invocations, and set short artifact retention. Spending alerts alone are not a guaranteed hard cap.

Before enabling any model-backed route, verify account eligibility, billing ownership, available usage, expected run volume, and enforceable limits. Estimate model cost from actual pilot usage; do not promise a fixed price per PR.
