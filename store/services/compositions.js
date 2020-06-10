import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Composition extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Composition'
}
const servicePath = 'compositions'
const servicePlugin = makeServicePlugin({
  Model: Composition,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
