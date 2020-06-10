import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Register extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Register'
}
const servicePath = 'registers'
const servicePlugin = makeServicePlugin({
  Model: Register,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
