module.exports = {
  name: 'host', // 模块名称
  title: '告警主机', // 模块标题
  root: './result', // 输出的src目录
  namespace: '/host',
  table: {
    name: 'hostList',
    fetch: 'get',
    url: '/tip/hostList/get',
    resHandler: 'res => ({ items: res.data.items, page: res.data.page })',
    paramsHandler: `params = {
      condition: ...getState().Host.condition
    }`,
    pagination: true // 是否带分页
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