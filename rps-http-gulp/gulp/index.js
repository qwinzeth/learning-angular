'use strict';
var gulp = require('gulp');
var options = require('./options.js');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');

function generateIndex() {
    var htmlMinOpts = {
        collapseWhitespace: true
    };

    return gulp
        .src('src/public/index.html')
        .pipe(gutil.env.production ? htmlmin(htmlMinOpts) : gutil.noop())
        .pipe(gulp.dest(options.appOutput));

}

gulp.task('index', generateIndex);