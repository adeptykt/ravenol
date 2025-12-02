import { useUIStore } from '~/stores/ui'
import { useFeathers } from '~/composables/useFeathers'

export const useModels = () => {
  const uiStore = useUIStore()
  const feathers = useFeathers()
  
  const getModels = async (vendor: string, categoryId: number) => {
    try {
      uiStore.setModelList([])
      uiStore.setSelectionMode('models')
      
      const modelsService = feathers.service('models')
      const result = await modelsService.find({
        query: {
          $limit: null,
          $sort: 'name',
          vendor,
          category_id: categoryId
        }
      })
      
      uiStore.setModelList(result.data || [])
      return result
    } catch (error) {
      console.error('get_models error:', error)
      throw error
    }
  }
  
  const getGenerations = async (model: any) => {
    try {
      uiStore.setGenerationList([])
      uiStore.setSelectionMode('generations')
      
      const history = [...uiStore.history.slice(0, 2)]
      history.push({ dispatch: 'get_generations', data: model, name: model.name })
      uiStore.setHistory(history)
      
      const generationsService = feathers.service('generations')
      const result = await generationsService.find({
        query: {
          $limit: null,
          $sort: 'name',
          model: model._id || model
        }
      })
      
      uiStore.setGenerationList(result.data || [])
      return result
    } catch (error) {
      console.error('generation_list error:', error)
      throw error
    }
  }
  
  return {
    getModels,
    getGenerations
  }
}

