import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const src = JSON.parse(await readFile('packages/tokens/src/tokens.json', 'utf8'));
const hash = data => createHash('sha256').update(data).digest('hex');
test('generation is deterministic and includes all profile colors and radii', async () => {
  execFileSync('node', ['packages/tokens/src/generate.mjs']);
  const files = ['tokens.css', 'tailwind-v3.cjs', 'tailwind-v4.css'].map(n => resolve('packages/tokens/dist', n));
  const first = await Promise.all(files.map(p => readFile(p)));
  execFileSync('node', ['packages/tokens/src/generate.mjs']);
  const second = await Promise.all(files.map(p => readFile(p)));
  assert.deepEqual(first.map(hash), second.map(hash));
  for (const name of Object.keys(src.profiles.application.light)) assert.match(first[2].toString(), new RegExp(`--color-${name}:`));
  assert.ok(Object.entries(src.profiles['bold-typography'].base).filter(([name]) => name.startsWith('radius')).every(([, value]) => value === '0px'));
});
function luminance(hex) { const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]; }
function ratio(a,b) { const x=luminance(a), y=luminance(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
test('foreground pairs meet 4.5:1 against intended surfaces', () => {
  for (const [profile, values] of Object.entries(src.profiles)) for (const theme of ['light','dark']) {
    const c=values[theme];
    for (const [fg,bg] of [['foreground','background'],['card-foreground','card'],['muted-foreground','background'],['muted-foreground','muted'],['brand-foreground','brand'],['primary-foreground','primary'],['accent-foreground','accent']]) assert.ok(ratio(c[fg],c[bg]) >= 4.5, `${profile}/${theme} ${fg}/${bg}: ${ratio(c[fg],c[bg]).toFixed(2)}`);
  }
});


test('a changed source value reaches both adapters through the generated variables', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'chore-token-test-'));
  try {
    const sourceDir = join(dir, 'src'); await mkdir(sourceDir);
    await copyFile('packages/tokens/src/generate.mjs', join(sourceDir, 'generate.mjs'));
    await copyFile('packages/tokens/src/fonts.css', join(sourceDir, 'fonts.css'));
    const modified = structuredClone(src); modified.profiles.application.light.background = '#f8f8f8';
    await writeFile(join(sourceDir, 'tokens.json'), JSON.stringify(modified));
    execFileSync('node', [join(sourceDir, 'generate.mjs')]);
    const css = await readFile(join(dir, 'dist/tokens.css'), 'utf8');
    const v3 = await readFile(join(dir, 'dist/tailwind-v3.cjs'), 'utf8');
    const v4 = await readFile(join(dir, 'dist/tailwind-v4.css'), 'utf8');
    assert.match(css, /--background: #f8f8f8;/);
    assert.match(v3, /var\(--background\)/);
    assert.match(v4, /--color-background: var\(--background\)/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('focus and status colors remain distinguishable on their supported surfaces', () => {
  for (const [profile, values] of Object.entries(src.profiles)) for (const theme of ['light','dark']) {
    const c=values[theme];
    for (const bg of ['background','card','input']) assert.ok(ratio(c.ring,c[bg]) >= 3, `${profile}/${theme} ring/${bg}: ${ratio(c.ring,c[bg]).toFixed(2)}`);
    for (const role of ['destructive','positive','warning','info']) assert.ok(ratio(c[role],c.background) >= 4.5, `${profile}/${theme} ${role}: ${ratio(c[role],c.background).toFixed(2)}`);
  }
});
