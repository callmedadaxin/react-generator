// 显示modal
export const show{{upper name}}Modal = params => (dispatch, getState) => {
  {{#if fetch}}
  {{#if paramsHandler}}
  {{{paramsHandler}}}
  {{/if}}
  dispatch({
    url: '{{url}}',
    action: '{{namespace}}/{{fetch}}',
    params,
    handleResult: {{#if handler}}{{{handler}}}{{else}}res => res.data{{/if}}
  })
  {{else}}
  dispatch('{{namespace}}/changeCurrentItem', item)
  {{/if}}
  dispatch('{{namespace}}/toggleModal', true)
}

// 关闭modal
export const hide{{upper name}}Modal = () => dispatch => {
  dispatch('{{namespace}}/toggleModal', false)
}
