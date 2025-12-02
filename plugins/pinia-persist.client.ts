import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  // This plugin only runs on client, so localStorage is safe
  if (process.client && typeof localStorage !== 'undefined') {
    $pinia.use(createPersistedState({
      storage: localStorage,
      paths: ['cart.list', 'settings.view_items', 'settings.sort_items', 'viewed.list']
    }))
  }
})

