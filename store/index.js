import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '@/api'
import parseCookies from '@/utils/parse-cookies'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

const store = new Vuex.Store({
  plugins: [
    service('vehicles'),
    service('items'),
    service('categories'),
    service('viscosities'),
    service('compositions'),
    service('gears'),
    service('search')
  ],
  state: {
    mobile: false,
    id: null, // product id
    visible: false, // product visible
    gear_list: [],
    category_list: [],
    category_id: 0,
    history: [
      {
        name: 'Все',
        _id: 0
      },
    ]
  },
  mutations: {
    set_gear_list (state, data) {
      state.gear_list = data
      state.category_list = []
    },
    set_category_list (state, data) {
      state.gear_list = []
      state.category_list = data
    }
  },
  actions: {
    nuxtServerInit({ dispatch }, { req }) { // eslint-disable-line consistent-return
      const accessToken = parseCookies(req)['feathers-jwt'];

      if (accessToken) {
        return dispatch('auth/authenticate', { strategy: 'jwt', accessToken });
      }
    },
    gears_find({ dispatch, commit }, { parent }) {
      dispatch('gears/find', { query: { $limit: null, parent } }).then(res => {
        commit('set_gear_list', res.data)
      })
      .catch(error => console.log('gears error:', error))
    },
    categories_find({ dispatch, commit }, { parent }) {
      dispatch('categories/find', { query: { $limit: null, $sort: 'name', parent } }).then(res => {
        commit('set_category_list', res.data)
      })
      .catch(error => console.log('gears error:', error))
    },
    open_gear({ dispatch, commit, state }, category) {
      console.log('open_gear', category);
      const add_history = async (id) => {
        let cat
        if (id) cat = await dispatch('categories/get', id)
        else cat = state.history[0]

        const index = state.history.findIndex(s => s._id === cat._id)
        if (index > -1) {
          state.history = state.history.slice(0, index + 1)
        } else {
          if (cat.parent) {
            let res = await dispatch('categories/get', cat.parent)
            await add_history(res)
          }
          state.history.push(cat)
        }
      }
      add_history(category._id)
      // const index = state.history.findIndex(s => s._id === category._id)
      // if (index > -1) state.history = state.history.slice(0, index + 1)
      // else {
      //   state.history.push(category)
      // }

      state.category_id = category._id
      if (category.isItem) {
        dispatch('gears_find', { parent: category._id })
      }
      else {
        dispatch('categories_find', { parent: category._id })
      }
    }
  },
})

export default () => store
