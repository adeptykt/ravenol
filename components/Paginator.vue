<template>
  <div class="paginator" v-if="pages > 1">
    <div class="paginator__item paginator__item_prev">
      <NuxtLink :to="{ path: route.path, query: { page: 1 } }" class="paginator__btn">
        <span class="icon icon_plus_small">
          <svg class="icon__item">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use>
          </svg>
        </span>
      </NuxtLink>
    </div>
    <div class="paginator__list">
      <NuxtLink 
        :to="{ path: route.path, query: getquery(item.page) }" 
        class="paginator__link" 
        :class="{ paginator__link_active: (page === item.page) }" 
        v-for="item in items" 
        :key="item.page"
      >
        <div class="paginator__text">{{ item.value }}</div>
      </NuxtLink>
    </div>
    <div class="paginator__item paginator__item_next">
      <NuxtLink :to="{ path: route.path, query: { page: pages } }" class="paginator__btn">
        <span class="icon icon_plus_small">
          <svg class="icon__item">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_right"></use>
          </svg>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaginationItem {
  value: number | string
  page: number
}

interface Props {
  modelValue?: number
  pages: number
  query?: Record<string, any>
  max: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  query: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'scrolled': []
}>()

const route = useRoute()
const page = ref(props.modelValue || 1)
const items = ref<PaginationItem[]>([])

const getquery = (pageNum: number) => {
  return Object.assign({}, props.query, { page: pageNum })
}

const onClick = (pageNum: number) => {
  page.value = pageNum
  createPagination(props.pages, pageNum)
}

const backToTop = () => {
  if (process.client && window.smoothscroll) {
    window.smoothscroll()
  }
  emit('scrolled')
}

const createPagination = (pages: number, currentPage: number) => {
  const limit = (props.max - 2) / 2
  let pageCutLow = currentPage - (limit - 1)
  let pageCutHigh = currentPage + (limit - 1)
  items.value = []
  
  if (pages <= limit * 2 + 2) {
    for (let p = 1; p <= pages; p++) {
      items.value.push({ value: p, page: p })
    }
  } else {
    if (currentPage <= limit) pageCutHigh += limit - currentPage + 1
    if (pages - currentPage <= limit) pageCutLow -= limit - (pages - currentPage) + 1
    
    if (currentPage > limit) {
      items.value.push({ value: 1, page: 1 })
      if (currentPage > limit + 2) {
        items.value.push({ value: '...', page: pageCutLow - 1 })
      } else if (currentPage > limit + 1) {
        items.value.push({ value: 2, page: 2 })
      }
    }
    
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p <= 0) p = 1
      if (p > pages) continue
      items.value.push({ value: p, page: p })
    }
    
    if (currentPage < pages - (limit - 1)) {
      if (currentPage < pages - limit - 1) {
        items.value.push({ value: '...', page: pageCutHigh + 1 })
      } else if (currentPage < pages - limit) {
        items.value.push({ value: pages - 1, page: pages - 1 })
      }
      items.value.push({ value: pages, page: pages })
    }
  }
}

watch(() => route.query.page, (val) => {
  page.value = val ? Number(val) : 1
})

watch(() => props.modelValue, (val) => {
  page.value = val || 1
})

watch(page, (val) => {
  emit('update:modelValue', val)
  backToTop()
  createPagination(props.pages, val)
})

watch(() => props.pages, () => {
  createPagination(props.pages, page.value)
})

onMounted(() => {
  if (process.client) {
    window.smoothscroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      const element = document.getElementById('container')
      if (element) {
        const scrollTo = element.offsetTop
        if (currentScroll > scrollTo) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }
  }
  createPagination(props.pages, page.value)
})
</script>
