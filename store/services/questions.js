import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Question extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Question'
}
const servicePath = 'questions'
const servicePlugin = makeServicePlugin({
  Model: Question,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
