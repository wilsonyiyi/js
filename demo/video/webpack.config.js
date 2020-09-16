const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
				exclude: [path.resolve(__dirname, 'src/components')],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
						},
					},
					'less-loader',
				],
				include: [path.resolve(__dirname, 'src/components')],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.json', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		contentBase: '/dist',
		open: true,
	},
};
