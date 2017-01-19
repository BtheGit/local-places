var webpack = require("webpack");
var path = require('path');


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
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query:{
					presets:['es2015', 'react', 'stage-0']
				}
			},
			{ 
      			test: /\.css$/, 
      			loader: 'style-loader!css-loader' 
      		},
      		{
				test: /\.(jpg|png|svg)$/,
				exclude: /icons/,
				loader: 'file?name=media/[name].[ext]'
		    }

		]
	}
}
