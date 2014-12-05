'use strict';
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var options = require('./options.js');

function styles(cb) {
  return gulp
    .src('./src/stylus/roboexplore.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./src/public/css/'));
}

gulp.task('styles', styles);