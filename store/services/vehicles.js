import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Vehicle extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Vehicle'
}
const servicePath = 'vehicles'
const servicePlugin = makeServicePlugin({
  Model: Vehicle,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
