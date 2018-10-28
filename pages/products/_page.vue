export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.page)
  }
}
