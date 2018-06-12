const {{name}}Modal = {
  fetch: '{{fetch}}',
  state: {
    showModal: false,
    item: {},
    data: {},
    success: false
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
    changeCurrentItem(state, item) {
      return {
        ...state,
        item
      }
    },
    {{fetch}}Success(state, data) {
      return {
        ...state,
        data,
        success: true
      }
    }
  }
}