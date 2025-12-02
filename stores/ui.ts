import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    mobile: false,
    menu_fixed: false,
    quick_search: false,
    product_id: null as string | null,
    showProduct: false,
    showRegister: false,
    showLogin: false,
    showProfile: false,
    showAuthorization: false,
    showReset: false,
    gear_list: [] as any[],
    category_menu: [] as any[],
    category_id: 0,
    history: [] as any[],
    category_list: [
      { _id: 1, name: 'Автомобили', value: 'auto' },
      { _id: 3, name: 'Мотоциклы', value: 'moto' },
      { _id: 2, name: 'Фургоны', value: 'furg' },
      { _id: 4, name: 'Грузовики', value: 'gruz' },
      { _id: 5, name: 'Сельхозтехника', value: 'sel' },
      { _id: 6, name: 'Спецтехника', value: 'spec' }
    ],
    vendor_list: [] as any[],
    model_list: [] as any[],
    generation_list: [] as any[],
    product_list: [] as any[],
    global_search: '',
    order: {} as any,
    menu_items: [] as any[],
    storeId: '',
    price_type: '',
    selection_mode: '',
    categories_: [] as any[],
    tree: [] as any[]
  }),
  
  getters: {
    priceType: (state) => {
      const authStore = useAuthStore()
      if (authStore.user?.price_type) return authStore.user.price_type
      return state.price_type
    },
    
    store: (state) => {
      const authStore = useAuthStore()
      if (authStore.user?.storeId) return authStore.user.storeId
      return state.storeId
    }
  },
  
  actions: {
    setMobile(val: boolean) {
      this.mobile = val
    },
    
    setProductId(val: string | null) {
      this.product_id = val
    },
    
    setShowProduct(val: boolean) {
      this.showProduct = val
    },
    
    setGearList(data: any[]) {
      this.gear_list = data
      this.category_list = []
    },
    
    setCategoryList(data: any[]) {
      this.gear_list = []
      this.category_list = data
    },
    
    inverse(name: keyof typeof this.$state) {
      const current = this[name] as boolean
      this[name] = !current as any
    },
    
    setMenuFix(val: boolean) {
      this.menu_fixed = val
    },
    
    setQuickSearch(val: boolean) {
      this.quick_search = val
    },
    
    setSearch(search: string) {
      this.global_search = search
    },
    
    setVendorList(val: any[]) {
      this.vendor_list = val
    },
    
    setSelectionMode(val: string) {
      this.selection_mode = val
    },
    
    setHistory(val: any[]) {
      this.history = val
    },
    
    setProductList(val: any[]) {
      this.product_list = val
    },
    
    setModelList(val: any[]) {
      this.model_list = val
    },
    
    setGenerationList(val: any[]) {
      this.generation_list = val
    },
    
    setOrder(val: any) {
      Object.assign(this.order, val)
    },
    
    setMenuItems(val: any[]) {
      this.menu_items = val
    },
    
    setStoreId(val: string) {
      this.storeId = val
    },
    
    setPriceType(val: string) {
      this.price_type = val
    },
    
    setCategories(val: any[]) {
      this.categories_ = val
    },
    
    setCategoryId(val: number) {
      this.category_id = val
    },
    
    setState(name: string, val: any) {
      (this as any)[name] = val
    }
  }
})

