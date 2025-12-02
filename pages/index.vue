<template>
  <div class="box">
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching banners</p>
    <template v-else v-for="(banner, i) in banners" :key="i">
      <img :src="banner.image" class="action_image">
    </template>
    <Category :page.sync="page" />
  </div>
</template>

<script>
import Category from '~/components/Category.vue'

export default {
  head () {
    return {
      title: 'Главная',
    }
  },
  components: {
    Category
  },
  async asyncData({ query }) {
    return {
      page: parseInt(query.page) || 1
    }
  },
  data() {
    return {
      banners: []
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    const now = Date.now()
    this.banners = await this.$store.dispatch('banners/find', {
      query: {
        $and: [
          { $or: [ { begin: { $exists: true, $ne: null, $lte: now } }, { begin: { $eq: null } } ] },
          { $or: [ { end: { $exists: true, $ne: null, $gte: now } }, { end: { $eq: null } } ] },
        ]
      }
    }).then(res => res.data)
  }
}
</script>

<style>
.action_image {
  width: 100%;
}
</style>
