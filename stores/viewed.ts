import { defineStore } from 'pinia'

export const useViewedStore = defineStore('viewed', {
  state: () => ({
    list: [] as string[]
  }),
  
  getters: {
    items: (state) => state.list,
    count: (state) => state.list.length
  },
  
  actions: {
    add(id: string) {
      if (!id) return
      const index = this.list.indexOf(id)
      if (index > -1) {
        this.list.splice(index, 1)
      }
      this.list.push(id)
    },
    
    clear() {
      this.list = []
    },
    
    has(id: string): boolean {
      return this.list.includes(id)
    }
  },
  
  persist: {
    storage: process.client ? localStorage : undefined,
    paths: ['list']
  }
})

