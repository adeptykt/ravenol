<template>
  <div class="box">
    <div class="verification">
      <div class="p" :class="largescreen">
        <div class="spinner" v-if="loading">
          <Socket size="60px" />
        </div>
        <h2 v-if="!loading">{{ message }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFeathersService } from '~/composables/useFeathersService'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  validate: (route) => {
    return /^[0-9a-z]{24}$/.test(route.params.id as string)
  }
})

const route = useRoute()
const uiStore = useUIStore()
const registersService = useFeathersService('registers')

const id = computed(() => route.params.id as string)
const loading = ref(true)
const success = ref(false)

const icon = computed(() => success.value ? 'check_circle_outline' : 'error_outline')
const color = computed(() => success.value ? '#90EE90' : '#F08080')
const message = computed(() => 
  success.value 
    ? 'Активация почтового ящика прошла успешно' 
    : 'Ошибка при активации почтового адреса'
)
const largescreen = computed(() => ({
  largescreen: !uiStore.mobile
}))

onMounted(async () => {
  try {
    await registersService.get(id.value)
    loading.value = false
    success.value = true
  } catch (error) {
    loading.value = false
    success.value = false
    console.error('Email verification error:', error)
  }
})

// SEO
useHead({
  title: 'Активация логина'
})
</script>

<style>
.verification {
  width: 100%;
}
.verification h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 10px 0 20px;
  text-align: center;
}
.verification div {
  margin-bottom: 10px;
}
.verification .largescreen {
  width: 80%;
}
.verification .p {
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
}
.verification .spinner {
  margin: 0 auto;
  padding: 50px 0;
}
</style>
