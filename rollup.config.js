const {babel} = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');
const {inline} = require('./rollup.inline');
const cleaner = require('rollup-plugin-cleaner');
const copy = require('rollup-plugin-copy');

export default {
  input: './src/index.js',
  output: {
    file: './dist/video-quiz.html',
    format: 'iife',
  },
  plugins: [
    cleaner({
      targets: ['./dist'],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    terser(),
    inline({
      templatePath: './assets/index.hbs',
      stylesPath: './assets/styles.css',
    }),
    copy({
      targets: [{src: './assets/horses.mp4', dest: './dist'}],
    }),
  ],
};
