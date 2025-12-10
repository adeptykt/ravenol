import { useFeathers } from '~/composables/useFeathers'

// Вспомогательная функция для ожидания подключения сокета
const waitForSocketConnection = (socket: any, timeout = 5000): Promise<void> => {
  return new Promise((resolve) => {
    if (socket.connected) {
      resolve()
      return
    }

    const timer = setTimeout(() => {
      socket.off('connect', onConnect)
      console.warn('Socket connection timeout, continuing anyway')
      resolve()
    }, timeout)

    const onConnect = () => {
      clearTimeout(timer)
      socket.off('connect', onConnect)
      resolve()
    }

    socket.on('connect', onConnect)
  })
}

export const useItems = () => {
  const feathers = useFeathers()
  
  const find = async (params: any) => {
    if (!feathers) {
      throw new Error('FeathersJS client is not available')
    }
    
    // Получаем сокет из FeathersJS клиента (сохранен в плагине)
    const socket = (feathers as any).io
    
    // Ждем подключения сокета перед выполнением запроса (только если сокет существует и не подключен)
    if (socket && typeof socket.connected !== 'undefined' && !socket.connected) {
      await waitForSocketConnection(socket)
    }
    
    try {
      const itemsService = feathers.service('items')
      
      // Extract pagination parameters from query if they exist
      const query = params.query || params
      const { $skip, $limit, $sort, ...queryParams } = query
      
      // Build the correct FeathersJS query format
      const feathersQuery: any = { query: queryParams }
      if ($skip !== undefined) feathersQuery.$skip = $skip
      if ($limit !== undefined) feathersQuery.$limit = $limit
      if ($sort !== undefined) feathersQuery.$sort = $sort
      
      // Для публичных запросов отключаем автоматическую аутентификацию
      feathersQuery.authenticated = false
      
      const result = await itemsService.find(feathersQuery)
      return result
    } catch (error) {
      console.error('Items find error:', error)
      throw error
    }
  }
  
  const get = async (id: string) => {
    if (!feathers) {
      throw new Error('FeathersJS client is not available')
    }
    
    // Получаем сокет из FeathersJS клиента (сохранен в плагине)
    const socket = (feathers as any).io
    
    // Ждем подключения сокета перед выполнением запроса (только если сокет существует и не подключен)
    if (socket && typeof socket.connected !== 'undefined' && !socket.connected) {
      await waitForSocketConnection(socket)
    }
    
    try {
      const itemsService = feathers.service('items')
      // Для публичных запросов отключаем автоматическую аутентификацию
      const result = await itemsService.get(id, { authenticated: false })
      return result
    } catch (error) {
      console.error('Items get error:', error)
      throw error
    }
  }
  
  return {
    find,
    get
  }
}

