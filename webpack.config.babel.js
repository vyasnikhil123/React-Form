import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV || 'development';
const useAlias = process.env.USE_ALIAS;

let plugins = [
  new CopyWebpackPlugin([{ from: './public' }]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
          //   'API_HOST': JSON.stringify((env === 'production') ? 'http://localhost/~nikhil.vyas/survey' : 'http://localhost/~nikhil.vyas/survey'),
               'API_HOST': JSON.stringify((env === 'production') ? 'http://localhost/nikhil/edu2018' : 'http://localhost/nikhil/edu2018'),    
         //     'API_HOST': JSON.stringify((env === 'production') ? 'http://apiedufest.patrika.com' : 'http://localhost/nikhil/edu2018'),
              'MAP_API_KEY': JSON.stringify((env === 'production') ? 'AIzaSyA9KM4OvNYcL_AG-fDT4G8m2MpVXYVNjZo' : 'AIzaSyA9KM4OvNYcL_AG-fDT4G8m2MpVXYVNjZo')
    }
  })
];

const loaderOptionsConfig = {
  options: {
    sassLoader: {
      includePaths: [
        './node_modules'
      ]
    }
  }
};

let alias;
const devConfig = {};
if (env === 'production') {
  loaderOptionsConfig.minimize = true;
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      // minimize: true,
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  );
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
  devConfig.devtool = 'cheap-module-source-map';
  devConfig.entry = [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/js/index.js'
  ];
  devConfig.devServer = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve('./dist'),
    publicPath: '/',
    quiet: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  };
  if (useAlias) {
    console.log('Using alias to local grommet.');
    alias = {
      'grommet-addons': path.resolve(__dirname, '../grommet-addons/src/js'),
      'grommet-icons': path.resolve(__dirname, '../grommet-icons/src/js'),
      'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
      'grommet': path.resolve(__dirname, '../grommet/src/js')
    };
  }
}

plugins.push(new webpack.LoaderOptionsPlugin(loaderOptionsConfig));

export default Object.assign({
  entry: './src/js/index.js',
  // {
    // 'app': './src/js/index.js',
    // 'app.min': './src/js/index.js'
  // },
  output: {
    path: path.resolve('./dist'),
    // filename: "[name].js",
    filename: "app.js",
    publicPath: '/'
  },
  resolve: {
    alias,
    extensions: ['.js', '.scss', '.css', '.json']
  },
  plugins,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].css' } },
          { loader: 'sass-loader', options: { outputStyle: 'compressed' } }
        ]
      }
    ]
  }
}, devConfig);

