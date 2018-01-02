# 中国行政区划【省、市、区县】数据（汇总、省份、地级市、区县、一级、二级、三级）

## json

### [列表数据](./list.json)

所有省、市、区县编码与名称的映射列表

数据来自 [data_location](https://github.com/mumuy/data_location)

```
{
  "110000": "北京市",
  "110101": "东城区",
  "110102": "西城区",
  "110105": "朝阳区",
  ...
  "130000": "河北省",
  "130100": "石家庄市",
  "130102": "长安区",
  "130104": "桥西区",
  "130105": "新华区",
  ...
}
```

### [省份数据](./province.json)

所有省份编码与名称的映射列表

```
{
  "110000": "北京市",
  "120000": "天津市",
  "130000": "河北省",
  "140000": "山西省",
  ...
}
```

### [地级市数据](./city.json)

所有地级市编码与名称的映射列表（不包含直辖市、特别行政区等国家一级行政区划）

```
{
  "130100": "石家庄市",
  "130200": "唐山市",
  "130300": "秦皇岛市",
  "130400": "邯郸市",
  ...
}
```

### [区县数据](./district.json)

所有区县编码与名称的映射列表

```
{
  "110101": "东城区",
  "110102": "西城区",
  "110105": "朝阳区",
  ...
}
```

### [一级数据](./one-level.json)

省份：一级数据

```
[
  {
    "code": "110000",
    "name": "北京市"
  },
  {
    "code": "120000",
    "name": "天津市"
  },
  ...
]
```

### [一级数据（map）](./one-level-map.json)

省份：一级数据（map）

```
{
  "110000": {
    "code": "110000",
    "name": "北京市"
  },
  "120000": {
    "code": "120000",
    "name": "天津市"
  },
  ...
}
```

### [二级数据](./two-levels.json)

省份 + 地级市（区县）：二级数据

```
[
  {
    "code": "110000",
    "name": "北京市",
    "children": [
      {
        "code": "110101",
        "name": "东城区"
      },
      ...
    ]
  },
  ...
  {
    "code": "130000",
    "name": "河北省",
    "children": [
      {
        "code": "130100",
        "name": "石家庄市"
      },
      ...
    ]
  }
  ...
]
```

note: 

* 对于一般的省份，第二级数据列出的是 `地级市` + `直接隶属省级的区县`
* 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级

### [二级数据（map）](./two-levels-map.json)

省份 + 地级市（区县）：二级数据（map）

```
{
  "110000": {
    "code": "110000",
    "name": "北京市",
    "children": {
      "110101": {
        "code": "110101",
        "name": "东城区"
      },
      ...
    }
  },
  "120000": {
    "code": "120000",
    "name": "天津市",
    "children": {
      "120101": {
        "code": "120101",
        "name": "和平区"
      },
      ...
    }
  },
  ...
}
```

### [三级数据](./three-levels.json)

省份 + 地级市 + 区县：三级数据

```
[
  {
    "code": "110000",
    "name": "北京市",
    "children": [
      {
        "code": "110101",
        "name": "东城区"
      },
      ...
    ]
  },
  ...
  {
    "code": "130000",
    "name": "河北省",
    "children": [
      {
        "code": "130100",
        "name": "石家庄市",
        "children": [
          {
            "code": "130102",
            "name": "长安区"
          },
          ...
        ]
      },
      ...
    ]
  }
  ...
]
```

note: 

* 一般来说是按照 `省份：地级市：区县` 的顺序填入数据的
* 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级，而不存在第三级数据
* 对于直接隶属省级的区县，第二级数据列出的是 `区县` 一级，而不存在第三级数据
* 对于没有区县一级的地级市，不存在第三级数据

### [三级数据（填充至完整的 3 级）](./three-levels-full.json)

省份 + 地级市 + 区县：三级数据（填充至完整的 3 级）

```
[
  {
    "code": "110000",
    "name": "北京市",
    "children": [
      {
        "code": "110101",
        "name": "东城区",
          "children": [
            {
              "code": "110101",
              "name": "东城区"
            }
          ]
      },
      ...
    ]
  },
  ...
  {
    "code": "130000",
    "name": "河北省",
    "children": [
      {
        "code": "130100",
        "name": "石家庄市",
        "children": [
          {
            "code": "130102",
            "name": "长安区"
          },
          ...
        ]
      },
      ...
    ]
  }
  ...
]
```

note: 

* 一般来说是按照 `省份：地级市：区县` 的顺序填入数据的
* 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级，第三级使用和第二级一样的数据
* 对于直接隶属省级的区县，第二级数据列出的是 `区县` 一级，第三级使用和第二级一样的数据
* 对于没有区县一级的地级市，第三级使用和第二级一样的数据

### [三级数据（map）](./three-levels-map.json)

省份 + 地级市 + 区县：三级数据（map）

```
{
  "110000": {
    "code": "110000",
    "name": "北京市",
    "children": {
      "110101": {
        "code": "110101",
        "name": "东城区"
      },
      "110102": {
        "code": "110102",
        "name": "西城区"
      },
      ...
    }
  },
  ...
}
```

### [三级数据（填充至完整的 3 级）（map）](./three-levels-map-full.json)

省份 + 地级市 + 区县：三级数据（填充至完整的 3 级）（map）

```
{
  "110000": {
    "code": "110000",
    "name": "北京市",
    "children": {
      "110101": {
        "code": "110101",
        "name": "东城区",
        "children": {
          "110101": {
            "code": "110101",
            "name": "东城区"
          }
        }
      },
      ...
    }
  },
  ...
}
```

### 特殊情况举例

* 直辖市：北京、天津、上海、重庆
* 特别行政区：香港、澳门
* 直接隶属省级的区县：海南五指山市、琼海市等
* 无区县的地级市：广东东莞、中山等

## node

```
var chinaRegions = require('china-regions-data');

chinaRegions.list // 列表数据
chinaRegions.province // 省份数据
chinaRegions.city // 地级市数据
chinaRegions.district // 区县数据
chinaRegions.oneLevel // 一级数据
chinaRegions.twoLevels // 二级数据
chinaRegions.threeLevels // 三级数据
chinaRegions.threeLevelsFull // 三级数据（填充至完整的 3 级）
chinaRegions.threeLevelsMap // 三级数据（map）
chinaRegions.threeLevelsMapFull // 三级数据（填充至完整的 3 级）（map）

// 或者直接使用单个数据
var list = require('china-regions-data/list.json') // 列表数据
var province = require('china-regions-data/province.json') // 省份数据
var city = require('china-regions-data/city.json') // 地级市数据
var district = require('china-regions-data/district.json') // 区县数据
var oneLevel = require('china-regions-data/one-level.json') // 一级数据
var twoLevels = require('china-regions-data/two-levels.json') // 二级数据
var threeLevels = require('china-regions-data/three-levels.json') // 三级数据
var threeLevelsFull = require('china-regions-data/three-levels-full.json') // 三级数据（填充至完整的 3 级）
var threeLevelsMap = require('china-regions-data/three-levels-map.json') // 三级数据（map）
var threeLevelsMapFull = require('china-regions-data/three-levels-map-full.json') // 三级数据（填充至完整的 3 级）（map）
```