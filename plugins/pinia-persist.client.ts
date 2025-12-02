import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(createPersistedState({
    storage: localStorage,
    paths: ['cart.list', 'settings.view_items', 'settings.sort_items', 'viewed.list']
  }))
})

