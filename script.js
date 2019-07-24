/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
import path from 'path';
import fse from 'fs-extra';
import data from './res/data.json';
import country from './res/country.json';

const { outputFileSync } = fse;
const { join } = path;

const makeJsonFile = (name, json) => {
  outputFileSync(
    join(__dirname, './lib', `${name}.json`),
    JSON.stringify(json),
  );
};

// 省市区

const province = {};
const city = {};
const district = {};

Object.keys(data).forEach(code => {
  const name = data[code];

  if (code.slice(2) === '0000') province[code] = name;
  else if (code.slice(4) === '00') city[code] = name;
  else district[code] = name;
});

// 一级数据

const oneLevel = [];

Object.keys(province).forEach(code => {
  const name = data[code];

  oneLevel.push({ code, name });
});

makeJsonFile('one-level', oneLevel);

// 二级数据

const twoLevels = [];
const twoLevelsMap = {};

// 城市代码的前缀
const cityPrefixes = {
  // 1101: true
};

// 所有省份数据装在进去
Object.keys(province).forEach(code => {
  const name = data[code];

  twoLevelsMap[code] = { code, name, children: [] };
});

// 所有城市数据装在进去
Object.keys(city).forEach(code => {
  const name = data[code];

  // 记录一个城市前缀
  cityPrefixes[code.slice(0, 4)] = !0;
  twoLevelsMap[`${code.slice(0, 2)}0000`].children.push({ code, name });
});

// 如果区县没有市级行政单位，直接挂在省级行政下面
Object.keys(district).forEach(code => {
  const name = data[code];

  if (!cityPrefixes[code.slice(0, 4)])
    twoLevelsMap[`${code.slice(0, 2)}0000`].children.push({ code, name });
});

Object.keys(twoLevelsMap).forEach(code => {
  twoLevels.push(twoLevelsMap[code]);
});

makeJsonFile('two-levels', twoLevels);

// 三级数据

const threeLevels = [];
const threeLevelsFull = [];

const provinceCityMap = {
  /**
   * 110000: {
   *   code: 110000,
   *   name: '',
   *   children: [
   *     {
   *       code: 110100,
   *       name: ''
   *     }
   *   ]
   * }
   */
};

const cityDistrictMap = {
  /**
   * 110100: {
   *   code: 110100,
   *   name: '',
   *   children: [
   *     {
   *       code: 110101,
   *       name: ''
   *     }
   *   ]
   * }
   */
};

Object.keys(province).forEach(code => {
  const name = data[code];

  provinceCityMap[code] = { code, name, children: [] };
});

// 所有城市数据装在进去
Object.keys(city).forEach(code => {
  const name = data[code];

  provinceCityMap[`${code.slice(0, 2)}0000`].children.push({ code, name });
  cityDistrictMap[code] = { code, name, children: [] };
});

// 如果区县没有市级行政单位，直接挂在省级行政下面
Object.keys(district).forEach(code => {
  const name = data[code];

  // 有父市级行政单位
  if (cityPrefixes[code.slice(0, 4)])
    cityDistrictMap[`${code.slice(0, 4)}00`].children.push({ code, name });
  // 没有
  else {
    provinceCityMap[`${code.slice(0, 2)}0000`].children.push({ code, name });
    cityDistrictMap[code] = { code, name, children: [{ code, name }] };
  }
});

Object.keys(provinceCityMap).forEach(key => {
  const provinceItem = provinceCityMap[key];

  provinceItem.children.forEach(cityItem => {
    if (cityItem.code.slice(4, 6) === '00') {
      const { children } = cityDistrictMap[cityItem.code];

      // 市级有子区级
      if (children.length) {
        cityItem.children = children;
      }
    }
  });

  threeLevels.push(provinceItem);
});

makeJsonFile('three-levels', threeLevels);

Object.keys(provinceCityMap).forEach(key => {
  const provinceItem = provinceCityMap[key];

  provinceItem.children.forEach(cityItem => {
    const { children } = cityDistrictMap[cityItem.code];

    // 市级没有子区级
    if (!children.length) {
      children.push({ code: cityItem.code, name: cityItem.name });
    }

    cityItem.children = children;
  });
  threeLevelsFull.push(provinceItem);
});

makeJsonFile('three-levels-full', threeLevelsFull);

// 国家级

const countryLevels = [];

Object.keys(country).forEach(code => {
  const name = country[code];

  countryLevels.push({ code, name });
});

makeJsonFile('country-levels', {
  code: '990000',
  name: '海外',
  children: countryLevels,
});
