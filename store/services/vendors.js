import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Vendor extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Vendor'
}
const servicePath = 'vendors'
const servicePlugin = makeServicePlugin({
  Model: Vendor,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
