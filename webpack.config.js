var webpack = require("webpack");
var path = require('path');
var autoprefixer = require('autoprefixer');
var mixins = require('postcss-mixins');
var cssnext = require('postcss-cssnext');
var impy = require('postcss-import');

module.exports = {
   entry: {
      app: './src/index.js'
   },
   output: {
      filename: 'build/bundle.js',
      sourceMapFilename: 'build/bundle.map'
   },
   devtool: 'source-map',
   module: {
      loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
               presets: ['es2015', 'react', 'stage-0']
            }
         }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
         }, {
            test: /\.(jpg|png|svg)$/,
            exclude: /icons/,
            loader: 'file?name=media/[name].[ext]'
         }

      ]
   },
	 postcss: () => {
     return {defaults: [ impy, autoprefixer, mixins, cssnext ]}
   }
}
