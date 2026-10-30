import { mkdir, rm, writeFile, copyFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { schemas } from '../../packages/contracts/src/index.mjs';
const root = process.cwd(), out = resolve('test-results/installed');
const catalog = JSON.parse(await readFile('registry.json', 'utf8'));
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
await rm(out, { recursive: true, force: true });
for (const version of [3, 4]) for (const layout of ['root', 'src']) {
  const dir = join(out, `tailwind-${version}-${layout}`), source = layout === 'src' ? 'src' : '.';
  await mkdir(join(dir, source), { recursive: true });
  await copyFile(`registry/fixture-locks/tailwind-${version}/package.json`, join(dir, 'package.json'));
  await copyFile(`registry/fixture-locks/tailwind-${version}/package-lock.json`, join(dir, 'package-lock.json'));
  await writeFile(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, noEmit: true, baseUrl: '.', paths: { '@/*': [`./${source}/*`] } }, include: [`${source}/**/*.tsx`] }));
  await writeFile(join(dir, 'components.json'), JSON.stringify({ '$schema': 'https://ui.shadcn.com/schema.json', style: 'new-york', rsc: false, tsx: true, tailwind: { config: version === 3 ? 'tailwind.config.cjs' : '', css: `${source}/input.css`, baseColor: 'neutral', cssVariables: true }, aliases: { components: '@/components', utils: '@/lib/utils', ui: '@/components/ui', lib: '@/lib', hooks: '@/hooks' } }));
  await writeFile(join(dir, 'index.html'), `<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/${source === '.' ? '' : source + '/'}app.tsx"></script></body></html>`);
  await copyFile('registry/examples/app.tsx', join(dir, source, 'app.tsx'));
  await copyFile('packages/tokens/dist/tokens.css', join(dir, 'tokens.css'));
  await copyFile('packages/tokens/dist/tailwind-v4.css', join(dir, 'tailwind-v4.css'));
  await copyFile('packages/tokens/dist/tailwind-v3.cjs', join(dir, 'tailwind-v3.cjs'));
  await writeFile(join(dir, source, 'input.css'), version === 3 ? '@import "../tokens.css";\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' : '@import "tailwindcss";\n@import "../tokens.css";\n@import "../tailwind-v4.css";\n');
  // CSS imports are relative to their file, including root-layout fixtures.
  if (source === '.') await writeFile(join(dir, 'input.css'), version === 3 ? '@import "./tokens.css";\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' : '@import "tailwindcss";\n@import "./tokens.css";\n@import "./tailwind-v4.css";\n');
  if (version === 3) await writeFile(join(dir, 'tailwind.config.cjs'), `module.exports = { presets: [require('./tailwind-v3.cjs')], content: ['./${source}/app.tsx', './${source}/components/**/*.tsx', './index.html'] };`);
  run('npm', ['ci', '--no-audit', '--no-fund'], dir);
  run('pnpm', ['exec', 'shadcn', 'add', ...catalog.items.map(item => join(root, 'registry/dist', `${item.name}.json`)), '-y', '-c', dir], root);
  const owned = new Set();
  const versions = JSON.parse(await readFile('registry/versions.json', 'utf8'));
  for (const item of catalog.items) {
    const file = `${source === '.' ? '' : source + '/'}components/ui/${item.name}.tsx`;
    if (owned.has(file)) throw new Error(`Overlapping item ownership: ${file}`);
    owned.add(file);
    const content = await readFile(join(dir, file), 'utf8');
    const baseline = { schemaVersion: 1, baselineId: `${item.name}-draft`, itemId: item.name, version: versions.items[item.name], releaseId: 'draft', files: [{ path: file, digest: createHash('sha256').update(content, 'utf8').digest('hex'), source: content }] };
    schemas.baseline.parse(baseline);
    await mkdir(join(dir, '.chore-design/baselines'), { recursive: true });
    await writeFile(join(dir, '.chore-design/baselines', `${baseline.baselineId}.json`), JSON.stringify(baseline, null, 2) + '\n');
  }
  run('npx', ['tsc', '--noEmit'], dir);
  run('npx', ['tailwindcss', '-i', join(source, 'input.css'), '-o', join(source, 'output.css')], dir);
  run('npx', ['vite', 'build'], dir);
}
