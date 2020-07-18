const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    port: 3000,
    contentBase: './dist',
    compress: true,
    stats: 'errors-only',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = WebpackMerge.merge(baseConfig, devConfig);
