import { defineNuxtPlugin } from '#app'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

// If using mini-toastr, provide additional configuration
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({ types: toastTypes })

// Here we setup messages output to `mini-toastr`
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
  nuxtApp.vueApp.use(VueNotifications, options)
})

