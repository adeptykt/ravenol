import { useUIStore } from '~/stores/ui'
import { useConstantsService } from './useFeathersService'

export const useConstants = () => {
  const uiStore = useUIStore()
  const constantsService = useConstantsService()
  
  const loadConstants = async () => {
    try {
      const response = await constantsService.find({})
      if (response && Array.isArray(response) && response.length > 0) {
        const settings = response[0]
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

