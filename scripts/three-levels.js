
'use strict';

var _ = require('lodash');

var argv = require('minimist')(process.argv.slice(2));

var province = require('../province.json');
var city = require('../city.json');
var district = require('../district.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

// 城市代码的前缀
var cityPrefixes = {
    // 1101: true
};

var result = [];
var citiesMap = {
    /**
     * 110000: {
     *     code: 110000,
     *     name: '',
     *     children: [
     *         {
     *             code: 110100,
     *             name: ''
     *         }
     *     ]
     * }
     */
};
var districtMap = {
    /**
     * 110100: {
     *     code: 110100,
     *     name: '',
     *     children: [
     *         {
     *             code: 110101,
     *             name: ''
     *         }
     *     ]
     * }
     */
};

_.forEach(province, (name, code) => {
    citiesMap[code] = {
        code: code,
        name: name,
        children: []
    };
});

// 所有城市数据装在进去
_.forEach(city, (name, code) => {
    // 记录一个城市前缀
    cityPrefixes[code.slice(0, 4)] = !0;
    citiesMap[code.slice(0, 2) + '0000'].children.push({
        code: code,
        name: name
    });
    districtMap[code] = {
        code: code,
        name: name,
        children: []
    };
});

// 如果区县没有市级行政单位，直接挂在省级行政下面
_.forEach(district, (name, code) => {
    // 有父市级行政单位
    if (cityPrefixes[code.slice(0, 4)])
        districtMap[code.slice(0, 4) + '00'].children.push({
            code: code,
            name: name
        });
    // 没有
    else {
        citiesMap[code.slice(0, 2) + '0000'].children.push({
            code: code,
            name: name
        });
        districtMap[code] = {
            code: code,
            name: name,
            children: [
                {
                    code: code,
                    name: name
                }
            ]
        };
    }
});

_.forEach(citiesMap, (item) => {
    result.push(item);

    logger.success(`${item.name} 一共 ${item.children.length} 个市级行政单位`);

    item.children.forEach((subItem) => {
        // 补足数据（有的区级没有父市级，有的市级没有子区级）
        if (subItem.code.slice(4, 6) == '00' || argv.full) {
            // 区级没有父市级
            subItem.children = districtMap[subItem.code].children;

            // 市级没有子区级
            if (!subItem.children.length) {
                if (argv.full)
                    subItem.children.push({
                        code: subItem.code,
                        name: subItem.name
                    });
                else delete subItem.children;
            }

            subItem.children && logger.success(`        ${subItem.name} 一共 ${subItem.children.length} 个区级行政单位`);
        }
    });
});

makeJson(argv.full ? 'three-levels-full' : 'three-levels', result);