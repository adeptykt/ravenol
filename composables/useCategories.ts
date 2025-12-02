import { useUIStore } from '~/stores/ui'
import { useCategoriesService } from './useFeathersService'

export const useCategories = () => {
  const uiStore = useUIStore()
  const categoriesService = useCategoriesService()
  
  const loadCategories = async () => {
    try {
      const response = await categoriesService.find({ paginate: false })
      const categories: any[] = []
      const tree: any[] = []
      const root = { id: 0, children: tree }
      const stack = [...response]
      
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

