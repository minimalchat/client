var webpack = require('webpack');
var development = process.env.NODE_ENV !== "production";

var PATHS = {
  BUILD: __dirname + '/dist',
  APP: __dirname + '/src'
}

module.exports = {
  context: __dirname,
  devtool: development ? "inline-sourcemap" : null,
  entry: PATHS.APP + "/script.jsx",
  output: {
    path: PATHS.BUILD,
    filename: "scripts.js"
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : PATHS.APP,
        loader : 'babel'
      }
    ]
  },
  plugins: development ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};