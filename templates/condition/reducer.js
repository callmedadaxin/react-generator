const condition = {
  state: {
    data: {{{defaultValue}}}
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