<template>
  <Category :id="id" :page.sync="page" />
</template>

<script>
import Category from '~/components/Category.vue'

export default {
  head () {
    return {
      title: this.title,
    }
  },
  components: {
    Category
  },
  async asyncData({ query, params }) {
    const page = query.page ? Number(query.page) : 1
    return {
      page: page,
      id: params.id
    }
  },
  data () {
    return {
      title: '',
    }
  },
  created() {
    this.$store.dispatch('categories/get', this.id).then(category => { this.title = category.name })
  },
}
</script>
