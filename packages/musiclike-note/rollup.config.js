import { babel } from '@rollup/plugin-babel';

import esLint from '@rollup/plugin-eslint';

import terser from '@rollup/plugin-terser';

import { dirname as dirName } from 'node:path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    external: [
      new RegExp('@babel/runtime-corejs3'),
      // ,
    ],
    input: [
      './src/Note.js',
      // ,
    ],
    output: [
      {
        dir: './dist',
        entryFileNames: '[name].cjs',
        exports: 'named',
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
        root: dirName(__filename),
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
