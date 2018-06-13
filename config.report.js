module.exports = {
  name: 'reportCenter', // 模块名称
  isPage: true, // 是否是page页
  hasTime: false, // 是否有时间选择
  title: '报告中心', // 模块标题, 非page页时不传
  root: '../tip/src/', // 输出的src目录
  namespace: '/report',
  condition: {
    name: 'condition',
    fields: [{
      key: 'creat_time',
      type: 'Input',
      label: '时间筛选',
      default: 'seven_days'
    }, {
      key: 'name',
      type: 'Input',
      label: '报告名称',
      placeholder: '按名称搜索'
    }, {
      key: 'report_type',
      type: 'Select',
      label: '报告类型',
      options: [{
        label: '明细',
        value: 'detail'
      }, {
        label: '按主机聚合',
        value: 'machine_agg'
      }, {
        label: '按威胁事件聚合',
        value: 'incident_agg'
      }, {
        label: '威胁分析报告',
        value: 'analysis'
      }],
      placeholder: '选择报告类型'
    }]
  },
  table: {
    name: 'reportList',
    fetch: 'get',
    url: '/tip/web/v1/report/list',
    resHandler: 'res => ({ items: res.data.items, page: res.data.page })',
    paramsHandler: `const params = {
      condition: getState().ReportCenter.condition
    }`,
    pagination: true, // 是否带分页
    // 包含新增操作
    add: {
      modal: 'reportEdit',
      btn: '创建报告'
    },
    edit: {
      modal: 'reportEdit'
    },
    del: {
      url: '/tip/web/v1/report/delete/'
    }
  },
  modals: [{
    name: 'reportEdit',
    title: '编辑报告',
    type: 'edit',
    fetch: 'edit',
    url: '/tip/web/v1/report/create',
    fields: [{
      key: 'severity',
      type: 'LabelSelect',
      label: '严重程度',
      options: [],
      default: []
    }, {
      key: 'intel_type',
      type: 'LabelSelect',
      label: '威胁类型',
      options: []
    }, {
      key: 'main_tag',
      type: 'Select',
      label: '威胁标签',
      options: []
    }, {
      key: 'machine',
      type: 'MultiInput',
      label: '告警主机',
      placeholder: 'IP地址或主机名称，可输入多个'
    }, {
      key: 'behave_source',
      type: 'Select',
      label: '数据源'
    }, {
      key: 'name',
      type: 'Input',
      label: '标题名称输入',
      placeholder: '该名称将作为报告标题'
    }]
  }],
}