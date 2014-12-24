var jshint = require('gulp-jshint');
var gulp = require('gulp');

function lintScripts(cb){
'use strict';
  return gulp
    .src('./src/public/features/**/*.js')
    .pipe(jshint())
	.pipe(jshint.reporter('default'));
}

gulp.task('lint', lintScripts);
