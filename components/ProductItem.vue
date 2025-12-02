<template>
  <div class="product" :class="{ product_state_inactive: !item.haveRest }">
    <div class="product__box">
      <div class="product__link" :to="'/products/' + _id">
        <NuxtLink :to="'/products/' + _id">
          <div class="product__side">
            <div class="product__pic">
              <img :src="image" class="product__img">
            </div>
            <div class="product__prices product__prices_mob">
              <span class="product__price">{{ formatPrice(price) }}</span>
            </div>
          </div>
        </NuxtLink>
        <div class="product__base">
          <NuxtLink :to="'/products/' + _id" class="link">
            <div class="product__title">{{ name }}</div>
          </NuxtLink>
          <div class="product__board">
            <div class="product__spec">
              <a 
                class="btn arrow__btn-item_left btn_type_small" 
                @click="skuPrev()" 
                v-if="packages.length > 1" 
                :class="{ btn_disable: index === 0 }"
              >
                <span class="arrow__btn-icon icon icon_plus_small">
                  <svg class="icon__item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#arrow_left`"></use>
                  </svg>
                </span>
              </a>
              <span class="product__value">{{ sku }}</span>
              <span class="product__value">{{ volume }}</span>
              <a 
                class="btn arrow__btn-item_right btn_type_small" 
                @click="skuNext()" 
                v-if="packages.length > 1" 
                :class="{ btn_disable: index === packages.length - 1 }"
              >
                <span class="arrow__btn-icon icon icon_plus_small">
                  <svg class="icon__item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#arrow_right`"></use>
                  </svg>
                </span>
              </a>
            </div>
            <div class="product__features">
              <div class="product__cell product__cell_left"></div>
              <div class="product__cell product__cell_right"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="product__info">
        <div class="product__prices product__prices_desktop" v-if="showPrice">
          <span class="product__price">{{ formatPrice(price) }}</span>
        </div>
        <div class="product__price_info" v-else>Авторизируйтесь, чтобы посмотреть цены</div>
        <div class="product__actions">
          <div class="product__counter" v-if="item.haveRest">
            <div class="counter">
              <div class="counter__btn counter__btn_minus" @click="decrease()">-</div>
              <input type="tel" class="counter__number" v-model.number="quantity" :ref="el => inputRef = el">
              <div class="counter__btn counter__btn_plus" @click="increase()">+</div>
            </div>
          </div>
          <div class="product__btn">
            <a 
              class="btn product__btn-item btn_wide btn_type_flat" 
              :class="{ btn_type_grey: (cart === quantity) }" 
              @click="addcart()" 
              v-if="item.haveRest"
            >
              <span class="product__btn-text">{{ cartName }}</span>
              <span class="product__btn-icon icon icon_plus_small">
                <svg class="icon__item">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#plus_small`"></use>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="product__bottom">
        <div class="product__row">
          <div :class="`exist exist_${balanceLevel}`">
            <div class="exist__base">{{ balanceName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useFormat } from '~/composables/useFormat'
import { useNotifications } from '~/composables/useNotifications'
import { useRuntimeConfig } from '#app'

interface Package {
  sku?: string
  volume?: string
}

interface Props {
  modelValue?: number
  price: number
  _id: string
  name: string
  packages: Package[]
  item: {
    haveRest: boolean
    balance: number
    brand?: string
    image?: string
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const authStore = useAuthStore()
const cartStore = useCartStore()
const { rub: formatPrice } = useFormat()
const config = useRuntimeConfig()

const balances = ['Под заказ', 'Количество: <4', 'Количество: <12', 'Количество: много', 'Достаточно', 'Много']

const index = ref(0)
const quantity = ref(1)
const inputRef = ref<HTMLInputElement | null>(null)

const showPrice = computed(() => {
  if (authStore.user) return true
  if (props.item.brand === 'BG') return false
  return true
})

const balanceLevel = computed(() => {
  if (props.item.balance > 11) return 3
  if (props.item.balance > 3) return 2
  if (props.item.balance > 0) return 1
  return 0
})

const balanceName = computed(() => balances[balanceLevel.value])

const image = computed(() => {
  if (props.item.image && props.item.image.length > 0) {
    return (config.public.imagePrefix as string) + props.item.image
  }
  return (config.public.imagePrefix as string) + 'noimage.jpg'
})

const volume = computed(() => {
  if (props.packages.length > 0 && props.packages[index.value]) {
    return props.packages[index.value].volume || ''
  }
  return ''
})

const sku = computed(() => {
  if (props.packages.length > 0 && props.packages[index.value]) {
    return props.packages[index.value].sku || ''
  }
  return ''
})

const cart = computed(() => {
  return cartStore.getQuantity(props._id)
})

const cartName = computed(() => {
  return cart.value ? (cart.value === quantity.value ? 'В корзине' : 'Изменить') : 'В корзину'
})

watch(index, () => {
  quantity.value = cart.value || 1
})

onMounted(() => {
  quantity.value = cart.value || 1
})

const skuPrev = () => {
  if (index.value > 0) {
    index.value--
  }
}

const skuNext = () => {
  if (index.value < props.packages.length - 1) {
    index.value++
  }
}

const increase = () => {
  quantity.value++
}

const decrease = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addcart = () => {
  const router = useRouter()
  const { success } = useNotifications()
  
  if (cart.value === quantity.value) {
    router.push({ path: '/cart' })
  } else {
    cartStore.add({ _id: props._id, quantity: quantity.value })
    success('Товар добавлен в корзину')
  }
}
</script>

<style>
.product__price_info {
  font-size: 14px;
  color: grey;
}
</style>


