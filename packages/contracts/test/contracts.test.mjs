import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validate} from '../src/index.mjs';
const examples=JSON.parse(await readFile('docs/stage-1/examples.json','utf8'));
const clone=x=>structuredClone(x);
test('accepts the documented synthetic project, baseline, and reminder',()=>{for(const k of ['project','baseline','reminder'])assert.equal(validate(k,examples[k]).success,true,k)});
test('rejects invalid schema version, unsafe paths, duplicate items and missing review pin',()=>{
  let p=clone(examples.project);p.schemaVersion=2;assert.equal(validate('project',p).success,false);
  p=clone(examples.project);p.review.uiPaths=['../outside'];assert.equal(validate('project',p).success,false);
  p=clone(examples.project);p.installedItems.push(clone(p.installedItems[0]));assert.equal(validate('project',p).success,false);
  p=clone(examples.project);p.review.mode='checks';assert.equal(validate('project',p).success,false);
  p=clone(examples.project);delete p.stack.nodeVersion;assert.equal(validate('project',p).success,false);
});
test('rejects altered baseline bytes and invalid deferrals',()=>{
  const b=clone(examples.baseline);b.files[0].source+='changed';assert.equal(validate('baseline',b).success,false);
  const r=clone(examples.reminder);r.deferral={kind:'until',until:null,sessionId:'s'};assert.equal(validate('reminder',r).success,false);
});
test('rejects unknown release references and dependency cycles',()=>{
  const item=(id,dep)=>({id,version:'1.0.0',baselineArtifact:'base.json',dependencies:dep?[{id:dep,version:'1.0.0'}]:[]});
  const release={id:'release-1',version:'1.0.0',channel:'stable',publishedAt:'2026-10-29T00:00:00Z',source:{repository:'https://example.invalid/repo',commit:'a'.repeat(40)},artifacts:[{path:'base.json',url:'https://example.invalid/base.json',digest:'a'.repeat(64)}],compatibility:{node:'>=22',frameworks:[],react:null,tailwind:null,primitiveFamilies:['radix']},profiles:[{id:'application',version:'1.0.0'}],tokenRelease:'1.0.0',items:[item('a','b'),item('b','a')],changes:[],migrations:[]};
  const index={schemaVersion:1,generatedAt:'2026-10-29T00:00:00Z',releases:[release]};assert.equal(validate('releaseIndex',index).success,false);
  release.items=[item('a','missing')];assert.equal(validate('releaseIndex',index).success,false);
  release.items=[item('a')];assert.equal(validate('releaseIndex',index).success,true);
  release.changes=[{kind:'fix',summary:'unknown reference',affectedItems:['missing'],affectedProfiles:[],migrationId:null}];assert.equal(validate('releaseIndex',index).success,false);
  release.changes=[];release.migrations=[{id:'migration',from:'^0.9.0',to:'2.0.0',instructions:'Review'}];assert.equal(validate('releaseIndex',index).success,false);
});

test('rejects paths escaping through a symlink', async () => {
  const {mkdtemp, mkdir, symlink, rm, realpath} = await import('node:fs/promises');
  const {join} = await import('node:path'); const {tmpdir} = await import('node:os');
  const {resolveInsideProject} = await import('../src/index.mjs');
  const dir = await mkdtemp(join(tmpdir(),'chore-path-test-')); const root=join(dir,'root');
  try { await mkdir(root); await symlink(dir,join(root,'escape')); await assert.rejects(resolveInsideProject(root,'escape/file'),/escapes/); await symlink(join(dir,'missing'),join(root,'dangling')); await assert.rejects(resolveInsideProject(root,'dangling/file'), {code:'ENOENT'}); assert.equal(await resolveInsideProject(root,'new/file'),join(await realpath(root),'new/file')); }
  finally { await rm(dir,{recursive:true,force:true}); }
});

test('validates catalog canonical roots and actual project identity', async () => {
  const {mkdtemp, mkdir, symlink, writeFile, rm} = await import('node:fs/promises');
  const {join} = await import('node:path'); const {tmpdir} = await import('node:os');
  const {verifyCatalogProjects} = await import('../src/index.mjs');
  const dir=await mkdtemp(join(tmpdir(),'chore-catalog-test-')); const root=join(dir,'root');
  try {
    await mkdir(root); await writeFile(join(root,'design.json'),JSON.stringify(examples.project));
    const catalog={schemaVersion:1,projects:[{projectId:'demo',root}]};
    await assert.doesNotReject(verifyCatalogProjects(catalog));
    await assert.rejects(verifyCatalogProjects({schemaVersion:1,projects:[{projectId:'wrong',root}]}),/identity mismatch/);
    await symlink(root,join(dir,'alias'));
    await assert.rejects(verifyCatalogProjects({schemaVersion:1,projects:[{projectId:'demo',root},{projectId:'other',root:join(dir,'alias')}]}),/Duplicate canonical/);
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('checks baseline ownership against project items', async () => {
  const {verifyProjectBaselines}=await import('../src/index.mjs');
  assert.equal(verifyProjectBaselines(examples.project,[examples.baseline]),true);
  assert.throws(()=>verifyProjectBaselines(examples.project,[]),/Missing/);
  const b=clone(examples.baseline);b.version='1.0.0';assert.throws(()=>verifyProjectBaselines(examples.project,[b]),/does not match/);
});
test('rejects contradictory adoption status and malformed routes',()=>{
  const p=clone(examples.project);p.review.routes=['https://example.com/private'];assert.equal(validate('project',p).success,false);
  const report={schemaVersion:1,generatedAt:'2026-10-29T00:00:00Z',projects:[{projectId:'demo',checkedAt:null,sourceRevision:null,status:'current',installedTokenRelease:'1.0.0',installedItems:[],targetRelease:null,pendingItems:['button'],evidence:[]}]};
  assert.equal(validate('adoption',report).success,false);
});


test('rejects malformed timestamps, digests, and absolute baseline paths',()=>{
  const r=clone(examples.reminder);r.lastCheck={at:'not-a-timestamp',sourceDigest:null,outcome:'success',latestCompatible:null};assert.equal(validate('reminder',r).success,false);
  let b=clone(examples.baseline);b.files[0].digest='invalid';assert.equal(validate('baseline',b).success,false);
  b=clone(examples.baseline);b.files[0].path='/outside';assert.equal(validate('baseline',b).success,false);
});
