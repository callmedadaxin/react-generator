// 显示编辑Modal
export const show{{upper name}}Modal = (item, action) => (dispatch, getState) => {
  dispatch('{{namespace}}/changeCurrentItem', {
    item,
    action
  })
  dispatch('{{namespace}}/toggleModal', true)
}

// 隐藏编辑modal
export const hide{{upper name}}Modal = () => dispatch => {
  dispatch('{{namespace}}/toggleModal', false)
}

// 编辑请求
export const edit{{upper name}}Modal = (ret, item, action) => dispatch => {
  {{#if paramsHandler}}
  {{{paramsHandler}}}
  {{/if}}
  dispatch('{{namespace}}/changeCurrentItem', {
    item: Object.assign({}, item, ret),
    action
  })
  dispatch({
    url: '{{url}}',
    action: '{{namespace}}/{{fetch}}',
    params,
    handleResult: res => {
      dispatch({{getFn}}())
      hide{{upper name}}Modal()(dispatch)
      return res.data
    }
  })
}
