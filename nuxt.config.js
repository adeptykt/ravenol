var webpack = require('webpack')
require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    API_URL: 'https://indexol.ru/',
    youtube_key: 'AIzaSyAyQ36PQvHfsjTC0-S5M3XI0Y4ICYva3x0',
    IMAGE_PREFIX: process.env.IMAGE_PREFIX,
    RK_ID: process.env.RK_ID,
    RK_PASSWORD: process.env.RK_PASSWORD,
    IS_TEST: false
  },
  server: {
    port: process.env.PORT
  },
  head: {
    title: 'indexol',
    titleTemplate: '%s - indexol.ru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Оптовая и розничная продажа автомасел и автохимии' },
      { name: 'yandex-verification', content: '66b3d90705a4443e' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    { src: '~plugins/feathers-vuex' },
    { src: '~plugins/feathers' },
    { src: '~plugins/prototypes.js' },
    { src: '~plugins/vue-notifications', mode: 'client' }
  ],
  middleware: [
    'middleware/feathers.js'
  ],
  modules: [
    'nuxt-client-init-module',
    ['nuxt-vuex-localstorage', { localStorage: ['cart', 'settings', 'viewed'] }],
    '@nuxtjs/font-awesome',
    ['@nuxtjs/svg-sprite', { input: process.env.SVG_PATH }],
    'nuxt-webfontloader',
    [
      '@naumstory/nuxtjs-yandex-metrika',
      {
        id: '64477855',
        webvisor: true
      }
    ]
  ],
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-57404986-5'
    }]
  ],
  webfontloader: {
    google: {
      families: ['Roboto:300,400,500,700|Material+Icons']
    }
  },
  loading: { color: '#3B8070' },
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery'
      })
    ],
    transpile: ['nuxt-vuex-localstorage', 'feathers-vuex'],
    babel: {
      plugins: [
        ['transform-imports']
      ]
    },
    vendor: [
      '@feathersjs/feathers',
      '@feathersjs/socketio-client',
      '@feathersjs/authentication-client',
      'socket.io-client',
      'axios',
      'vue-notifications'
    ],
    extractCSS: true,
    extend (config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'autoprefixer': {}
      }
    }
  }
}
