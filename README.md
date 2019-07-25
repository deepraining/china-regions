# china-regions

中国行政区划【省、市、区县】数据（汇总、省份、地级市、区县、一级、二级、三级）（另加海外数据）

### [一级数据](./lib/one-level.json)

```
import oneLevel from '@senntyou/china-regions/lib/one-level.json';
```

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

### [二级数据](./lib/two-levels.json)

```
import twoLevels from '@senntyou/china-regions/lib/two-levels.json';
```

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

注意：

- 对于一般的省份，第二级数据列出的是 `地级市` + `直接隶属省级的区县`
- 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级

### [三级数据](./lib/three-levels.json)

```
import threeLevels from '@senntyou/china-regions/lib/three-levels.json';
```

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

注意：

- 一般来说是按照 `省份：地级市：区县` 的顺序填入数据的
- 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级，而不存在第三级数据
- 对于直接隶属省级的区县，第二级数据列出的是 `区县` 一级，而不存在第三级数据
- 对于没有区县一级的地级市，不存在第三级数据

### [三级数据（填充至完整的 3 级）](./lib/three-levels-full.json)

```
import threeLevelsFull from '@senntyou/china-regions/lib/three-levels-full.json';
```

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

注意：

- 一般来说是按照 `省份：地级市：区县` 的顺序填入数据的
- 对于直辖市、特别行政区等，第二级数据列出的是 `区县` 一级，第三级使用和第二级一样的数据
- 对于直接隶属省级的区县，第二级数据列出的是 `区县` 一级，第三级使用和第二级一样的数据
- 对于没有区县一级的地级市，第三级使用和第二级一样的数据

### 特殊情况举例

- 直辖市：北京、天津、上海、重庆
- 特别行政区：香港、澳门
- 直接隶属省级的区县：海南五指山市、琼海市等
- 无区县的地级市：广东东莞、中山等

## 海外数据

国内省市区之外的海外国家一级数据

### 编码规则

- 第一级：`code: 990000, name: 海外`
- 第二级：`code: 99xxxx, name: 美国/英国...`
- 国家编码规则：`99` + `填充0` + `国际区号` ，当国际区号不足 4 位时，前面用 0 填充，补足 4 位，整个补足 6 位
- 因为美国和加拿大国际区号一样，所以改加拿大国际区号为 2

### [海外二级数据](./lib/country-levels.json)

```
import countryLevels from '@senntyou/china-regions/lib/country-levels.json';
```

```
[
  {
    "code": "990000",
    "name": "海外",
    "children": [
      {
        "code": "990001",
        "name": "美国"
      },
      {
        "code": "990002",
        "name": "加拿大"
      },
      ...
    ]
  }
]
```
