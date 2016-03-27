// Load plugins
var gulp = require('gulp'),
		gutil = require("gulp-util"),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    WebpackDevServer = require("webpack-dev-server"),
		webpack = require('webpack');

// Clean
gulp.task('clean', function () {
	return gulp.src(['dist/scripts'], { read: false })
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function () {
	gulp.run('webpack-dev-server', 'watch');
});

var webpackConfig = require('./webpack.config.js');

function webpackCompile() {
	return webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// output options
		}));
	});
}

gulp.task("webpack-dev-server", function (callback) {
	// Start a webpack-dev-server

	var compiler = webpack(webpackConfig);

	new WebpackDevServer(compiler, {}).listen(8080, "localhost", function (err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		// Server listening
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

		// keep the server alive or continue?
		// callback();
	});
});

// Watch
gulp.task('watch', function () {
	// Watch .ts files
	gulp.watch(['app/**/*.ts'], function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		webpackCompile();
	});
});