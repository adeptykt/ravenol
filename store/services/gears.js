import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Gear extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Gear'
}
const servicePath = 'gears'
const servicePlugin = makeServicePlugin({
  Model: Gear,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
