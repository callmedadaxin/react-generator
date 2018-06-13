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
export const getReportList = params => (dispatch, getState) => {
  params = {
      condition: getState().ReportList.condition
    }
  dispatch(getreportListFn(params))
}

// 删除操作
export const deleteReportListItem = params => (dispatch) => {
  post('/tip/web/v1/report/delete/', params)
    .then(res => res.json())
    .then(res => {
      dispatch(getreportListFn())
      return res.data
    })
}



// 更改condition内容
export const changeCondition = condition => (dispatch, getState) => {
  dispatch('/report/condition/changeCondition', condition)
}

// 显示编辑Modal
export const showReportEditModal = (item, action) => (dispatch, getState) => {
  dispatch('/report/reportEditModal/changeCurrentItem', {
    item,
    action
  })
  dispatch('/report/reportEditModal/toggleModal', true)
}
// 隐藏编辑modal
export const hideReportEditModal = () => dispatch => {
  dispatch('/report/reportEditModal/toggleModal', false)
}

// 编辑请求
export const editReportEditModal = (ret, item, action) => dispatch => {
  dispatch('/report/reportEditModal/changeCurrentItem', {
    item: Object.assign({}, item, ret),
    action
  })
  dispatch({
    url: '/tip/web/v1/report/create',
    action: '/report/reportEditModal/edit',
    params,
    handleResult: res => {
      dispatch(getReportListFn())
      hideReportEditModal()(dispatch)
      return res.data
    }
  })
}