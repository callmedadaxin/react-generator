const {{name}}ModalData = {
  {{#if fetch}}
  fetch: '{{fetch}}',
  {{/if}}
  state: {
    showModal: false,
    item: {},
    {{#if fetch}}
    data: {},
    {{/if}}
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
    {{#if fetch}}
    {{fetch}}Success (state, data) {
      return {
        ...state,
        data
      }
    }
    {{/if}}
  }
}