const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin');

module.exports = {
  entry: {
    content: './assets/js/content.js',
    background: './assets/js/background.js',
  },
  output: {
    filename: '[name].js',
    clean: true,
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
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: "./html/popup.html",
      skipAssets: ['background.js'],
    }),
    new HtmlWebpackPlugin({
      filename: 'otions.html',
      template: "./html/options.html",
      skipAssets: ['background.js'],
    }),
    new HtmlWebpackSkipAssetsPlugin({
      skipAssets: ['background.js'],
    }),
  ],
  mode: 'production',
};
