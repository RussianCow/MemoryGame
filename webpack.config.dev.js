const config = require('./webpack.config.base')

// Un-hash names of CSS classes for easier debugging.
config.module.rules
	.find(rule => rule.test.toString().includes('css'))
	.use
	.find(use => use.loader === 'css-loader')
	.options
	.modules
	.localIdentName = '[path][name]__[local]'

module.exports = {
	...config,
	devServer: {
		contentBase: config.output.path,
		host: '127.0.0.1',
		port: 9010,
		hot: true,
		overlay: true,
		publicPath: config.output.publicPath,
	},
}
