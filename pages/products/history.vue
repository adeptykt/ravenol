<template>
  <div class="box">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <nuxt-link to="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></nuxt-link>
      </li>
      <li class="breadcrumbs__item">
        <nuxt-link to="/products/history" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active"><span class="breadcrumbs__text">История просмотров</span></nuxt-link>
      </li>
    </ul>
    <div class="top top_big">
      <h1 class="title">История просмотров</h1></div>
    <div class="mb mb_big"><a href="#" class="btn btn_type_grey btn_size_mid" @click.prevent="viewedClear">Очистить историю</a></div>
    <div class="catalog catalog_view_table catalog_size_5">
      <div v-for="(item, i) in items" :key="item.id" class="catalog__cell">
        <ProductItem v-model="item.count" :name="item.name" :_id="item._id" :skus="item.skus" />
      </div>
    </div>
    <div class="pag-wrap">
      <Paginator v-model="page" :pages="pages" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ProductItem from '~/components/ProductItem.vue'
import Paginator from '~/components/Paginator.vue'

export default {
  head () {
    return {
      title: 'История просмотров - Indexol',
    }
  },
  components: { ProductItem, Paginator },
  async asyncData({ query, params }) {
    return {
      page: parseInt(query.page) || 1,
    }
  },
  data () {
    return {
      page: 1,
      limit: 24,
      pages: 1,
      total: 0,
    }
  },
  created() {
    this.findViewed()
  },
  computed: {
    ...mapGetters('items', { findOrdersInStore: 'find' }),
    ids() {
      // return this.$store.state.viewed.list.reverse()
      return this.$store.state.viewed.list
    },
    query() {
      const $skip = (this.page - 1) * this.limit
      const ids = this.ids
      console.log('ids:', ids);
      ids.splice(0, $skip)
      if (ids.length > this.limit) ids.length = this.limit
      return { $skip, $limit: this.limit, _id: { $in: ids } }
    },
    items() {
      const res = this.findOrdersInStore({ query: this.query })
      console.log('res:', res);
      this.total = res.total
      return res.data
    },
  },
  methods: {
    ...mapActions('items', { findViewed: 'find' }),
    ...mapMutations('viewed', { viewedClear: 'clear' })
  },
}
</script>

<style>
.mb_big {
  margin-bottom: 40px;
}
@media (max-width: 768px) {
  .mb_big, .mb_large {
    margin-bottom: 30px;
  }
}
</style>
