// Webpack configuration file for a library Development
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

var prod = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module :{
    rules :[
      {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options:{
              babelrc: false,
              presets: ['env', 'stage-2']    // env is required to generate ES5 code.
              // presets: ['react', 'env', 'stage-2']   // react is required only if the code contains jsx syntex,else not required.
            }
          }
        }
    ]
  }
});

console.log(prod);

module.exports = prod;
