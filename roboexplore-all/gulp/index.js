'use strict';
var gulp = require('gulp');
var useref = require('gulp-useref');
var options = require('./options.js');
var runSequence = require('run-sequence');

function scripts() {
	var assets = useref.assets();

  return gulp
    .src('./src/public/index.html')
	.pipe(assets)
	.pipe(assets.restore())
	.pipe(useref())
    .pipe(gulp.dest(options.appOutput));
}

function angularMap(){
	return gulp
	.src('./src/public/common/angular.min.js.map')
	.pipe(gulp.dest(options.appOutput));
}

function scriptTasks(cb) {
    runSequence(
        ['angularMap', 'scripts'],
        cb);
}

gulp.task('angularMap', angularMap);
gulp.task('scripts', scripts);

gulp.task('index', scriptTasks);