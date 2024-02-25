import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import terser from '@rollup/plugin-terser';

import { Dirent as DirEnt } from 'node:fs';

import { readdir as readDir } from 'node:fs/promises';

import { format as formatPath } from 'node:path';

import * as rollup from 'rollup';

/** @param {Parameters<readDir>[0]} dir */
async function filterDir(dir, callbackFn = stubTrue) {
  const files = [];

  for (const dirEnt of await readDir(dir, { withFileTypes: true })) {
    if (callbackFn(dirEnt)) {
      files[files.length] = formatPath({ dir, base: dirEnt.name });
    }
  }

  return files;
}

/** @type {rollup.RollupOptions[]} */
const options = [
  {
    external: [
      new RegExp('@babel/runtime-corejs3'),
      // ,
    ],
    input: await filterDir('./src', function callbackFn({ name }) {
      return !name.startsWith('_');
    }),
    output: [
      {
        dir: './dist',
        entryFileNames: '[name].cjs',
        exports: 'auto',
        format: 'commonjs',
      },
      {
        dir: './dist',
        format: 'module',
      },
    ],
    plugins: [
      esLint({
        // ,
      }),
      babel({
        babelHelpers: 'runtime',
        root: import.meta.dirname,
        rootMode: 'upward',
      }),
      terser({
        keep_fnames: true,
      }),
    ],
  },
];

/** @param {DirEnt} dirEnt  */
function stubTrue(dirEnt) {
  return !!dirEnt;
}

export { options as default };
