import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Order extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Order'
}
const servicePath = 'orders'
const servicePlugin = makeServicePlugin({
  Model: Order,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
