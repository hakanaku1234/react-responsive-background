const path = require('path');

module.exports = {
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-0', 'react', 'env'],
          plugins: ['transform-class-properties'],
        }
      }
    ]
  }
};
