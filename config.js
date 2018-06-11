module.exports = {
  name: 'host',
  title: '告警主机',
  root: './result', // src目录
  table: {
    name: 'hostList',
    fetch: 'get',
    url: '/tip/hostList/get',
    resHandler: 'res => ({ items: res.data.items, page: res.data.page })',
    paramsHandler: `params = {
      condition: ...getState().Host.condition
    }`,
    pagination: true
  },
  modals: [{
    name: 'hostData',
    type: 'show'
  }, {
    name: 'hostDataFetch',
    type: 'show',
    fetch: 'get',
    url: '/tip/hostList/get'
  },
  // {
  //   name: 'hostDataEdit',
  //   type: 'edit',
  //   fetch: 'edit',
  //   url: '/tip/hostList/edit'
  // }
  ],
}