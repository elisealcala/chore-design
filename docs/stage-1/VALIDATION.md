# Stage 1 validation

October 29, 2026. Scope: audit and normative specifications, not a running design system.

| Gate | Evidence / result |
| --- | --- |
| Initial consumers inspected | Five records in source-evidence.json; INVENTORY.md records versions, sources, themes, conventions, commands and adoption gaps |
| Additional candidates classified | React 16 Electron candidate outside component support; two agent runtimes need no UI installation; other repositories not enrolled |
| Profiles defined | PROFILES-AND-TOOLING.md defines purpose, hierarchy, layout, themes, accessibility and example compositions |
| Tooling and fixtures chosen | Node 22.22.0/pnpm 10.9.0 available; ownership and separate Tailwind fixtures specified; installed fixture graph remains a Stage 2 check |
| Precise v1 schemas | DATA-CONTRACTS.md defines required fields/types, ownership, selection, deferral, migrations, partial adoption, conflicts and recovery |
| Portable examples | examples.json parses; baselineId resolves; SHA-256 matches its synthetic UTF-8 source |
| PR research | Official OpenAI/GitHub sources linked in PR-REVIEW-RESEARCH.md; no activation or account-price claim |
| Integrity | Relative links resolve; JSON parses; source hashes match inspected files; Git whitespace check passes |
| Scope | Project plan updated before child tickets #7–#10; applications remained read-only |

Commands: `git diff --check`; Python standard-library JSON loading, relative Markdown link resolution, SHA-256 digest/reference checks, and rehashing recorded sources against configured local checkouts. These are document/evidence integrity checks, not executable schema validation.

Limits: consumer builds and rendered interaction states were not tested. Some consumers have existing working-tree changes. Support targets and accessibility requirements need implementation and rendering evidence in later stages. No library compatibility success is inferred from specifications.
