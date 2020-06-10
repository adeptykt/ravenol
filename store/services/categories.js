import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Category extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Category'
}
const servicePath = 'categories'
const servicePlugin = makeServicePlugin({
  Model: Category,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
