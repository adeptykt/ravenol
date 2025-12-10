<template>
  <div 
    class="search" 
    :class="{ search_opened: searchOpened }" 
    @keyup.esc="onCloseSearch" 
    tabindex="0"
  >
    <div class="search__top">
      <div class="search__box">
        <div class="b-search b-search_sm b-search_popup">
          <div class="b-search__base">
            <input 
              type="text" 
              placeholder="Быстрый поиск" 
              class="b-search__input" 
              v-model="globalSearch" 
              @change="onchangeSearch" 
              ref="topSearchInput"
            >
          </div>
        </div>
      </div>
      <a href="#" class="search__close" @click="onCloseSearch">
        <span class="icon icon_close_big">
          <svg class="icon__item">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#close_big`"></use>
          </svg>
        </span>
      </a>
    </div>
    <div class="search__container">
      <div class="box">
        <div class="search__items items items_search">
          <template v-for="(item, i) in results" :key="i">
            <div class="items__row">
              <div class="items__wrap">
                <NuxtLink 
                  :to="link(item)" 
                  class="items__product" 
                  @click="onClickItemInSearch(item._id)"
                >
                  <div class="items__pic">
                    <img :src="image(item)" class="items__img">
                  </div>
                  <div class="items__base">
                    <div class="items__title">{{ item.name }}</div>
                  </div>
                </NuxtLink>
                <div class="items__info">
                  <div class="items__cell items__cell_vendor">{{ item.article }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import { useSearch } from '~/composables/useSearch'
import { useRuntimeConfig } from 'nuxt/app'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const uiStore = useUIStore()
const { find: searchFind } = useSearch()
const config = useRuntimeConfig()
const router = useRouter()

const searchOpened = ref(props.modelValue)
const results = ref<any[]>([])
const loading = ref(false)
const topSearchInput = ref<HTMLInputElement | null>(null)

const globalSearch = computed({
  get: () => uiStore.global_search,
  set: (val: string) => uiStore.setSearch(val)
})

// Update body class when search opens
useHead({
  bodyAttrs: {
    class: computed(() => searchOpened.value ? 'overlayed' : '')
  }
})

watch(() => props.modelValue, (val) => {
  searchOpened.value = val
})

watch(searchOpened, (val) => {
  emit('update:modelValue', val)
})

watch(globalSearch, (val) => {
  if (val) {
    searchOpened.value = true
    nextTick(() => {
      topSearchInput.value?.focus()
    })
    if (val.length > 2) {
      querySelections(val)
    }
  }
})

const image = (item: any) => {
  if (item.image && item.image.length > 0) {
    return (config.public.imagePrefix as string) + item.image
  }
  return (config.public.imagePrefix as string) + 'noimage.jpg'
}

const link = (item: any) => {
  return `/products/${item._id}`
}

const onClickItemInSearch = (id: string) => {
  uiStore.setSearch('')
  searchOpened.value = false
  router.push({ path: `/products/${id}` })
}

const onCloseSearch = () => {
  uiStore.setSearch('')
  searchOpened.value = false
}

const querySelections = async (search: string) => {
  if (search) {
    loading.value = true
    const query = { 
      $skip: 0, 
      $limit: 10, 
      price: { $gt: 0 }, 
      $search: search, 
      $sort: { name: -1 }, 
      hidden: false 
    }
    try {
      const res = await searchFind({ query })
      results.value = res.data || []
    } catch (error) {
      console.error('Search error:', error)
      results.value = []
    } finally {
      loading.value = false
    }
  } else {
    results.value = []
  }
}

const onchangeSearch = (e: Event) => {
  if (searchOpened.value) {
    searchOpened.value = false
    router.push({ path: '/search', query: { find: globalSearch.value } })
    e.preventDefault()
  }
}
</script>
