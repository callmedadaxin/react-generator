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
    item: {},
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
    item: {},
    data: {},
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