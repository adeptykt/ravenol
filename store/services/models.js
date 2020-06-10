import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Model extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Model'
}
const servicePath = 'models'
const servicePlugin = makeServicePlugin({
  Model: Model,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
