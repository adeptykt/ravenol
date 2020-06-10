const state = () => ({
  list: []
})

const mutations = {
  add(state, id) {
    if (!id) return
    const index = state.list.indexOf(id)
    if (index > -1) state.list.splice(index, 1)
    state.list.push(id)
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
