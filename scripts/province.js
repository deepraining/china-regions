
'use strict';

var _ = require('lodash');

var list = require('../list.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

var province = {};

_.forEach(list, (value, key) => {
    if (key.slice(2) == '0000') province[key] = value;
});

makeJson('province', province);

logger.success(`一共 ${_.keys(province).length} 个省级行政单位`);