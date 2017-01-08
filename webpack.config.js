let webpack = require('webpack');
let config = require('./package.json');

let development = process.env.NODE_ENV !== "production";

let PATHS = {
  BUILD: __dirname + '/dist',
  SRC: __dirname + '/src'
}

// Some gymnastics to get a nicer script file name
let entries = {
  includes: ['socket.io-client', 'react', 'react-dom', 'redux', 'react-redux', 'react-jss'],
};

entries["mnml-" + config.version] = './src/script.jsx';

module.exports = {
  context: __dirname,
  devtool: development ? "source-map" : null,
  entry: entries,
  output: {
    filename: "[name]" + (!development ? '.min' : '') + ".js",
    path: PATHS.BUILD,
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : PATHS.SRC,
        loader : 'babel'
      }
    ]
  },
  plugins: development ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['includes', 'manifest'] // Specify the common bundle's name.
    }),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, minimize: !development }),
  ],
};
