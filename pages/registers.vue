<template>
  <div class="box">
    <div class="top top_flex hidden-print">
      <h1 class="top__base title">Пользователи</h1>
      <div class="top__side">
        <!-- <a href="#" class="btn btn_type_grey btn_size_min">
          <span class="btn__icon icon icon_plus_xsmall"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg></span>
          <span class="btn__text">Добавить товары по артикулу</span>
        </a> -->
      </div>
    </div>
    <div class="items items_cart-mid" v-if="users.length">
      <div class="items__row items__row_header">
        <div class="items__wrap">
          <div class="items__goods">e-mail</div>
          <div class="items__goods">Компания</div>
          <div class="items__goods">id</div>
        </div>
        <div class="items__actions">
          <div class="items__cell items__cell_delete hidden-print"></div>
        </div>
      </div>
      <template v-for="(user, i) in users">
        <div class="items__row" :key="i">
          <div class="items__wrap">
            <a href="#" class="items__product">
              <div class="items__base">
                <div class="items__title">
                  {{user.email}}
                </div>
                <div class="items__title">
                  {{user.password}}
                </div>
                <div class="items__title">
                  {{user._id}}
                </div>
              </div>
            </a>
          </div>
          <div class="items__actions">
            <div class="items__cell items__cell_delete hidden-print">
              <a href="#" class="items__delete" @click.prevent="onDeleteUser(user)">
                <span class="icon icon_cart_delete"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart_delete"></use></svg></span>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('registers', { findUsersInStore: 'find' }),
    users() {
      return this.findUsersInStore({ query: {} }).data
    },
    isAdmin() {
      return this.$store.state.auth.user && (this.$store.state.auth.user.role === 'admin')
    }
  },
  created() {
    this.$store.dispatch('auth/authenticate').then(res => {
      this.findUsers()
    })
  },
  methods: {
    onDeleteUser(user) {
      this.deleteUser(user._id)
    },
    ...mapActions('registers', {
      findUsers: 'find',
      patchUser: 'patch',
      deleteUser: 'remove'
    })
  }
}
</script>

<style>
.top {
  margin-bottom: 25px;
}
.top_flex {
  display: flex;
}
.top__base {
  flex: 1;
}
.top_flex .top__side {
  margin-left: auto;
  padding-left: 30px;
}
.btn_type_grey {
  font-size: 16px;
  line-height: 18px;
  padding: 8px 14px 9px;
  background-color: #dfdfe1;
  color: #000;
}
.btn_size_exsm, .btn_size_min {
  font-size: 14px;
  line-height: 20px;
}
.btn_size_min {
  padding: 7px 17px 8px;
}
.icon_plus_xsmall {
  width: 10px;
  height: 10px;
}
.btn__icon {
  transform: translateY(-1px);
  vertical-align: middle!important;
}
.items__row {
  display: flex;
  align-items: center;
  border-top: 1px solid #e2e2e2;
  padding-top: 16px;
  padding-bottom: 16px;
}
.items__row:last-child {
  border-bottom: 1px solid #e2e2e2;
}
.items__row_header {
  border-top: none;
  padding-top: 0;
  padding-bottom: 18px;
}
.items__wrap {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.items__product {
  display: flex;
  flex: 1;
  text-decoration: none;
  color: #000;
  padding-right: 10px;
}
.items__product:hover .items__title {
  color: #666;
}
.items__goods {
  flex: 1;
  color: #999;
  font-size: 14px;
}
.items__info {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.items__cell {
  word-wrap: break-word;
  font-size: 16px;
  padding-left: 20px;
}
.items__cell_role {
  min-width: 66px;
  font-size: 14px;
}
.items__cell_role .sort__caption {
  justify-content: flex-end;
}
.items__cell_value {
  min-width: 66px;
  font-size: 14px;
}
.items__cell_vendor {
  min-width: 65px;
  font-size: 14px;
}
.items__cell_price {
  min-width: 78px;
}
.items__cell_number {
  min-width: 94px;
}
.items__cell_summ {
  min-width: 86px;
  padding-left: 25px;
}
.items__cell_delete {
  min-width: 27px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.items__row_header .items__cell {
  color: #999;
  font-size: 14px;
}
.items__cell:first-child {
  padding-left: 0;
}
.items__actions {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.items__product {
  display: flex;
  flex: 1;
  text-decoration: none;
  color: #000;
  padding-right: 10px;
}
.items__pic {
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 15px;
}
.items__img {
  max-width: 100%;
  max-height: 100%;
  color: #999;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0;
}
.items__base {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.items__title {
  flex: 1;
  font-size: 16px;
  line-height: 22px;
  transition: color .25s ease;
  box-sizing: border-box;
  padding-right: 10px;
}
.items__features {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 25px;
  margin-top: 5px;
}
.counter {
  height: 35px;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
}
.counter, .counter__btn {
  display: flex;
  align-items: center;
  position: relative;
}
.items__counter {
  width: 93px;
}
.counter, .counter__btn {
  display: flex;
  align-items: center;
  position: relative;
}
.counter__btn {
  justify-content: center;
  width: 32%;
  height: 100%;
  cursor: pointer;
  font-family: Arial,sans-serif;
  font-size: 18px;
}
.counter__number {
  display: inline-block;
  vertical-align: top;
  outline: none;
  padding: 1px 0 0;
  margin: 0;
  box-sizing: border-box;
  width: 36%;
  height: 34px;
  border: none;
  text-align: center;
  font-weight: 500;
  font-family: Roboto,sans-serif;
  font-size: 16px;
  line-height: 32px;
  background-color: transparent;
  box-shadow: none;
  color: #000;
}
.items__delete {
  text-decoration: none;
  color: #000;
  padding: 2px;
  display: block;
}

.result {
  margin-top: 45px;
  display: flex;
  align-items: center;
}
.result__base {
  flex: 1;
}
.print {
  justify-content: flex-start;
}
.print, .print__link {
  display: flex;
}
.print__link {
  text-decoration: none;
  color: #000;
}
.icon_print {
  width: 24px;
  height: 19px;
}
.print__icon {
  margin-right: 6px;
}
.icon_print .icon__item {
  fill: #000;
}
.print__text {
  font-size: 16px;
  line-height: 22px;
  color: #000;
  transition: color .25s ease;
}
.result__side {
  display: flex;
  align-items: center;
  padding-left: 40px;
}
.btn_type_flat {
  font-size: 16px;
  line-height: 18px;
  padding: 8px 14px 9px;
  background-color: #ffe300;
  color: #000;
}
.btn_size_big, .btn_size_mid {
  padding: 9px 18px 10px;
}
.btn_size_big {
  font-size: 18px;
  line-height: 24px;
}
.result__text {
  font-size: 24px;
  white-space: nowrap;
  min-width: 214px;
  margin-left: 38px;
}
@media (max-width: 1279px) {
  .items__features {
    margin-top: 10px;
    padding-left: 0;
    width: 100%;
  }
}
@media (max-width: 1023px) {
  .items__row {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .items__row_header {
    display: none;
  }
  .items__info {
    width: 100%;
    margin-top: 10px;
    padding-left: 0;
  }
  .items__cell_value {
    width: auto;
  }
  .items__cell_vendor {
    width: auto;
    padding-left: 12px;
  }
}
@media (max-width: 840px) {
  .items__row {
    display: block;
  }
  .items__row_header {
    display: none;
  }
  .items__wrap {
    flex-direction: column;
    align-items: stretch;
  }
  .items_cart-big .items__cell, .items_cart-mid .items__cell {
    padding-left: 13px;
  }
  .items_cart-big .items__cell:first-child, .items_cart-mid .items__cell:first-child {
    padding-left: 0;
  }
  .items__actions {
    padding-left: 0;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  .items_cart-big .items__cell_price, .items_cart-mid .items__cell_price {
    box-sizing: border-box;
    padding-left: 0;
    padding-right: 5px;
    width: 85px;
    font-size: 15px;
  }
  .items_cart-big .items__cell:first-child, .items_cart-mid .items__cell:first-child {
    padding-left: 0;
  }
  .items_cart-big .items__cell_number, .items_cart-mid .items__cell_number {
    width: auto;
    padding-left: 0;
  }
  .items_cart-big .items__cell_summ, .items_cart-mid .items__cell_summ {
    width: 73px;
    font-size: 15px;
  }
  .items_cart-big .items__cell_delete, .items_cart-mid .items__cell_delete {
    padding-left: 8px;
  }
  .items__product {
    padding-right: 0;
  }
  .items__base {
    display: block;
  }
  .items__title {
    padding-right: 0;
  }
  .result {
    margin-top: 30px;
    flex-direction: column;
    align-items: flex-start;
  }
  .result__side {
    margin-top: 24px;
    padding-left: 0;
    align-self: flex-end;
  }
}
@media (max-width: 768px) {
  .title {
    font-size: 28px !important;
  }
}
</style>
