import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Aggregate extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Aggregate'
}
const servicePath = 'aggregate'
const servicePlugin = makeServicePlugin({
  Model: Aggregate,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
