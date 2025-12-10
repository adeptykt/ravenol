<template>
  <div class="box">
    <div class="selection-container">
      <div class="parts__tabs">
        <ATabs :tabs="sharedState.category_list" @onClick="onTabClick" />
      </div>
      <div class="menu menu_hide" :class="{ menu_opened: menuOpen }">
        <div class="menu__box">
          <div class="menu__title">Тип техники</div>
          <ul class="menu__list">
            <template v-for="(item, i) in sharedState.category_list" :key="i">
              <li class="menu__item">
            <a class="menu__link" @click="onTabClick(Number(item.value))">
                  <span class="menu__text">{{ item.name }}</span>
                </a>
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
      <div class="selection-btns">
        <div class="selection-btns__cell">
          <a href="#" class="btn btn_type_grey btn_wide" @click.prevent="menuOpen = true">Тип техники</a>
        </div>
      </div>
      <div class="selection-body">
        <ul class="breadcrumbs" id="breadcrumbs">
          <li class="breadcrumbs__item" v-for="(item, i) in sharedState.history" :key="i">
            <a href="#" class="breadcrumbs__link" @click.prevent="handleHistoryClick(item)">
              <span class="breadcrumbs__text">{{ item.name }}</span>
            </a>
          </li>
        </ul>
        <div class="selection-category item-img" v-if="sharedState.selection_mode === 'vendors'">
          <div class="flex xs6 sm4 md3 lg3" v-for="(item, n) in vendorList" :key="n">
            <a @click="getmodels(item)">
              <img :src="item.img" style="max-height: 100px">
              {{ item.name }}
            </a>
          </div>
        </div>
        <div class="selection-category item-img" v-if="sharedState.selection_mode === 'models'">
          <div class="flex xs6 sm4 md3 lg3" v-for="(item, n) in sharedState.model_list" :key="n">
            <a @click="getgenerations(item)">
              <img :src="item.img" style="max-height: 150px">
              {{ item.name }}<br>
              {{ item.begin }}&nbsp;-&nbsp;{{ item.end }}
            </a>
          </div>
        </div>
        <div class="selection-category center" v-if="sharedState.selection_mode === 'generations'">
          <table cellspacing="0">
            <thead>
              <tr>
                <th>Модификация</th>
                <th>Даты выпуска</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, r) in sharedState.generation_list" :key="r">
                <tr @click="getgears(item)">
                  <td>{{ item.name }}</td>
                  <td>{{ item.begin }}&nbsp;-&nbsp;{{ item.end }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="selection-gear" v-if="sharedState.selection_mode === 'gears'">
          <div class="panel flex x12 sm6 md6 lg6" v-for="(gear, g) in sharedState.gear_list" :key="g">
            <div class="card">
              <div class="title">{{ gear.name }}</div>
              <div class="panel-body">
                <template v-for="(row, r) in gear.items" :key="'text' + (g * 20 + r)">
                  <div>
                    <span class="value">{{ row }}</span>
                  </div>
                </template>
                <template v-for="(product, p) in gear.products" :key="'product' + (g * 20 + p)" v-if="gear.products">
                  <div>
                    <a class="value" @click="showproduct(product)">{{ getproduct(product) }}</a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 0">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from 'nuxt/app'
import { useUIStore } from '~/stores/ui'
import { useModels } from '~/composables/useModels'
import { useFeathersService } from '~/composables/useFeathersService'
import { useItems } from '~/composables/useItems'

const uiStore = useUIStore()
const { getModels, getGenerations } = useModels()
const gearsService = useFeathersService('gears')
const { find: findItems } = useItems()

const categoryId = ref(1)
const menuOpen = ref(false)

const sharedState = computed(() => ({
  category_list: uiStore.category_list,
  selection_mode: uiStore.selection_mode,
  vendor_list: uiStore.vendor_list,
  model_list: uiStore.model_list,
  generation_list: uiStore.generation_list,
  gear_list: uiStore.gear_list,
  product_list: uiStore.product_list,
  history: uiStore.history
}))

const vendorList = computed(() => {
  return sharedState.value.vendor_list.map((v: any) => ({
    ...v,
    value: v._id,
    name: v.name
  }))
})

const onTabClick = (value: number) => {
  menuOpen.value = false
  const cat = sharedState.value.category_list.find((x: any) => x.value === value)
  if (cat) {
    getvendors(cat)
  }
}

const getvendors = async (category: any) => {
  const vendorsService = useFeathersService('vendors')
  if (!vendorsService) return

  categoryId.value = category._id
  try {
    const response = await vendorsService.find({ 
      query: { $limit: null, $sort: 'name', category_id: category._id } 
    })
    uiStore.setVendorList(response.data || [])
    uiStore.setSelectionMode('vendors')
    
    const history = [{ dispatch: 'get_vendors', data: category, name: category.name }]
    uiStore.setHistory(history)
  } catch (error) {
    console.error('Error loading vendors:', error)
  }
}

const getmodels = async (vendor: any) => {
  const history = [...sharedState.value.history.slice(0, 1)]
  history.push({ dispatch: 'get_models', data: { vendor, category_id: categoryId.value }, name: vendor.name })
  uiStore.setHistory(history)
  await getModels(vendor._id || vendor, categoryId.value)
}

const getgenerations = async (model: any) => {
  await getGenerations(model)
}

const getgears = async (generation: any) => {
  if (!gearsService) return
  try {
    let model, vendor, category
    const history = [...sharedState.value.history]
    
    // Build history from current state
    const newHistory: any[] = []
    if (generation.model?._id) {
      model = generation.model
    } else {
      const genHistory = history.find((h: any) => h.dispatch === 'get_generations')
      if (genHistory) {
        model = genHistory.data
      }
    }
    
    if (model) {
      newHistory.unshift({ dispatch: 'get_generations', data: model, name: model.name })
      const modHistory = history.find((h: any) => h.dispatch === 'get_models')
      if (modHistory) {
        vendor = modHistory.data.vendor
        category = modHistory.data.category
        newHistory.unshift({ dispatch: 'get_models', data: { vendor, category_id: categoryId.value }, name: vendor.name })
      }
    }
    
    const cat = sharedState.value.category_list.find((c: any) => c._id === categoryId.value)
    if (cat) {
      newHistory.unshift({ dispatch: 'get_vendors', data: cat, name: cat.name })
    }
    
    newHistory.push({ dispatch: 'get_gears', data: generation, name: generation.name })
    uiStore.setHistory(newHistory)
    
    // Load gears
    const response = await gearsService.find({ 
      query: { 
        $limit: null, 
        generation: generation._id || generation, 
        model: model?._id || model,
        vendor: vendor?._id || vendor,
        category: category?._id || category
      } 
    })
    
    uiStore.setGearList(response.data || [])
    uiStore.setSelectionMode('gears')
    
    // Load products for gears
    uiStore.setProductList([])
    const articles: string[] = []
    response.data.forEach((gear: any) => {
      if (gear.products && gear.products.length) {
        gear.products.forEach((product: string) => {
          if (articles.indexOf(product) === -1) articles.push(product)
        })
      }
    })
    
    if (articles.length) {
      try {
        const itemsRes = await findItems({ 
          query: { $limit: null, article: { $in: articles } } 
        })
        uiStore.setProductList(itemsRes.data || [])
      } catch (error) {
        console.error('Error loading products for gears:', error)
      }
    }
  } catch (error) {
    console.error('Error loading gears:', error)
  }
}

const getproduct = (article: string) => {
  const product = sharedState.value.product_list.find((p: any) => p.article === article)
  if (product) return product.name
  return article
}

const showproduct = (article: string) => {
  const product = sharedState.value.product_list.find((p: any) => p.article === article)
  if (product) {
    uiStore.setShowProduct(true)
    uiStore.setProductId(product._id)
  }
}

const handleHistoryClick = (item: any) => {
  if (item.dispatch === 'get_vendors') {
    getvendors(item.data)
  } else if (item.dispatch === 'get_models') {
    getmodels(item.data.vendor)
  } else if (item.dispatch === 'get_generations') {
    getgenerations(item.data)
  } else if (item.dispatch === 'get_gears') {
    getgears(item.data)
  }
}

// SEO
useHead({
  title: 'Подбор'
})
</script>

<style>
.flex > * {
  flex: 1 1 auto;
  max-width: 100%;
}
@media (min-width: 0) {
  .flex.xs6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
  .flex.xs12 {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
  }
}
@media (min-width: 600px) {
  .flex.sm4 {
    flex-basis: 33.33333333333333%;
    flex-grow: 0;
    max-width: 33.33333333333333%;
  }
  .flex.sm6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
}
@media (min-width: 960px) {
  .flex.md3 {
    flex-basis: 25%;
    flex-grow: 0;
    max-width: 25%;
  }
  .flex.md6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
}
@media (min-width: 1264px) {
  .flex.lg3 {
    flex-basis: 25%;
    flex-grow: 0;
    max-width: 25%;
  }
}
.parts__tabs {
  padding-top: 8px;
  flex: 1;
  padding-left: 15px;
}
.atabs {
  display: flex;
  flex-wrap: wrap;
}
.atabs__item {
  margin-right: 5px;
  margin-bottom: 5px;
}
.atabs_sm .atabs__item {
  margin-left: 2px;
}
.atabs_sm .atabs__item:first-child {
  margin-left: 0;
}
.atabs__link {
  display: block;
  text-decoration: none;
  padding: 6px 16px 10px;
  font-size: 24px;
  line-height: 24px;
  transition: background-color .25s ease;
}
.atabs__item_active .atabs__link {
  background-color: #000;
}
.atabs_sm .atabs__link {
  font-size: 20px;
  line-height: 20px;
  padding: 4px 12px 6px;
}
.atabs__text {
  color: #000;
  border-bottom: 1px dotted #000;
  transition: color .25s ease,border-color .25s ease;
}
.atabs__item_active .atabs__link:hover .atabs__text, .atabs__item_active .atabs__text {
  color: #fff;
  border-bottom-color: transparent;
}
.atabs__link:hover .atabs__text {
  color: #666;
  border-bottom-color: #b2b2b2;
}
.selection-btns {
  display: none;
  margin: 15px 15px 0 15px;
}
.selection-btns__cell {
  box-sizing: border-box;
  width: 100%;
}
@media (max-width: 768px) {
  .tabs {
    display: none;
  }
  .selection-btns {
    display: flex;
  }
}
.selection-container {
  background: white;
}
.selection-body {
  padding: 15px;
}
.selection-body .v-breadcrumbs {
  padding: 0px;
}
.selection-category {
  padding-top: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-self: stretch;
}
.selection-category a {
  font-size: 12px;
  color: black;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #c5c5c5;
  margin: 1px;
  padding: 6px;
  width: calc(100% - 2px);
  text-transform: none;
  font-weight: normal;
  height: calc(100% - 2px);
}
.selection-category a:hover {
  background-color: #0070C6;
  color: white;
}
.selection-category .inline a>img {
  width: 80%;
  height: auto;
}
.selection-category .leaf {
  background-color: #eee;
  border: 1px solid #c5c5c5;
}
.selection-category .sr-item {
  background-color: #ececec;
  width: calc(100% - 20px);
  text-align: left;
  margin: 10px;
  padding: 20px;
  height: calc(100% - 20px);
}
.selection-category .sr-item .title {
  margin-bottom: 10px;
  font-size: 24px;
}
.item-img div.flex {
  padding-bottom: 10px;
  text-align: center;
}
.item-img a {
  background-color: white;
}
.item-img a:hover {
  background-color: white;
  color: red;
}
.selection-body .center {
  justify-content: center;
}
.selection-category table {
  width: 100%;
  max-width: 600px;
}
.selection-category table tr:hover:not(:first-child) {
  background-color: #cccccc;
  cursor: pointer;
}
.selection-category table th {
  background-color: #007acc;
  color: white;
  height: 30px;
}
.selection-category table td {
  border-bottom: 1px solid #e4e4e2;
  text-align: center;
  height: 25px;
}
.selection-gear {
  padding: 0px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-self: stretch;
}
.selection-gear .panel {
  padding: 8px;
  box-sizing: border-box;
}
.selection-gear .card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100%;
}
.selection-gear .panel .title {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
.selection-gear .panel .panel-body {
  margin: 15px;
}
</style>
