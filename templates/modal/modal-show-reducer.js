const {{name}}ModalData = {
  {{#if fetch}}
  fetch: '{{fetch}}',
  {{/if}}
  state: {
    showModal: false,
    {{#if fetch}}
    data: {}
    {{else}}
    item: {}
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