<template>
  <div class="product">
    <div class="product__box">
      <div class="product__link" :to="'/products/' + _id">
        <nuxt-link :to="'/products/' + _id">
          <div class="product__side">
            <div class="product__pic">
              <img :src="image" class="product__img">
            </div>
            <div class="product__prices product__prices_mob">
              <span class="product__price">{{price.rub()}}</span>
            </div>
          </div>
        </nuxt-link>
        <div class="product__base">
          <nuxt-link :to="'/products/' + _id" class="link">
            <div class="product__title">{{name}}</div>
          </nuxt-link>
          <div class="product__board">
            <div class="product__spec">
              <a class="btn arrow__btn-item_left btn_type_small" @click="skuPrev()" v-if="this.packages.length > 1" v-bind:class="{btn_disable: index === 0}">
                <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use></svg></span>
              </a>
              <span class="product__value">{{sku}}</span>
              <span class="product__value">{{volume}}</span>
              <a class="btn arrow__btn-item_right btn_type_small" @click="skuNext()" v-if="this.packages.length > 1" v-bind:class="{btn_disable: index === this.packages.length-1}">
                <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_right"></use></svg></span>
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
        <div class="product__prices product__prices_desktop">
          <span class="product__price">{{price.rub()}}</span><!---->
        </div>
        <div class="product__actions">
          <div class="product__counter">
            <div class="counter">
              <div class="counter__btn counter__btn_minus" @click="decrease()">-</div>
              <input type="tel" class="counter__number" v-model="count" :ref="'input'+_id">
              <div class="counter__btn counter__btn_plus" @click="increase()">+</div>
            </div>
          </div>
          <div class="product__btn">
            <a class="btn product__btn-item btn_wide btn_type_flat" v-bind:class="{ btn_type_grey: (cart === count) }" @click="addcart()"><!---->
              <span class="product__btn-text">{{cartname}}</span>
              <span class="product__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg></span>
            </a>
          </div>
        </div>
      </div>
      <div class="product__bottom">
        <div class="product__row">
          <!-- <div class="exist exist_5">
            <div class="exist__icon">
              <div class="exist__level"><span class="exist__value" style="width:100%;"></span></div>
            </div>
            <div class="exist__base">Много</div>
          </div> -->
        </div>
      </div>
      <!-- <div class="list-tile-image">
        <img :src="'/images/list/' + sku + '.jpg'" @click="opendialog(_id)">
      </div>
      <div class="list-tile-content">
        <div class="list-tile-title" @click="opendialog(_id)">{{name}}</div>
        <div class="list-tile-subtitle">{{type}}</div>
        <div class="list-tile-description">{{description}}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    price: Number,
    _id: String,
    name: String,
    packages: Array,
    item: Object
  },
  computed: {
    image() {
      if (this.item.image && this.item.image.length > 0) return process.env.IMAGE_PREFIX + this.item.image
      return process.env.IMAGE_PREFIX + "noimage.jpg"
    },
    volume() {
      // if (this.skus.length > 0) return this.skus[this.index].volume
      return ""
    },
    sku() {
      // if (this.skus.length > 0) return this.skus[this.index].sku
      return ""
    },
    cart() {
      return this.getCartItemCount(this.index)
    },
    cartname() {
      return this.cart ? (this.cart === this.count ? "В корзине" : "Изменить") : "В корзину"
    }
  },
  data () {
    const count = this.getCartItemCount(0) || 1
    return {
      index: 0,
      count
    }
  },
  watch: {
    index(val) {
      this.count = this.cart || 1
    }
  },
  mounted() {
    console.log(this.item);
  },
  methods: {
    getCartItemCount(index) {
      const cart_item = this.$store.state.cart.list.find(e => e.id === this._id)
      return cart_item ? cart_item.count : 0
    },
    skuPrev() {
      // if (this.skus.length > 0) {
      //   if (this.index > 0) this.index --
      // }
    },
    skuNext() {
      // if (this.skus.length > 0) {
      //   if (this.skus.length > this.index + 1) this.index ++
      // }
    },
    increase() {
      this.count++
    },
    decrease() {
      if (this.count > 1) this.count--
    },
    addcart() {
      this.$store.commit('cart/add', { _id: this._id, count: this.count, sku: this.sku })
      this.showCartMessage()
    },
  },
  notifications: {
    showCartMessage: {
      message: 'Товар добавлен в корзину',
      type: 'success'
    }
  }
}
</script>
