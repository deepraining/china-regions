
'use strict';

var _ = require('lodash');

var list = require('../list.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

var city = {};

_.forEach(list, (value, key) => {
    if (key.slice(4) == '00' && key.slice(2) != '0000') city[key] = value;
});

makeJson('city', city);

logger.success(`一共 ${_.keys(city).length} 个市级行政单位`);