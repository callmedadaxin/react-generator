const {{name}} = {
  fetch: '{{fetch}}',
  state: {
    list: [],
    page: {}
  },
  reducers: {
    {{fetch}}Success (state, {items, page}) {
      return {
        ...state,
        list: items,
        page
      }
    }
  }
}