import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    list: [] as CartItem[]
  }),
  
  getters: {
    items: (state) => state.list,
    count: (state) => state.list.length,
    totalItems: (state) => state.list.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  actions: {
    add(item: { _id: string, quantity: number }) {
      if (item.quantity <= 0) return
      const element = this.list.find(x => x.id === item._id)
      if (element === undefined) {
        this.list.push({ id: item._id, quantity: item.quantity })
      } else {
        element.quantity = item.quantity
      }
    },
    
    delete(id: string) {
      const index = this.list.findIndex(x => x.id === id)
      if (index > -1) {
        this.list.splice(index, 1)
      }
    },
    
    clear() {
      this.list = []
    },
    
    getQuantity(id: string): number {
      const item = this.list.find(x => x.id === id)
      return item ? item.quantity : 0
    }
  },
  
  persist: {
    storage: process.client ? localStorage : undefined,
    paths: ['list']
  }
})

