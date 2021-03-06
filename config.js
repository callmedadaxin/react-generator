module.exports = {
  name: 'host', // 模块名称
  isPage: true, // 是否是page页
  hasTime: true, // 是否有时间选择
  title: '告警主机', // 模块标题, 非page页时不传
  root: './result', // 输出的src目录
  // root: '../tip/src/', // 输出的src目录
  namespace: '/host',
  // path: 'reportCenter/task', // 子模块路径
  // isChild: true, // 是否是子模块
  // hasContainer: false, // 是否自动生成container
  // namespace: '/report/task',
  condition: {
    name: 'condition',
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
  },
  table: {
    name: 'hostList',
    fetch: 'get',
    url: '/tip/hostList/get',
    resHandler: 'res => ({ items: res.data.items, page: res.data.page })',
    paramsHandler: `params = {
      condition: getState().Host.condition
    }`,
    pagination: true, // 是否带分页
    // 包含新增操作
    add: {
      modal: 'hostDataEdit',
      btn: '创建报告'
    },
    edit: {
      modal: 'hostDataEdit'
    },
    del: {
      url: '/host/delete'
    },
    status: {
      url: '/host/changeStatus'
    }
  },
  modals: [{
    name: 'hostData',
    type: 'show',
    title: '展示型modal'
  }, {
    name: 'hostDataFetch',
    type: 'show',
    fetch: 'get',
    url: '/tip/hostList/get',
    title: '带请求的展示型modal'
  }, {
    name: 'hostDataEdit',
    title: '编辑型modal',
    type: 'edit',
    fetch: 'edit',
    url: '/tip/hostList/edit',
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
  }],
}