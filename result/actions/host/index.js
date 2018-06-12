const gethostListFn = params => {
  return {
    url: '/tip/hostList/get',
    action: '/host/hostList/get',
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
  dispatch('/host/hostDataModal/changeCurrentItem', item)
  dispatch('/host/hostDataModal/toggleModal', true)
}
export const hidehostDataModal = () => dispatch => {
  dispatch('/host/hostDataModal/toggleModal', false)
}

export const showhostDataFetchModal = params => (dispatch, getState) => {
  dispatch({
    url: '/tip/hostList/get',
    action: '/host/hostDataFetchModal/get',
    params,
    handleResult: res => res.data
  })
  dispatch('/host/hostDataFetchModal/toggleModal', true)
}
export const hidehostDataFetchModal = () => dispatch => {
  dispatch('/host/hostDataFetchModal/toggleModal', false)
}

export const showhostDataEditModal = item => (dispatch, getState) => {
  dispatch('/host/hostDataEditModal/changeCurrentItem', item)
  dispatch('/host/hostDataEditModal/toggleModal', true)
}

export const hidehostDataEditModal = () => dispatch => {
  dispatch('/host/hostDataEditModal/toggleModal', false)
}

export const edithostDataEditModal = (ret, item) => dispatch => {
  dispatch('/host/hostDataEditModal/changeCurrentItem', item)
  dispatch({
    url: '/tip/hostList/edit',
    action: '/host/hostDataEditModal/edit',
    params,
    handleResult: res => {
      dispatch(gethostListFn())
      hidehostDataEditModal()(dispatch)
      return res.data
    }
  })
}