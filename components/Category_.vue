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
                <NuxtLink :to="`/categories/${level1.id}/`" class="menu__caption">{{ level1.name }}</NuxtLink>
              </div>
              <ul class="menu__list">
                <template v-for="level2 in level1.children" :key="level2.id">
                  <li class="menu__item" :class="{ menu__item_sub: hasIncluded(level2) }">
                    <NuxtLink :to="`/categories/${level2.id}/`" class="menu__link">
                      <span class="menu__text">{{ level2.name }}</span>
                    </NuxtLink>
                    <ul class="menu__submenu" v-if="level2.children.length">
                      <li 
                        class="menu__item" 
                        v-for="level3 in level2.children" 
                        :key="level3.id"
                        :class="{ menu__item_active: hasIncluded(level3) }"
                      >
                        <NuxtLink :to="`/categories/${level3.id}/`" class="menu__link">
                          <span class="menu__text">{{ level3.name }}</span>
                        </NuxtLink>
                        <ul class="menu__subsubmenu" v-if="level3.children.length">
                          <li 
                            class="menu__item" 
                            v-for="level4 in level3.children" 
                            :key="level4.id"
                            :class="{ submenu__item_active: level4.id === id }"
                          >
                            <NuxtLink :to="`/categories/${level4.id}/`" class="submenu__link">
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
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_medium"></use>
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
                <!-- Filters commented out -->
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
            <div class="bar__sort">
              <DropdownSelect v-model="sort" :items="sortItems" />
            </div>
            <div class="bar__switcher">
              <a 
                href="#" 
                class="bar__view bar__view_table" 
                :class="{ bar__view_active: view === 0 }" 
                @click="view = 0"
              >
                <span class="icon icon_view1">
                  <svg class="icon__item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#view1"></use>
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
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#view2"></use>
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
          <Paginator v-model="page_" :pages="pages" />
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
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#search"></use>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import { useCartStore } from '~/stores/cart'
import { useSettingsStore } from '~/stores/settings'
import { useCategories } from '~/composables/useCategories'
import { useItems } from '~/composables/useItems'
import { useAggregate } from '~/composables/useAggregate'
import { useFeathersService } from '~/composables/useFeathersService'

interface Props {
  id?: string
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const uiStore = useUIStore()
const cartStore = useCartStore()
const settingsStore = useSettingsStore()
const { categories, tree } = useCategories()
const { find: findItems } = useItems()
const { find: findAggregate } = useAggregate()
const viscositiesService = useFeathersService('viscosities')

const page_ = ref(props.page)
const items = ref<any[]>([])
const limit = ref(24)
const pages = ref(1)
const total = ref(0)
const localCategories = ref<any[]>([])
const brands = ref<any[]>([])
const brand = ref<any[]>([])
const vehicles = ref<any[]>([])
const vehicle = ref<any[]>([])
const compositions = ref<any[]>([])
const composition = ref<any[]>([])
const viscosities = ref<any[]>([])
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
const sort = ref(0)
const filterOpen = ref(false)
const menuOpen = ref(false)

const sortItems = [
  { value: 0, label: 'Популярные', tooltip: 'Популярность товаров определяется по спросу. Чем чаще заказывают товар — тем он выше в поиске' },
  { value: 1, label: 'Дешевые' },
  { value: 2, label: 'Дорогие' }
]

const globalSearch = computed({
  get: () => uiStore.global_search,
  set: (val: string) => uiStore.setSearch(val)
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
  const $skip = (page_.value - 1) * limit.value
  const cart = cartStore.list
  const query: any = { $skip, $limit: limit.value }
  
  if (brand.value.length) Object.assign(query, { brand: { $in: brand.value } })
  if (vehicle.value.length) Object.assign(query, { vehicle: { $in: vehicle.value } })
  if (composition.value.length) Object.assign(query, { compositions: { $in: composition.value } })
  if (viscosity.value.length) Object.assign(query, { sae: { $in: viscosity.value } })
  if (request.value.length) Object.assign(query, { requests: { $in: request.value } })
  
  const found = localCategories.value.find((e: any) => e.id === props.id)
  if (found) {
    const ids: string[] = []
    getIds(found, ids)
    Object.assign(query, { category: { $in: ids } })
  }
  
  try {
    const response = await findItems({ query })
    items.value = response.data.reduce((itemsList: any[], item: any) => {
      const cartItem = cart.find(e => e.id === item._id)
      const product = Object.assign(
        { quantity: 1, cart: 0, volume: '', price: 0, current_package: 0 },
        item
      )
      if (cartItem !== undefined) {
        Object.assign(product, { quantity: cartItem.quantity, cart: cartItem.quantity })
      }
      itemsList.push(product)
      return itemsList
    }, [])
    total.value = response.total || response.data.length
    pages.value = Math.ceil(total.value / limit.value)
  } catch (error) {
    console.error('Error loading items:', error)
  }
}

const getCategories = async () => {
  try {
    const categoriesService = useFeathersService('categories')
    const response = await categoriesService.find({ query: { $limit: 100 } })
    const data = response.data || response || []
    
    localCategories.value = []
    const localTree: any[] = []
    const root = { id: 0, children: localTree }
    const stack = [...data]
    
    while (stack.length > 0) {
      const item = stack.shift()!
      const child = { id: item._id, name: item.name, children: [] }
      
      if (item.parent && item.parent !== "00000000-0000-0000-0000-000000000000") {
        const find = localCategories.value.find((e: any) => e.id === item.parent)
        if (!find) {
          stack.push(item)
        } else {
          child.parent = find
        }
      } else {
        child.parent = root
      }
      
      if (child.parent) {
        child.parent.children.push(child)
        localCategories.value.push(child)
      }
    }
    
    await getitems()
  } catch (error) {
    console.error('Error loading categories:', error)
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

watch(() => props.page, () => {
  page_.value = props.page
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

onMounted(async () => {
  await getCategories()
  
  try {
    const brandRes = await findAggregate({ query: 'brand' })
    brands.value = (brandRes.data || brandRes || []).map((item: any) => ({ value: item._id }))
    
    const vehicleRes = await findAggregate({ query: 'vehicle' })
    vehicles.value = (vehicleRes.data || vehicleRes || []).map((item: any) => ({ title: item._id, value: item._id }))
    
    const compositionRes = await findAggregate({ query: { name: 'compositions', isArray: true } })
    compositions.value = (compositionRes.data || compositionRes || []).map((item: any) => ({ title: item._id, value: item._id }))
    
    const viscositiesRes = await viscositiesService.find({ query: { $limit: null } })
    viscosities.value = (viscositiesRes.data || viscositiesRes || []).map((item: any) => ({ 
      title: item.name, 
      value: item.name.replace('SAE ', '') 
    }))
  } catch (error) {
    console.error('Error loading filters:', error)
  }
})
</script>
