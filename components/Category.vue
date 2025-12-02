<template>
  <div class="box">
    <div class="sep sep_catalog">
      <div class="sep__side">
        <div class="sticky-side" :class="{ 'sticky-side-fixed': uiStore.menu_fixed }">
          <div class="menu" :class="{ menu_opened: menuOpen }">
            <div 
              class="menu__box" 
              v-for="level1 in tree" 
              :key="level1.id" 
              :class="{ menu__box_active: hasIncluded(level1) }"
            >
              <div class="menu__title">
                <NuxtLink :to="`/categories/${level1.id}`" class="menu__caption">{{ level1.name }}</NuxtLink>
              </div>
              <ul class="menu__list">
                <template v-for="level2 in level1.children" :key="level2.id">
                  <li class="menu__item" :class="{ menu__item_sub: hasIncluded(level2) }">
                    <NuxtLink :to="`/categories/${level2.id}`" class="menu__link">
                      <span class="menu__text">{{ level2.name }}</span>
                    </NuxtLink>
                    <ul class="menu__submenu" v-if="level2.children.length">
                      <li 
                        class="menu__item" 
                        v-for="level3 in level2.children" 
                        :key="level3.id"
                        :class="{ menu__item_active: hasIncluded(level3) }"
                      >
                        <NuxtLink :to="`/categories/${level3.id}`" class="menu__link">
                          <span class="menu__text">{{ level3.name }}</span>
                        </NuxtLink>
                        <ul class="menu__subsubmenu" v-if="level3.children.length">
                          <li 
                            class="menu__item" 
                            v-for="level4 in level3.children" 
                            :key="level4.id"
                            :class="{ submenu__item_active: level4.id === id }"
                          >
                            <NuxtLink :to="`/categories/${level4.id}`" class="submenu__link">
                              <span class="menu__text">{{ level4.name }}</span>
                            </NuxtLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </div>
            <a href="#" class="menu__close" @click.prevent="menuOpen = false">
              <span class="icon icon_close_medium">
                <svg class="icon__item">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#close_medium`"></use>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="sep__base">
        <div class="filter-wrap" :class="{ 'filter-wrap-fixed': uiStore.menu_fixed }">
          <div class="filter-btns">
            <div class="filter-btns__cell">
              <a href="#" class="btn btn_type_grey btn_wide" @click.prevent="menuOpen = true">Каталог</a>
            </div>
            <div class="filter-btns__cell">
              <a href="#" class="btn btn_type_grey btn_wide" @click.prevent="filterOpen = true">Фильтр</a>
            </div>
          </div>
          <div class="filter" :class="{ filter_opened: filterOpen }">
            <div class="filter__box">
              <div class="filter__top">
                <div class="filter__btn">
                  <a href="#" class="btn btn_type_flat btn_wide" @click.prevent="filterOpen = false">
                    Найдено товаров: {{ total }}
                  </a>
                </div>
                <div class="filter__btn" v-if="chipClearAll">
                  <a href="#" class="btn btn_type_white btn_wide" @click.prevent="chipClearAll = false">
                    <span class="menu__text">Сбросить фильтр</span>
                  </a>
                </div>
              </div>
              <ul class="filter__list form form_type_filter">
                <FilterItem 
                  :title="getFilterName('Бренд', brand)" 
                  :items="brands" 
                  v-model="brand" 
                  uid="brand" 
                />
              </ul>
              <div class="filter__side" v-if="chipClearAll">
                <a href="#" class="filter__reset" @click.prevent="chipClearAll = false">Сбросить фильтр</a>
              </div>
            </div>
          </div>
        </div>
        <div class="bar">
          <div class="bar__result">Найдено товаров: {{ total }}</div>
          <div class="bar__side">
            <div class="bar__switcher">
              <a 
                href="#" 
                class="bar__view bar__view_table" 
                :class="{ bar__view_active: view === 0 }" 
                @click="view = 0"
              >
                <span class="icon icon_view1">
                  <svg class="icon__item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#view1`"></use>
                  </svg>
                </span>
              </a>
              <a 
                href="#" 
                class="bar__view bar__view_table" 
                :class="{ bar__view_active: view === 1 }" 
                @click="view = 1"
              >
                <span class="icon icon_view2">
                  <svg class="icon__item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#view2`"></use>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div 
          class="catalog catalog_size_4" 
          :class="{ catalog_view_table: view === 0, catalog_view_row: view === 1 }"
        >
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
          <Paginator v-model="page_" :pages="pages" :max="6" :query="{ find: find_ }" />
        </div>
      </div>
    </div>
    <div class="cat-search" :class="{ 'cat-search_opened': uiStore.quick_search }">
      <div class="cat-search__box">
        <div class="b-search b-search_sm">
          <input 
            type="text" 
            placeholder="Быстрый поиск" 
            class="b-search__input" 
            v-model="globalSearch"
          >
          <span class="b-search__button">
            <span class="icon icon_search">
              <svg class="icon__item">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#search`"></use>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUIStore } from '~/stores/ui'
import { useCartStore } from '~/stores/cart'
import { useSettingsStore } from '~/stores/settings'
import { useAuthStore } from '~/stores/auth'
import { useCategories } from '~/composables/useCategories'
import { useItems } from '~/composables/useItems'
import { useAggregate } from '~/composables/useAggregate'
import { useSearch } from '~/composables/useSearch'

interface Props {
  id?: string
  find?: string
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const uiStore = useUIStore()
const cartStore = useCartStore()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()
const { categories, tree } = useCategories()
const { find: findItems } = useItems()
const { find: findAggregate } = useAggregate()
const { find: findSearch } = useSearch()

const page_ = ref(props.page)
const find_ = ref(props.find || '')
const items = ref<any[]>([])
const limit = ref(24)
const pages = ref(1)
const total = ref(0)
const brands = ref<any[]>([])
const brand = ref<any[]>([])
const vehicle = ref<any[]>([])
const composition = ref<any[]>([])
const viscosity = ref<any[]>([])
const request = ref<any[]>([])
const chipClearAll = ref(false)
const chipBrand = ref(false)
const chipBrandName = ref('')
const chipVehicle = ref(false)
const chipVehicleName = ref('')
const chipComposition = ref(false)
const chipCompositionName = ref('')
const view = ref(settingsStore.view_items)
const filterOpen = ref(false)
const menuOpen = ref(false)

const globalSearch = computed({
  get: () => uiStore.global_search,
  set: (val: string) => uiStore.setSearch(val)
})

const priceType = computed(() => {
  return authStore.user?.price_type || uiStore.price_type
})

const storeId = computed(() => {
  return authStore.user?.storeId || uiStore.storeId
})

const category = computed(() => {
  const found = categories.value.find((e: any) => e.id === props.id)
  if (found) {
    const ids: string[] = []
    getIds(found, ids)
    return { $in: ids }
  }
  return null
})

const getFilterName = (name: string, values: any[]) => {
  return name + (values.length > 0 ? ': ' + values.length : '')
}

const setClearAll = () => {
  chipClearAll.value = chipBrand.value || chipVehicle.value || chipComposition.value
}

const opendialog = (id: string) => {
  uiStore.setShowProduct(true)
  uiStore.setProductId(id)
}

const getIds = (item: any, ids: string[] = []) => {
  ids.push(item.id)
  if (item.children && item.children.length) {
    item.children.forEach((subitem: any) => getIds(subitem, ids))
  }
  return ids
}

const getitems = async () => {
  const skip = (page_.value - 1) * limit.value
  const cart = cartStore.list
  const query: any = { price: { $gt: 0 }, hidden: { $ne: true } }

  const loaditems = (response: any) => {
    const itemsList = response.data.reduce((itemsList: any[], item: any) => {
      const cartItem = cart.find(e => e.id === item._id)
      const product = Object.assign(
        { quantity: 1, cart: 0, volume: '', price: 0, balance: 0 },
        item
      )
      if (cartItem !== undefined) {
        Object.assign(product, { quantity: cartItem.quantity, cart: cartItem.quantity })
      }
      itemsList.push(product)
      return itemsList
    }, [])
    const totalCount = response.total || response.data.length
    const pagesCount = Math.ceil(totalCount / limit.value)
    return { items: itemsList, total: totalCount, pages: pagesCount }
  }

  try {
    if (find_.value) {
      query.$search = find_.value
      const response = await findSearch({ 
        query: {
          ...query,
          $skip: skip,
          $limit: limit.value
        }
      })
      const result = loaditems(response)
      items.value = result.items
      total.value = result.total
      pages.value = result.pages
      return result
    } else {
      if (brand.value.length) Object.assign(query, { brand: { $in: brand.value } })
      if (vehicle.value.length) Object.assign(query, { vehicle: { $in: vehicle.value } })
      if (composition.value.length) Object.assign(query, { compositions: { $in: composition.value } })
      if (viscosity.value.length) Object.assign(query, { sae: { $in: viscosity.value } })
      if (request.value.length) Object.assign(query, { requests: { $in: request.value } })
      
      const found = categories.value.find((e: any) => e.id === props.id)
      if (found) {
        const ids: string[] = []
        getIds(found, ids)
        Object.assign(query, { category: { $in: ids } })
      }
      
      // Load brands aggregate (Express /aggregate endpoint via axios)
      try {
        const aggregateRes = await findAggregate({ match: query, property: 'brand' })
        const data = Array.isArray(aggregateRes)
          ? aggregateRes
          : (Array.isArray(aggregateRes?.data) ? aggregateRes.data : [])
        if (Array.isArray(data)) {
          brands.value = data.map((item: any) => ({ value: item._id }))
        }
      } catch (err) {
        console.error('Error loading brands:', err)
      }
      
      const response = await findItems({ 
        query: {
          ...query,
          $skip: skip,
          $limit: limit.value,
          $sort: { haveRest: -1, name: 1 }
        }
      })
      const result = loaditems(response)
      items.value = result.items
      total.value = result.total
      pages.value = result.pages
      return result
    }
  } catch (error) {
    console.error('Error loading items:', error)
    return { items: [], total: 0, pages: 1 }
  }
}

const hasIncluded = (node: any): boolean => {
  const stack = [node]
  while (stack.length > 0) {
    const currentNode = stack.pop()
    if (currentNode && currentNode.id === props.id) return true
    if (currentNode?.children && currentNode.children.length) {
      currentNode.children.forEach((n: any) => stack.push(n))
    }
  }
  return false
}

watch(() => props.find, () => {
  find_.value = props.find || ''
  getitems()
})

watch(() => props.id, () => {
  getitems()
})

watch(page_, () => {
  getitems()
})

watch(chipClearAll, (val) => {
  if (!val) {
    brand.value = []
    vehicle.value = []
    composition.value = []
  }
})

watch(brand, (val) => {
  chipBrand.value = val.length > 0
  chipBrandName.value = 'Бренд: ' + (val.length > 0 ? (val.length === 1 ? val[0] : val.length + ' знач.') : '')
  setClearAll()
  getitems()
})

watch(chipBrand, (val) => {
  if (!val) brand.value = []
})

watch(vehicle, (val) => {
  chipVehicle.value = val.length > 0
  chipVehicleName.value = 'Тип продукта: ' + (val.length > 0 ? (val.length === 1 ? val[0] : val.length + ' знач.') : '')
  setClearAll()
  getitems()
})

watch(chipVehicle, (val) => {
  if (!val) vehicle.value = []
})

watch(composition, (val) => {
  chipComposition.value = val.length > 0
  chipCompositionName.value = 'Состав: ' + (val.length > 0 ? (val.length === 1 ? val[0] : val.length + ' знач.') : '')
  setClearAll()
  getitems()
})

watch(chipComposition, (val) => {
  if (!val) composition.value = []
})

watch(view, (value) => {
  settingsStore.set('view_items', value)
})

watch(categories, () => {
  getitems()
})

onMounted(async () => {
  const result = await getitems()
  items.value = result.items
  total.value = result.total
  pages.value = result.pages
})
</script>
