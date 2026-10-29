# Shared design orchestration — implementation roadmap

Prepared October 28, 2026. Status: accepted roadmap, prepared for implementation. See `README.md` and `docs/TRACKING.md` for GitHub work tracking. No agent, components, project integrations, or scheduled automation have been installed.

## Outcome

Make `chore-design` the maintained source for UI guidance, CSS tokens, and reusable shadcn/ui components across your projects. From any onboarded project, you should be able to ask the design agent for a suitable direction, see the reasoning, and implement it using the shared foundations.

The agent should understand the product and existing code before recommending a design. Your Bold Typography brief becomes the first design profile. Other profiles can adapt hierarchy, density, and color to the job: a portfolio and a financial dashboard need different layouts.

## How the pieces connect

| Piece | Responsibility | What a project receives |
| --- | --- | --- |
| Design knowledge | Principles, profiles, examples, accessibility rules, recorded decisions | A recommendation grounded in its product and existing UI |
| Shared CSS | Semantic colors, typography, spacing, radii, motion, light/dark themes | A versioned token stylesheet and the appropriate Tailwind adapter |
| shadcn registry | Tested primitives and reusable page sections | Component source installed into its configured directories |
| Design agent | Inspect project → choose profile → explain tradeoffs → map components → implement when requested → verify | A design plan or concrete changes, depending on the request |
| Project record | Stack, profile, adopted versions, local overrides, review evidence | Persistent context for future design work |
| Update awareness | Compare installed releases with applicable shared releases when project work resumes | A short library-update reminder with relevant changes and upgrade options |

Start with one reusable Codex skill, installed in the user's skills directory, plus a small reference in each project's `AGENTS.md`. Codex supports user-level skills across repositories and project-specific instructions. A central folder alone does not make its guidance available in every chat; installation, project onboarding, and file access must be verified. [OpenAI customization documentation](https://learn.chatgpt.com/docs/customization/overview#skills).

Use a custom shadcn registry to distribute component source. The registry supports distributing custom code into projects; consumers keep their installed files and receive future changes through explicit upgrades. This is the proposed distribution approach, not automatic live synchronization. [shadcn registry documentation](https://ui.shadcn.com/docs/registry).

## Starting inventory

Inspected package manifests, available shadcn configuration, global styles, and component paths on October 28. This is an initial inventory, not a complete UI audit or evidence of a working integration.

| Project | Observed foundations | Proposed adoption |
| --- | --- | --- |
| `portfolio-nextjs` | Next.js, React 19, Tailwind 3; documented Bold Typography; existing semantic CSS | Reference for the first profile and Tailwind 3 pilot |
| `agents/studio` | Next.js, React 19, Tailwind 4; shadcn `radix-nova`; existing UI primitives | Tailwind 4 pilot using one isolated component example |
| `finances-app` | Next.js, React 19, Tailwind 4; shadcn `new-york`; tables, forms, charts | Later dashboard adoption; retain domain-specific status and chart semantics |
| `occ` | Next.js, React 19, Tailwind 4; custom token names and CSS | Add semantic mappings before replacing components |
| `jdp` | Next.js/Vinext, React 19, Tailwind 4; custom green theme | Preserve its current product identity through a project profile |
| `chore-design` | Empty starting directory before this document | Central design source and release tooling |

Inventory additional repositories during onboarding, including projects outside the desktop project's current list. Register each explicitly; do not infer that every repository should adopt one visual identity. Backend-only projects may need no UI integration.

## Delivery sequence

Estimated effort: **11–15 working days**, arranged over roughly three weeks for one implementer. This includes 1–2 additional days for update checks, reminders, and their validation. These are planning estimates, not calendar reservations. Full redesigns of existing applications are separate work.

The estimate above is the original baseline. Re-estimate Stage 4 and its pilots when selecting the PR check suite; the PR execution deliverables below are now explicit scope.

| Stage | Effort | Deliverables | Completion evidence |
| --- | --- | --- | --- |
| 1. Audit and contract | 1 day | Complete project inventory, stack/version matrix, profile rules, project record schema | Known adopters and compatibility gaps documented with source paths |
| 2. CSS foundations | 2 days | Canonical tokens, Bold Typography profile, application profile, Tailwind 3/4 adapters | Both adapters compile; theme values and interaction contrast checked |
| 3. Component registry | 3–4 days | Initial primitives, reusable sections, state examples, registry build | Components install into clean fixtures and resolve their dependencies |
| 4. Design agent | 2–3 days | Reusable skill, onboarding workflow, project instruction template, recommendation format, session-entry update check | New-project and existing-project requests produce appropriate guidance; older installations receive a relevant reminder |
| 5. Pilot integrations | 2 days | Small portfolio and Studio pilots; documented installation and upgrade diffs | Both projects pass relevant checks and responsive/keyboard review |
| 6. Release and adoption | 1–3 days | First tagged release, changelog, release index, onboarding guide, rollout backlog | A fresh project can adopt it; existing installations can detect, defer, upgrade, and roll back releases |

Stages depend on the preceding contract. Resolve version compatibility before publishing install instructions.

## Stage 1 — define the design contract

Scope update, October 29: define a portable PR design-review policy and cost boundaries alongside the UI contract. See `docs/PR-REVIEW-RESEARCH.md`. Stage 1 investigates and specifies; agent/pilot stages later implement opt-in execution. Keep model-backed review disabled until its billing route is explicitly selected. Create new implementation tickets for Stage 1 only during this audit.

Record each project's framework, React and Tailwind versions, package manager, style entry point, shadcn setup, component locations, theme handling, and existing conventions. Verify paths: the portfolio currently points `components.json` at `tailwind.config.js`, while the discovered configuration is `tailwind.config.ts`.

Define a per-project `design.json` containing a stable project ID, selected profile, token release, registry release, installed items, intentional overrides, and last review. Store the installed component baselines so upgrades can distinguish project edits from shared changes. Track the last checked release and reminder deferral in local project state. Keep machine-specific checkout paths in a separate local catalog. Capture useful design decisions centrally so the next chat does not depend on conversation history.

Choose profile defaults by product needs. Bold Typography starts with your supplied brief and the portfolio's actual implementation. An application profile keeps compact navigation, readable data, and clear status states. Additional visual directions require examples and a reason to exist.

## Stage 2 — make the CSS portable

Maintain one canonical token source and generate framework-neutral CSS plus Tailwind-specific adapters. Keep the underlying values in sync without forcing framework upgrades. Tailwind 4 uses a different theme setup; validate it separately from Tailwind 3. [shadcn Tailwind compatibility guidance](https://ui.shadcn.com/docs/tailwind-v4).

Cover colors, paired foregrounds, type scales, fonts, spacing, container widths, borders, all radius sizes, focus, motion, and status/chart roles. Define font assets and licenses as part of the installation.

Resolve these details before extraction:

- Retain the portfolio's lighter secondary text and verify contrast on every supported surface rather than copying the brief's contrast claims.
- Separate the vermillion brand color from shadcn's interaction-surface roles. A highlighted menu row and an editorial CTA should not accidentally share an unsuitable treatment.
- For Bold Typography, explicitly set every radius token to zero; changing only the base radius can leave derived sizes rounded.
- Use an explicit 1200px container token rather than assuming a named Tailwind width matches it.
- Keep readable type and usable controls at narrow widths, visible focus, and reduced-motion behavior. Use animation dependencies only when needed.

## Stage 3 — deliver components ready to use

First release: Button, Input, Textarea, Label, Select, Checkbox, Dialog, Tabs, Card, Badge, Table, and Separator. Add shared Container, PageIntro, Section, and EmptyState compositions. Keep finance-specific charts and business logic in their applications initially.

For each item, document variants, dependencies, supported profiles, keyboard behavior, focus, disabled/error states where applicable, and a runnable example. Reuse the project's existing primitive conventions where compatible; do not mix implementations casually.

Build registry items with explicit dependencies and portable install paths. The registry schema supports dependency declarations and placement using project configuration. Verify the chosen CLI version supports every feature used. [Registry item specification](https://ui.shadcn.com/docs/registry/registry-item-json).

Ship versioned token artifacts and registry releases from the same source. Begin with local build/install fixtures; select remote hosting during the release stage. A remote registry is a delivery step to implement, not an existing connection.

## Stage 4 — define the agent workflow

PR design checks are an implementation deliverable here: build the reusable deterministic runner/workflow, evidence reports and an optional, disabled-by-default AI critique adapter. Stage 5 proves these checks on real pilot PRs; Stage 6 releases the versioned rules and onboarding workflow. The complete policy and billing boundaries are in `docs/PR-REVIEW-RESEARCH.md`.

The proposed invocation is `$design-orchestrator`. It should support recommending a design, onboarding a project, auditing an existing UI, checking releases, and applying requested updates. Invocation becomes available only after the skill is implemented and installed.

For every request, the agent should:

1. Read project instructions, its design record, relevant code, and current shared references.
2. Identify the audience, main task, density, brand needs, and accessibility constraints. Ask focused questions only where information materially changes the result.
3. Recommend a profile and explain the layout, typography, component choices, and tradeoffs. Reference actual shared components or identify a gap.
4. Return the files, dependencies, and versions needed. Implement changes when the user requests implementation.
5. Run relevant project checks and inspect representative screens and interaction states.
6. Record adopted versions and decisions so later requests reuse them.

Evaluate it with a new portfolio, a dense dashboard, an existing customized shadcn app, and an unsupported stack. It should recognize compatibility limits and preserve documented overrides. “Best design” means a justified choice for the product, not an unmeasured universal ranking.

The first version uses local files and the registry. An MCP service can be a later extension if other tools or machines need a shared query interface.

## Shared updates and reminders when you return to a project

Support both directions: improvements made in a project can become a shared release, and updates made directly in `chore-design` can be offered to every affected project. A central edit becomes available to consumers only after it is validated and released. Projects retain their installed versions until an upgrade is applied.

The planned flow is:

1. Update a profile, CSS token, component, or agent guidance in `chore-design`.
2. Validate it and publish a tagged release with a machine-readable release index. Include affected items/profiles, framework requirements, change summaries, and migration instructions.
3. When you start or resume Codex work in an onboarded project, compare its design record with that release index.
4. Show one concise reminder for applicable updates, including the installed version, available compatible version, affected UI, and any migration needs. A completely new project receives onboarding guidance using the latest compatible release.
5. Offer **Review changes**, **Update this project**, or **Remind me later**. These are conversational choices in the first version, not assumed native app buttons.

Illustrative reminder, using example versions:

> chore-design 1.4 is available. This project uses 1.2. Updates affect Button focus states and form spacing. Your custom chart colors are recorded as an override. You can review the changes, update this project, or defer until your next session.

Implement a read-only session-entry checker and instructions for the agent to surface its result. Codex documents `SessionStart` hooks for startup/resume; hook definitions require trust before they run. Verify this behavior in the target desktop setup during the pilots. Keep a first-turn check in project instructions as a fallback where hooks are unavailable. This promises a reminder when Codex begins working in the project, not a popup merely from selecting a folder or opening an inactive chat. [OpenAI hooks documentation](https://learn.chatgpt.com/docs/hooks).

Reminder behavior:

- Stay quiet when the project is current or changes do not affect its adopted items/profile.
- Show a notice at most once per session. A deferral lasts until the next session by default; allow an explicit date or skipping a particular release.
- Distinguish compatible upgrades from major or incompatible changes. Explain incompatible releases separately rather than offering a blind update.
- If the release source is unavailable, report that the check could not confirm freshness when relevant; never treat an unavailable source as proof that the project is current.
- Keep the reminder brief and continue the requested project task. Updates can wait until the user chooses to apply them.

When asked to update, compare the installed baseline, current local files, and incoming release. Apply compatible changes while preserving intentional customizations; surface conflicting edits for resolution. Run the affected project's checks and relevant visual/interaction review. Advance the project's recorded release only after successful verification. Support selective component adoption with per-item versions, so a partially upgraded project is not labeled fully current.

Also maintain a central adoption report showing each registered project's installed releases, last verified status, and outstanding updates. Refresh it from accessible project records and label stale entries. It can guide a later batch rollout without requiring all projects to be open or changed at release time.

## Stages 5–6 — prove adoption and release

Pilot one representative screen or component group in the portfolio and one isolated example in Studio. Verify existing behavior before expanding. After those pilots, prioritize finance forms/tables, OCC token mapping, and JDP's product profile.

Release gates:

- Clean Tailwind 3 and 4 fixtures install and build successfully.
- Relevant type, lint, and behavior checks pass in each pilot.
- Mobile/desktop, keyboard navigation, focus, contrast, reduced motion, and supported themes are reviewed.
- A new project can follow the guide and resolve the shared skill, profile, CSS, and components.
- A component update produces a reviewable diff and preserves intentional local changes.
- A new/resumed project session shows an applicable update once, honors deferral, and stays quiet when current.
- Update checks handle incompatible releases, unavailable sources, locally edited components, and partial upgrades accurately.

Use tagged releases and a changelog. Pin project installations to releases, track installed items, and compare upgrades before applying them. Keep project overrides explicit; feed generally useful improvements back into the central source. Roll back using the prior release and project changes.

After launch, review drift when shared foundations change or a project starts UI work. A periodic audit can be added later if requested. No recurring audit or setup automation is scheduled by this roadmap.

## First implementation task

Complete Stage 1: verify the remaining project inventory, define the project design record, and agree the two initial profiles. Then extract tokens from the current portfolio and map them to the shadcn roles before building the component registry.
