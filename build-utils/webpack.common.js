const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: path.resolve(__dirname, "../", "resources/theme.js"),
  output: {
    filename: "theme.js",
    path: path.resolve(__dirname, "../", "assets/"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "../", "assets/"),
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
    clientLogLevel: 'warning'
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CleanWebpackPlugin(
    	['assets'],
    	{
  			root:     path.resolve(__dirname, "../"),
  			verbose:  true
  		}
  	),
    new CopyWebpackPlugin(
    	[
    		{
    			from: 'resources/vendor/modernizr-3.6.0-custom.min.js',
    			to: 'js/'
    		}
    	],
    	{ debug: 'debug' }
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'resources/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'resources/404.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'page-example.html',
      template: 'resources/page-example.html'
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css"
    }),
    new FaviconsWebpackPlugin({
    	logo: './resources/img/favicon.png',
    	prefix: 'images/',
    	icons: {
	      android: false,
	      appleIcon: false,
	      appleStartup: false,
	      coast: false,
	      favicons: true,
	      firefox: false,
	      opengraph: false,
	      twitter: false,
	      yandex: false,
	      windows: false
	    }
    })
  ],
  module: {
  	rules: [
      {
        test: /\.html$/,
        use: ['html-loader?interpolate']
      },
      {
        test: /\.(png|jpg|svg|gif|mp4)$/,
        exclude: path.resolve(__dirname, "../", "resources/fonts/"),
        use: [
          {
            loader: 'file-loader',
            options: {
            	name: '[name].[ext]',
            	outputPath: './images/'
            }
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: path.resolve(__dirname, "../", "resources/img/"),
        use: [
	        {
	          loader: "file-loader",
	          options: {
	            name: "[name].[ext]",
	            outputPath: "./fonts/"
	          }
	        }
        ]
  	  },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            } 
          },
          { loader: "css-loader" },
          {
          	loader: "postcss-loader",
          	options: {
          		ident: "postcss",
          		plugins: (loader) => [
          			require('postcss-easing-gradients'),
          			require('autoprefixer')({
			            browsers: [
				            '> 1%',
				            'last 2 versions',
				            'IE 10',
				            'IE 11'
			            ],
			            cascade: false
          			})
          		]
          	}
          },
          { loader: "sass-loader" }
        ]
      }
  	]
  }
};

module.exports = config;