import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    view_items: 0,
    sort_items: 0
  }),
  
  getters: {
    viewItems: (state) => state.view_items,
    sortItems: (state) => state.sort_items
  },
  
  actions: {
    set(setting: 'view_items' | 'sort_items', value: number) {
      this[setting] = value
    }
  },
  
  persist: {
    storage: process.client ? localStorage : undefined,
    paths: ['view_items', 'sort_items']
  }
})

