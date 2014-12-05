'use strict';
var gulp = require('gulp');
var help = require('gulp-task-listing');

require('./gulp/styles.js');
require('./gulp/features.js');
require('./gulp/index.js');

require('./gulp/build.js');
require('./gulp/serve.js');

gulp.task('help', help);
gulp.task('default', ['help']);
