import { useUIStore } from '~/stores/ui'

export const useConstants = () => {
  const uiStore = useUIStore()
  
  const loadConstants = async () => {
    // Only load on client side
    if (process.server) {
      return
    }
    
    try {
      const constantsService = useConstantsService()
      if (!constantsService) {
        console.warn('Constants service not available (FeathersJS not loaded)')
        return
      }
      
      const response = await constantsService.find({}) as any
      const data = Array.isArray(response) ? response : response.data || []
      
      if (data && Array.isArray(data) && data.length > 0) {
        const settings = data[0]
        uiStore.setStoreId(settings.store || '')
        uiStore.setPriceType(settings.price_type || '')
      }
    } catch (error) {
      console.error('Error loading constants:', error)
      // Don't throw error, just log it
    }
  }
  
  return {
    loadConstants
  }
}

