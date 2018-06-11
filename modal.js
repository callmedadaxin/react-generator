export default {
  // 是否有模态框
  showModal: true,
  modals: [{
    // 模态框名称
    name: 'editConfig',
    // 模态框类型，分为展示型(进行内容填充即可)show, 编辑型（需要有表单，进行保存操作）edit
    type: 'show',
    // 请求的名称，一般模态框会进行get(取值操作)/edit(编辑操作)等
    fetch: 'get'
  }]
}