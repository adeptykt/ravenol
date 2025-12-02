// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-01-01',
  
  // Runtime config (заменяет env)
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://indexol.ru/',
      youtubeKey: process.env.youtube_key || 'AIzaSyAyQ36PQvHfsjTC0-S5M3XI0Y4ICYva3x0',
      imagePrefix: process.env.IMAGE_PREFIX || '',
      yandexMetrikaId: '64477855',
      googleAnalyticsId: 'UA-57404986-5',
      yandexVerification: '66b3d90705a4443e'
    },
    rkId: process.env.RK_ID,
    rkPassword: process.env.RK_PASSWORD,
    isTest: false
  },

  // App config
  app: {
    head: {
      title: 'indexol',
      titleTemplate: '%s - indexol.ru',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Оптовая и розничная продажа автомасел и автохимии' },
        { name: 'yandex-verification', content: '66b3d90705a4443e' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // CSS
  css: [],

  // Plugins
  plugins: [
    { src: '~/plugins/feathers.client.ts', mode: 'client' },
    { src: '~/plugins/prototypes.ts' },
    { src: '~/plugins/vue-notifications.client.ts', mode: 'client' }
  ],

  // Modules
  modules: [
    '@pinia/nuxt'
    // Note: Some modules need to be checked for Nuxt 3 compatibility
    // '@nuxtjs/google-analytics' - check compatibility
    // '@nuxtjs/fontawesome' - check compatibility  
    // '@nuxtjs/svg-sprite' - check compatibility
    // '@nuxtjs/webfontloader' - may be replaced with built-in
  ],

  // Module configuration
  // googleAnalytics: {
  //   id: 'UA-57404986-5'
  // },

  // webfontloader: {
  //   google: {
  //     families: ['Roboto:300,400,500,700', 'Material+Icons']
  //   }
  // },

  // Build configuration
  // build.transpile removed in Nuxt 3 (handled automatically)

  // Vite configuration (Nuxt 3 uses Vite by default)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        },
        stylus: {
          additionalData: ''
        }
      }
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false
  },

  // SSR
  ssr: true,

  // Experimental features
  experimental: {
    payloadExtraction: false
  }
})

