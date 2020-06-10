import feathers from '@feathersjs/feathers'
// import rest from '@feathersjs/rest-client'
import axios from 'axios'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'
// import feathersStorage from '@/utils/feathers-storage'
import feathersVuex, { initAuth, hydrateApi } from 'feathers-vuex'

// Get the api url from the environment variable
const apiUrl = process.env.API_URL
let socket
let restClient

// We won't use socket to comunicate from server to server
// if (process.client) {
  socket = io(apiUrl, { transports: ['websocket'] })
// } else {
//   restClient = rest(apiUrl)
// }
// const transport = process.client ? socketio(socket) : restClient.axios(axios)
const transport = socketio(socket)
const storage = new CookieStorage()
// const storage = feathersStorage

const feathersClient = feathers()
  .configure(transport)
  .configure(auth({ storage }))

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(
  feathersClient,
  {
    serverAlias: 'api',
    idField: '_id', // Must match the id field in your database table/collection
    whitelist: ['$regex', '$options'],
    enableEvents: process.client // Prevent memory leak
  }
)

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex, initAuth, hydrateApi }
