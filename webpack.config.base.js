const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
	entry: './src/',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		modules: [__dirname, 'node_modules'],
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			inject: 'head',
		}),
		new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
	],
	devtool: 'cheap-module-source-map',
	mode: 'development',
}
