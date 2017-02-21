'use strict';

/** Default SASS/CSS task */

var gulp = require('gulp'),
  util = require('gulp-util');

var taskName = 'css',
  taskConfig = {
    src: [],
    srcBase: './source/',
    dest: './build/',
    pluginsOptions: {
      autoprefixer: 'last 2 version' //Change to IE9+
    }
  },

  task = function (config, cb, changedFile) {
    var plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoprefixer = require('autoprefixer');

      gulp.src(config.src, {base: config.srcBase})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
          includePaths: config.include
        }))
        .pipe(gulp.dest(config.dest))
        .on('end', cb);
  };

gulp.task(taskName, function(cb) {
  return task(taskConfig,cb);
});

module.exports = {
  taskName: taskName,
  taskConfig: taskConfig,
  task: task
}
