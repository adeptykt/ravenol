<template>
  <Category :find="find" v-model:page="page" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useHead } from 'nuxt/app'
import { useRoute } from 'vue-router'
import { useUIStore } from '~/stores/ui'

const route = useRoute()
const uiStore = useUIStore()

const page = ref(Number(route.query.page) || 1)
const find = computed(() => route.query.find as string || '')

// Update search in store when find changes
watch(find, (val) => {
  if (val) {
    uiStore.setSearch(val)
  }
}, { immediate: true })

// Update page when query changes
watch(() => route.query.page, (val) => {
  page.value = val ? Number(val) : 1
})

// Watch for query changes (equivalent to watchQuery: true)
watch(() => route.query.find, (val) => {
  if (val) {
    uiStore.setSearch(val as string)
  }
})

// SEO
useHead({
  title: 'Результаты поиска'
})
</script>
