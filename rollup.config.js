import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-auto-external";
import postcss from 'rollup-plugin-postcss';

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
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs(),
    //terser(), // minifies generated bundles
    copy({
      targets: [{ src: `src/${libName}/index.d.ts`, dest: "dist" }],
    })
  ]

}
