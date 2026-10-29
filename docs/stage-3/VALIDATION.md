# Stage 3 validation snapshot

October 29, 2026. Work is in progress. No component or registry release has been published or adopted by a consumer.

- Reviewed the official [registry setup](https://ui.shadcn.com/docs/registry/getting-started) and [registry schema](https://ui.shadcn.com/docs/registry/registry-json). The documentation describes `registry:ui` items, explicit file paths, and the `shadcn build` command.
- Pinned `shadcn` 4.21.1 in the workspace. `pnpm registry:build` builds `registry/dist/button.json` from `registry.json` and `registry/ui/button.tsx`. Output is generated and ignored.
- The initial Button source is experimental. Its installation, compilation in clean React consumers, keyboard states, profile behavior, variants and dependency/layout compatibility have not yet been validated. Do not treat it as a release or production-ready component.
- Remaining work includes all other items, source version metadata, dependencies and baseline capture, clean Tailwind 3/4 installation, accessibility and responsive testing. See issues #16–#20 and `docs/stages/03-component-registry.md`.
