import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '@/api'
import localAuth from './localAuth'
import parseCookies from '@/utils/parse-cookies'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

const store = new Vuex.Store({
  plugins: [
    service('users'),
    service('vehicles'),
    service('items'),
    service('categories'),
    service('viscosities'),
    service('compositions'),
    service('gears'),
    service('search'),
    service('models'),
    service('orders'),
    auth({
      userService: 'users'
    })
  ],
  state: {
    mobile: false,
    product_id: null, // product id
    showProduct: false, // product visible
    showRegister: false,
    showLogin: false,
    gear_list: [],
    category_menu: [],
    category_list: [],
    category_id: 0,
    history: [],
    vendors: [],
    model_list: []
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
    get_vendors({ dispatch, commit, state }) {
      dispatch('categories/find', { query: { $limit: null, $sort: 'name', parent: 100 } }).then(res => {
        state.vendors = res.data || []
      })
      .catch(error => console.log('get_vendors error:', error))
    },
    get_models({ dispatch, commit, state }, category) {
      const find = "Автомобили " + category.name
      dispatch('models/find', { query: { _id: category._id } }).then(res => {
        console.log('models', res);
        if (res.data && res.data.length)
        state.model_list = res.data.map(model => {
          model.name = model.fullname.replace(find, '')
          return model
        }).sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
      })
      .catch(error => console.log('get_models error:', error))
    },
    category_menu_find({ dispatch, commit, state }) {
      dispatch('categories/find', { query: { $limit: null, $sort: 'name', parent: 0 } }).then(res => {
        state.category_menu = res.data || []
        state.gear_list = []
        state.category_list = []
        dispatch('open_gear', state.category_menu[0])
      })
      .catch(error => console.log('category_menu_find error:', error))
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
      state.history = []
      const add_history = async (id) => {
        let cat
        if (id) cat = await dispatch('categories/get', id)
        else return
        if (cat.parent) {
          state.history.unshift(cat)
          add_history(cat.parent)
        }
      }
      add_history(category._id)

      state.category_id = category._id
      if (category.isItem) {
        dispatch('gears_find', { parent: category._id })
      }
      else {
        dispatch('categories_find', { parent: category._id })
      }
    },
    inverse({ state }, name) {
      console.log('inverse:', name, state[name]);
      state[name] = !state[name]
    }
  },
  modules: {
    localAuth
  },
})

export default () => store
