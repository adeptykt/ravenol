import { useFeathers } from '~/composables/useFeathers'

export const useTempUsers = () => {
  const feathers = useFeathers()
  
  const create = async (user: { email: string; password: string }) => {
    try {
      const tempUsersService = feathers.service('tempusers')
      const result = await tempUsersService.create(user)
      return result
    } catch (error) {
      console.error('Temp user creation error:', error)
      throw error
    }
  }
  
  return {
    create
  }
}

