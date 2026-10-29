# Working on chore-design

This repository is the durable source for shared UI design orchestration. Do not rely on a previous chat to reconstruct its scope.

## Begin each implementation session

1. Read `README.md`, `docs/HANDOFF.md`, `docs/DECISIONS.md`, and the relevant stage specification in `docs/stages/`.
2. Inspect Git status and preserve existing changes. Check the current linked GitHub issues before choosing work; handoff status is a dated snapshot.
3. Follow the user's requested scope. For a general request to continue implementation, choose the earliest unblocked stage. Complete the stage's acceptance criteria before marking it done.
4. Inspect current owning sources for compatibility and product behavior. The inventory in `ROADMAP.md` is historical evidence, not a substitute for reading a project's current setup.

## Product requirements

- Support multiple projects and product-appropriate profiles. Bold Typography is the first profile; it is not a forced rebrand for every application.
- Centralize semantic CSS tokens and produce Tailwind 3/4 adapters from one source.
- Distribute component source through a versioned shadcn registry. Projects retain ownership of their local code.
- Track adopted releases and component baselines. Preserve explicit project overrides and resolve upgrade conflicts visibly.
- Check for applicable shared updates when project work begins/resumes. Keep notices brief, honor deferral, and continue unrelated work.
- New upstream releases do not silently modify existing projects. Apply updates when requested, validate them, then advance recorded versions.
- Maintain keyboard access, visible focus, contrast, responsive layout, and reduced-motion behavior.

## Implementation discipline

- Put decisions, migration guidance, and verification evidence in repository files or linked issues; do not leave essential context only in a chat.
- Keep project identity and portable configuration separate from local checkout paths and session state.
- Read each consuming project's instructions before changing it. Onboard explicitly rather than scanning or modifying arbitrary repositories.
- Avoid adding a persistent server or MCP service until a documented requirement needs it. The first implementation uses local references, a skill, and a registry.
- Use the existing project stack and compatible tooling. Do not upgrade a consumer's framework just to install a design component.
- Select checks based on the changed behavior. Add meaningful tests for token generation, installation, version checks, compatibility selection, deferral, and merge/conflict handling when implemented.
- Verify current official documentation for the Codex skill/hook and shadcn interfaces used. Hooks and UI notices must be demonstrated in the target setup before claiming they work.
- A session-entry reminder means a notice when the assistant begins work. Do not promise a native folder-open popup without an implemented and verified integration.

## Finishing a work session

- Update `docs/HANDOFF.md` with completed work, pending work, exact validation and limitations, relevant issue/PR/commit references, and the next action.
- Update issue checklists and board status when issue management is within the user's requested scope. Otherwise include ready-to-use status information in the handoff.
- Record new architectural choices in `docs/DECISIONS.md` and update stage specifications if scope changes.
- Distinguish implemented, checked, released, and adopted. Do not mark a stage complete based on files existing without its required validation.

Current state: preparation only. No shared runtime, skill installation, update check, or consumer integration exists until a later implementation change establishes it.
