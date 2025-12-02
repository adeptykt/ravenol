import { useFeathers } from '~/composables/useFeathers'

export const useAuthReset = () => {
  const feathers = useFeathers()
  
  const resetPassword = async (email: string) => {
    try {
      // Assuming there's an auth-reset service or endpoint
      // This might need to be adjusted based on your backend API
      const authResetService = feathers.service('auth-reset')
      const result = await authResetService.create({ email })
      return result
    } catch (error) {
      console.error('Password reset error:', error)
      throw error
    }
  }
  
  return {
    resetPassword
  }
}

