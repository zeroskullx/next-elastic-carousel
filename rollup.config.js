import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-auto-external";
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import alias from 'rollup-plugin-alias';

import pkg from './package.json' assert { type: 'json' };

import libName from './libName.js';

export default {
  input: `src/${libName}/index.js`,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    alias({
      [libName]: `./src/${libName}/index.js`
    }),
    external(),
    postcss({
      modules: false
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType']
      }
    }),
    copy({
      targets: [{ src: `src/${libName}/index.d.ts`, dest: "dist" }],
    })
  ],
  external: ['prop-types'] // Mark prop-types as an external dependency
}
