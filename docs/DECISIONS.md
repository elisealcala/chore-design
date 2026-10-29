# Decisions

These decisions preserve the agreed direction independently of the originating chat. Update this file when a decision changes; state its reason and affected stages.

## Accepted direction — October 28, 2026

1. **One shared design home.** `chore-design` provides reusable guidance, CSS, and components across explicitly onboarded projects.
2. **Profiles fit the product.** Use the supplied Bold Typography design as the first profile; define an application profile for denser interfaces. Preserve intentional product identities.
3. **Support existing stacks.** The initial inventory includes Tailwind 3 and 4. Generate adapters and validate both without requiring consumer framework upgrades.
4. **Use shadcn-style source distribution.** Components install into each consumer, which retains local ownership. Versioned shared releases and explicit upgrades replace implicit synchronization.
5. **Offer updates when project work resumes.** Compare adopted versions with applicable releases, show a short reminder, and support review/apply/defer. Existing projects need not update when the central library changes.
6. **Allow improvements to flow upstream.** Useful project-specific work can become a central release and then be offered to other consumers.
7. **Keep progress durable.** Repository documents, GitHub issues, and the implementation project hold scope and status; no future session should need this chat to proceed.
8. **Preparation is distinct from implementation.** The repository and planning setup are authorized now. Shared library code, installation, hooks, and consumer changes remain implementation work.
9. **No scheduled automation.** The requested delivery is a roadmap and implementation setup. Periodic audits can be introduced later if requested.

## Implementation defaults

- October 29 scope update: Stage 1 includes the PR-review contract and cost research. Recommend deterministic UI checks plus maintainer-requested AI critique; no paid integration is enabled by this decision. Update the project plan before creating Stage 1 child tickets. No new tickets for later stages during this task.

- Use a public repository under the existing `elisealcala` account. Visibility changed at the user's request on October 29, 2026.
- Begin with a reusable local skill and registry. Add a service only if a real integration requirement needs one.
- Use the portfolio as the Bold Typography reference and a Tailwind 3 pilot; use an isolated Studio example as the Tailwind 4 pilot.
- Keep machine-specific checkout paths and reminder state outside shared committed configuration.

## Choices to resolve in their stages

| Choice | Stage | Constraint |
| --- | --- | --- |
| Package manager, workspace layout, supported tool versions | 1 | Follow current compatibility evidence; document reproducible setup |
| Exact schemas and baseline storage | 1 | Portable records, explicit migrations, three-way upgrade support |
| Application profile visuals | 1–2 | Product density, readable data, accessible states |
| Registry CLI and fixture versions | 3 | Prove both Tailwind adapters and existing primitive conventions |
| Hook integration and fallback | 4–5 | Demonstrate startup/resume behavior and honor the host's trust flow |
| Artifact hosting and access | 6 | Reproducible installation and immutable releases; choose before publishing instructions |
| Broader repository inventory | 1 | Register eligible projects explicitly; no UI integration needed for backend-only code |

## Stage 1 resolutions — October 29, 2026

- Inventory and adoption gaps are recorded in `docs/stage-1/INVENTORY.md`, with machine-independent source paths and content hashes in `source-evidence.json`.
- Profiles, Node 22.22.0/pnpm 10.9.0 baseline, workspace ownership and fixture strategy are specified in `docs/stage-1/PROFILES-AND-TOOLING.md`. Consumer package managers remain unchanged.
- `docs/stage-1/DATA-CONTRACTS.md` defines normative v1 schemas and migration/upgrade semantics. Stage 2 implements executable validators; no runtime schema validation is claimed in Stage 1.
- The portfolio config mismatch is resolved as an explicit pilot correction, not an out-of-scope edit to a consumer repository.
- PR review research recommends automated deterministic checks and optional maintainer-triggered AI critique, with separate provider billing and no paid integration enabled.
- Exact installed fixture/CLI dependency pins are verified during Stage 2/3 installation; the Stage 1 target support matrix is not a claim of tested library compatibility.
