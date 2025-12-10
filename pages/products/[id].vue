<template>
  <div class="box">
    <Breadcrumbs :items="breadcrumbs" />
    <div class="sep sep_product sep_goods">
      <div class="sep__base">
        <div class="goods">
          <div class="goods__pic" @click="showImage = !showImage">
            <img :src="image" class="goods__img">
          </div>
          <div class="goods__base">
            <h1 class="goods__title">{{ product.name }}</h1>
            <div class="goods__short">{{ product.short }}</div>
            <div class="goods__info">
              <div class="goods__spec_arrows"></div>
            </div>
            <div class="goods__border" ref="goodsBorder">
              <div class="goods__box">
                <div class="goods__prices" v-if="showPrice">
                  <span class="goods__price">{{ rub(product.price) }}</span>
                </div>
                <div class="product__price_info" v-else>Авторизируйтесь, чтобы посмотреть цены</div>
                <div class="goods__actions" v-if="product.haveRest">
                  <div class="goods__counter">
                    <div class="counter counter_big">
                      <div class="counter__btn counter__btn_minus" @click="decrease">-</div>
                      <input type="tel" class="counter__number" v-model="quantity">
                      <div class="counter__btn counter__btn_plus" @click="increase">+</div>
                    </div>
                  </div>
                  <a 
                    href="#" 
                    class="btn goods__btn btn_size_big btn_type_flat" 
                    :class="{ btn_type_grey: (quantity === cart) }" 
                    @click.prevent="addcart"
                  >
                    {{ getname() }}
                  </a>
                </div>
              </div>
              <div class="goods__message">
                <div class="goods__fabric"><strong>{{ product.brand }}</strong></div>
                <div class="goods__text">{{ product.article }}</div>
                <div class="goods__exist">
                  <div :class="`exist exist_${balanceLevel}`">
                    <div class="exist__base">{{ balanceName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fix-goods" :class="{ 'fix-goods_show': fixGoodsShow }">
          <div class="fix-goods__box box">
            <div class="fix-goods__base">
              <div class="fix-goods__pic">
                <img :src="image" class="fix-goods__img">
              </div>
              <div class="fix-goods__row">
                <div class="fix-goods__title">{{ product.name }}</div>
                <div class="fix-goods__flex">
                  <div class="fix-goods__prices" v-if="showPrice">
                    <span class="fix-goods__price">{{ rub(product.price) }}</span>
                  </div>
                  <div class="product__price_info" v-else>Авторизируйтесь, чтобы посмотреть цены</div>
                  <div class="fix-goods__exist">
                    <div class="exist exist_2">
                      <div class="exist__icon">
                        <div class="exist__level">
                          <span class="exist__value" style="width: 40%;"></span>
                        </div>
                      </div>
                      <div class="exist__base">Мало</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fix-goods__side">
              <div class="fix-goods__actions">
                <div class="fix-goods__counter">
                  <div class="counter">
                    <div class="counter__btn counter__btn_minus" @click="decrease">-</div>
                    <input type="tel" class="counter__number" v-model="quantity">
                    <div class="counter__btn counter__btn_plus" @click="increase">+</div>
                  </div>
                </div>
                <a 
                  href="#" 
                  class="btn fix-goods__btn btn_size_min btn_type_flat" 
                  :class="{ btn_type_grey: (quantity === cart) }" 
                  @click.prevent="addcart"
                >
                  {{ getname() }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sep__side"></div>
    </div>
    <div class="sep sep_product mb mb_large">
      <div class="sep__base">
        <ul class="tabs tabs_mid">
          <li class="tabs__item" :class="{ tabs__item_active: tab === 0 }">
            <a href="#" class="tabs__link" @click.prevent="tab = 0">
              <span class="tabs__text">Описание</span>
            </a>
          </li>
          <li class="tabs__item" :class="{ tabs__item_active: tab === 1 }" v-if="product.usage">
            <a href="#" class="tabs__link" @click.prevent="tab = 1">
              <span class="tabs__text">Применение</span>
            </a>
          </li>
          <li class="tabs__item" :class="{ tabs__item_active: tab === 3 }" v-if="product.specs && product.specs.length">
            <a href="#" class="tabs__link" @click.prevent="tab = 3">
              <span class="tabs__text">Характеристики</span>
            </a>
          </li>
          <li class="tabs__item" :class="{ tabs__item_active: tab === 5 }" v-if="product.info && product.info.params">
            <a href="#" class="tabs__link" @click.prevent="tab = 5">
              <span class="tabs__text">Параметры</span>
            </a>
          </li>
        </ul>
        <div class="description">
          <div class="content content_sm content_desc" v-if="tab === 0" v-html="product.description"></div>
          <div class="content content_sm" v-if="tab === 1" v-html="product.usage"></div>
          <div class="content content_sm" v-if="tab === 2">
            <p v-if="product.requests && product.requests.length">
              <b>Соответствие требованиям:</b> {{ product.requests.join(', ') }}
            </p>
          </div>
          <div class="content content_sm" v-if="tab === 3">
            <div class="desc" v-if="product.specs && product.specs.length">
              <div class="desc__char">
                <h2 class="desc__title">Основные характеристики</h2>
                <div class="content content_sm">
                  <table>
                    <tbody>
                      <tr v-for="(row, i) in product.specs" :key="i">
                        <td>{{ row.name }}</td>
                        <td>{{ row.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="content content_sm" v-if="tab === 5">
            <div class="desc" v-if="product.info && product.info.params && product.info.params.length">
              <div class="desc__char">
                <h2 class="desc__title">Параметры продукта</h2>
                <div class="content content_sm">
                  <div class="table-box">
                    <table>
                      <thead>
                        <tr>
                          <td>Параметр</td>
                          <td>Ед. изм.</td>
                          <td>Значение</td>
                          <td>Тестирование</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, i) in product.info.params" :key="i">
                          <td>{{ row.param }}</td>
                          <td>{{ row.unit }}</td>
                          <td>{{ row.value }}</td>
                          <td>{{ row.test }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cover">
      <h2 class="smtitle">
        <a href="/products/history" class="link-title">Вы смотрели</a>
      </h2>
      <div class="cover__content">
        <div class="viewed">
          <div class="viewed__box">
            <template v-for="item in viewed" :key="item._id">
              <NuxtLink :to="'/products/' + item._id" class="viewed__item">
                <div class="viewed__pic">
                  <img :src="viewedImage(item)" alt="" class="viewed__img">
                </div>
                <div class="viewed__title">{{ item.name }}</div>
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
    <ImageViewer :url="image" v-model="showImage" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useAsyncData, useHead } from 'nuxt/app'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useViewedStore } from '~/stores/viewed'
import { useUIStore } from '~/stores/ui'
import { useCategories } from '~/composables/useCategories'
import { useItems } from '~/composables/useItems'
import { useFormat } from '~/composables/useFormat'
import { useNotifications } from '~/composables/useNotifications'
import { useRuntimeConfig } from 'nuxt/app'

declare const definePageMeta: (meta: { validate?: (route: { params: { id?: string } }) => boolean }) => void

definePageMeta({
  validate: (route: { params: { id?: string } }) => {
    return /^[0-9a-f-]{36}$/.test(route.params.id as string)
  }
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const viewedStore = useViewedStore()
const uiStore = useUIStore()
const { categories } = useCategories()
const { find: findItems, get: getItem } = useItems()
const { rub } = useFormat()
const { success } = useNotifications()
const config = useRuntimeConfig()

const balances = ['Под заказ', 'Количество: <4', 'Количество: <12', 'Количество: много', 'Достаточно', 'Много']

const id = computed(() => route.params.id as string)
const title = ref('')
const product = ref<any>({})
const tab = ref(0)
const quantity = ref(1)
const fixGoodsShow = ref(false)
const showImage = ref(false)
const breadcrumbs = ref<Array<{ to: string; name: string }>>([])
const goodsBorder = ref<HTMLElement | null>(null)

const showPrice = computed(() => {
  if (authStore.user) return true
  if (product.value.brand === 'BG') return false
  return true
})

const balanceLevel = computed(() => {
  if (product.value.balance > 11) return 3
  if (product.value.balance > 3) return 2
  if (product.value.balance > 0) return 1
  return 0
})

const balanceName = computed(() => balances[balanceLevel.value])

const cart = computed(() => {
  return cartStore.getQuantity(id.value)
})

const image = computed(() => {
  const prefix = config.public.imagePrefix as string
  return prefix + (product.value.image || 'noimage.jpg')
})

const viewedIds = computed(() => {
  const ids = [...viewedStore.list]
  ids.reverse()
  if (ids.length > 6) ids.length = 6
  return ids
})

const { data: viewed } = await useAsyncData(
  'viewed-items',
  async () => {
    if (viewedIds.value.length === 0) return []
    try {
      const res = await findItems({ 
        query: { $limit: 20, _id: { $in: viewedIds.value } } 
      })
      return res.data || []
    } catch (error) {
      console.error('Error loading viewed items:', error)
      return []
    }
  },
  {
    watch: [viewedIds],
    default: () => []
  }
)

const rubFormat = (num: number | string) => {
  if (!num) return ''
  return rub(Number(num))
}

const setBreadcrumbs = () => {
  breadcrumbs.value = []
  breadcrumbs.value.unshift({ to: `/products/${id.value}/`, name: product.value.name || '' })
  
  const found = categories.value.find((e: any) => e.id === product.value.category)
  if (found) {
    let current = found
    do {
      breadcrumbs.value.unshift({ to: `/categories/${current.id}`, name: current.name })
      current = current.parent
    } while (current && current.parent)
  }
  
  breadcrumbs.value.unshift({ to: '/', name: 'Главная' })
}

const viewedImage = (item: any) => {
  const prefix = config.public.imagePrefix as string
  return prefix + (item.image || 'noimage.jpg')
}

const getCartItemCount = () => {
  return cartStore.getQuantity(id.value)
}

const increase = () => {
  quantity.value++
}

const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

const addcart = () => {
  if (cart.value === quantity.value) {
    router.push({ path: '/cart' })
  } else {
    cartStore.add({ _id: product.value._id, quantity: quantity.value })
    success('Товар добавлен в корзину')
  }
}

const getname = () => {
  return cart.value ? (cart.value === quantity.value ? 'В корзине' : 'Изменить') : 'В корзину'
}

const handleScroll = () => {
  if (goodsBorder.value) {
    fixGoodsShow.value = window.pageYOffset >= goodsBorder.value.offsetTop + goodsBorder.value.clientHeight
  }
}

// Load product
onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  
  try {
    const res = await getItem(id.value)
    viewedStore.add(res._id)
    title.value = res.name
    product.value = res
    quantity.value = getCartItemCount() || 1
    setBreadcrumbs()
  } catch (error) {
    console.error('Error loading product:', error)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(categories, () => {
  if (product.value.category) {
    setBreadcrumbs()
  }
})

// SEO
useHead({
  title: computed(() => title.value || 'Товар')
})
</script>

<style lang="scss">
.editor .fr-wrapper {
  height: 500px;
}
.sep_goods {
  padding-top: 70px;
  margin-bottom: 90px;
}
.sep_product .sep__base {
  width: 100%;
}
.sep_product .sep__side {
  margin-left: 30px;
  width: 297px;
}
.goods {
  display: flex;
}
.goods__pic {
  width: 300px;
  max-height: 328px;
  margin-right: 30px;
  text-align: center;
}
.goods__img {
  max-width: 100%;
  max-height: 328px;
  font-size: 0;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}
.goods__base {
  flex: 1;
}
.goods__title {
  font-size: 28px;
  line-height: 32px;
  text-transform: uppercase;
  font-weight: 400;
}
.goods__type {
  margin-top: 4px;
  color: #999;
  font-size: 14px;
  line-height: 1.25;
  text-transform: uppercase;
}
.goods__short {
  margin-top: 4px;
  color: #999;
  font-size: 14px;
  line-height: 1.25;
}
.goods__info {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.goods__fabric {
  font-size: 14px;
  margin-right: 24px;
}
.goods__spec_arrows {
  display: flex;
}
.goods__spec {
  align-items: center;
}
.goods__spec_arrows {
  margin-top: 7px;
}
.goods__value {
  font-size: 14px;
  margin-right: 15px;
}
.goods__value:last-child {
  margin-right: 0;
}
.goods__exist .exist {
  align-items: baseline;
}
.exist_2 .exist__value {
  background-color: #f91939;
}
.goods__border {
  display: flex;
  margin-top: 44px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
}
.goods__box {
  box-sizing: border-box;
  padding: 9px 34px 9px 11px;
}
.goods__prices {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.goods__price {
  font-size: 24px;
  font-weight: 700;
  margin-right: 9px;
}
.goods__price:last-child {
  margin-right: 0;
}
.goods__actions {
  margin-top: 24px;
  display: flex;
}
.goods__counter {
  width: 114px;
  flex: 1;
  margin-right: 9px;
}
.goods__message {
  display: flex;
  align-items: center;
  flex: 1;
  border-left: 1px solid #e2e2e2;
  padding: 9px 11px 9px 26px;
}
.goods__icon {
  font-size: 62px;
  margin-right: 19px;
}
.goods__text {
  font-size: 14px;
  line-height: 19px;
  margin-right: 18px;
}
.fix-goods {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 8px;
  padding-bottom: 9px;
  min-height: 69px;
  box-shadow: 0 0 4px rgba(1,1,1,.16);
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 4000;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform .25s ease;
}
.fix-goods_show {
  pointer-events: auto;
  transform: translateY(0);
}
.fix-goods__box {
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1340px;
  min-width: 260px;
  padding: 0 30px;
}
.fix-goods__base {
  align-items: center;
  width: calc(100% - 250px);
}
.fix-goods__base, .fix-goods__side {
  display: flex;
}
.fix-goods__pic {
  width: 48px;
  max-height: 48px;
  margin-right: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fix-goods__img {
  max-width: 100%;
  max-height: 48px;
  font-size: 0;
}
.fix-goods__row {
  width: calc(100% - 61px);
}
.fix-goods__title {
  text-transform: uppercase;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.fix-goods__flex {
  margin-top: 5px;
}
.fix-goods__flex, .fix-goods__prices {
  display: flex;
  align-items: center;
}
.fix-goods__price {
  font-size: 14px;
  font-weight: 700;
}
.fix-goods__price:last-child {
  margin-right: 0;
}
.fix-goods__spec {
  display: flex;
  align-items: center;
  margin-left: 13px;
}
.fix-goods__value {
  font-size: 14px;
  margin-left: 11px;
}
.fix-goods__value:first-child {
  margin-left: 0;
}
.fix-goods__exist {
  margin-left: 14px;
}
.fix-goods__side {
  justify-content: flex-end;
  width: 220px;
  margin-left: 30px;
}
.fix-goods__actions {
  display: flex;
}
.fix-goods__counter {
  width: 103px;
}
.fix-goods__btn {
  margin-left: 8px;
}
.sep_product .sep__side {
  margin-left: 30px;
  width: 297px;
}
.mb_large {
  margin-bottom: 45px;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
}
.tabs_mid {
  border-bottom: 2px solid #000;
}
.tabs__item {
  margin-right: 5px;
  margin-bottom: 5px;
}
.tabs_mid .tabs__item {
  margin-left: 0;
  margin-bottom: 0;
}
.tabs__link {
  display: block;
  text-decoration: none;
  padding: 6px 16px 10px;
  font-size: 24px;
  line-height: 24px;
  transition: background-color .25s ease;
}
.tabs__item_active .tabs__link {
  background-color: #000;
}
.tabs_mid .tabs__link {
  font-size: 19px;
  line-height: 19px;
  padding: 9px 12px 11px;
}
.tabs__text {
  color: #000;
  border-bottom: 1px dotted #000;
  transition: color .25s ease,border-color .25s ease;
}
.tabs__item_active .tabs__link:hover .tabs__text, .tabs__item_active .tabs__text {
  color: #fff;
  border-bottom-color: transparent;
}
.tabs_mid .tabs__text {
  border-bottom: none;
}
.tabs_mid .tabs__item_active .tabs__link .tabs__text {
  color: #fff!important;
}
.tabs_mid .tabs__link:hover {
  background-color: #dfdfe1;
}
.tabs_mid .tabs__item_active .tabs__link:hover {
  background-color: #000;
}
.desc, .desc__content, .desc__row, .description {
  margin-top: 30px;
}
.content {
  font-size: 17px;
  line-height: 27px;
  color: #000;
}
.content_sm {
  font-size: 16px;
  line-height: 24px;
}
.content_sm ul li {
  position: relative;
  margin-bottom: 10px!important;
}
.content blockquote, .content ol, .content p, .content ul {
  margin-bottom: 18px;
}
.content blockquote:last-child, .content ol:last-child, .content p:last-child, .content ul:last-child {
  margin-bottom: 0;
}
.desc__char {
  margin-top: 35px;
}
.desc__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
.content table {
  width: 100%;
  border-collapse: collapse;
}
.content table td {
  vertical-align: top;
  padding: 9px 14px;
  font-size: 16px;
  line-height: 22px;
  border-top: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
}
.content table td:last-child {
  border-right: 1px solid #e2e2e2;
}
.content table tr:last-child td {
  border-bottom: 1px solid #e2e2e2;
}
@media (max-width: 640px), (max-width: 900px) and (min-width: 768px), (max-width: 1365px) and (min-width: 1024px) {
  .goods__border {
    display: block;
    padding: 20px 22px;
    margin-top: 29px;
  }
  .goods__box {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .goods__message {
    padding: 0;
    padding-top: 22px;
    margin-top: 22px;
    border-left: none;
    border-top: 1px solid #e2e2e2;
  }
}
@media (max-width: 1279px) {
  .sep_goods {
    margin-bottom: 60px;
  }
}
@media (max-width: 1024px) {
  .sep_product {
    flex-direction: column;
    padding-top: 0;
  }
  .sep_goods {
    padding-top: 45px;
    margin-bottom: 40px;
  }
  .sep_product .sep__base {
    width: 100%;
    margin-bottom: 30px;
  }
  .sep_product .sep__side {
    margin-left: 0;
    width: 100%;
  }
  .fix-goods {
    display: none;
  }
}
@media (max-width: 1099px) and (min-width: 768px) {
  .goods__pic {
    width: 250px;
    max-height: 300px;
  }
}
@media (max-width: 768px) {
  .sep_goods {
    padding-top: 25px;
    margin-bottom: 30px;
  }
  .goods {
    display: block;
  }
  .goods__pic {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
  }
  .goods__title {
    font-size: 23px;
    line-height: 27px;
  }
  .goods__border {
    margin-top: 30px;
  }
}
@media (max-width: 640px) {
  .goods__price {
    font-size: 20px;
  }
  .goods__actions {
    margin-top: 21px;
  }
  .goods__message {
    padding-top: 19px;
  }
}
.su-note {
  margin: 0 0 1.5em 0;
  overflow: hidden;
  padding: 20px;
  border: 1px solid transparent;
}
.su-note-info.su-note-style2 {
  color: #fff;
  background-color: #0098d0;
  border-color: #3BAFDA;
  border-radius: 3px;
}
.su-note-icon {
  position: relative;
}
.su-note-icon .su-note-inner {
  margin-left: 40px;
}
.su-note-info.su-note-icon:after {
  content: "\f05a";
}
.su-note-icon:after {
  font-size: 24px;
  line-height: 24px;
  font-family: FontAwesome;
  position: absolute;
  top: 50%;
  margin-top: -12px;
}
.su-note-warning.su-note-style2 {
  color: #fff;
  background-color: #79010c;
  border-color: #F6BB42;
  border-radius: 3px;
}
.su-note-warning.su-note-icon:after {
  content: "\f071";
}
.table-box {
  font-size: 14px;
  @media (max-width: 640px) {
    overflow-x: scroll;
  }
  table {
    td {
      font-size: 14px;
    }
    thead {
      font-weight: bold;
      background-color: rgb(227, 227, 227);
    }
  }
}

.content_desc {
  font-size: 14px;
  h2 {
    font-size: 18px;
  }
}
.product__price_info {
  font-size: 14px;
  color: grey;
}
</style>
