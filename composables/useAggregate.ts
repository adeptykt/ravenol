import axios from 'axios'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'

// Aggregate endpoint is an Express route, not a Feathers service.
// We call it directly via axios and передаём JWT в заголовке Authorization.
export const useAggregate = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const find = async (params: any) => {
    try {
      const baseUrl = (config.public.apiUrl || '').replace(/\/+$/, '')
      const url = `${baseUrl}/aggregate`

      const headers: Record<string, string> = {}
      if (authStore.accessToken) {
        headers.Authorization = `Bearer ${authStore.accessToken}`
      }

      const response = await axios.get(url, {
        params,
        headers,
        withCredentials: true
      })

      return response.data
    } catch (error) {
      console.error('Aggregate find error:', error)
      throw error
    }
  }

  return {
    find
  }
}

