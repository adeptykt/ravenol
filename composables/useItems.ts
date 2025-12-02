import { useFeathers } from '~/composables/useFeathers'

export const useItems = () => {
  const feathers = useFeathers()
  
  const find = async (query: any) => {
    try {
      const itemsService = feathers.service('items')
      const result = await itemsService.find({ query })
      return result
    } catch (error) {
      console.error('Items find error:', error)
      throw error
    }
  }
  
  const get = async (id: string) => {
    try {
      const itemsService = feathers.service('items')
      const result = await itemsService.get(id)
      return result
    } catch (error) {
      console.error('Items get error:', error)
      throw error
    }
  }
  
  return {
    find,
    get
  }
}

