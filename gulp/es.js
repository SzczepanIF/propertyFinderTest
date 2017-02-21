'use-strict';

/** Default JS/ES task */

var gulp = require('gulp'),
  path = require('path'),
  util = require('gulp-util');

var taskName = 'js',
  taskConfig = {
    src: [],
    srcBase: './source/', // Change to proper JS path
    dest: './build', //Change to proper output JS path,
    destBase: './build',
    webpackWatch: true
  },
  task = function(config, cb) {
    var webpackHelper = require('../helpers/webpack.js'),
    webpack = require('webpack'),
      esCompiler;

    esCompiler = webpack({
      entry: webpackHelper.getEntries(config.src, config.srcBase),
      resolve: {
        alias: {
          handlebars: 'handlebars/runtime.js'
        }
      },
      module: {
        loaders: [
          {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
          },
          {
            test: /handlebars\.js$/,
            loader: 'expose?Handlebars'
          },
          {
            test: /(\.js|\.jsx)$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: [
                // Work around some issues in IE
                'transform-class-properties',
                'transform-proto-to-assign',
                ['transform-es2015-classes', {
                  loose: true
                }]
              ]
            }
          }
        ]
      },

      // Minifiy in prod mode
      plugins: [

      ].concat([
        new webpack.DefinePlugin({}),
        new webpack.optimize.UglifyJsPlugin({
          mangle: {
            'keep_fnames': true
          }
        })
      ]),
      output: {
        path: config.dest,
        filename: '[name].js',

        // Save async loaded files (using require.ensurce) in special dir
        chunkFilename: false,

        // Tell webpack about the asset path structure in the browser to be able to load async files
        publicPath: path.join('/', path.relative(config.destBase, config.dest), '/')
      },

    });

    esCompiler.run(function(err, stats) {
      cb();
    });
  }

gulp.task(taskName, function(cb) {
	return task(taskConfig, cb);
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig,
	task: task
};
