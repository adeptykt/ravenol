import { useUIStore } from '~/stores/ui'
import { useFeathersService } from '~/composables/useFeathersService'

export const useCategories = () => {
  const uiStore = useUIStore()
  
  const loadCategories = async () => {
    try {
      const categoriesService = useFeathersService('categories')
      const response = await categoriesService.find({ paginate: false }) as any
      const data = Array.isArray(response) ? response : response.data || []
      
      const categories: any[] = []
      const tree: any[] = []
      const root = { id: 0, children: tree }
      const stack = [...data]
      
      while (stack.length > 0) {
        const item = stack.shift()!
        const child = { id: item._id, name: item.name, children: [] }
        
        if (item.parent && item.parent !== "00000000-0000-0000-0000-000000000000") {
          const find = categories.find(e => e.id === item.parent)
          if (!find) {
            stack.push(item)
          } else {
            child.parent = find
          }
        } else {
          child.parent = root
        }
        
        if (child.parent) {
          child.parent.children.push(child)
          categories.push(child)
        }
      }
      
      uiStore.setCategories(categories)
      uiStore.setState('tree', tree)
      
      return { categories, tree }
    } catch (error) {
      console.error('Error loading categories:', error)
      throw error
    }
  }
  
  return {
    loadCategories,
    categories: computed(() => uiStore.categories_),
    tree: computed(() => uiStore.tree)
  }
}

