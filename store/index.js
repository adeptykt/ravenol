import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '@/api'
import localAuth from './localAuth'
import parseCookies from '@/utils/parse-cookies'
import cookie from 'js-cookie';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

const store = new Vuex.Store({
  plugins: [
    service('users', { debug: true }),
    service('vehicles'),
    service('items'),
    service('categories'),
    service('vendors'),
    service('viscosities'),
    service('compositions'),
    service('gears'),
    service('search'),
    service('models'),
    service('generations'),
    service('orders'),
    service('tempusers'),
    service('aggregate'),
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
    showProfile: false,
    gear_list: [],
    category_menu: [],
    category_list: [],
    category_id: 0,
    history: [],
    category_list: [
      { _id: 1, name: 'Автомобили' },
      { _id: 3, name: 'Мотоциклы' },
      { _id: 2, name: 'Фургоны' },
      { _id: 4, name: 'Грузовики' },
      { _id: 5, name: 'Сельхозтехника' },
      { _id: 6, name: 'Спецтехника' }
    ],
    vendor_list: [],
    model_list: [],
    generation_list: [],
    product_list: []
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
    nuxtClientInit({ commit, state }, context) {
      // const accessToken = parseCookies(req)['feathers-jwt']
      console.log('nuxtClientInit', state.accessToken);
      // cookie.set('feathers-jwt', state.accessToken)
    },
    nuxtServerInit({ dispatch, commit, state }, { req }) { // eslint-disable-line consistent-return
      const accessToken = parseCookies(req)['feathers-jwt']
      // console.log('nuxtServerInit', accessToken);

      if (accessToken) {
        return dispatch('auth/authenticate', { strategy: 'jwt', accessToken })
        .then(res => {
          // store.commit('auth/setAccessToken', res.accessToken);
          console.log('accessToken', res.accessToken);
          // console.log('accessToken2', state.auth.accessToken);
          // console.log('isAuthenticatePending', state.auth.isAuthenticatePending);
          // console.log('errorOnAuthenticate', state.auth.errorOnAuthenticate);
          // console.log('payload', state.auth.payload, state.auth.user);
          // cookie.set('feathers-jwt', res.accessToken)
          // console.log('accessToken2', parseCookies(req)['feathers-jwt']);
        })
        .catch(error => {
          delete parseCookies(req)['feathers-jwt']
        })
      }
    },
    get_vendors({ dispatch, commit, state }, category) {
      console.log('get_vendors');
      state.vendor_list = []
      state.selection_mode = 'vendors'
      state.history = state.history.slice(0, 0)
      state.history.push({ dispatch: 'get_vendors', data: category, name: category.name })
      dispatch('vendors/find', { query: { $limit: null, $sort: 'name', categories: category._id } }).then(res => {
        state.vendor_list = res.data || []
      })
      .catch(error => console.log('get_vendors error:', error))
    },
    get_models({ dispatch, commit, state }, { vendor, category_id }) {
      state.model_list = []
      state.selection_mode = 'models'
      state.history = state.history.slice(0, 1)
      state.history.push({ dispatch: 'get_models', data: { vendor, category_id }, name: vendor.name })
      dispatch('models/find', { query: { $limit: null, $sort: 'name', vendor: vendor, category: category_id } }).then(res => {
        if (res.data && res.data.length) state.model_list = res.data
      })
      .catch(error => console.log('get_models error:', error))
    },
    get_generations({ dispatch, commit, state }, model) {
      state.generation_list = []
      state.selection_mode = 'generations'
      state.history = state.history.slice(0, 2)
      state.history.push({ dispatch: 'get_generations', data: model, name: model.name })
      dispatch('generations/find', { query: { $limit: null, $sort: 'name', model } }).then(res => {
        state.generation_list = res.data || []
      })
      .catch(error => console.log('generation_list error:', error))
    },
    async get_gears({ dispatch, commit, state }, generation) {
      console.log('get_gears', generation);

      let res, model, vendor, category
      state.history = []
      state.history.push({ dispatch: 'get_gears', data: generation, name: generation.name })
      if (generation.model._id) model = generation.model
      else model = await dispatch('models/get', generation.model)
      const category_id = model.category
      state.history.unshift({ dispatch: 'get_generations', data: model, name: model.name })
      vendor = await dispatch('vendors/get', model.vendor)
      state.history.unshift({ dispatch: 'get_models', data: { vendor, category_id }, name: vendor.name })
      category = state.category_list.find(cat => cat._id === category_id)
      if (category) state.history.unshift({ dispatch: 'get_vendors', data: category, name: category.name })

      state.selection_mode = 'gears'
      state.gear_list = generation.gears
      // state.history = state.history.slice(0, 3)
      // state.history.push({ dispatch: 'get_gears', data: generation, name: generation.name })
      // заполняем информацию по продуктам
      state.product_list = []
      let articles = []
      generation.gears.forEach(gear => {
        gear.products && gear.products.forEach(product => {
          if (articles.indexOf(product) == -1) articles.push(product)
        })
      })
      if (articles.length) {
        dispatch('items/find', { query: { $limit: null, article: { $in: articles } } }).then(res => { state.product_list = res.data }).catch(error => console.log('get_gears error:', error))
      }
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
      state[name] = !state[name]
    }
  },
  modules: {
    localAuth
  },
})

export default () => store
