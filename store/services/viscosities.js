import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Viscosity extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Viscosity'
}
const servicePath = 'viscosities'
const servicePlugin = makeServicePlugin({
  Model: Viscosity,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
