import { combinceReducer } from '@common/easy'

const condition = {
  state: {
    data: {name:'',city:''}
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

const hostList = {
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
 

const hostDataModalData = {
  state: {
    showModal: false,
    item: {}
  },
  reducers: {
    changeCurrentItem (state, item) {
      return {
        ...state,
        item
      }
    },
    toggleModal (state, showModal) {
      return {
        ...state,
        showModal
      }
    },
  }
}

const hostDataFetchModalData = {
  fetch: 'get',
  state: {
    showModal: false,
    data: {}
  },
  reducers: {
    changeCurrentItem (state, item) {
      return {
        ...state,
        item
      }
    },
    toggleModal (state, showModal) {
      return {
        ...state,
        showModal
      }
    },
    getSuccess (state, data) {
      return {
        ...state,
        data
      }
    }
  }
}

const hostDataEditModal = {
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
  hostList,
  hostDataModalData,
  hostDataFetchModalData,
  hostDataEditModalData
}, '/host')
