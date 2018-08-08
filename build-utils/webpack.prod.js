const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

config = {
	mode: 'production',
	plugins: [
		new OptimizeCSSAssetsPlugin({}),
		new UglifyJsPlugin({
		    cache: true,
		    parallel: true,
		    sourceMap: true
		}),
	    new ImageminPlugin({
	      test: /\.(jpe?g|png|gif|svg)$/i 
	    })
	],
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: path.resolve(__dirname, "../", "node_modules/"),
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: path.resolve(__dirname, "../", "node_modules/babel-preset-env/")
	        }
	      }
	    }
	  ]
	}
};

module.exports = config;