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

export const showhostDataModal = params => (dispatch, getState) => {
  dispatch('/changeCurrentItem', item)
  dispatch('/toggleModal', true)
}
export const hidehostDataModal = () => dispatch => {
  dispatch('/toggleModal', false)
}

export const showhostDataFetchModal = params => (dispatch, getState) => {
  dispatch({
    url: '/tip/hostList/get',
    action: '/get',
    params,
    handleResult: res.data
  })
  dispatch('/toggleModal', true)
}
export const hidehostDataFetchModal = () => dispatch => {
  dispatch('/toggleModal', false)
}

export const showhostDataEditModal = item => (dispatch, getState) => {
  dispatch('/changeCurrentItem', item)
  dispatch('/toggleModal', true)
}

export const hidehostDataEditModal = () => dispatch => {
  dispatch('/toggleModal', false)
}

export const edithostDataEditModal = (ret, item) => dispatch => {
  dispatch('/changeCurrentItem', item)
  dispatch({
    url: '/tip/hostList/edit',
    action: '/edit',
    params,
    handleResult: res => {
      dispatch(())
      hidehostDataEditModal()(dispatch)
      return res.data
    }
  })
}