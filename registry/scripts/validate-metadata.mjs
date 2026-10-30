import { readFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { valid } from 'semver';

const catalog = JSON.parse(await readFile('registry.json', 'utf8'));
const metadata = JSON.parse(await readFile('registry/versions.json', 'utf8'));
if (metadata.schemaVersion !== 1 || (metadata.release !== null && !valid(metadata.release))) throw new Error('Invalid registry metadata schema or release version');
if (!Array.isArray(catalog.items)) throw new Error('Missing catalog items');
const names = catalog.items.map(item => item.name);
if (names.some(name => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) || new Set(names).size !== names.length) throw new Error('Invalid or duplicate registry item');
if (!metadata.items || Object.keys(metadata.items).sort().join('\0') !== [...names].sort().join('\0')) throw new Error('Registry metadata must name exactly the catalog items');
const owned = new Set();
const root = await realpath('registry');
for (const item of catalog.items) {
  const name = item.name;
  if (!valid(metadata.items[name])) throw new Error(`Invalid version for ${name}`);
  if (!Array.isArray(item.files) || !item.files.length) throw new Error(`Missing files for ${name}`);
  for (const key of ['dependencies', 'registryDependencies']) {
    if (item[key] !== undefined && (!Array.isArray(item[key]) || item[key].some(dep => typeof dep !== 'string' || !dep.trim()) || new Set(item[key]).size !== item[key].length)) throw new Error(`Invalid ${key} for ${name}`);
  }
  for (const dependency of item.registryDependencies ?? []) if (!names.includes(dependency)) throw new Error(`Unknown registry dependency ${dependency}`);
  for (const file of item.files) {
    if (!/^registry\/[a-z0-9/-]+\.(tsx|ts|css)$/.test(file.path) || file.path.includes('..') || file.type !== item.type) throw new Error(`Unsafe path or file type for ${name}`);
    const actual = await realpath(file.path);
    const rel = relative(root, actual);
    if (rel.startsWith('..') || isAbsolute(rel)) throw new Error(`Source escapes registry for ${name}`);
    if (owned.has(actual)) throw new Error(`Source owned by multiple items: ${file.path}`);
    owned.add(actual);
    await readFile(actual);
  }
}
const visiting = new Set(), visited = new Set();
function visit(name) {
  if (visiting.has(name)) throw new Error(`Cyclic registry dependency: ${name}`);
  if (visited.has(name)) return;
  visiting.add(name);
  for (const dependency of catalog.items.find(item => item.name === name).registryDependencies ?? []) visit(dependency);
  visiting.delete(name); visited.add(name);
}
for (const name of names) visit(name);
