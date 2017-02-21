'use strict';

let gulp = require('gulp'),
  util = require('gulp-util');

let taskName = 'css',
  taskConfig = {
    src: [],
    srcBase: './source/',
    dest: './build/',
    pluginsOptions: {
      autoprefixer: 'last 2 version' //Change to IE9+
    }
  },
  task(config, cb, changedFile) => {
    let plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

      gulp.src(config.src, {base: config.srcBase})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
          includePaths: config.include
        }))
        .pipe(gulp.dest(config.dest))
        .on('end', cb);
  };

gulp.task(taskName, (cb) => {
  return task(taskConfig,cb);
});

module.exports = {
  taskName: taskName,
  taskConfig: taskConfig,
  task: task
}
