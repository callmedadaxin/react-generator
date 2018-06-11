const {{name}} = {
  {{#if fetch}}
  fetch: {{fetch}},
  {{/if}}
  state: {
    showModal: false,
    {{#if fetch}}
    fetch: {{fetch}},
    {{/if}}
  },
  reducers: {
    toggleModal (state, showModal) {
      return {
        ...state,
        showModal
      }
    },
    {{#if fetch}}
    fetch: {{fetch}},
    {{/if}}
  }
}