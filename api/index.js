import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import feathersStorage from '@/utils/feathers-storage'
import io from 'socket.io-client'

const socket = io(context.env.apiUrl, { transports: ['websocket'] })
// const socket = io('https://ravenol-server.herokuapp.com', { transports: ['websocket'] })
console.log('Api server:', context.env.apiUrl);

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: feathersStorage }))

export default feathersClient
