var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: "./app/bundle.ts",
	output: {
		path: path.resolve(__dirname, "assets"),
		publicPath: "/host/", // relative path for github pages
		filename: "main.js", // no hash in main.js because index.html is a static page
	},
	module: {
	  preLoaders: [
			{
				test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader',
				query: { type: 'none' }
			}
    ],
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				query: { compiler: 'typescript' }
			}
		]
	},
	resolve: {
		root: [path.resolve('./app')],
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			riot: 'riot'
		})
	]
};
