import axios from 'axios'

// Aggregate endpoint is an Express route, not a Feathers service.
// Вызываем его напрямую через axios БЕЗ токена авторизации.
export const useAggregate = () => {
  const find = async (params: any) => {
    try {
      const baseUrl = (process.env.API_URL || '').replace(/\/+$/, '')
      const url = baseUrl ? `${baseUrl}/aggregate` : '/aggregate'

      const response = await axios.get(url, {
        params,
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

