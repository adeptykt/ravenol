import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import feathersStorage from '@/utils/feathers-storage'
import io from 'socket.io-client'

const socket = io('http://localhost:3030', { transports: ['websocket'] })
// const socket = io('https://ravenol-server.herokuapp.com', { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: feathersStorage }))

export default feathersClient
