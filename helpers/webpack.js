'use strict';

var _ = require('lodash'),
	path = require('path'),
	util = require('gulp-util');

module.exports = {
	getEntries: function(src, srcBase, transformKey) {
		return _.keyBy(src, function(file) {
			var key = path.relative(srcBase, file).replace(path.extname(file), '');

			if (transformKey) {
				key = transformKey(key);
			}

			return key;
		});
	}
};
