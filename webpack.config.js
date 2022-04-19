const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({ //Plugins extend the abilities of webpack
      template: 'index.html',
      title: 'Development'
  })],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        //   plugins: ['@babel/core'],
          },
      },
      {
        test: /scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], //THIS ORDER MATTERS: it reads from right to left
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    compress: true,
    port: 8080,
    proxy: { //changes domain request comes from
        '/api': 'http://localhost:3000',
        '/manager': 'http://localhost:3000'
    }
  }
}