import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import terser from '@rollup/plugin-terser';

import { readdir as readDir } from 'node:fs/promises';

import { dirname as dirName, format as formatPath } from 'node:path';

import { fileURLToPath } from 'node:url';

/**
 * @param {Parameters<readDir>[0]} dir
 * @param {function(import('node:fs').Dirent): boolean} callbackFn
 */
async function filterDir(dir, callbackFn) {
  const files = [];

  for (const [index, dirEnt] of (await readDir(dir, { withFileTypes: true })).entries()) {
    if (callbackFn(dirEnt)) {
      files[index] = formatPath({ dir, base: dirEnt.name });
    }
  }

  return files;
}

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    external: [
      new RegExp('@babel/runtime-corejs3'),
      // ,
    ],
    input: await filterDir('./src', function callbackFn() {
      return true;
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
        root: dirName(fileURLToPath(import.meta.url)),
        rootMode: 'upward',
      }),
      terser({
        keep_fnames: true,
      }),
    ],
  },
];

export { options as default };
