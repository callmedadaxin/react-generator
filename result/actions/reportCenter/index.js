import { post } from '@common/ajax'

const getReportListFn = params => {
  return {
    url: '/tip/web/v1/report/list',
    action: '/report/reportList/get',
    params,
    handleResult: res => ({ items: res.data.items, page: res.data.page })
  }
}
// 获取列表
export const getReportList = (page = 1) => (dispatch, getState) => {
  const params = {
      condition: getState().ReportCenter.condition
    }
  dispatch(getReportListFn(params))
}

// 删除操作
export const deleteReportListItem = params => (dispatch) => {
  post('/tip/web/v1/report/delete/', params)
    .then(res => res.json())
    .then(res => {
      dispatch(getReportListFn())
      return res.data
    })
}

// 更改condition内容
export const changeCondition = condition => (dispatch, getState) => {
  dispatch('/report/condition/changeCondition', condition)
}
// 显示编辑Modal
export const showReportEditModal = (item, action) => (dispatch, getState) => {
  dispatch('/report/reportEditModalData/changeCurrentItem', {
    item,
    action
  })
  dispatch('/report/reportEditModalData/toggleModal', true)
}

// 隐藏编辑modal
export const hideReportEditModal = () => dispatch => {
  dispatch('/report/reportEditModalData/toggleModal', false)
}

// 编辑请求
export const editReportEditModal = (ret, item, action) => dispatch => {
  dispatch('/report/reportEditModalData/changeCurrentItem', {
    item: Object.assign({}, item, ret),
    action
  })
  dispatch({
    url: '/tip/web/v1/report/create',
    action: '/report/reportEditModalData/edit',
    params,
    handleResult: res => {
      dispatch(getReportListFn())
      hideReportEditModal()(dispatch)
      return res.data
    }
  })
}
