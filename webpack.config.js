const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			//   {
			//     test: /\.(js|jsx)$/,
			//     exclude: /(node_modules|bower_components)/,
			//     loader: "babel-loader",
			//     options: { presets: ["@babel/env"] }
			//   },
			{
				test: /\.(sc|c)ss$/,
				use: [
                    'style-loader',
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		publicPath: 'http://localhost:3000/dist/',
		hotOnly: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        // new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
            inject: true,
			template: 'public/index.html'
		})
	]
};
