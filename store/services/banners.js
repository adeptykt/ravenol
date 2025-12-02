import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Banner extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Banner'
}
const servicePath = 'banners'
const servicePlugin = makeServicePlugin({
  Model: Banner,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
