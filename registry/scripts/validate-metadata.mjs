import { readFile } from 'node:fs/promises';
import { valid } from 'semver';

const catalog = JSON.parse(await readFile('registry.json', 'utf8'));
const metadata = JSON.parse(await readFile('registry/versions.json', 'utf8'));
if (metadata.schemaVersion !== 1 || (metadata.release !== null && !valid(metadata.release))) {
  throw new Error('Invalid registry metadata schema or release version');
}
const names = catalog.items.map(item => item.name);
if (new Set(names).size !== names.length) throw new Error('Duplicate registry item');
if (!metadata.items || Object.keys(metadata.items).sort().join('\0') !== names.sort().join('\0')) {
  throw new Error('Registry metadata must name exactly the catalog items');
}
for (const name of names) {
  if (!valid(metadata.items[name])) throw new Error(`Invalid version for ${name}`);
  const item = catalog.items.find(entry => entry.name === name);
  if (!Array.isArray(item.files) || !item.files.length) throw new Error(`Missing files for ${name}`);
  for (const file of item.files) {
    if (!/^registry\/[a-z0-9/-]+\.(tsx|ts|css)$/.test(file.path) || file.path.includes('..')) throw new Error(`Unsafe path for ${name}`);
    await readFile(file.path);
  }
}
