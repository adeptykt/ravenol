import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  // Create socket connection (only on client)
  const socket = io(apiUrl, { transports: ['websocket'] })
  const transport = socketio(socket)
  const storage = new CookieStorage()

  // Create FeathersJS client
  const feathersClient = feathers()
    .configure(transport)
    .configure(auth({ storage }))

  // Make FeathersJS client available throughout the app
  nuxtApp.provide('feathers', feathersClient)

  return {
    provide: {
      feathers: feathersClient
    }
  }
})

