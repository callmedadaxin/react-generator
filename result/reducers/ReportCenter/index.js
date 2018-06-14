import { combinceReducer } from '@common/easy'
const condition = {
  state: {
    data: {creat_time:'seven_days',name:'',report_type:''}
  },
  reducers: {
    changeCondition (state, data) {
      return {
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }
    }
  }
}
const reportList = {
  fetch: 'get',
  state: {
    list: [],
    page: {}
  },
  reducers: {
    getSuccess (state, {items, page}) {
      return {
        ...state,
        list: items,
        page
      }
    }
  }
}
 
const reportEditModalData = {
  fetch: 'edit',
  state: {
    showModal: false,
    item: {},
    data: {},
    success: false,
    action: ''
  },
  reducers: {
    reset (state) {
      return {
        ...state,
        success: false
      }
    },
    toggleModal(state, showModal) {
      return {
        ...state,
        showModal,
        success: showModal ? false : state.success
      }
    },
    changeCurrentItem(state, {
      item,
      action
    }) {
      return {
        ...state,
        item,
        action
      }
    },
    editSuccess(state, data) {
      return {
        ...state,
        data,
        success: true
      }
    }
  }
}

export default combinceReducer({
  condition,
  reportList,
  reportEditModalData
}, '/report')
