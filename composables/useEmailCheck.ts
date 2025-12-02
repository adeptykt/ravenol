import { useFeathers } from '~/composables/useFeathers'

export const useEmailCheck = () => {
  const feathers = useFeathers()
  
  const checkEmail = async (email: string) => {
    try {
      const checkEmailService = feathers.service('check-email')
      const result = await checkEmailService.get(email)
      return result
    } catch (error) {
      console.error('Email check error:', error)
      throw error
    }
  }
  
  return {
    checkEmail
  }
}

