import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, rm, symlink, writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {join, resolve} from 'node:path';
import {tmpdir} from 'node:os';

test('packed tokens compile with Tailwind 3 and 4 in standalone consumers', async () => {
  const root=resolve('.'); const temp=await mkdtemp(join(tmpdir(),'chore-packed-fixture-'));
  try {
    execFileSync('pnpm',['--dir','packages/tokens','pack','--pack-destination',temp],{cwd:root,stdio:'pipe'});
    const tar=join(temp,'chore-design-tokens-0.0.0.tgz');
    for (const major of [3,4]) {
      const cwd=join(temp,`v${major}`);await mkdir(cwd);
      await writeFile(join(cwd,'package.json'),JSON.stringify({name:'standalone-fixture',version:'1.0.0',private:true}));
      execFileSync('npm',['install','--offline','--ignore-scripts','--no-audit','--no-fund','--cache',join(temp,'npm-cache'),tar],{cwd,stdio:'pipe'});
      await symlink(join(root,`fixtures/tailwind-${major}/node_modules/tailwindcss`),join(cwd,'node_modules/tailwindcss'),'dir');
      await writeFile(join(cwd,'index.html'),'<div class="bg-background text-foreground max-w-design">Example</div>');
      if(major===3){
        await writeFile(join(cwd,'tailwind.config.cjs'),"module.exports={presets:[require('@chore-design/tokens/tailwind-v3')],content:['./index.html']};\n");
        await writeFile(join(cwd,'input.css'),"@import '@chore-design/tokens/tokens.css';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
      }else await writeFile(join(cwd,'input.css'),"@import 'tailwindcss';\n@import '@chore-design/tokens/tokens.css';\n@import '@chore-design/tokens/tailwind-v4.css';\n@source './index.html';\n");
      execFileSync(join(root,`fixtures/tailwind-${major}/node_modules/.bin/tailwindcss`),['-i','input.css','-o','output.css'],{cwd,stdio:'pipe'});
      const css=await readFile(join(cwd,'output.css'),'utf8');
      for(const regex of [/\.bg-background\b/,/\.max-w-design\b/,/--background:/])assert.match(css,regex,`Tailwind ${major}`);
      await readFile(join(cwd,'node_modules/@chore-design/tokens/fonts/inter-tight-LICENSE.txt'));
    }
  } finally {await rm(temp,{recursive:true,force:true});}
});
