
'use strict';

var _ = require('lodash');

var province = require('../province.json');
var city = require('../city.json');
var district = require('../district.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

// 城市代码的前缀
var cityPrefixes = {
    // 1101: true
};

var result = {
    // 110000: {}
};

_.forEach(province, (name, code) => {
    result[code] = {
        name: name,
        children: {}
    };
});

// 所有城市数据装在进去
_.forEach(city, (name, code) => {
    // 记录一个城市前缀
    cityPrefixes[code.slice(0, 4)] = !0;
    result[code.slice(0, 2) + '0000'].children[code] = {
        name: name
    };
});

// 如果区县没有市级行政单位，直接挂在省级行政下面
_.forEach(district, (name, code) => {
    if (!cityPrefixes[code.slice(0, 4)])
        result[code.slice(0, 2) + '0000'].children[code] = {
            name: name
        };
});

_.forEach(result, (item) => {
    logger.success(`${item.name} 一共 ${_.keys(item.children).length} 个市级行政单位`);
});
makeJson('two-levels-map', result);