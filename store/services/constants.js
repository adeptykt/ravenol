import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Constant extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Constant'
}
const servicePath = 'constants'
const servicePlugin = makeServicePlugin({
  Model: Constant,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
