import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const script = resolve('registry/scripts/validate-metadata.mjs');
test('registry metadata rejects missing, invalid and unsafe items', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'chore-registry-'));
  try {
    await mkdir(join(dir, 'registry/ui'), { recursive: true });
    await writeFile(join(dir, 'registry/ui/button.tsx'), 'export {}');
    const catalog = { items: [{ name: 'button', type: 'registry:ui', files: [{ path: 'registry/ui/button.tsx', type: 'registry:ui' }] }] };
    const metadata = { schemaVersion: 1, release: null, items: { button: '0.1.0' } };
    const run = async () => {
      await writeFile(join(dir, 'registry.json'), JSON.stringify(catalog));
      await writeFile(join(dir, 'registry/versions.json'), JSON.stringify(metadata));
      return spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' }).status;
    };
    assert.equal(await run(), 0);
    metadata.items.button = 'invalid'; assert.notEqual(await run(), 0);
    delete metadata.items.button; assert.notEqual(await run(), 0);
    metadata.items.button = '0.1.0'; catalog.items[0].registryDependencies = ['missing']; assert.notEqual(await run(), 0);
    catalog.items[0].registryDependencies = ['button']; assert.notEqual(await run(), 0);
    delete catalog.items[0].registryDependencies; catalog.items[0].files[0].path = '../secret';
    assert.notEqual(await run(), 0);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
