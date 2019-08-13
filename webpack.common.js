// Webpack configuration file for a library Development
const webpack = require('webpack');         //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');

const PACKAGE = require('./package.json');
var env = process.env.WEBPACK_ENV;
const moduleName = PACKAGE.appName;
const fileName = PACKAGE.name;
const banner = PACKAGE.name + ' - ' + PACKAGE.version;
// var watchOption = false;
const htmlTemplateName = path.resolve(__dirname, 'public/index.html');

 if (env === 'build') {
    outputFile = fileName + '.min.js';
    outputHtmlFileName = 'test-build.html';
}
 else if(env === 'dev'){
    outputFile = fileName + '.js';
    outputHtmlFileName = 'test-dev.html';
}

var common = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile
    },
    resolve: {
        extensions: ['.js', '.jsx'] // Looks for index.js first, then falls back to index.jsx
   },

    plugins:[
      new HtmlWebpackPlugin({
        title: moduleName,
        filename: outputHtmlFileName,
        template: htmlTemplateName
      })
    ],
    target: 'web'
};

module.exports = common;
