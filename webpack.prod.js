const base = require('./webpack.config');

base.entry = './index.js';
base.output.library = 'ReactResponsiveBackground';
base.output.libraryTarget = 'umd';
base.mode = 'production';
base.externals = [
  'react', 'prop-types'
];
base.output.globalObject = 'this';

module.exports = base;
