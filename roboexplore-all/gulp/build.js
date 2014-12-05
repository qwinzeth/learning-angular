'use strict';
var gulp = require('gulp');
var del = require('del');
var options = require('./options.js');
var runSequence = require('run-sequence');

gulp.task('clean', cleanBuild);
gulp.task('build', buildTasks);

function cleanBuild(cb) {
    console.log('Cleaning build folder: ', options.appOutput);
    del([
		options.appOutput + '/**'
	], cb);
}

function buildTasks(cb) {
    runSequence( 'clean', 'styles',
	['index', 'features'],
	cb);
}

function buildServe(cb) {
    runSequence('build', 'serve', cb);
}

gulp.task('clean', cleanBuild);
gulp.task('build', buildTasks);
gulp.task('bs', buildServe);
