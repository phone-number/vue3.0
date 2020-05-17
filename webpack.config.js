const path = require('path')
const { VueLoaderPlugin } = require('vue-loader') // 解析vue文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css到单独的文件中
const HtmlWebpackPlugin = require('html-webpack-plugin') // 以某个模板自动生产html文件
const webpack = require('webpack')
// import webpack from 'webpack' // 为了有类型提示 配置完成之后记得删除
// /**
//  * @type {webpack.Configuration}
//  */
const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  optimization: {
    usedExports: true, // 只导出被使用的成员
    minimize: true // 是否进行压缩
  },
  devServer: {
    hot: true
  },
  resolve: {
    alias: {
      '_c': path.resolve(__dirname, 'src/component')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin() // 热更新
  ]
}

module.exports = config