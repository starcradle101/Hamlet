const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

require('dotenv').config();

module.exports = {
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
	},
	mode: process.env.mode,
	module: {
		rules: [
			{
				test: /\.(?:js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', { runtime: 'automatic' }],
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			hash: true,
			favicon: 'public/favicon.svg',
		}),
		new webpack.DefinePlugin({
			mode: process.env.mode,
			port: process.env.port,
		}),
	],
	devServer: {
		host: 'localhost',
		port: process.env.port,
		open: true,
		historyApiFallback: true,
		hot: true,
	},
};
