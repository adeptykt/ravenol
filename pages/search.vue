<template>
  <Category :find="find" :page.sync="page" />
</template>

<script>
import Category from '~/components/Category.vue'

export default {
  head () {
    return {
      title: 'Результаты поиска',
    }
  },
  components: {
    Category
  },
  async asyncData({ query, params }) {
    return {
      page: parseInt(query.page) || 1,
      find: query.find
    }
  },
  watchQuery: true
}
</script>
