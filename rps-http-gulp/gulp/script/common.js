'use strict';
var gulp = require('gulp');
var options = require('../options.js');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

function generateCommonJs() {
    var appPath = './src/public/common/' + options.appName + '.js';

	return browserify(appPath)
		.bundle()
		.pipe(source('common.js'))
		.pipe(gulp.dest(options.appOutput + '/common/'));
}

gulp.task('script-common', generateCommonJs);
