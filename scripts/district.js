
'use strict';

var _ = require('lodash');

var list = require('../list.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

var district = {};

_.forEach(list, (value, key) => {
    if (key.slice(4) != '00') district[key] = value;
});

makeJson('district', district);

logger.success(`一共 ${_.keys(district).length} 个区级行政单位`);