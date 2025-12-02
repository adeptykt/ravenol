<template>
  <div class="box">
    <ClientOnly>
      <template #default>
        <p v-if="pending">Loading....</p>
        <p v-else-if="error">Error while fetching banners</p>
        <template v-else v-for="(banner, i) in banners" :key="i">
          <img :src="banner.image" class="action_image">
        </template>
      </template>
      <template #fallback>
        <div></div>
      </template>
    </ClientOnly>
    <ClientOnly>
      <Category v-model:page="page" />
      <template #fallback>
        <div class="box">
          <div class="sep sep_catalog">
            <div class="sep__side">
              <div class="sticky-side">
                <div class="menu">
                  <div class="menu__box">
                    <div class="menu__title">Загрузка категорий...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useFeathersService } from '~/composables/useFeathersService'

const route = useRoute()
const nuxtApp = useNuxtApp()
const bannersService = useFeathersService('banners')

const page = ref(Number(route.query.page) || 1)

// Update page when query changes
watch(() => route.query.page, (val) => {
  page.value = val ? Number(val) : 1
})

// Fetch banners with caching
const { data: banners, pending, error, refresh } = await useAsyncData(
  'banners',
  async () => {
    // Only fetch on client side (FeathersJS is client-only)
    if (process.server || !bannersService) {
      return []
    }
    
    const now = Date.now()
    const response = await bannersService.find({
      query: {
        $and: [
          { $or: [{ begin: { $exists: true, $ne: null, $lte: now } }, { begin: { $eq: null } }] },
          { $or: [{ end: { $exists: true, $ne: null, $gte: now } }, { end: { $eq: null } }] }
        ]
      }
    })
    return response.data || []
  },
  {
    server: false, // FeathersJS is client-only
    default: () => [],
    getCachedData(key) {
      // Check if data is fresh (less than 30 seconds old)
      if (!nuxtApp.payload || !nuxtApp.payload.data) {
        return undefined
      }
      const cached = nuxtApp.payload.data[key]
      if (cached && cached.timestamp && Date.now() - cached.timestamp < 30000) {
        return cached.data
      }
      return undefined
    }
  }
)

// Refresh on activate if data is stale (equivalent to activated hook)
onActivated(() => {
  if (!nuxtApp.payload || !nuxtApp.payload.data) {
    return
  }
  const cached = nuxtApp.payload.data['banners']
  if (cached && cached.timestamp && Date.now() - cached.timestamp > 30000) {
    refresh()
  }
})

// Store timestamp for cache checking
if (banners.value && nuxtApp.payload && nuxtApp.payload.data) {
  nuxtApp.payload.data['banners'] = {
    data: banners.value,
    timestamp: Date.now()
  }
}

// SEO
useHead({
  title: 'Главная'
})
</script>

<style>
.action_image {
  width: 100%;
}
</style>
