import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(await readFile(resolve(here, 'tokens.json'), 'utf8'));
const out = resolve(here, '../dist');
await mkdir(out, { recursive: true });
const declaration = object => Object.entries(object).map(([name, value]) => `  --${name}: ${value};`).join('\n');
const rule = (selector, values) => `${selector} {\n${declaration(values)}\n}`;
const css = ['/* Generated from src/tokens.json. Do not edit. */', rule(':root', source.common)];
for (const [profile, values] of Object.entries(source.profiles)) {
  const select = `[data-design-profile="${profile}"]`;
  css.push(rule(select, values.base));
  for (const theme of ['light', 'dark']) css.push(rule(`${select}[data-design-theme="${theme}"]`, { 'color-scheme': theme, ...values[theme] }));
}
css.push('@media (prefers-reduced-motion: reduce) {\n  :root { --duration-fast: 0ms; --duration-normal: 0ms; }\n}');
await writeFile(resolve(out, 'tokens.css'), css.join('\n\n') + '\n');
const colorNames = [...Object.keys(source.profiles.application.light), 'secondary', 'secondary-foreground', 'popover', 'popover-foreground', 'destructive-foreground', 'border-hover', 'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'];
const colors = Object.fromEntries(colorNames.filter(n => n !== 'input').map(n => [n, `var(--${n})`]));
colors.input = 'var(--input)';
const radiusNames = Object.keys(source.profiles.application.base).filter(n => n.startsWith('radius-'));
const borderRadius = Object.fromEntries(radiusNames.map(n => [n.slice(7), `var(--${n})`]));
borderRadius.DEFAULT = 'var(--radius)';
const fontSize = Object.fromEntries(Object.keys(source.common).filter(n => /^text-(?:xs|sm|base|lg|xl|[2-9]xl)$/.test(n)).map(n => [n.slice(5), `var(--${n})`]));
const v3 = { theme: { extend: { colors, borderRadius, fontSize, fontFamily: { sans: ['var(--font-sans)'], mono: ['var(--font-mono)'], display: ['var(--font-display)'] }, maxWidth: { design: 'var(--container)' } } } };
await writeFile(resolve(out, 'tailwind-v3.cjs'), '/* Generated preset. */\nmodule.exports = ' + JSON.stringify(v3, null, 2) + ';\n');
const textNames = Object.keys(source.common).filter(n => /^text-(?:xs|sm|base|lg|xl|[2-9]xl)$/.test(n));
const theme = [...textNames.map(name => `  --${name}: var(--${name});`), ...colorNames.map(name => `  --color-${name}: var(--${name});`), ...radiusNames.map(name => `  --${name}: var(--${name});`), '  --font-sans: var(--font-sans);', '  --font-mono: var(--font-mono);', '  --container-design: var(--container);'];
await writeFile(resolve(out, 'tailwind-v4.css'), '/* Generated Tailwind 4 adapter. */\n@theme inline {\n' + theme.join('\n') + '\n}\n');

await copyFile(resolve(here, 'fonts.css'), resolve(out, 'fonts.css'));
