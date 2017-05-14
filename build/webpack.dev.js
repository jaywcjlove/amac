var webpack = require('webpack');
var merge = require('merge-array-object');
var path = require('path')
var webpack_config = require('./webpack.config');

module.exports = merge(webpack_config,{
  devtool: 'source-map',
  output: {
    publicPath: '/dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})