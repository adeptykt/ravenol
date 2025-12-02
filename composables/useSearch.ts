export const useSearch = () => {
  const { $feathers } = useNuxtApp()
  const feathers = $feathers as any
  
  const find = async (query: any) => {
    try {
      const itemsService = feathers.service('items')
      const result = await itemsService.find({ query })
      return result
    } catch (error) {
      console.error('Search error:', error)
      throw error
    }
  }
  
  return {
    find
  }
}

