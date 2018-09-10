# TDP通用代码生成器
用于生成标准react/reducer/actions代码及目录，适用于使用easy-redux的项目

## Api

```
// 获取基本的配置,并输出到文件
$ tdp config -p ./config.js

// 以config.js为配置生成代码
$ tdp init -c ./config.js

// 获取追加代码的配置,并输出到文件
$ tdp add-config -p ./config.add.js

// 按配置追加代码
$ tdp add -c ./config.add.js
```

## 结果
根据config.js生成的结果可在[这里查看](https://github.com/callmedadaxin/react-generator/tree/master/result)

## 模块
各模块会自动生成相关的Component\Define\Actions\Reducers，并最终集成在整个模块中

### Condition
生成condition相关代码

#### 效果图
![](/docs/condition.png)

#### 配置

```js
condition: {
  // 模块的名称，用于为模块，文件夹等命名
  name: 'condition',
  // 模块表单相关，可自动生成表单
  fields: [{
    key: 'name', // 字段
    type: 'Input', // 类型 诸如Input,Select,Textarea等
    label: '姓名', // 展示名称
    default: '', // 默认值
    validators: [{  // validators
      required: true
    }],
    placeholder: '测试'
  }, ...
  ]
},
```

### Table
生成表格相关代码，并不会自动生成columns配置

#### 效果图
![](/docs/table.png)

#### 配置

``` js
table: {
  name: 'hostList', // 模块的名称，用于为模块，文件夹等命名
  fetch: 'get', // 请求的action
  url: '/tip/hostList/get', // 获取列表的url
  resHandler: 'res => ({ items: res.data.items, page: res.data.page })', // 处理结果
  paramsHandler: `params = {
    condition: ...getState().Host.condition
  }`, // 处理请求参数
  pagination: true, // 是否带分页
  // 包含新增操作
  add: {
    modal: 'hostDataEdit', // 对应的模态框名称，参考后续模态框.name
    btn: '创建报告' // 对应的按钮
  },
  // 包含编辑操作
  edit: {
    modal: 'hostDataEdit'
  },
  // 包含删除操作
  del: {
    url: '/host/delete' // 请求的url
  },
  // 包含修改状态操作
  status: {
    url: '/host/changeStatus'
  }
},
```

### Modal
提供三种类型Modal, 普通展示modal,请求展示modal,编辑modal

#### 效果图
![](/docs/modal.png)

#### 配置
``` js
modals: [{
  // 展示型modal, 可自定义展示内容
  name: 'hostData',
  type: 'show',
  title: '展示型modal'
}, {
  // 带请求的展示modal，打开时自动请求获取数据，自定义展示内容
  name: 'hostDataFetch',
  type: 'show',
  fetch: 'get',
  url: '/tip/hostList/get', // 请求链接
  title: '带请求的展示型modal'
}, {
  // 编辑型modal, 自动生成表单
  name: 'hostDataEdit',
  title: '编辑型modal',
  type: 'edit',
  fetch: 'edit',
  url: '/tip/hostList/edit', // 编辑请求链接
  // 表单的配置
  fields: [{
    key: 'name',
    type: 'Input',
    label: '姓名',
    default: '',
    validators: [{
      required: true
    }],
    placeholder: '测试'
  }, {
    key: 'city',
    type: 'Select',
    label: '城市',
    options: [{
      label: '111',
      value: 1
    }, {
      label: '222',
      value: 2
    }]
  }]
}]
```



