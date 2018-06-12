export const show{{name}}Modal = item => (dispatch, getState) => {
  dispatch('{{namespace}}/changeCurrentItem', item)
  dispatch('{{namespace}}/toggleModal', true)
}

export const hide{{name}}Modal = () => dispatch => {
  dispatch('{{namespace}}/toggleModal', false)
}

export const edit{{name}}Modal = (ret, item) => dispatch => {
  {{#if paramsHandler}}
  {{{paramsHandler}}}
  {{/if}}
  dispatch('{{namespace}}/changeCurrentItem', item)
  dispatch({
    url: '{{url}}',
    action: '{{namespace}}/{{fetch}}',
    params,
    handleResult: res => {
      dispatch({{getFn}}())
      hide{{name}}Modal()(dispatch)
      return res.data
    }
  })
}