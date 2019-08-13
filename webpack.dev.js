// Webpack configuration file for a library Development
const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

var dev = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module :{
    rules :[
      {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options:{
              babelrc: false,
             // presets: ['stage-2']
              presets: ['react', 'stage-2']  // react is required only if the code contains jsx syntex,else not required.
            }
          }
        }
    ]
  },
});

module.exports = dev;
