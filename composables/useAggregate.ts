import { useFeathers } from '~/composables/useFeathers'

export const useAggregate = () => {
  const feathers = useFeathers()
  
  const find = async (query: any) => {
    try {
      const aggregateService = feathers.service('aggregate')
      const result = await aggregateService.find({ query })
      return result
    } catch (error) {
      console.error('Aggregate find error:', error)
      throw error
    }
  }
  
  return {
    find
  }
}

