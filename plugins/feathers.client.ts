import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

export default defineNuxtPlugin((nuxtApp) => {
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
  const storage = new CookieStorage()

  // Create FeathersJS client
  const feathersClient = feathers()
    .configure(transport)
    .configure(auth({ storage }))

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
  nuxtApp.provide('feathers', feathersClient)

  return {
    provide: {
      feathers: feathersClient
    }
  }
})

