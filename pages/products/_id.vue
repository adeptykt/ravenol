<template>
  <div class="box">
    <div class="sep sep_product sep_goods">
      <div class="sep__base">
        <div class="goods">
          <div class="goods__pic" @click="show_image=!show_image"><img :src="image" class="goods__img"></div>
          <div class="goods__base">
            <h1 class="goods__title">{{product.name}}</h1>
            <!-- <div class="goods__type">SYNTHETIC BLEND MOTOR OIL SL/CF 10W40</div> -->
            <div class="goods__short">{{product.short}}</div>
            <div class="goods__info">
              <div class="goods__fabric"><strong>{{product.brand}}</strong></div>
              <div class="goods__spec_arrows">
                <!-- <a class="btn arrow__btn-item_left btn_type_small" @click="skuPrev()" v-if="this.skus.length > 1" v-bind:class="{btn_disable: index === 0}">
                  <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use></svg></span>
                </a> -->
                <!-- <div class="goods__spec">
                  <span class="goods__value">{{curr_sku.sku}}</span>
                  <span class="goods__value">{{curr_sku.volume}}</span>
                </div> -->
                <!-- <a class="btn arrow__btn-item_right btn_type_small" @click="skuNext()" v-if="this.skus.length > 1" v-bind:class="{btn_disable: index === this.skus.length-1}">
                  <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_right"></use></svg></span>
                </a> -->
              </div>
              <!-- <div class="goods__exist">
                <div class="exist exist_2">
                  <div class="exist__icon">
                    <div class="exist__level"><span class="exist__value" style="width: 40%;"></span></div>
                  </div>
                  <div class="exist__base">Мало</div>
                </div>
              </div> -->
            </div>
            <div class="goods__border" ref="goods__border">
              <div class="goods__box">
                <div class="goods__prices">
                  <!----><span class="goods__price">{{product.price}}&nbsp;&#8381;</span>
                  <!---->
                </div>
                <div class="goods__actions">
                  <div class="goods__counter">
                    <div class="counter counter_big">
                      <div class="counter__btn counter__btn_minus" @click="decrease">-</div>
                      <input type="tel" class="counter__number" v-model="quantity">
                      <div class="counter__btn counter__btn_plus" @click="increase">+</div>
                    </div>
                  </div><a href="#" class="btn goods__btn btn_size_big btn_type_flat" v-bind:class="{ btn_type_grey: (quantity === cart) }" @click.prevent="addcart">{{getname()}}</a></div>
              </div>
              <div class="goods__message">
                <!-- <div class="goods__icon">%</div> -->
                <!-- <div class="goods__text">
                  Специальные условия сотрудничества для юридических лиц
                </div> -->
                <div class="goods__text">
                  {{product.article}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fix-goods" v-bind:class="{ 'fix-goods_show': fix_goods_show }">
          <div class="fix-goods__box box">
            <div class="fix-goods__base">
              <div class="fix-goods__pic"><img :src="image" class="fix-goods__img"></div>
              <div class="fix-goods__row">
                <div class="fix-goods__title">{{product.name}}</div>
                <div class="fix-goods__flex">
                  <div class="fix-goods__prices">
                    <!----><span class="fix-goods__price">{{product.price}}&nbsp;&#8381;</span>
                    <!---->
                  </div>
                  <!-- <div class="fix-goods__spec">
                    <a class="btn arrow__btn-item_left btn_type_small" @click="skuPrev()" v-if="this.skus.length > 1" v-bind:class="{btn_disable: index === 0}">
                      <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use></svg></span>
                    </a>
                    <span class="fix-goods__value">{{curr_sku.sku}}</span>
                    <span class="fix-goods__value">{{curr_sku.volume}}</span>
                    <a class="btn arrow__btn-item_right btn_type_small" @click="skuNext()" v-if="this.skus.length > 1" v-bind:class="{btn_disable: index === this.skus.length-1}">
                      <span class="arrow__btn-icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_right"></use></svg></span>
                    </a>
                  </div> -->
                  <div class="fix-goods__exist">
                    <div class="exist exist_2">
                      <div class="exist__icon">
                        <div class="exist__level"><span class="exist__value" style="width: 40%;"></span></div>
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
                </div><a href="#" class="btn fix-goods__btn btn_size_min btn_type_flat" v-bind:class="{ btn_type_grey: (quantity === cart) }" @click.prevent="addcart">{{getname()}}</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sep__side"><!----><!----></div>
    </div>
    <div class="sep sep_product mb mb_large">
      <div class="sep__base">
        <ul class="tabs tabs_mid">
          <li class="tabs__item" v-bind:class="{ tabs__item_active: tab === 0 }">
            <a href="#" class="tabs__link" @click.prevent="tab=0"><span class="tabs__text">Описание</span></a>
          </li>
          <li class="tabs__item" v-bind:class="{ tabs__item_active: tab === 1 }" v-if="product.usage">
            <a href="#" class="tabs__link" @click.prevent="tab=1"><span class="tabs__text">Применение</span></a>
          </li>
          <!-- <li class="tabs__item" v-bind:class="{ tabs__item_active: tab === 2 }" v-if="product.requests && product.requests.length">
            <a href="#" class="tabs__link" @click.prevent="tab=2"><span class="tabs__text">Применение</span></a>
          </li> -->
          <li class="tabs__item" v-bind:class="{ tabs__item_active: tab === 3 }" v-if="product.specs && product.specs.length">
            <a href="#" class="tabs__link" @click.prevent="tab=3"><span class="tabs__text">Характеристики</span></a>
          </li>
          <li class="tabs__item" v-bind:class="{ tabs__item_active: tab === 5 }" v-if="product.info && product.info.params">
            <a href="#" class="tabs__link" @click.prevent="tab=5"><span class="tabs__text">Параметры</span></a>
          </li>
          <!---->
        </ul>
        <div class="description">
          <div class="content content_sm content_desc" v-if="tab===0" v-html="product.description"></div>
          <div class="content content_sm" v-if="tab===1" v-html="product.usage"></div>
          <!-- <div class="content content_sm" v-if="tab===4" v-html="product.info"></div> -->
          <div class="content content_sm" v-if="tab===2">
            <p v-if="product.requests && product.requests.length"><b>Соответствие требованиям:</b> {{product.requests.join(', ')}}</p>
          </div>
          <div class="content content_sm" v-if="tab===3">
            <div class="desc" v-if="product.specs && product.specs.length">
              <div class="desc__char">
                <h2 class="desc__title">Основные характеристики</h2>
                <div class="content content_sm">
                  <table>
                    <tbody>
                      <tr v-for="(row, i) in product.specs" :key="i">
                        <td>{{row.name}}</td>
                        <td>{{row.value}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!---->
            </div>
          </div>
          <div class="content content_sm" v-if="tab===5">
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
                          <td>{{row.param}}</td>
                          <td>{{row.unit}}</td>
                          <td>{{row.value}}</td>
                          <td>{{row.test}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!---->
            </div>
          </div>
        </div>
      </div>
      <!---->
    </div>
    <div class="cover">
      <h2 class="smtitle"><a href="/products/history" class="link-title">Вы смотрели</a></h2>
      <div class="cover__content">
        <div class="viewed">
          <div class="viewed__box">
            <template v-for="item in viewed">
              <nuxt-link :to="'/products/' + item._id" class="viewed__item">
                <div class="viewed__pic"><img :src="viewed_image(item)" alt="" class="viewed__img"></div>
                <div class="viewed__title" style="">{{item.name}}</div>
              </nuxt-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <ImageViewer :url="image" v-model="show_image" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ImageViewer from '~/components/ImageViewer.vue'

export default {
  head () {
    return {
      title: this.title,
    }
  },
  components: {
    ImageViewer
  },
  validate ({ params }) {
    // Must be a number
    return /^[0-9a-f-]{36}$/.test(params.id)
  },
  async asyncData ({ params }) {
    return { id: params.id }
  },
  data () {
    return {
      title: '',
      id: String,
      product: {},
      text: '',
      tab: 0,
      quantity: 1,
      fix_goods_show: false,
      show_image: false
    }
  },
  created() {
    this.findViewed({ query: { $limit: 20, _id: { $in: this.viewed_ids } } })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.id && this.$store.dispatch('items/get', this.id)
      .then(res => {
        this.$store.commit('viewed/add', res._id)
        this.title = res.name
        this.product = res
        this.quantity = this.getCartItemCount(0) || 1
        console.log('item', res);
      })
      .catch(error => {
        console.log('error', error);
      })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    cart() {
      return this.getCartItemCount(this.index)
    },
    image() {
      return process.env.IMAGE_PREFIX + this.product.image
    },
    ...mapGetters('items', { findOrdersInStore: 'find' }),
    viewed_ids() {
      const ids = this.$store.state.viewed.list.slice()
      ids.reverse()
      if (ids.length > 6) ids.length = 6
      return ids
    },
    viewed() {
      return this.findOrdersInStore({ query: { $limit: 20, _id: { $in: this.viewed_ids } } }).data
    },
  },
  methods: {
    viewed_image(item) {
      return process.env.IMAGE_PREFIX + item.image
    },
    getCartItemCount(index) {
      const cart_item = this.$store.state.cart.list.find(e => e.id === this.id)
      return cart_item ? cart_item.quantity : 0
    },
    skuPrev() {
      // if (this.skus.length > 0 && this.index > 0) this.index --
    },
    skuNext() {
      // if (this.skus.length > 0 && this.skus.length > this.index + 1) this.index ++
    },
    increase() {
      this.quantity++
    },
    decrease() {
      if (this.quantity > 1) this.quantity--
    },
    addcart() {
      if (this.cart === this.quantity)  this.$router.push({ path: '/cart' })
      else {
        this.$store.commit('cart/add', { _id: this.product._id, quantity: this.quantity })
        this.showCartMessage()
      }
    },
    getname() {
      return this.cart ? (this.cart === this.quantity ? "В корзине" : "Изменить") : "В корзину"
    },
    handleScroll(event) {
      this.fix_goods_show = (window.pageYOffset >= this.$refs.goods__border.offsetTop + this.$refs.goods__border.clientHeight)
    },
    ...mapActions('items', { findViewed: 'find' })
  },
  notifications: {
    showCartMessage: {
      message: 'Товар добавлен в корзину',
      type: 'success'
    }
  }
}
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
  /* margin-right: 18px; */
  align-items: center;
}
.goods__exist, .goods__fabric, .goods__spec_arrows {
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
  transition: -webkit-transform .25s ease;
  transition: transform .25s ease;
  transition: transform .25s ease,-webkit-transform .25s ease;
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
.fix-goods__base, .fix-goods__side {
  display: flex;
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
  -webkit-transition: background-color .25s ease;
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
  -webkit-transition: color .25s ease,border-color .25s ease;
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
.desc, .desc__content, .desc__row, .description {
  margin-top: 30px;
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
.su-note-icon:after {
  font-size: 24px;
  line-height: 24px;
  font-family: FontAwesome;
  position: absolute;
  top: 50%;
  margin-top: -12px;
}
.table-box {
  font-size: 14px;
  // max-width: 1024px;
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
</style>
