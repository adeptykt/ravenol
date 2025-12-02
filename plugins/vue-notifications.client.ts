import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

// Configure mini-toastr types
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

// Initialize mini-toastr
miniToastr.init({ types: toastTypes })

// Toast function that maps to mini-toastr
const toast = function ({ title, message, type, timeout, cb }: any) {
  return miniToastr[type as keyof typeof miniToastr](message, title, timeout, cb)
}

// Binding for methods .success(), .error() and etc.
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

export default defineNuxtPlugin((nuxtApp) => {
  // Vue 3 way to use plugins
  // Note: vue-notifications may need Vue 3 compatible version
  // If issues occur, consider using @vueuse/core or vue-toastification
  try {
    nuxtApp.vueApp.use(VueNotifications, options)
  } catch (error) {
    console.error('Error initializing vue-notifications:', error)
    console.warn('Consider migrating to vue-toastification or @vueuse/core for Vue 3 compatibility')
  }
})

