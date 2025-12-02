import { defineStore } from 'pinia'

export interface User {
  _id: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  company?: boolean
  price_type?: string
  storeId?: string
  [key: string]: any
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    payload: null as any,
    user: null as User | null,
    publicPages: [
      'index',
      'auth',
      'about',
      'cart',
      'register',
      'categories-id',
      'contacts',
      'delivery',
      'oferta',
      'privacy',
      'police',
      'products-id',
      'email-verification-id'
    ]
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.payload,
    currentUser: (state) => state.user,
    priceType: (state) => state.user?.price_type || '',
    storeId: (state) => state.user?.storeId || ''
  },
  
  actions: {
    setAuth(accessToken: string | null, payload: any) {
      this.accessToken = accessToken
      this.payload = payload
    },
    
    setUser(user: User | null) {
      this.user = user
    },
    
    logout() {
      this.accessToken = null
      this.payload = null
      this.user = null
    },
    
    isPublicPage(routeName: string): boolean {
      return this.publicPages.includes(routeName)
    }
  }
})

