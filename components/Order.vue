<template>
  <div class="order" :class="{ order_opened }">
    <a href="#" class="order__caption" @click.prevent="orderOpened = !orderOpened">
      <div class="order__title">Показать содержание заказа</div>
      <div class="order__summ">{{ formatPrice(total) }}&nbsp;&#8381;</div>
      <span class="order__arrow icon icon_arrow_down">
        <svg class="icon__item">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#arrow_down`"></use>
        </svg>
      </span>
    </a>
    <div class="order__content">
      <div class="r-items">
        <div class="r-r-items__row r-items__row_header">
          <div class="r-items__goods">Товар</div>
          <div class="r-items__actions">
            <div class="r-items__cell r-items__cell_price">Цена</div>
            <div class="r-items__cell r-items__cell_number">Количество</div>
            <div class="r-items__cell r-items__cell_summ">Стоимость</div>
          </div>
        </div>
        <div class="r-items__row" v-for="(row, i) in rows" :key="i">
          <NuxtLink :to="'/products/' + row._id" class="r-items__product">
            <div class="r-items__pic">
              <img :src="imagePrefix + row.image" class="r-items__img">
            </div>
            <div class="r-items__base">
              <div class="r-items__title">{{ row.title }}</div>
              <div class="r-items__info">
                <span class="r-items__value">{{ row.volume }}</span>
                <span class="r-items__value">{{ row.article }}</span>
              </div>
            </div>
          </NuxtLink>
          <div class="r-items__actions">
            <div class="r-items__cell r-items__cell_price">
              <div class="r-items__price">{{ formatPrice(row.price) }}</div>
            </div>
            <div class="r-items__cell r-items__cell_number">
              <span class="r-items__number">{{ row.quantity }}</span>
            </div>
            <div class="r-items__cell r-items__cell_summ">
              {{ formatPrice(row.total) }}
            </div>
          </div>
        </div>
        <div class="r-items__line">
          <div class="r-items__result">
            <span class="r-items__caption">Стоимость товаров:</span>
            <span class="r-items__summ">{{ formatPrice(total) }}</span>
          </div>
          <div class="r-items__result">
            <span class="r-items__caption">Доставка:</span>
            <span class="r-items__summ">{{ formatPrice(delivery) }}</span>
          </div>
        </div>
        <div class="r-items__line">
          <div class="r-items__result">
            <span class="r-items__caption">Итоговая стоимость:</span>
            <span class="r-items__summ r-items__summ_big">{{ formatPrice(sum) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'
import { useFormat } from '~/composables/useFormat'
import { useFeathers } from '~/composables/useFeathers'
import { useRuntimeConfig } from '#app'

const cartStore = useCartStore()
const uiStore = useUIStore()
const { rub: formatPrice } = useFormat()
const feathers = useFeathers()
const config = useRuntimeConfig()

const rows = ref<any[]>([])
const orderOpened = ref(false)

const delivery = computed(() => 0)

const total = computed(() => {
  return rows.value.reduce((s, i) => s + i.total, 0)
})

const sum = computed(() => {
  return delivery.value + total.value
})

const imagePrefix = computed(() => config.public.imagePrefix as string)

onMounted(async () => {
  const order = uiStore.order
  order.items = []
  order.total = 0
  
  const idList = cartStore.list.map(e => e.id)
  const query = { $skip: 0, $limit: null, _id: { $in: idList } }
  
  try {
    const itemsService = feathers.service('items')
    const itemsResult = await itemsService.find({ query })
    const items = itemsResult.data || []
    
    rows.value = cartStore.list.reduce((rowsList: any[], cartItem) => {
      try {
        const item = items.find((i: any) => i._id === cartItem.id)
        const row: any = { 
          _id: cartItem.id, 
          title: '<Товар не найден>', 
          quantity: cartItem.quantity, 
          price: 0,
          volume: '',
          article: '',
          image: ''
        }
        
        if (item) {
          Object.assign(row, { 
            title: item.name, 
            price: item.price, 
            article: item.article, 
            image: item.image,
            volume: item.volume || ''
          })
          order.items.push({ 
            _id: item._id, 
            sku: row.sku, 
            quantity: row.quantity, 
            price: row.price 
          })
          order.total += row.price * row.quantity
        }
        
        rowsList.push({ ...row, total: row.price * row.quantity })
      } catch (err) {
        console.error('Error processing cart item:', err)
      }
      return rowsList
    }, [])
  } catch (error) {
    console.error('Error loading order items:', error)
  }
})
</script>
