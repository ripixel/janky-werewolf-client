const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvFlow = require('dotenv-flow-webpack');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: './src',
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName:
									'[name]__[local]___[hash:base64:5]',
							},
							sourceMap: process.env.NODE_ENV === 'development',
						},
					},
					'sass-loader',
				],
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new DotenvFlow({
			default_node_env: 'development',
			system_vars: true,
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: './index.html',
		}),
		new TypedCssModulesPlugin({
			globPattern: 'src/**/*.scss',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
