const {{fetchName}} = (params) => {
  return {
    url: {{url}},
    action: {{action}},
    params,
    handleResult: res => res.data
  }
}
export const {{name}} = params => (dispatch, getState) => {
  dispatch({{fetchName}}(params))
}