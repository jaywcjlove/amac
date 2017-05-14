const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')


const extractCSS = new ExtractTextPlugin('css/[contenthash].css')
const extractLESS = new ExtractTextPlugin('css/[contenthash].css')

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          // We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
          // because you might change the hot reloading server from the custom one
          // to Webpack's built-in webpack-dev-server/client?/, which would not
          // get properly excluded by /\.(js|jsx)$/ because of the query string.
          // Webpack 2 fixes this, but for now we include this hack.
          // https://github.com/facebookincubator/create-react-app/issues/1713
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.less$/,
          /\.json$/,
          /\.svg$/,
          /\.png$/,
          /\.(jpe?g)$/,
        ],
        use:[{
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2,
              sourceMap: true
            },
          },
          'less-loader',
        ]
      },

      // {
      //   test: /\.less$/,
      //   use: extractLESS.extract({
      //       use:[
      //         {
      //           loader:'css-loader',
      //           options: {
      //             // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader 
      //             importLoaders: 1 
      //           }
      //         },
      //         'less-loader'
      //       ] 
      //   }),
      // },
      {
        // "css-loader" 可以解析CSS中的路径，并添加资源作为依赖关系。
        // "style-loader" 将CSS转换为注入<style>标签的JS模块。
        // 在生产中，我们使用一个插件将该CSS提取到一个文件，但是
        // 在开发中“样式”装载器可以对CSS进行热编辑。
        test: /\.css$/,
        use: extractCSS.extract({
            use:[
              {
                loader:'css-loader',
                options: {
                  // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader 
                  importLoaders: 1 
                }
              }
            ] 
        })
      },{
        test: /\.json$/,
        use:['json-loader']
      }
    ]
  },
  plugins:[
    extractCSS,
    extractLESS,
    // 解决开发时提示React没有切换到产品版本
    // [React doesn't switch to production mode](http://stackoverflow.com/questions/37311972/react-doesnt-switch-to-production-mode)
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        '$dirname': '__dirname',    // 解决webpack编译时将 __dirname 转为本地局部变量
    })
  ],
  target: 'electron-renderer'
}
