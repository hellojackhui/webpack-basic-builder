const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms',
})

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
      return;
    }
    console.log(stats.toString({
      colors: true,
      modules: true,
      children: false
    }))
    mocha.addFile(path.join(__dirname, './html-test.js'))
  })
})