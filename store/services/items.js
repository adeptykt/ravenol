import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Item extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Item'
}
const servicePath = 'items'
const servicePlugin = makeServicePlugin({
  Model: Item,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
