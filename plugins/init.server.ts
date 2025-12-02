import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useCategories } from '~/composables/useCategories'
import { useConstants } from '~/composables/useConstants'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize stores
  const authStore = useAuthStore()
  const uiStore = useUIStore()
  const { loadCategories } = useCategories()
  const { loadConstants } = useConstants()

  // Load constants and categories on server
  try {
    await Promise.all([
      loadConstants(),
      loadCategories()
    ])
  } catch (error) {
    console.error('Error initializing app on server:', error)
  }

  // Note: Server-side authentication with FeathersJS may require REST client
  // For now, authentication will be handled on client side
  // Token will be read from cookies on client in init.client.ts
})

function parseCookies(req: any): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (req?.headers?.cookie) {
    req.headers.cookie.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=')
      const name = parts.shift()?.trim()
      const value = parts.join('=')
      if (name) {
        cookies[name] = decodeURIComponent(value)
      }
    })
  }
  return cookies
}

