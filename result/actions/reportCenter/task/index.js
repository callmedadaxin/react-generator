import { post } from '@common/ajax'

const getTaskListFn = params => {
  return {
    url: '/tip/web/v1/report/task/list',
    action: '/report/task/taskList/get',
    params,
    handleResult: res => ({ items: res.data.items, page: res.data.page })
  }
}
// 获取列表
export const getTaskList = (page = 1) => (dispatch, getState) => {
  const params = {
      page: {
        cur_page: page,
        page_items_num: 20
      }
    }
  dispatch(getTaskListFn(params))
}

// 删除操作
export const deleteTaskListItem = params => (dispatch) => {
  post('/tip/web/v1/report/task/delete/', params)
    .then(res => res.json())
    .then(res => {
      dispatch(getTaskListFn())
      return res.data
    })
}

// 修改状态
export const changeTaskListItem = params => (dispatch) => {
  post('/tip/web/v1/report/task/enable/', params)
    .then(res => res.json())
    .then(res => {
      dispatch(gettaskListFn())
      return res.data
    })
}
