const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlplugins = [];
  const entryFiles = glob.sync(path.join(__dirname));
  Object.keys(entryFiles).map((index) => {
    const entryfile = entryFiles[index];
    const match = entryFiles.match(/src\/.(.*)/);
    const pageName = match && match[1];
    entry[pageName] = entryfile;
    return htmlplugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        minifyCSS: true,
        minifyJS: true,
        html5: true,
        removeComments: false,
        preserveLineBreaks: false,
      },
    }));
  });
  return {
    entry,
    htmlplugins,
  };
};

const projectRoot = process.cwd();

const { entry, htmlplugins } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-lodaer',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf)$/,
        use: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8]css',
      ignoreOrder: false,
    }),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlplugins),
  stats: 'errors-only',
};
