var webpack = require('webpack');
var merge = require('merge-array-object');
var webpack_config = require('./webpack.config');

module.exports = merge(webpack_config,{
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 压缩并打包文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ],
})