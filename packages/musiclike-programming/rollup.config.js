import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import { nodeResolve } from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';

import { Dirent } from 'node:fs';

import { readdir as readDir } from 'node:fs/promises';

import { format as formatPath } from 'node:path';

import * as rollup from 'rollup';

/** @type {rollup.ExternalOption[]} */
const external = [
  new RegExp('@babel/runtime-corejs3'),
  // ,
];

/** @param {Dirent} value */
function identity(value) {
  return value;
}

/** @param {Parameters<readDir>[0]} dir */
async function inputFn(dir, callbackFn = identity) {
  const values = [];

  for (const value of await readDir(dir, { withFileTypes: true })) {
    try {
      const { name: base } = callbackFn(value);

      if (typeof base === 'string') {
        values[values.length] = formatPath({ base, dir });
      }
    } catch {}
  }

  return values;
}

/** @type {rollup.OutputOptions[]} */
const output = [
  {
    dir: './dist',
    format: 'module',
  },
];

/** @type {rollup.InputPluginOption[]} */
const plugins = [
  esLint({
    // ,
  }),
  nodeResolve({
    // ,
  }),
  babel({
    babelHelpers: 'runtime',
    root: import.meta.dirname,
    rootMode: 'upward',
  }),
  terser({
    keep_classnames: true,
    keep_fnames: true,
  }),
];

/** @type {rollup.RollupOptions[]} */
const options = [
  {
    external,
    output,
    plugins,
    input: await inputFn('./src', function callbackFn({ name }) {
      if (name.endsWith('index.js')) {
        return null;
      }

      return { name };
    }),
  },
  {
    external,
    plugins,
    input: [
      './src/index.js',
      // ,
    ],
    output: output.concat({
      dir: './dist',
      entryFileNames: '[name].cjs',
      exports: 'named',
      format: 'commonjs',
    }),
  },
];

export { options as default };
