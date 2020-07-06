const state = () => ({
  list: []
})

const mutations = {
  add(state, item) {
    const element = state.list.find(x => x.id === item._id)
    if (element == undefined) state.list.push({ id: item._id, quantity: item.quantity })
    else element.quantity = item.quantity
  },
  delete(state, id) {
    state.list.splice(state.list.findIndex(x => x.id === id), 1)
  },
  clear(state) {
    state.list = []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
};
