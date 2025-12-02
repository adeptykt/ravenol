import type { Application, Service } from '@feathersjs/feathers'

export function useFeathersService<T = any>(serviceName: string): Service<T> {
  const feathers = useFeathers()
  return feathers.service(serviceName)
}

// Helper composables for specific services
export const useItemsService = () => useFeathersService('items')
export const useCategoriesService = () => useFeathersService('categories')
export const useOrdersService = () => useFeathersService('orders')
export const useUsersService = () => useFeathersService('users')
export const useBannersService = () => useFeathersService('banners')
export const useSearchService = () => useFeathersService('search')
export const useConstantsService = () => useFeathersService('constants')
export const useVendorsService = () => useFeathersService('vendors')
export const useModelsService = () => useFeathersService('models')
export const useGenerationsService = () => useFeathersService('generations')
export const useGearsService = () => useFeathersService('gears')
export const useAggregateService = () => useFeathersService('aggregate')

