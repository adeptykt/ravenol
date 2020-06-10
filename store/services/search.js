import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Search extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Search'
}
const servicePath = 'search'
const servicePlugin = makeServicePlugin({
  Model: Search,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
