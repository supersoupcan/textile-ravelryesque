var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : path.resolve(__dirname, 'client', 'src', 'index.js'),
  output : {
    path : path.resolve(__dirname, 'client', 'static'),
      filename : 'bundle.js'
  },
  module : {
    rules: [
      {
        test: /.jsx?$/,
        loader : 'babel-loader',
        include: path.resolve(__dirname, 'client', 'src'),
        query : {
          presets : ['env', 'react']
        }
      },
      {
        test : /\.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options : {
              importLoaders : 1,
              modules: true
            }
          }
        ]
      },{
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, 'client', 'src'),
        options: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'client', 'src', 'index.html'),
    }),
  ],
};