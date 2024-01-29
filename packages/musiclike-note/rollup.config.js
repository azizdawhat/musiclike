import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import terser from '@rollup/plugin-terser';

import { dirname as dirName } from 'node:path';

import { fileURLToPath } from 'node:url';

import * as rollup from 'rollup';

/** @type {rollup.ExternalOption} */
const external = [
  new RegExp('@babel/runtime-corejs3'),
  // ,
];
/** @type {rollup.OutputOptions} */
const output = {
  dir: './dist',
  format: 'module',
};
/** @type {rollup.InputPluginOption} */
const plugins = [
  esLint({
    // ,
  }),
  babel({
    babelHelpers: 'runtime',
    root: dirName(fileURLToPath(import.meta.url)),
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
    input: [
      './src/Note.bind.js',
      // ,
    ],
  },
  {
    external,
    plugins,
    input: [
      './src/Note.js',
      // ,
    ],
    output: [
      output,
      {
        dir: './dist',
        entryFileNames: '[name].cjs',
        exports: 'named',
        format: 'commonjs',
      },
    ],
  },
];

export { options as default };
