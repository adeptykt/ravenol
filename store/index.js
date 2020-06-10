import { makeAuthPlugin, initAuth, hydrateApi, models } from '~/plugins/feathers'
import cart from './cart'
import settings from './settings'
import viewed from './viewed'
import parseCookies from '@/utils/parse-cookies'

const auth = makeAuthPlugin({
  userService: 'users',
  state: {
    publicPages: [
      'index',
      'auth',
      'about',
      'cart',
      'register',
      'categories-id',
      'contacts',
      'delivery',
      'privacy',
      'police',
      'products-id',
      'email-verification-id',
    ]
  },
  getters: {
    user: (state, dispatch) => {
      if (!state.accessToken) return null
    }
  },
  actions: {
    onInitAuth ({ state, dispatch }, payload) {
      if (payload) {
        dispatch('authenticate', { strategy: 'jwt', accessToken: state.accessToken })
          .then((result) => {
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
})

const requireModule = require.context('./services', false, /.js$/)
const servicePlugins = requireModule.keys().map(modulePath => requireModule(modulePath).default)

export const plugins = [ ...servicePlugins, auth ]

export const state = () => ({
  mobile: false,
  menu_fixed: false,
  quick_search: false,
  product_id: null, // product id
  showProduct: false, // product visible
  showRegister: false,
  showLogin: false,
  showProfile: false,
  showAuthorization: false,
  showReset: false,
  gear_list: [],
  category_menu: [],
  category_list: [],
  category_id: 0,
  history: [],
  category_list: [
    { _id: 1, name: 'Автомобили', value: 'auto' },
    { _id: 3, name: 'Мотоциклы', value: 'moto' },
    { _id: 2, name: 'Фургоны', value: 'furg' },
    { _id: 4, name: 'Грузовики', value: 'gruz' },
    { _id: 5, name: 'Сельхозтехника', value: 'sel' },
    { _id: 6, name: 'Спецтехника', value: 'spec' }
  ],
  vendor_list: [],
  model_list: [],
  generation_list: [],
  product_list: [],
  global_search: '',
  order: {},
  menu_items: []
})

export const mutations = {
  set_mobile(state, val) {
    state.mobile = val
  },
  set_product_id(state, val) {
    state.product_id = val
  },
  set_showProduct(state, val) {
    state.showProduct = val
  },
  set_gear_list(state, data) {
    state.gear_list = data
    state.category_list = []
  },
  set_category_list(state, data) {
    state.gear_list = []
    state.category_list = data
  },
  inverse(state, name) {
    state[name] = !state[name]
  },
  menu_fix(state, val) {
    state.menu_fixed = val
  },
  quick_search(state, val) {
    state.quick_search = val
  },
  set_search(state, search) {
    state.global_search = search
  },
  set_vendor_list(state, val) {
    state.vendor_list = val
  },
  set_selection_mode(state, val) {
    state.selection_mode = val
  },
  set_history(state, val) {
    state.history = val
  },
  set_product_list(state, val) {
    state.product_list = val
  },
  set_model_list(state, val) {
    state.model_list = val
  },
  set_generation_list(state, val) {
    state.generation_list = val
  },
  set_order(state, val) {
    Object.assign(state.order, val)
  },
  set_menu_items(state, val) {
    state.menu_items = val
  }
}

export const actions = {
  nuxtServerInit({ dispatch, commit }, { req }) { // eslint-disable-line consistent-return
    // const accessToken = parseCookies(req)['feathers-jwt']
    // console.log('nuxtServerInit', accessToken);
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  },
  nuxtClientInit ({ state, dispatch, commit }, context) {
    // Run the authentication with the access token hydrated from the server store
    hydrateApi({ api: models.api })

    if (state.auth.accessToken) {
      return dispatch('auth/onInitAuth', state.auth.payload)
    }
  },
  get_menu_items({ state, commit }) {
    const menu = []
    if (state.auth.user) {
      const isCompany = state.auth.user.company ? true : false
      menu.push({ to: "/account/", name: "Профиль" })
      menu.push({ to: "/account/history", name: "История заказов" })
      if (isCompany) {
        menu.push({ to: "/account/requisites", name: "Реквизиты", remain: true })
        menu.push({ to: "/account/delivery", name: "Пункты разгрузки" })
        menu.push({ to: "/account/employees", name: "Сотрудники" })
        menu.push({ to: "/account/additionally", name: "Дополнительно" })
      }
      menu.push({ to: "/auth/logout", name: "Выход" })
    }
    commit('set_menu_items', menu)
  },
  order_save({ dispatch, state }) {
    return dispatch('orders/create', state.order)
  },
  get_vendors({ dispatch, commit, state }, category) {
    commit('set_vendor_list', [])
    commit('set_selection_mode', 'vendors')
    const history = state.history.slice(0, 0)
    history.push({ dispatch: 'get_vendors', data: category, name: category.name })
    commit('set_history', history)
    dispatch('vendors/find', { query: { $limit: null, $sort: 'name', categories: category._id } }).then(res => {
      commit('set_vendor_list', res.data || [])
    })
    .catch(error => console.log('get_vendors error:', error))
  },
  get_models({ dispatch, commit, state }, { vendor, category_id }) {
    commit('set_model_list', [])
    commit('set_selection_mode', 'models')
    const history = state.history.slice(0, 1)
    history.push({ dispatch: 'get_models', data: { vendor, category_id }, name: vendor.name })
    commit('set_history', history)
    dispatch('models/find', { query: { $limit: null, $sort: 'name', vendor: vendor, category: category_id } }).then(res => {
      if (res.data && res.data.length) commit('set_model_list', res.data)
    })
    .catch(error => console.log('get_models error:', error))
  },
  get_generations({ dispatch, commit, state }, model) {
    commit('set_generation_list', [])
    commit('set_selection_mode', 'generations')
    const history = state.history.slice(0, 2)
    history.push({ dispatch: 'get_generations', data: model, name: model.name })
    commit('set_history', history)
    dispatch('generations/find', { query: { $limit: null, $sort: 'name', model } }).then(res => {
      commit('set_generation_list', res.data || [])
    })
    .catch(error => console.log('generation_list error:', error))
  },
  async get_gears({ dispatch, commit, state }, generation) {
    let res, model, vendor, category
    history = []
    history.push({ dispatch: 'get_gears', data: generation, name: generation.name })
    if (generation.model._id) model = generation.model
    else model = await dispatch('models/get', generation.model)
    const category_id = model.category
    state.history.unshift({ dispatch: 'get_generations', data: model, name: model.name })
    vendor = await dispatch('vendors/get', model.vendor)
    state.history.unshift({ dispatch: 'get_models', data: { vendor, category_id }, name: vendor.name })
    category = state.category_list.find(cat => cat._id === category_id)
    if (category) history.unshift({ dispatch: 'get_vendors', data: category, name: category.name })
    commit('set_history', history)

    commit('set_selection_mode', 'gears')
    commit('set_gear_list', generation.gears)

    // заполняем информацию по продуктам
    commit('set_product_list', [])
    let articles = []
    generation.gears.forEach(gear => {
      gear.products && gear.products.forEach(product => {
        if (articles.indexOf(product) == -1) articles.push(product)
      })
    })
    if (articles.length) {
      dispatch('items/find', { query: { $limit: null, article: { $in: articles } } }).then(res => {
        commit('set_product_list', res.data)
      })
      .catch(error => console.log('get_gears error:', error))
    }
  },
  category_menu_find({ dispatch, commit, state }) {
    dispatch('categories/find', { query: { $limit: null, $sort: 'name', parent: 0 } }).then(res => {
      commit('set_category_menu', res.data || [])
      commit('set_gear_list', [])
      commit('set_category_list', [])
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
    history = []
    const add_history = async (id) => {
      let cat
      if (id) cat = await dispatch('categories/get', id)
      else return
      if (cat.parent) {
        history.unshift(cat)
        add_history(cat.parent)
      }
    }
    add_history(category._id)
    commit('set_history', history)

    commit('set_category_id', category._id)
    if (category.isItem) {
      dispatch('gears_find', { parent: category._id })
    }
    else {
      dispatch('categories_find', { parent: category._id })
    }
  }
}
