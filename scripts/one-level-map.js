
'use strict';

var _ = require('lodash');

var province = require('../province.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

var result = {};

_.forEach(province, (name, code) => {
    result[code] = {name: name};
});

logger.success(`一共 ${_.keys(result).length} 个省级行政单位`);
makeJson('one-level-map', result);