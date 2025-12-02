<template>
  <div class="box">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <NuxtLink to="/" class="breadcrumbs__link nuxt-link-active">
          <span class="breadcrumbs__text">Главная</span>
        </NuxtLink>
      </li>
      <li class="breadcrumbs__item">
        <NuxtLink to="/products/history" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active">
          <span class="breadcrumbs__text">История просмотров</span>
        </NuxtLink>
      </li>
    </ul>
    <div class="top top_big">
      <h1 class="title">История просмотров</h1>
    </div>
    <div class="mb mb_big">
      <a href="#" class="btn btn_type_grey btn_size_mid" @click.prevent="viewedClear">Очистить историю</a>
    </div>
    <div class="catalog catalog_view_table catalog_size_5">
      <div v-for="item in items" :key="item._id || item.id" class="catalog__cell">
        <ProductItem 
          v-model="item.quantity" 
          :name="item.name" 
          :_id="item._id || item.id" 
          :item="item" 
          :packages="item.packages || []" 
          :price="item.price" 
        />
      </div>
    </div>
    <div class="pag-wrap">
      <Paginator v-model="page" :pages="pages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useViewedStore } from '~/stores/viewed'
import { useItems } from '~/composables/useItems'
import { useUIStore } from '~/stores/ui'

const route = useRoute()
const viewedStore = useViewedStore()
const { find: findItems } = useItems()
const uiStore = useUIStore()

const page = ref(Number(route.query.page) || 1)
const limit = ref(24)
const pages = ref(1)
const total = ref(0)

const ids = computed(() => {
  const list = [...viewedStore.list]
  list.reverse()
  return list
})

const query = computed(() => {
  const $skip = (page.value - 1) * limit.value
  const idsList = [...ids.value]
  idsList.splice(0, $skip)
  if (idsList.length > limit.value) idsList.length = limit.value
  return { $skip, $limit: limit.value, _id: { $in: idsList } }
})

const { data: items } = await useAsyncData(
  'viewed-items',
  async () => {
    if (ids.value.length === 0) return []
    try {
      const res = await findItems({ query: query.value })
      total.value = res.total || res.data.length
      pages.value = Math.ceil(total.value / limit.value)
      return res.data || []
    } catch (error) {
      console.error('Error loading viewed items:', error)
      return []
    }
  },
  {
    watch: [ids, query],
    default: () => []
  }
)

// Update page when query changes
watch(() => route.query.page, (val) => {
  page.value = val ? Number(val) : 1
})

const viewedClear = () => {
  viewedStore.clear()
  items.value = []
}

// SEO
useHead({
  title: 'История просмотров - Indexol'
})
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
