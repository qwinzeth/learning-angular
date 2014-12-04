'use strict';
var gulp = require('gulp');
var options = require('../options.js');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var manifest = require('./concat-filenames.js');
var source = require('vinyl-source-stream');
var tap = require('gulp-tap');

function generateCommonJs() {

    var appPath = 'src/public/common/RPS.js';

    var src = [
        appPath,
        'src/public/common/**/*.js',
        '!src/public/common/**/compatibility.js'
    ];

    var browserifyConfig = {
        debug: !gutil.env.production,
        shim: {
            App: {
                path: appPath,
                exports: options.appName
            }
        }
    };

    var manifestOptions = {
        root: 'src/public/common',
        prepend: 'require("./',
        append: '");'
    };

    return gulp
        .src(src)
        .pipe(manifest('common.js', manifestOptions))
        .pipe(gulp.dest(options.appOutput + '/common/'));
}

gulp.task('script-common', generateCommonJs);
