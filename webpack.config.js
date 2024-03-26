/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'public', 'dist', 'build'),
    filename: 'main.js',
    clean: true,
    assetModuleFilename: '[name][text]'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

 devServer: {
  static: [
    { directory: './dist', watch: true },
    { directory: 'public', watch: true }
  ]
},
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
