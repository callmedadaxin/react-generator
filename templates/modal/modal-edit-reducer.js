const {{name}}ModalData = {
  fetch: '{{fetch}}',
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
    {{fetch}}Success(state, data) {
      return {
        ...state,
        data,
        success: true
      }
    }
  }
}