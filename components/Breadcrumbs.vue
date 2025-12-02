<template>
  <ul class="breadcrumbs">
    <template v-for="item in items" :key="item.to">
      <li class="breadcrumbs__item">
        <NuxtLink :to="item.to" class="breadcrumbs__link nuxt-link-active">
          <span class="breadcrumbs__text">{{ item.name }}</span>
        </NuxtLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  to: string
  name: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
