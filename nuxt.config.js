// import TerserPlugin from 'terser-webpack-plugin'
var webpack = require('webpack')
var path = require('path')
require('dotenv').config()

export default {
  env: {
    // apiUrl: process.env.API_URI || 'http://localhost:3030'
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
   /*
  ** Headers of the page
  */
  head: {
    title: 'indexol',
    titleTemplate: '%s - indexol.ru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Оптовая и розничная продажа автомасел и автохимии' },
      { name: 'yandex-verification', content: '66b3d90705a4443e' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    { src: '~plugins/feathers-vuex' },
    { src: '~plugins/feathers' },
    { src: '~plugins/prototypes.js' },
    { src: '~plugins/vue-notifications', mode: 'client' },
    { src: '~plugins/youtube', mode: 'client' },
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
        webvisor: true,
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ]
  ],
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-57404986-5'
    }],
  ],
  webfontloader: {
    google: {
      families: ['Roboto:300,400,500,700|Material+Icons']
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  // '~plugins/htmlEditor',
  build: {
    // analyze: true,
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
    /*
    ** Run ESLint on save
    */
    // extend (config, {isDev}) {
    //   if (isDev && process.client) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
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
        'autoprefixer': {},
      }
    },
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       cache: true,
    //       parallel: false
    //     })
    //   ]
    // }
  }
}
