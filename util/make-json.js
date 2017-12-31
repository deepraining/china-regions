
'use strict';

var path = require('path');
var fsExtra = require('fs-extra');

/**
 * make a json file
 *
 * @param name File name
 * @param data Json data
 * @param dir Target directory, relative to root
 */
module.exports = (name, data, dir) => {
    fsExtra.outputFileSync(path.join(__dirname, '../', dir || './', name + '.json'), JSON.stringify(data));
};
