import { useUIStore } from '~/stores/ui'

export const useConstants = () => {
  const uiStore = useUIStore()
  
  const loadConstants = async () => {
    try {
      const constantsService = useConstantsService()
      const response = await constantsService.find({}) as any
      const data = Array.isArray(response) ? response : response.data || []
      
      if (data && Array.isArray(data) && data.length > 0) {
        const settings = data[0]
        uiStore.setStoreId(settings.store || '')
        uiStore.setPriceType(settings.price_type || '')
      }
    } catch (error) {
      console.error('Error loading constants:', error)
      throw error
    }
  }
  
  return {
    loadConstants
  }
}

