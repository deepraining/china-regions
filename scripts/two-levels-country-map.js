
'use strict';

var _ = require('lodash');

var country = require('../country.json');
var makeJson = require('../util/make-json');
var logger = require('../util/logger');

var children = {};

_.forEach(country, (name, code) => {
    children[code] = {
        name: name
    };
});

var result = {
    '990000': {
        name: '海外',
        children: children
    }
};

makeJson('two-levels-country-map', result);