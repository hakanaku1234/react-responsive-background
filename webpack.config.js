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
          presets: ['react', 'env'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        }
      }
    ]
  }
};
