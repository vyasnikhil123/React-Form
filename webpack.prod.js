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
             // presets: ['stage-2'],
              presets: ['react', 'stage-2']   // react is required only if the code contains jsx syntex,else not required.
            }
          }
        }
    ]
  },
  plugins: [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]
});

module.exports = prod;
