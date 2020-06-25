<template>
  <div class="canvas box">
    <div class="canvas__top canvas__top_mob">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></a></li>
        <li class="breadcrumbs__item"><a href="/cart" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Корзина</span></a></li>
        <li class="breadcrumbs__item"><a href="/cart/order/contacts" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active"><span class="breadcrumbs__text">Оформление заказа</span></a></li>
      </ul>
      <div class="top">
        <h1 class="title">Оформление заказа</h1></div>
    </div>
    <div class="canvas__cell canvas__cell_fields">
      <div class="canvas__top canvas__top_desktop">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></a></li>
          <li class="breadcrumbs__item"><a href="/cart" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Корзина</span></a></li>
          <li class="breadcrumbs__item"><a href="/cart/order/contacts" class="breadcrumbs__link nuxt-link-exact-active nuxt-link-active"><span class="breadcrumbs__text">Оформление заказа</span></a></li>
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
          <div class="steps__item steps__item_inactive">
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
            <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 0) }"><a href="#" class="switch__link link" @click.prevent="tab=0">Покупаю впервые</a></li>
            <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 1) }"><a href="#" class="switch__link link" @click.prevent="tab=1">Я уже покупал</a></li>
          </ul>
          <div class="form__row">
            <!---->
            <label class="form__label">Имя</label>
            <div class="form__control form__control_center">
              <div class="person">
                <!-- <div class="person__side"><img src="/_nuxt/img/user_01.cf42bda.jpg" alt="" class="person__img"></div> -->
                <div class="person__base">
                  <input type="text" class="form__input" v-model="name">
                </div>
              </div>
            </div>
          </div>
          <div class="form__row" v-bind:class="{ form__error: error_phone }">
            <label class="form__label">Телефон</label>
            <div class="form__control">
              <masked-input
                type="tel"
                class="form__input"
                v-model="format_phone"
                :guide="true"
                :showMask="true"
                @input="onChange"
                :mask="['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]">
              </masked-input>
              <div>
                <div class="form__error-message">Пожалуйста, введите телефон</div>
              </div>
            </div>
          </div>
          <div class="form__row" v-bind:class="{ form__error: error_email }">
            <label class="form__label">Email</label>
            <div class="form__control">
              <input type="email" class="form__input" v-model="email">
              <div>
                <div class="form__error-message">Пожалуйста, введите email</div>
              </div>
            </div>
          </div>
          <hr class="hr hr_mid">
          <div class="form__nav">
            <div class="form__prev"><nuxt-link to="/cart" class="link">← Вернуться в корзину</nuxt-link></div>
            <div class="form__next">
              <button type="submit" class="btn btn_type_flat btn_size_big">Продолжить</button>
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
import MaskedInput from 'vue-text-mask'
import Order from '~/components/Order.vue'

export default {
  head () {
    return {
      title: 'Оформление заказа - Indexol',
    }
  },
  components: { Order, MaskedInput },
  data () {
    return {
      tab: 0,
      format_phone: '',
      name: '',
      phone: '',
      email: '',
      error_phone: false,
      error_email: false
    }
  },
  created() {
    this.fillUser()
  },
  methods: {
    fillUser() {
      const user = this.$store.state.auth.user
      if (user) {
        this.name = user.firstName
        this.email = user.email
        this.phone = user.phone
        this.format_phone = this.phone
      }
    },
    onChange(e) {
      const result = /^\+7 \((\d{3})\) (\d{3})-(\d{2})-(\d{2})$/.exec(e)
      if (result) this.phone = result[1] + result[2] + result[3] + result[4]
      else this.phone = ''
    },
    onSubmit(e) {
      e.preventDefault();
      this.error_phone = false
      this.error_email = false
      if (!this.phone) {
        this.error_phone = true
        return false
      }
      if (!this.email) {
        this.error_email = true
        return false
      }
      this.$store.commit('set_order', { name: this.name, phone: this.phone, email: this.email })
      this.$router.push({ path: '/cart/order/delivery' })
    }
  }
}
</script>

<style>
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
