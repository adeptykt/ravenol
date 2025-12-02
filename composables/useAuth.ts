import { useAuthStore } from '~/stores/auth'
import { useFeathers } from './useFeathers'

export const useAuth = () => {
  const authStore = useAuthStore()
  const feathers = useFeathers()
  
  const authenticate = async (strategy: string, accessToken?: string) => {
    try {
      const result = await feathers.authenticate({
        strategy,
        accessToken: accessToken || authStore.accessToken
      })
      
      authStore.setAuth(result.accessToken, result.payload)
      
      // Get user data
      const userService = feathers.service('users')
      const user = await userService.get(result.payload.userId)
      authStore.setUser(user)
      
      return result
    } catch (error) {
      console.error('Authentication error:', error)
      authStore.logout()
      throw error
    }
  }
  
  const logout = async () => {
    try {
      await feathers.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      authStore.logout()
    }
  }
  
  const reAuthenticate = async () => {
    if (!authStore.accessToken) return false
    
    try {
      await authenticate('jwt', authStore.accessToken)
      return true
    } catch (error) {
      return false
    }
  }
  
  return {
    authenticate,
    logout,
    reAuthenticate,
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.currentUser)
  }
}

