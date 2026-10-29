# Design contract validators

The v1 runtime schemas implement the shapes described in `docs/stage-1/DATA-CONTRACTS.md`. `validate(kind, value)` returns a Zod safe-parse result for `project`, `baseline`, `releaseIndex`, `catalog`, `reminder`, `adoption`, or `transaction`. `verifyCatalogProjects` additionally resolves the explicitly configured roots and checks project identities. `verifyProjectBaselines` checks ownership against the installed item list. `resolveInsideProject` rejects traversal and existing symlinks that resolve outside a root.

Run `pnpm build` before consuming the package to generate TypeScript declarations in the ignored `dist/` directory. Source is Node ESM JavaScript checked with TypeScript 5.9.3 (`checkJs`, with implicit-any checking disabled). The TypeScript consumer fixture checks the exported entry point.

These validators are not yet the entire update/release engine. In particular, adoption freshness requires actual release-index and project evidence; migrations and transactional writes remain later work. Filesystem checks observe paths at the time they run and do not make later writes atomic against concurrent filesystem changes. Follow the remaining gates in `docs/stage-2/VALIDATION.md`.
