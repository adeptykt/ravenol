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
    service('search')
  ],
  state: {},
  actions: {
    nuxtServerInit({ dispatch }, { req }) { // eslint-disable-line consistent-return
      const accessToken = parseCookies(req)['feathers-jwt'];

      if (accessToken) {
        return dispatch('auth/authenticate', { strategy: 'jwt', accessToken });
      }
    },
  },
})

export default () => store
