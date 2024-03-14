import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import { nodeResolve } from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';

import * as rollup from 'rollup';

/** @type {rollup.RollupOptions[]} */
const options = [
  {
    external: [
      new RegExp('@babel/runtime-corejs3'),
      new RegExp('@musiclike/programming'),
      new RegExp('gebrauchsmusik'),
    ],
    input: [
      './src/Note.js',
      // ,
    ],
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
    ],
  },
];

export { options as default };
