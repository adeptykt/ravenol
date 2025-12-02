import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useCategories } from '~/composables/useCategories'
import { useConstants } from '~/composables/useConstants'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize stores
  const authStore = useAuthStore()
  const uiStore = useUIStore()
  const { loadCategories } = useCategories()
  const { loadConstants } = useConstants()
  const { reAuthenticate } = useAuth()

  // Load constants and categories
  try {
    await Promise.all([
      loadConstants(),
      loadCategories()
    ])
  } catch (error) {
    console.error('Error initializing app:', error)
  }

  // Re-authenticate if token exists (from cookies)
  const cookies = useCookie('feathers-jwt')
  if (cookies.value && !authStore.accessToken) {
    try {
      const { $feathers } = useNuxtApp()
      const feathers = $feathers as any
      
      // Try to authenticate with existing token
      const result = await feathers.authenticate({
        strategy: 'jwt',
        accessToken: cookies.value
      })
      
      authStore.setAuth(result.accessToken, result.payload)
      
      // Get user data
      const userService = feathers.service('users')
      const user = await userService.get(result.payload.userId)
      authStore.setUser(user)
    } catch (error) {
      console.error('Re-authentication error:', error)
      // Clear invalid token
      cookies.value = null
    }
  }
})

