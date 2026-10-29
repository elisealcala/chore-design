import { z } from 'zod';
import semver from 'semver';
import { createHash } from 'node:crypto';
import { isAbsolute } from 'node:path';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const version = z.string().refine(s => semver.valid(s) === s && !semver.prerelease(s), 'Expected exact stable semver');
const range = z.string().refine(s => !!semver.validRange(s), 'Expected semver range');
const digest = z.string().regex(/^[0-9a-f]{64}$/);
const git = z.string().regex(/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/);
const time = z.iso.datetime({ offset: false });
const path = z.string().min(1).refine(s => !s.startsWith('/') && !s.includes('\\') && !s.split('/').some(p => p === '..' || p === '.' || p === '') && !/^[a-zA-Z]:/.test(s), 'Expected safe relative POSIX path');
const nonempty = z.string().min(1);
const url = z.url().refine(s => s.startsWith('https://'), 'Expected HTTPS URL');
const primitive = z.enum(['radix','base-ui','native','none']);
const extensions = z.record(z.string().regex(/^.+[.:/].+$/), z.unknown()).optional();
/** @template {z.ZodRawShape} T @param {T} shape */
const obj = shape => z.strictObject({ ...shape, extensions });
/** @template {z.ZodRawShape} T @param {T} shape */
const record = shape => obj({ schemaVersion: z.literal(1), ...shape });
const unique = (items, key, ctx, field) => { const seen=new Set(); for (const item of items) { const v=key(item); if(seen.has(v)) ctx.addIssue({code:'custom',message:`Duplicate ${field}: ${v}`}); seen.add(v); } };
const project = record({
  projectId: slug, stack: obj({nodeVersion:version,framework:nonempty,frameworkVersion:version,reactVersion:version.nullable(),tailwindVersion:version.nullable(),primitiveFamily:primitive,packageManager:nonempty}),
  profile: obj({id:slug,version}), tokenRelease:version, registryRelease:version,
  installedItems:z.array(obj({id:slug,version,baselineId:slug})), overrides:z.array(obj({id:slug,paths:z.array(path),reason:nonempty})),
  review:obj({mode:z.enum(['off','checks','checks-and-manual-ai']),rulesRelease:version.nullable(),uiPaths:z.array(path),routes:z.array(nonempty.refine(s => s.startsWith('/') && !s.startsWith('//') && !s.includes('://'),'Expected application route')),requiredEvidence:z.array(nonempty)}),
  lastVerification:obj({at:time,revision:git,outcome:z.enum(['passed','failed','partial']),evidence:z.array(nonempty)}).nullable()
}).superRefine((v,c)=>{unique(v.installedItems,x=>x.id,c,'item id');unique(v.installedItems,x=>x.baselineId,c,'baseline id');unique(v.overrides,x=>x.id,c,'override id');for(const override of v.overrides)unique(override.paths,x=>x,c,'override path');unique(v.review.uiPaths,x=>x,c,'UI path');if(v.review.mode!=='off' && !v.review.rulesRelease)c.addIssue({code:'custom',message:'Review rules release required'});});
const baseline = record({baselineId:slug,itemId:slug,version,releaseId:slug,files:z.array(obj({path,digest,source:z.string()}))}).superRefine((v,c)=>{unique(v.files,x=>x.path,c,'file');for(const f of v.files)if(createHash('sha256').update(f.source,'utf8').digest('hex')!==f.digest)c.addIssue({code:'custom',message:`Digest mismatch: ${f.path}`});});
const deferral = obj({kind:z.enum(['next-session','until']),sessionId:nonempty.nullable(),until:time.nullable()}).superRefine((v,c)=>{if((v.kind==='next-session' && (!v.sessionId || v.until!==null)) || (v.kind==='until' && (!v.until || v.sessionId!==null)))c.addIssue({code:'custom',message:'Invalid deferral fields'});});
const reminder = record({projectId:slug,lastCheck:obj({at:time,sourceDigest:digest.nullable(),outcome:z.enum(['success','unavailable','invalid']),latestCompatible:version.nullable()}).nullable(),lastNotice:obj({release:version,sessionId:nonempty}).nullable(),deferral:deferral.nullable(),skippedReleases:z.array(version)}).superRefine((v,c)=>unique(v.skippedReleases,x=>x,c,'skipped release'));
const catalog = record({projects:z.array(obj({projectId:slug,root:nonempty.refine(isAbsolute,'Expected absolute path')}))}).superRefine((v,c)=>{unique(v.projects,x=>x.projectId,c,'project');unique(v.projects,x=>x.root,c,'root');});
const adoption = record({generatedAt:time,projects:z.array(obj({projectId:slug,checkedAt:time.nullable(),sourceRevision:nonempty.nullable(),status:z.enum(['current','update-available','partial','incompatible','unavailable','stale','unonboarded']),installedTokenRelease:version.nullable(),installedItems:z.array(obj({id:slug,version})),targetRelease:version.nullable(),pendingItems:z.array(slug),evidence:z.array(nonempty)}))}).superRefine((v,c)=>{unique(v.projects,x=>x.projectId,c,'project');for(const p of v.projects){unique(p.installedItems,x=>x.id,c,'installed item');unique(p.pendingItems,x=>x,c,'pending item');if(p.status==='current' && (p.checkedAt===null || p.targetRelease===null || p.pendingItems.length))c.addIssue({code:'custom',message:'Current status needs checked time, target release, and no pending items'});if(p.status==='unonboarded' && p.installedTokenRelease!==null)c.addIssue({code:'custom',message:'Unonboarded project cannot have installed tokens'});}});
const transaction = record({projectId:slug,targetRelease:version,startedAt:time,phase:z.enum(['prepared','writing','validating','failed']),originalFiles:z.array(obj({path,digest:digest.nullable(),recoveryPath:path})),originalRecordDigest:digest}).superRefine((v,c)=>unique(v.originalFiles,x=>x.path,c,'original file'));
const release = obj({id:slug,version,channel:z.literal('stable'),publishedAt:time,source:obj({repository:url,commit:git}),artifacts:z.array(obj({path,url,digest})),compatibility:obj({node:range,frameworks:z.array(obj({id:nonempty,range})),react:range.nullable(),tailwind:range.nullable(),primitiveFamilies:z.array(primitive)}),profiles:z.array(obj({id:slug,version})),tokenRelease:version,items:z.array(obj({id:slug,version,baselineArtifact:path,dependencies:z.array(obj({id:slug,version}))})),changes:z.array(obj({kind:z.enum(['fix','feature','breaking']),summary:nonempty,affectedItems:z.array(slug),affectedProfiles:z.array(slug),migrationId:slug.nullable()})),migrations:z.array(obj({id:slug,from:range,to:version,instructions:nonempty}))}).superRefine((v,c)=>{
  unique(v.artifacts,x=>x.path,c,'artifact');unique(v.items,x=>x.id,c,'item');unique(v.profiles,x=>x.id,c,'profile');unique(v.migrations,x=>x.id,c,'migration');unique(v.compatibility.frameworks,x=>x.id,c,'framework');unique(v.compatibility.primitiveFamilies,x=>x,c,'primitive family');
  const artifacts=new Set(v.artifacts.map(x=>x.path)), items=new Map(v.items.map(x=>[x.id,x])), profiles=new Set(v.profiles.map(x=>x.id)), migrations=new Set(v.migrations.map(x=>x.id));
  for(const item of v.items){unique(item.dependencies,x=>x.id,c,'dependency');if(!artifacts.has(item.baselineArtifact))c.addIssue({code:'custom',message:`Missing baseline artifact: ${item.baselineArtifact}`});for(const dep of item.dependencies)if(items.get(dep.id)?.version!==dep.version)c.addIssue({code:'custom',message:`Missing exact dependency: ${dep.id}@${dep.version}`});}
  for(const change of v.changes){unique(change.affectedItems,x=>x,c,'affected item');unique(change.affectedProfiles,x=>x,c,'affected profile');for(const id of change.affectedItems)if(!items.has(id))c.addIssue({code:'custom',message:`Unknown item: ${id}`});for(const id of change.affectedProfiles)if(!profiles.has(id))c.addIssue({code:'custom',message:`Unknown profile: ${id}`});if(change.migrationId&&!migrations.has(change.migrationId))c.addIssue({code:'custom',message:`Unknown migration: ${change.migrationId}`});}
  for(const migration of v.migrations)if(migration.to!==v.version)c.addIssue({code:'custom',message:`Migration target must match release: ${migration.id}`});
  const active=new Set(), done=new Set();function visit(id){if(active.has(id)){c.addIssue({code:'custom',message:`Cyclic dependency: ${id}`});return;}if(done.has(id))return;active.add(id);for(const d of items.get(id)?.dependencies??[])if(items.has(d.id))visit(d.id);active.delete(id);done.add(id);}for(const id of items.keys())visit(id);
});
const releaseIndex = record({generatedAt:time,releases:z.array(release)}).superRefine((v,c)=>{unique(v.releases,x=>x.id,c,'release id');unique(v.releases,x=>x.version,c,'release version');});
export const schemas={project,baseline,releaseIndex,catalog,reminder,adoption,transaction};
/** @param {keyof typeof schemas} kind @param {unknown} value */
export function validate(kind,value){if(!Object.hasOwn(schemas,kind))throw new Error(`Unknown contract: ${kind}`);return schemas[kind].safeParse(value);}

/** Resolve an installed file path while refusing existing symlinks that escape the project.
 * @param {string} projectRoot
 * @param {string} relativePath
 */
export async function resolveInsideProject(projectRoot, relativePath) {
  const { realpath, lstat } = await import('node:fs/promises');
  const { resolve, relative, isAbsolute, sep } = await import('node:path');
  path.parse(relativePath);
  const root = await realpath(projectRoot);
  let current = root;
  for (const part of relativePath.split('/')) {
    const candidate = resolve(current, part);
    let exists;
    try { await lstat(candidate); exists = true; }
    catch (error) { if (error.code !== 'ENOENT') throw error; exists = false; }
    // A dangling symlink is not a missing destination: realpath must fail closed.
    current = exists ? await realpath(candidate) : candidate;
    const rel = relative(root, current);
    if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error('Path escapes project through symlink');
  }
  return current;
}

/** Verify explicitly configured catalog roots and their committed project identities.
 * @param {unknown} value
 */
export async function verifyCatalogProjects(value) {
  const parsed = catalog.parse(value);
  const {realpath, readFile} = await import('node:fs/promises');
  const {join} = await import('node:path');
  const roots = new Set();
  for (const entry of parsed.projects) {
    const root = await realpath(entry.root);
    if (roots.has(root)) throw new Error('Duplicate canonical project root');
    roots.add(root);
    const recordPath = await resolveInsideProject(root, 'design.json');
    const record = project.parse(JSON.parse(await readFile(recordPath, 'utf8')));
    if (record.projectId !== entry.projectId) throw new Error('Catalog project identity mismatch');
  }
  return parsed;
}

/** Check baselines belong to installed items and own distinct paths.
 * @param {unknown} projectRecord
 * @param {unknown[]} baselineRecords
 */
export function verifyProjectBaselines(projectRecord, baselineRecords) {
  const p = project.parse(projectRecord);
  const list = baselineRecords.map(value => baseline.parse(value));
  const baselines = new Map(); const paths = new Set();
  for (const b of list) {
    if (baselines.has(b.baselineId)) throw new Error('Duplicate baseline id');
    baselines.set(b.baselineId,b);
    for (const f of b.files) { if(paths.has(f.path)) throw new Error('Overlapping baseline file ownership'); paths.add(f.path); }
  }
  if (list.length !== p.installedItems.length) throw new Error('Missing or extra baseline');
  for (const item of p.installedItems) {
    const b=baselines.get(item.baselineId);
    if (!b || b.itemId!==item.id || b.version!==item.version) throw new Error('Baseline does not match installed item');
  }
  return true;
}
