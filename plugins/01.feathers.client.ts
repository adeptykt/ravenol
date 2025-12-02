import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import Cookies from 'js-cookie'

// Create storage adapter for FeathersJS auth using js-cookie
const cookieStorage = {
  getItem: (key: string) => Cookies.get(key) || null,
  setItem: (key: string, value: string) => {
    Cookies.set(key, value, { expires: 365 }) // 1 year expiration
  },
  removeItem: (key: string) => {
    Cookies.remove(key)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.server) {
    return {
      provide: {
        feathers: null
      }
    }
  }

  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  // Create socket connection (only on client)
  const socket = io(apiUrl, { 
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
  })
  
  const transport = socketio(socket)

  // Create FeathersJS client
  const feathersClient = feathers()
    .configure(transport)
    .configure(auth({ storage: cookieStorage }))

  // Handle socket connection events
  socket.on('connect', () => {
    console.log('FeathersJS socket connected')
  })

  socket.on('disconnect', () => {
    console.log('FeathersJS socket disconnected')
  })

  socket.on('connect_error', (error) => {
    console.error('FeathersJS socket connection error:', error)
  })

  // Make FeathersJS client available throughout the app
  // In Nuxt 3, return provide object to make it available via $feathers
  return {
    provide: {
      feathers: feathersClient
    }
  }
})

