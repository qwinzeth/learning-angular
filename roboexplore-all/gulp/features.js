'use strict';
var gulp = require('gulp');
var options = require('./options.js');

function features(){
  return gulp
    .src('./src/public/features/**/*.html')
    .pipe(gulp.dest(options.appOutput + '/features/'));
}

gulp.task('features', features);