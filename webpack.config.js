var path = require("path");

module.exports = {
	context: __dirname,
	entry: "./app/bundle.ts",
	output: {
		path: path.join(__dirname, "assets"),
		publicPath: "assets/", // relative path for github pages
		filename: "main.js", // no hash in main.js because index.html is a static page
		chunkFilename: "[hash]/js/[id].js",
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
	}
};
