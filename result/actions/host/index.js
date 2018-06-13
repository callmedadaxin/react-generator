// 更改condition内容
export const changeCondition = condition => (dispatch, getState) => {
  dispatch('/host/condition/changeCondition', condition)
}

import { post } from '@common/ajax'

const gethostListFn = params => {
  return {
    url: '/tip/hostList/get',
    action: '/host/hostList/get',
    params,
    handleResult: res => ({ items: res.data.items, page: res.data.page })
  }
}
// 获取列表
export const gethostList = params => (dispatch, getState) => {
  params = {
      condition: ...getState().Host.condition
    }
  dispatch(gethostListFn(params))
}

// 删除操作
export const deletehostListItem = params => (dispatch) => {
  post('/host/delete', params)
    .then(res => res.json())
    .then(res => {
      dispatch(gethostListFn())
      return res.data
    })
}

// 修改状态
export const changehostListItem = params => (dispatch) => {
  post('/host/changeStatus', params)
    .then(res => res.json())
    .then(res => {
      dispatch(gethostListFn())
      return res.data
    })
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

// 显示编辑Modal
export const showhostDataEditModal = (item, action) => (dispatch, getState) => {
  dispatch('/host/hostDataEditModal/changeCurrentItem', {
    item,
    action
  })
  dispatch('/host/hostDataEditModal/toggleModal', true)
}
// 隐藏编辑modal
export const hidehostDataEditModal = () => dispatch => {
  dispatch('/host/hostDataEditModal/toggleModal', false)
}

// 编辑请求
export const edithostDataEditModal = (ret, item, action) => dispatch => {
  dispatch('/host/hostDataEditModal/changeCurrentItem', {
    item: Object.assign({}, item, ret),
    action
  })
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