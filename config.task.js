module.exports = {
  name: 'task', // 模块名称
  path: 'reportCenter/task', // 模块路径
  isChild: true, // 是否是子模块
  isPage: false, // 是否是page页
  hasContainer: false, // 是否自动生成container
  hasTime: false, // 是否有时间选择
  root: './result', // 输出的src目录
  // root: '../tip/src/', // 输出的src目录
  namespace: '/report/task',
  table: {
    name: 'taskList',
    fetch: 'get',
    url: '/tip/web/v1/report/task/list',
    resHandler: 'res => ({ items: res.data.items, page: res.data.page })',
    paramsHandler: `const params = {
      page: {
        cur_page: page,
        page_items_num: 20
      }
    }`,
    pagination: true, // 是否带分页
    edit: {
      modal: 'reportEdit'
    },
    del: {
      url: '/tip/web/v1/report/task/delete/'
    },
    status: {
      url: '/tip/web/v1/report/task/enable/'
    }
  }
}