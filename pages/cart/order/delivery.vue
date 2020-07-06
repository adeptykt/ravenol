<template>
  <div class="canvas box">
    <div class="canvas__top canvas__top_mob">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><n-link to="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></n-link></li>
        <li class="breadcrumbs__item"><n-link to="/cart" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Корзина</span></n-link></li>
        <li class="breadcrumbs__item"><n-link to="/cart/order/contacts" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active"><span class="breadcrumbs__text">Оформление заказа</span></n-link></li>
      </ul>
      <div class="top">
        <h1 class="title">Оформление заказа</h1></div>
    </div>
    <div class="canvas__cell canvas__cell_fields">
      <div class="canvas__top canvas__top_desktop">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item"><n-link to="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></n-link></li>
          <li class="breadcrumbs__item"><n-link to="/cart" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Корзина</span></n-link></li>
          <li class="breadcrumbs__item"><n-link to="/cart/order/contacts" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active"><span class="breadcrumbs__text">Оформление заказа</span></n-link></li>
        </ul>
        <div class="top">
          <h1 class="title">Оформление заказа</h1></div>
      </div>
      <div>
        <div class="steps">
          <div class="steps__item">
            <div class="steps__counter">1</div>
            <div class="steps__text">Корзина</div><span class="steps__icon icon icon_cart_arrow"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart_arrow"></use></svg></span></div>
          <div class="steps__item">
            <div class="steps__counter">2</div>
            <div class="steps__text">
              Контактные
              <br> данные
            </div><span class="steps__icon icon icon_cart_arrow"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart_arrow"></use></svg></span></div>
          <div class="steps__item">
            <div class="steps__counter">3</div>
            <div class="steps__text">
              Доставка
              <br> и оплата
            </div>
          </div>
        </div>
        <hr class="hr hr_mid">
        <form class="form form_direct_row form_media_order" @submit="onSubmit">
          <ul class="form__tabs switch" style="justify-content: left">
            <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 0) }"><a href="#" class="switch__link link" @click.prevent="tab=0">Доставка</a></li>
            <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 1) }"><a href="#" class="switch__link link" @click.prevent="tab=1">Самовывоз</a></li>
          </ul>
          <div v-if="tab===0">
            <div class="form__note">
              Мы доставим товар с 19:00 до 22:00. Доставка осуществляется в пределах городских границ Якутска в день заказа.
            </div>
            <div class="form__row">
              <label class="form__label">Адрес</label>
              <div class="form__control form__control_wide">
                <div class="person">
                  <div class="person__base">
                    <input type="text" class="form__input" placeholder="Введите улицу, дом и подъезд" v-model="address">
                  </div>
                </div>
              </div>
            </div>
            <div class="form__row">
              <label class="form__label">День доставки</label>
              <div class="form__control">
                <div class="person">
                  <div class="person__base">
                    <input type="text" class="form__input" v-model="day">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="tab===1">
            <div class="form__note">
              Адрес для самовывоза: г. Якутск, Дежнева, 78<br>
              Вы можете забрать товар с 10.00 до 18.00
            </div>
            <div class="map map_sm">
              <div id="map" style="height: 100%;"></div>
            </div>
          </div>
          <hr class="hr hr_mid">
          <div class="form__row" v-bind:class="{ form__error }">
            <label class="form__label">Способ оплаты</label>
            <div class="form__control form__control_wide form__control_radio">
              <div class="form__item">
                <div class="radio">
                  <input type="radio" id="payment_type_cash" name="payment_types" class="radio__input" value="cash" v-model="payment_type">
                  <label for="payment_type_cash" class="radio__label">
                    <div class="radio__title">Наличный расчет</div>
                    <div class="radio__note"></div>
                  </label>
                </div>
              </div>
              <div class="form__item">
                <div class="radio">
                  <input type="radio" id="payment_type_bank_card" name="payment_types" class="radio__input" value="bank_card" v-model="payment_type">
                  <label for="payment_type_bank_card" class="radio__label">
                    <div class="radio__title">Банковская карта</div>
                    <div class="radio__note"></div>
                  </label>
                </div>
              </div>
              <div>
                <div class="form__error-message" v-if="error_message">Поле способ оплаты обязательно для заполнения.</div>
              </div>
            </div>
          </div>
          <hr class="hr hr_mid">
          <div class="form__row">
            <label class="form__label">Комментарий</label>
            <div class="form__control form__control_wide">
              <textarea rows="7" class="form__textarea" v-model="note"></textarea>
              <div></div>
            </div>
          </div>
          <hr class="hr hr_mid">
          <div class="form__nav">
            <div class="form__prev"><nuxt-link to="/cart" class="link">← Вернуться в корзину</nuxt-link></div>
            <div class="form__next">
              <button type="submit" class="btn btn_type_flat btn_size_big">
                Оформить заказ
              </button>
            </div>
          </div>
        </form>
        <!---->
      </div>
    </div>
    <div class="canvas__cell canvas__cell_order">
      <Order />
    </div>
  </div>
</template>

<script>
import Order from '~/components/Order.vue'
import crypto from 'crypto'

export default {
  head () {
    return {
      title: 'Оформление заказа',
    }
  },
  components: { Order },
  props: {
    phone: String,
    email: String,
    note: String
  },
  data () {
    return {
      tab: 0,
      form__error: false,
      error_message: '',
      payment_type: '',
      address: '',
      day: ''
    }
  },
  watch: {
    tab(val) {
      this.initMap()
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      if (process.client && this.tab === 1) {
        const content = `
          <header class="dg-popup__header" dir="auto">
            <div class="dg-popup__header-title dg-popup__header-title_for_firmcard" title="Равенол Якутия">Равенол Якутия</div>
          </header>
          <div class="dg-popup__container-wrapper">
            <div class="dg-popup__container" dir="auto">
              <div class="dg-map-firm-full">
                <address class="dg-firm-card__address dg-firm-card__icon">Дежнева, 78</address>
                <div class="dg-firm-card__phone dg-firm-card__icon"><span class="dg-firm-card__phone-num">+7‒914‒288‒09-99</span></div>
                <div class="dg-firm-card__schedule dg-schedule dg-schedule_open_true dg-schedule_works-everyday_true">
                  <div class="dg-schedule__today">
                    <div class="dg-schedule__today-inner">Ежедневно c&nbsp;10:00–18:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

        var DG = require('2gis-maps')
        DG.then(() =>{
          const latLng = DG.latLng([62.0136, 129.69832])
          const map = DG.map('map', { center: latLng, zoom: 17 });
          const popup = DG.popup({ className: 'popup' }).setLatLng(latLng).setContent(content)
          const marker = DG.marker(latLng).addTo(map)
          marker.bindPopup(popup);
          marker.openPopup()
        })
      }
    },
    onSubmit(e) {
      e.preventDefault();

      this.error_message = ""
      this.form__error = false
      if (!this.payment_type) {
        this.error_message = "Поле способ оплаты обязательно для заполнения."
        this.form__error = true
        return false
      }

      const password = process.env.RK_PASSWORD
      const rk_id = process.env.RK_ID
      const isTest = true
      const test = (isTest ? '&IsTest=1' : '')

      this.$store.commit('set_order', { payment_type: this.payment_type, note: this.note, isTest })
      this.$store.dispatch('order_save').then(order => {
        console.log(`${rk_id}:${order.total}:${order.number}:${password}`);
        this.$store.commit('cart/clear')
        if (this.payment_type === 'bank_card') {
          const crc = crypto.createHash('md5').update(`${rk_id}:${order.total}:${order.number}:${password}`).digest("hex");
          const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${rk_id}&Culture=ru&Encoding=utf-8&InvId=${order.number}&OutSum=${order.total}&SignatureValue=${crc}${test}`
          if (process.client) window.location.href = url
        } else {
          this.$router.push({ path: '/cart/success' })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.popup {
  background: rgba(50,50,50,.9);
  color: #e6e6e6;
  .leaflet-popup-content {
    margin: 10px!important;
  }
  .dg-popup__header {
    padding-bottom: 6px;
  }
  .dg-popup__header-title_for_firmcard {
    font-size: 16px;
  }
  .dg-schedule__today-inner {
    font-size: 10px;
  }
  .dg-firm-card__address, .dg-firm-card__phone, .dg-schedule__today {
    font-size: 12px;
    margin-bottom: 4px;
  }
}
.canvas {
  display: flex;
  flex: 1;
  width: 100%;
}
.canvas__top_mob {
  display: none;
  -webkit-box-ordinal-group: 2;
  order: 1;
}
.canvas__cell {
  box-sizing: border-box;
  width: 50%;
  padding-top: 30px;
  padding-bottom: 40px;
}
.canvas__cell_fields {
  padding-right: 32px;
  border-right: 1px solid #e2e2e2;
}
.title {
  font-weight: 400;
  font-size: 36px;
  line-height: 1.2;
}
.steps {
  padding-top: 5px;
  padding-bottom: 4px;
}
.steps, .steps__item {
  display: flex;
}
.steps, .steps__item {
  display: flex;
}
.steps__item {
  text-decoration: none;
  color: #000;
  position: relative;
  align-items: center;
  margin-right: 20px;
}
.steps__item:last-child {
  margin-right: 0;
}
.steps__item_inactive {
  pointer-events: none;
}
.steps__counter {
  box-sizing: border-box;
  border: 2px solid #ffe300;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  border-radius: 50%;
  background-color: #ffe300;
  margin-right: 11px;
}
.steps__item_inactive .steps__counter {
  color: #999;
  background-color: #fff;
  border-color: #cbcbcb;
}
.steps__text {
  flex: 1;
  font-size: 16px;
  line-height: 18px;
}
.steps__item_inactive .steps__text {
  color: #999;
}
.icon_cart_arrow {
  width: 11px;
  height: 22px;
}
.steps__icon {
  margin-left: 20px;
}
.icon_cart_arrow .icon__item {
  fill: #c5c5c5;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
hr {
  margin: 30px 0;
  border: none;
  border-top: 1px solid #e2e2e2;
}
.hr_mid {
  margin-top: 35px;
  margin-bottom: 35px;
}
.canvas__cell_order {
  padding-left: 32px;
}
.order {
  background-color: #f2f2f2;
}
.order__caption {
  position: relative;
  display: block;
  padding: 9px 40px 11px 20px;
  text-decoration: none;
  color: #000;
}
.r-items__row {
  border-top: 1px solid #e2e2e2;
  padding-top: 20px;
  padding-bottom: 20px;
}
.r-items__row, .r-items__row_header {
  display: flex;
}
.r-items__row_header {
  border-top: none;
  padding-top: 0;
  padding-bottom: 16px;
}
.r-items__goods {
  color: #999;
  font-size: 14px;
}
.r-items__goods, .r-items__product {
  flex: 1;
}
.r-items__actions {
  display: flex;
  padding-left: 20px;
}
.r-items__cell {
  word-wrap: break-word;
  font-size: 16px;
  padding-left: 20px;
}
.r-items__cell_price {
  min-width: 67px;
}
.r-items__cell_number {
  min-width: 80px;
}
.r-items__cell_summ {
  min-width: 74px;
  padding-left: 25px;
}
.r-items__row_header .r-items__cell {
  color: #999;
  font-size: 14px;
}
.r-items__cell:first-child {
  padding-left: 0;
}
.r-items__product {
  display: flex;
  text-decoration: none;
  color: #000;
  padding-right: 10px;
  flex-wrap: wrap;
}
.r-items__pic {
  width: 65px;
  height: 65px;
  position: relative;
  margin-right: 15px;
}
.r-items__img {
  max-width: 100%;
  max-height: 100%;
  color: #999;
  font-size: 0;
}
.r-items__base, .r-items__title {
  flex: 1;
}
.r-items__title {
  text-transform: uppercase;
  font-size: 14px;
  line-height: 18px;
  transition: color .25s ease;
  box-sizing: border-box;
  padding-right: 10px;
}
.r-items__info {
  margin-top: 6px;
  display: flex;
}
.r-items__value {
  font-size: 14px;
  color: #666;
  margin-left: 14px;
}
.r-items__value:first-child {
  margin-left: 0;
}
.r-items__line {
  border-top: 1px solid #e2e2e2;
  padding-top: 20px;
  padding-bottom: 20px;
}
.r-items__result {
  display: flex;
  align-items: baseline;
  margin-top: 14px;
}
.r-items__result:first-child {
  margin-top: 0;
}
.r-items__caption {
  padding-right: 10px;
  font-size: 16px;
}
.r-items__summ {
  font-size: 16px;
  padding-left: 10px;
  margin-left: auto;
}
.r-items__summ_big {
  font-size: 20px;
  font-weight: 700;
}
.icon_arrow_down {
  width: 12px;
  height: 8px;
}
.order__arrow {
  position: absolute;
  right: 18px;
  top: 14px;
  -webkit-transition: -webkit-transform .25s ease;
  transition: -webkit-transform .25s ease;
  transition: transform .25s ease;
  transition: transform .25s ease,-webkit-transform .25s ease;
}
.order_opened .order__arrow {
  transform: rotate(-180deg);
}
.map {
  background-color: rgba(20,40,50,.35);
}
.map_sm {
  height: 260px;
}
@media (max-width: 1279px) {
  .r-items__row_header {
    display: none;
  }
  .r-items__row {
    display: block;
    padding-top: 17px;
    padding-bottom: 17px;
  }
  .r-items__product {
    padding-right: 0;
  }
  .r-items__title {
    padding-right: 0;
  }
  .r-items__actions {
    padding-left: 0;
    margin-top: 18px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .r-items__cell {
    padding-left: 15px;
    padding-right: 15px;
  }
  .r-items__cell_number, .r-items__cell_price, .r-items__cell_summ {
    min-width: 0;
  }
  .r-items__cell:first-child {
    padding-left: 0;
  }
}
@media (max-width: 1024px) {
  .canvas__cell_order {
    padding-left: 20px;
  }
  .form_media_order .form__nav {
    display: block;
  }
  .form_media_order .form__prev {
    margin-bottom: 25px;
  }
}
@media (max-width: 768px) {
  .canvas {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 25px;
  }
  .canvas .canvas__cell {
    width: 100%;
  }
  .canvas .canvas__cell_fields {
    -webkit-box-ordinal-group: 4;
    -ms-flex-order: 3;
    order: 3;
    padding-top: 0;
    padding-right: 0;
    border-right: none;
  }
  .canvas .canvas__cell_order {
    order: 2;
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 34px;
  }
  .order {
    margin-left: -20px;
    margin-right: -20px;
  }
  .order__content {
    display: none;
  }
  .order_opened .order__content {
    display: block;
  }
  .r-items__product {
    padding-left: 20px;
    padding-right: 20px;
  }
  .r-items__actions {
    padding-left: 20px;
    padding-right: 20px;
  }
  .r-items__line {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media (max-width: 550px), (max-width: 1199px) and (min-width: 768px) {
  .steps {
    padding-bottom: 0;
    flex-direction: column;
    align-items: flex-start;
  }
  .steps__item {
    margin-right: 0;
    margin-top: 15px;
  }
  .steps__item:first-child {
    margin-top: 0;
  }
  .steps__icon, .steps__text br {
    display: none;
  }
}
@media (min-width: 769px) {
  .order__caption {
    display: none;
  }
}
</style>
