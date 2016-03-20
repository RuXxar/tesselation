// Load plugins
var gulp = require('gulp'),
		gutil = require("gulp-util"),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    WebpackDevServer = require("webpack-dev-server"),
		webpack = require('webpack');

// Styles
gulp.task('styles', function () {
	return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Clean
gulp.task('clean', function () {
	return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], { read: false })
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function () {
	gulp.run('webpack-dev-server', 'watch');
});

var webpackConfig = require('./webpack.config.js');

function webpackCompile() {
	return webpack(webpackConfig);
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
	// Watch .scss files
	gulp.watch('src/styles/**/*.scss', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		gulp.run('styles');
	});

	// Watch .ts files
	gulp.watch(['app/**/*.ts'], function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		webpackCompile();
	});
});