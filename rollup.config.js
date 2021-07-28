const {babel} = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');
const {inline} = require('./rollup.inline');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const cleaner = require('rollup-plugin-cleaner');
const copy = require('rollup-plugin-copy');

const {encodeBase64} = require('./src/base64');

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.html',
    format: 'iife',
  },
  plugins: [
    cleaner({
      targets: ['./dist'],
    }),
    replace({
      preventAssignment: true,
      values: {
        __QUESTIONS_DATA__: JSON.stringify(
          encodeBase64(require('./src/example.json'))
        ),
      },
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    terser(),
    inline({
      template: './assets/index.hbs',
      styles: ['./assets/styles.css', './assets/custom.css'],
      props: {
        title: 'Video Quiz',
        videoSrc: './horses.mp4',
      },
    }),
    copy({
      targets: [{src: './assets/horses.mp4', dest: './dist'}],
    }),
  ],
};
