import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Generation extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Generation'
}
const servicePath = 'generations'
const servicePlugin = makeServicePlugin({
  Model: Generation,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
