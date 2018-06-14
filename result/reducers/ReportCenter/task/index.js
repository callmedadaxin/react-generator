import { combinceReducer } from '@common/easy'
const taskList = {
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
 

export default combinceReducer({
  taskList
})
