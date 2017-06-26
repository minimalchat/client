const webpack = require('webpack');
const path = require('path');

const ReplacePlugin = require('replace-bundle-webpack-plugin');

const config = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const development = ENV !== 'production';

const PATHS = {
  BUILD: path.join(__dirname, '/dist'),
  SRC: path.join(__dirname, '/src'),
  MODULES: path.join(__dirname, '/node_modules'),
};

let plugins = [
  // TODO: What does this do?
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin(['NODE_ENV', 'PORT', 'REMOTE_HOST','REMOTE_PORT'])
];

if (!development) {
  // Minify source on production only
  plugins.push(new webpack.optimize.UglifyJsPlugin());

  // Strip out babel-helper invariant checks 
  plugins.push(new ReplacePlugin([
    {
      // This is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
      partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
      replacement: () => 'return;(',
    },
  ]));
}

module.exports = { 
  context: PATHS.SRC,
  entry: PATHS.SRC + '/index.js',
  output: {
    filename: `mnml${!development ? `-${config.version}` : ''}${!development ? '.min' : ''}.js`,
    path: PATHS.BUILD,
    publicPath: '/',
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        include: [ PATHS.SRC ],
        exclude: [ PATHS.MODULES ],
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'stage-0' ],
          plugins: [
            'transform-decorators-legacy',
            [ 'transform-react-jsx', { 'pragma': 'h' } ],
          ],
        },  
      },
      {
        test: /\.css$/,
        include: [ PATHS.SRC ],
        exclude: [ PATHS.MODULES ],
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      // path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {
      'components': path.resolve(__dirname, 'src/components'), // used for tests
      'react-dom/server': 'preact-render-to-string',
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    },
  },

  // TODO: What is cheap-module-eval-source-map?
  devtool: development ? 'source-map' : false,
  devServer: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    publicPath: '/',
    contentBase: './example',
    // TODO: What his history API fallback?
    historyApiFallback: true,
  }
};
