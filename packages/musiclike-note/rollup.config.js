import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import { nodeResolve } from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';

import * as rollup from 'rollup';

/** @type {rollup.ExternalOption[]} */
const external = [
  new RegExp('@babel/runtime-corejs3'),
  new RegExp('gebrauchsmusik'),
  // ,
];

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
    output: output.concat({
      dir: './dist',
      entryFileNames: '[name].cjs',
      exports: 'auto',
      format: 'commonjs',
    }),
  },
];

export { options as default };
