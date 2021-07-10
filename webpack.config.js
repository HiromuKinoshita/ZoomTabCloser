const path = require('path');

module.exports = {
  entry: {
    content: './assets/js/content.js',
    background: './assets/js/background.js',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
    ],
  },
  mode: 'production',
};
