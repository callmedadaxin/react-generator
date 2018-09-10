module.exports = {
  name: 'host', // 模块名称
  root: './result', // 输出的src目录
  namespace: '/host',
  // isChild: true, // 是否是子模块
  table: {
    name: 'newList',
    fetch: 'get',
    url: '/tip/newList/get',
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
  }
}