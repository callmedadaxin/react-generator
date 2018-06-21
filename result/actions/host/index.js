import { post } from '@common/ajax'

const getHostListFn = params => {
  return {
    url: '/tip/hostList/get',
    action: '/host/hostList/get',
    params,
    handleResult: res => ({
      items: res.data.items,
      page: res.data.page
    })
  }
}
// 获取列表
export const getHostList = (page = 1) => (dispatch, getState) => {
  params = {
    condition: getState().Host.condition
  }
  dispatch(getHostListFn(params))
}

// 删除操作
export const deleteHostListItem = params => (dispatch, getState) => {
  post('/host/delete', params)
    .then(res => res.json())
    .then(res => {
      getHostList(1)(dispatch, getState)
      return res.data
    })
}

// 修改状态
export const changeHostListItem = params => (dispatch) => {
  post('/host/changeStatus', params)
    .then(res => res.json())
    .then(res => {
      getHostList(1)(dispatch, getState)
      return res.data
    })
}
// 更改condition内容
export const changeCondition = condition => (dispatch, getState) => {
  dispatch('/host/condition/changeCondition', condition)
}
// 显示modal
export const showHostDataModal = params => (dispatch, getState) => {
  dispatch('/host/hostDataModalData/changeCurrentItem', item)
  dispatch('/host/hostDataModalData/toggleModal', true)
}

// 关闭modal
export const hideHostDataModal = () => dispatch => {
  dispatch('/host/hostDataModalData/toggleModal', false)
}
// 显示modal
export const showHostDataFetchModal = params => (dispatch, getState) => {
  dispatch({
    url: '/tip/hostList/get',
    action: '/host/hostDataFetchModalData/get',
    params,
    handleResult: res => res.data
  })
  dispatch('/host/hostDataFetchModalData/toggleModal', true)
}

// 关闭modal
export const hideHostDataFetchModal = () => dispatch => {
  dispatch('/host/hostDataFetchModalData/toggleModal', false)
}
// 显示编辑Modal
export const showHostDataEditModal = (item, action) => (dispatch, getState) => {
  dispatch('/host/hostDataEditModalData/changeCurrentItem', {
    item,
    action
  })
  dispatch('/host/hostDataEditModalData/toggleModal', true)
}

// 隐藏编辑modal
export const hideHostDataEditModal = () => dispatch => {
  dispatch('/host/hostDataEditModalData/toggleModal', false)
}

// 编辑请求
export const editHostDataEditModal = (ret, item, action) => (dispatch, getState) => {
  dispatch('/host/hostDataEditModalData/changeCurrentItem', {
    item: Object.assign({}, item, ret),
    action
  })
  dispatch({
    url: '/tip/hostList/edit',
    action: '/host/hostDataEditModalData/edit',
    params,
    handleResult: res => {
      getHostList(1)(dispatch, getState)
      hideHostDataEditModal()(dispatch)
      return res.data
    }
  })
}
