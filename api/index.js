import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import feathersStorage from '@/utils/feathers-storage'
import io from 'socket.io-client'

const socket = io(process.env.apiUrl, { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: feathersStorage, aud: 'web' }))

export default feathersClient
