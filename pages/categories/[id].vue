<template>
  <div>
    <ClientOnly>
      <Category :id="id" v-model:page="page" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFeathersService } from '~/composables/useFeathersService'

const route = useRoute()

const page = ref(Number(route.query.page) || 1)
const id = computed(() => route.params.id as string)
const title = ref('')

const categoriesService = useFeathersService('categories')

// Load category name for title
onMounted(async () => {
  try {
    const category = await categoriesService.get(id.value)
    title.value = category.name || ''
  } catch (error) {
    console.error('Error loading category:', error)
  }
})

// Update page when query changes
watch(() => route.query.page, (val) => {
  page.value = val ? Number(val) : 1
})

// SEO
useHead({
  title: computed(() => title.value || 'Категория')
})
</script>
