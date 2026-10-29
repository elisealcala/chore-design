# Data contracts v1

Normative field specifications for Stage 1. These are precise schema specifications permitted by the Stage 1 deliverable; executable JSON Schemas/validators are Stage 2 work. No runtime currently accepts these records.

## Shared types and validation

Every object is closed: unknown fields are invalid except the optional `extensions` object, whose keys are namespaced strings. Every top-level record requires `schemaVersion: 1`. Unsupported schema versions produce an actionable incompatibility result, never silent coercion. A migrator writes a new record only after validating it and retaining the original for rollback. Migrations are explicit, ordered, idempotent and tested; no in-place best-effort edits.

`Id` is a stable lowercase slug matching `[a-z0-9]+(-[a-z0-9]+)*`. `Version` is an exact SemVer release (no `latest`, tags, ranges, or prereleases in the stable channel). `Time` is an RFC3339 UTC timestamp. `Digest` is a lowercase 64-character SHA-256 hex string. `Path` is a nonempty project-relative POSIX file path; reject absolute paths, traversal segments, and destinations escaping the project through symlinks. `Range` is a SemVer range parsed by the chosen implementation library. Arrays of IDs/paths must be unique where they identify objects.

All fields below are required unless marked optional (`?`). Nullable fields use explicit `null` only where stated. All versions identify artifacts, not assumptions about the whole project's freshness.

## 1. Project design record — committed consumer `design.json`

| Field | Type / meaning |
| --- | --- |
| schemaVersion | literal 1 |
| projectId | Id, stable across renames/machines |
| stack | object: nodeVersion Version, framework string, frameworkVersion Version, reactVersion Version or null, tailwindVersion Version or null, primitiveFamily enum radix/base-ui/native/none, packageManager string |
| profile | object: id Id, version Version |
| tokenRelease | Version |
| registryRelease | Version: catalog consulted at the most recent successful installation, not proof every item matches it |
| installedItems | array of {id: Id, version: Version, baselineId: Id}; unique id |
| overrides | array of {id: Id, paths: Path[], reason: nonempty string}; unique id |
| review | object: mode enum off/checks/checks-and-manual-ai, rulesRelease Version or null, uiPaths Path[], routes string[], requiredEvidence string[] |
| lastVerification | {at: Time, revision: full Git commit hash, outcome: enum passed/failed/partial, evidence: string[]} or null |

`off` requires no CI execution and can have null rulesRelease. Other modes require a pinned rulesRelease; the presence of `checks-and-manual-ai` does not authorize paid execution by itself. Routes identify application routes, not machine URLs. Never put billing credentials into committed design metadata.

## 2. Installed baseline — committed `.chore-design/baselines/<baselineId>.json`

Fields: schemaVersion; baselineId Id; itemId Id; version Version; releaseId Id; files array of `{path: Path, digest: Digest, source: string}`. `source` is the original UTF-8 file content; digest hashes its exact UTF-8 bytes. Capture all files managed by the item, not arbitrary application files. Reject duplicate paths and any overlap between items unless ownership is explicitly resolved before installing. Locally customized source remains in the project file; the baseline stays immutable until a successful upgrade replaces it.

## 3. Release index — published `releases/index.json`

Fields: schemaVersion; generatedAt Time; releases array. Each release requires:

- id Id; version Version; channel literal stable; publishedAt Time.
- source `{repository: HTTPS URL, commit: full Git hash}`; artifacts array `{path: Path, url: HTTPS URL, digest: Digest}` with immutable URLs and unique paths.
- compatibility `{node: Range, frameworks: array of {id: string, range: Range}, react: Range or null, tailwind: Range or null, primitiveFamilies: array of radix/base-ui/native/none}`.
- profiles array `{id: Id, version: Version}`; tokenRelease Version; items array `{id: Id, version: Version, baselineArtifact: Path, dependencies: array of {id: Id, version: Version}}`.
- changes array `{kind: enum fix/feature/breaking, summary: string, affectedItems: Id[], affectedProfiles: Id[], migrationId: Id or null}`.
- migrations array `{id: Id, from: Range, to: Version, instructions: string}`.

Every referenced item/profile/artifact/migration must exist. Dependencies refer to exact items in this release, must be acyclic, and are installed in dependency order. Package dependencies and aliases are additionally declared by registry manifests. Artifact contents must pass digest verification before being trusted or installed. A release with unsatisfied dependencies is invalid even if its version is higher.

## 4. Local catalog — ignored `project-catalog.local.json`

Fields: schemaVersion; projects array `{projectId: Id, root: absolute path string}`. IDs and canonical roots are unique. A root must exist and match the committed design record's projectId before accessing it. No implicit scanning outside configured roots. The catalog is machine-specific and never required to understand shared rules.

## 5. Reminder state — ignored `.chore-design/local-state.json`

Fields: schemaVersion; projectId Id; lastCheck `{at: Time, sourceDigest: Digest or null, outcome: enum success/unavailable/invalid, latestCompatible: Version or null}` or null; lastNotice `{release: Version, sessionId: string}` or null; deferral `{kind: enum next-session/until, sessionId: string or null, until: Time or null}` or null; skippedReleases Version[].

For next-session, sessionId is required and until is null; for until, until is required and sessionId is null. A successful fresh session rechecks applicability and compatibility. One notice per relevant release/session; default defer suppresses it for the current session. A skip suppresses only that release. Invalid/unavailable checks never erase a known installed version or declare a consumer current.

## 6. Adoption report — generated, not an adoption authority

Fields: schemaVersion; generatedAt Time; projects array `{projectId: Id, checkedAt: Time or null, sourceRevision: string or null, status: enum current/update-available/partial/incompatible/unavailable/stale/unonboarded, installedTokenRelease: Version or null, installedItems: array of {id: Id, version: Version}, targetRelease: Version or null, pendingItems: Id[], evidence: string[]}`.

Recompute from accessible records and valid release metadata. A record not checked in this run is stale; unavailable means attempted access failed. Unonboarded has no design record. Current requires a successful check against the relevant latest compatible release and all applicable item/profile/token versions, not merely registryRelease equality. Partial means some target artifacts are adopted and others remain pending. Do not publish local checkout paths or private application data in a public report.

## Selection and upgrade algorithm

1. Validate the project record and release index. Use resolved consumer dependency versions; missing/ambiguous versions yield a compatibility question, not a guessed match.
2. Filter stable releases by framework, Node, React, Tailwind, primitive family and selected profile. Choose the highest compatible release with applicable changes. Separate major/breaking changes for migration review. No auto-adoption.
3. Expand exact item dependencies. An update is relevant when it affects adopted items, their dependency closure, the selected profile, tokens, or opted-in review rules. Do not notify about unrelated components.
4. Compare baseline B, local L, incoming N by file. If L=B, N can replace it; if N=B, preserve L; if L=N, retain it. Otherwise report conflict (including edit/delete and overlapping additions), unless a tested merge can prove nonoverlap. A recorded override is intentional evidence, not a blanket exemption from validation.
5. Stage the complete change and recovery snapshot before writes. Use a per-project transaction lock. Record a pending transaction locally with target release and original file digests. On interruption, inspect that transaction and offer recovery/rollback; do not treat a half-written installation as successful.
6. Run required project checks and UI evidence review. On failure leave adoption metadata/baselines at their original versions and restore affected files or retain an explicit failed transaction for recovery. On success atomically commit new baselines and adoption metadata, then clear the transaction. A rerun at the same version is a no-op when digests match.

Pending transaction fields: schemaVersion, projectId, targetRelease Version, startedAt Time, phase enum prepared/writing/validating/failed, originalFiles array `{path: Path, digest: Digest or null, recoveryPath: Path}`, and originalRecordDigest Digest. Recovery files are local and ignored; null digest means the path did not previously exist.

Upstream contributions require extracting reusable changes into chore-design, validating them, documenting migration impact, and publishing a release. A consumer's local override never silently changes another consumer's profile.

## Validator and algorithm acceptance cases

Stage 2 validators must accept the synthetic records in `examples.json` and reject: unknown schema versions; missing nodeVersion; duplicate item IDs; invalid timestamps/digests; absolute/traversing installed paths; mismatched baseline hashes; unknown cross-references; cyclic dependencies; non-off review mode with null rulesRelease; invalid deferral field combinations. Full Git hashes must be lowercase 40- or 64-character hex strings.

Stage 4 behavior tests must cover: irrelevant release silence; same-session notice deduplication; next-session deferral expiry; explicit expiry date and skipped releases; unavailable/invalid index; incompatible or breaking migration; partial adoption; local edit plus upstream edit conflict; local edit plus unchanged upstream preservation; edit/delete conflicts; failed validation leaving adopted versions unchanged; interrupted transaction recovery and idempotent rerun. Examples are serialization evidence, not proof these behaviors work today.
