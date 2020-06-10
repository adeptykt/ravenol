const state = () => ({
  view_items: 0,
  sort_items: 0
})

const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  }
}

export default {
  namespaced: true,
  state,
  mutations,
};
