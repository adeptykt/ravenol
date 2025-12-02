import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  
  const authenticate = async (strategy: string, accessToken?: string, credentials?: { email?: string; password?: string }) => {
    try {
      const { $feathers } = useNuxtApp()
      const feathers = $feathers as any
      
      const authParams: any = { strategy }
      if (accessToken) {
        authParams.accessToken = accessToken
      } else if (credentials) {
        Object.assign(authParams, credentials)
      }
      
      const result = await feathers.authenticate(authParams)
      
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
      const { $feathers } = useNuxtApp()
      const feathers = $feathers as any
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

