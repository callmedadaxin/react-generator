const gethostListFn = params => {
  return {
    url: '/tip/hostList/get',
    action: '/hostList/get',
    params,
    handleResult: res => ({ items: res.data.items, page: res.data.page })
  }
}
export const gethostList = params => (dispatch, getState) => {
  params = {
      condition: ...getState().Host.condition
    }
  dispatch(gethostListFn(params))
}