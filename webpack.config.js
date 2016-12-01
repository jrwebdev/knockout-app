'use strict'; // eslint-disable-line

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  context: path.join(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app-bundle.js'
  },
  devtool: 'cheap-eval-module-source-map',
  resolve: {
    alias: {
      react$: path.resolve('./node_modules/react')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'react-hot!babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  postcss() {
    return [autoprefixer];
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8181,
    stats: {
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'knockout-app',
      template: 'index.template.html',
      hash: true
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

if (process.env.NODE_ENV === 'production') {

  config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css')
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css!sass')
  });

  config.output.path = path.join(__dirname, 'dist');
  config.devtool = false;
  config.devServer = null;
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify('production')}
  }));

} else {

  config.module.loaders.push({
    test: /\.css$/,
    loader: 'style!css?sourceMap!postcss'
  }, {
    test: /\.scss$/,
    loader: 'style!css?sourceMap!postcss!sass?sourceMap'
  });

}

module.exports = config;
