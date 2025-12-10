<template>
  <div class="product-dialog">
    <div class="blokimg">
      <div class="overlay" id="imagelarge">
        <div class="overlay_container">
          <a href="#close">
            <img :src="currentpack.image" v-if="currentpack.image" />
          </a>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="940px">
      <div class="product">
        <v-toolbar light flat color="#FFFFFF" height="46" extension-height="36">
          <v-spacer></v-spacer>
          <v-toolbar-title :style="{ marginLeft: '20px' }">{{ product.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tabs centered color="transparent" slider-color="black" v-model="model" height="30px" slot="extension">
            <template v-for="(tab, i) in tabs" :key="i">
              <v-tab
                v-if="!tab.condition || (product[tab.condition] && (!Array.isArray(product[tab.condition]) || product[tab.condition].length))"
                :href="`#ptab-${i}`"
              >
                {{ tab.name }}
              </v-tab>
            </template>
          </v-tabs>
          <v-btn icon @click="dialog = false">
            <v-icon small>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="`ptab-${i}`">
            <v-card flat>
              <v-card-text>
                <v-container :style="{ padding: '10px 0 0 0' }">
                  <div v-if="tab.name === 'Информация'" class="product-info">
                    <h2>{{ product.type }}</h2>
                    <p>{{ product.description }}</p>
                    <p>Артикул продукта: {{ product.article }}</p>
                    <p v-if="product.sae && product.sae.length"><b>SAE:</b> {{ product.sae.join(', ') }}</p>
                    <p v-if="product.acea && product.acea.length"><b>ACEA:</b> {{ product.acea.join(', ') }}</p>
                    <p v-if="product.api && product.api.length"><b>API:</b> {{ product.api.join(', ') }}</p>
                    <p v-if="product.oem && product.oem.length"><b>OEM:</b> {{ product.oem.join(', ') }}</p>
                    <p v-if="product.tags && product.tags.length"><b>Теги:</b> {{ product.tags.join(', ') }}</p>
                    <p v-if="product.approved && product.approved.length">
                      <b>Одобрено производителями техники:</b> {{ product.approved.join(', ') }}
                    </p>
                    <p v-if="product.requests && product.requests.length">
                      <b>Соответствие требованиям:</b> {{ product.requests.join(', ') }}
                    </p>
                  </div>
                  <v-flex class="packages" v-if="tab.name === 'Фасовка'">
                    <v-flex xs12 sm6 md6 lg6>
                      <div class="product-table">
                        <div id="head">
                          <span>Объем</span>
                          <span>Артикул</span>
                          <span>Код</span>
                        </div>
                        <template v-for="(pack, p) in product.packages" :key="p">
                          <div class="product-row" @mouseover="showPackage(p)">
                            <span>{{ pack.volume }} л.</span>
                            <span>{{ pack.article }}</span>
                            <span>{{ pack.code }}</span>
                          </div>
                        </template>
                      </div>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                      <div class="blokimg">
                        <a href="#imagelarge">
                          <img 
                            :src="'/images/fullscreen/' + currentpack.article + '.jpg'" 
                            class="product-image"
                          >
                        </a>
                      </div>
                    </v-flex>
                  </v-flex>
                  <div v-html="product.text" class="product-desc" v-if="tab.name === 'Описание'"></div>
                  <div class="product-txt" v-if="tab.name === 'Применение'">
                    <h2>Применение {{ product.name }} обеспечивает:</h2>
                    <ul>
                      <template v-for="(usage, i) in product.usage" :key="i">
                        <li>{{ usage }}</li>
                      </template>
                    </ul>
                  </div>
                  <div class="product-table" v-if="tab.name === 'Параметры'">
                    <div id="head">
                      <span>Параметр</span>
                      <span>Ед. измерения</span>
                      <span>Данные</span>
                      <span>Метод испытания</span>
                    </div>
                    <template v-for="(char, c) in product.characteristics" :key="c">
                      <div class="product-row">
                        <span>{{ char[0] }}</span>
                        <span>{{ char[1] }}</span>
                        <span>{{ char[2] }}</span>
                        <span>{{ char[3] }}</span>
                      </div>
                    </template>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFeathers } from '~/composables/useFeathers'

interface Props {
  modelValue: boolean
  id?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const feathers = useFeathers()

const dialog = ref(props.modelValue)
const model = ref('ptab-0')
const product = ref<any>({})
const current = ref(0)
const currentpack = ref<any>({})

const tabs = ref<Array<{ name: string; condition?: string }>>([
  { name: 'Информация' },
  { name: 'Описание', condition: 'text' },
  { name: 'Фасовка', condition: 'packages' },
  { name: 'Применение', condition: 'usage' },
  { name: 'Параметры', condition: 'characteristics' }
])

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.id, async (id) => {
  if (id) {
    try {
      const itemsService = feathers?.service('items')
      if (!itemsService) return
      const res = await itemsService.get(id)
      product.value = res
      current.value = 0
      currentpack.value = (res.packages && res.packages.length) 
        ? res.packages[0] 
        : { article: res.article, price: res.price, image: res.image }
    } catch (error) {
      console.error('Error loading product:', error)
    }
  }
}, { immediate: true })

const showPackage = (index: number) => {
  current.value = index
  currentpack.value = product.value.packages[index]
}
</script>

<style>
.product .v-toolbar__content *:last-child.v-btn--icon {
  margin: 0px;
}
.product .v-toolbar__content {
  border-bottom: 1px solid #e5e5e5;
}
.product .v-card {
  overflow-y: hidden;
  height: 485px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product .v-card__text {
  padding: 0 15px 15px 15px;
  width: 100%;
  height: 100%;
}
.product .v-card__text .container {
  height: 100%;
  overflow-y: auto;
}
.product-info {
  margin: 0 0 10px;
}
.product-desc div {
  margin-bottom: 16px;
}
.product-usage h2, .product h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
}
.product-usage h2 {
  color: #007acc;
}
.packages {
  display: flex;
  flex-direction: row;
}
.packages span {
  display: block;
  width: 100%;
  font-weight: 700;
  text-align: center;
}
.packages .price {
  margin: 10px 0;
  font-size: 34px;
  font-weight: 800;
}
.product-package {
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0;
}
.button-package {
  color: red;
}
.product-package .v-btn {
  display: inline-block;
  width: calc(25% - 4px);
  height: 49px;
  margin: 2px;
  border-radius: 5px;
  text-transform: none;
}
.product-package .btn-active {
  color: #fff;
  background-color: #007acc;
}
.product-package .btn-normal {
  background-color: #ececec;
}
.product-package .btn-normal:hover {
  color: #fff;
  background-color: gray;
}
.product-image {
  max-width: 375px;
  width: 70%;
  max-height: 350px;
  object-fit: cover;
  cursor: zoom-in;
}
.blokimg, .blokimg a {
  position: relative;
  display: flex;
  justify-content: center;
}
.overlay{
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
}
.overlay:target {
  display: table;
}
.overlay_container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.overlay_container img {
  max-width: 90%;
  max-height: 90%;
}
.overlay_container a {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 30px;
  text-decoration: none;
  padding: 10px;
}
.product-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}
.product-table #head {
  display: table-row;
  font-weight: 700;
  background-color: #f5f5f5;
}
.product-table #head span {
  display: table-cell;
  padding: 10px;
  border: 1px solid #ddd;
}
.product-table .product-row {
  display: table-row;
}
.product-table .product-row span {
  display: table-cell;
  padding: 10px;
  border: 1px solid #ddd;
}
.product-table .product-row:hover {
  background-color: #f9f9f9;
}
.product-txt ul {
  list-style: disc;
  padding-left: 20px;
}
.product-txt li {
  margin-bottom: 8px;
}
</style>
