let webpack = require('webpack');

let config = require('./package.json');
const development = process.env.NODE_ENV !== 'production';

const PATHS = {
  BUILD: __dirname + '/dist',
  SRC: __dirname + '/src',
  MODULES: __dirname + '/node_modules',
}

// Some gymnastics to get a nicer script file name
let entries = {
  'mnml-libraries': ['socket.io-client', 'react', 'react-dom', 'redux', 'react-redux', 'react-jss'],
};

entries['mnml-' + config.version] = PATHS.SRC + '/script.jsx';

let plugins = [];

plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: ['mnml-libraries', 'mnml-manifest'] // Specify the common bundle's name.
}));

if (!development) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = function (env) {
  console.log('Environment:', process.env.NODE_ENV || 'development');
  return {
    context: __dirname,
    devtool: development ? 'source-map' : false,
    entry: entries,
    output: {
      filename: '[name]' + (!development ? '.min' : '') + '.js',
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
      ],
    },
    plugins: plugins
  };
}
