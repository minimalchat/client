let webpack = require('webpack');

let config = require('./package.json');
const development = process.env.NODE_ENV !== 'production';

const PATHS = {
  BUILD: __dirname + '/dist',
  SRC: __dirname + '/src',
  MODULES: __dirname + '/node_modules',
}

let plugins = [];

if (!development) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = function (env) {
  console.log('Environment:', process.env.NODE_ENV || 'development');
  return {
    context: __dirname,
    devtool: development ? 'source-map' : false,
    entry: PATHS.SRC + '/script.jsx',
    output: {
      filename: 'mnml-full-' + config.version + (!development ? '.min' : '') + '.js',
      path: PATHS.BUILD,
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: [
            PATHS.SRC
          ],
          exclude: [
            PATHS.MODULES
          ],
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy'],
          },
        },
      ]
    },
    plugins: plugins,
  };
}
