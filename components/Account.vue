<template>
  <div class="box">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Главная</span></a></li>
      <li class="breadcrumbs__item"><a href="/account/" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">Профиль</span></a></li>
    </ul>
    <div class="top">
      <h1 class="title">Профиль</h1>
    </div>
    <div class="sep sep_left">
      <div class="sep__side">
        <div class="side-nav" v-bind:class="{ 'side-nav_opened': side_nav_opened }">
          <a href="#" class="side-nav__selected" @click.prevent="side_nav_opened = !side_nav_opened">
        		Реквизиты
        		<span class="side-nav__arrow icon icon_arrow_down">
              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_down"></use></svg>
            </span>
          </a>
          <ul class="side-nav__list">
            <template v-for="item in menu">
              <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === item.to }">
                <nuxt-link :to="item.to" class="side-nav__link">{{item.name}}</nuxt-link>
                <span class="side-nav__icon icon icon_fields_remain" v-if="item.remain">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#fields_remain"></use></svg>
                </span>
              </li>
            </template>
            <!-- <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === '/account/history' }">
              <nuxt-link to="/account/history" class="side-nav__link nuxt-link-exact-active nuxt-link-active">История заказов</nuxt-link>
            </li>
            <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === '/account/requisites' }">
              <nuxt-link to="/account/requisites" class="side-nav__link nuxt-link-exact-active nuxt-link-active">Реквизиты</nuxt-link>
              <span class="side-nav__icon icon icon_fields_remain">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#fields_remain"></use></svg>
              </span>
            </li>
            <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === '/account/delivery' }">
              <nuxt-link to="/account/delivery" class="side-nav__link nuxt-link-exact-active nuxt-link-active">Пункты разгрузки</nuxt-link>
              <span class="side-nav__icon icon icon_fields_remain">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#fields_remain"></use></svg>
              </span>
            </li>
            <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === '/account/employees' }">
              <nuxt-link to="/account/employees" class="side-nav__link nuxt-link-exact-active nuxt-link-active">Сотрудники</nuxt-link>
            </li>
            <li class="side-nav__item" v-bind:class="{ 'side-nav__item_active': path === '/account/additionally' }">
              <nuxt-link to="/account/additionally" class="side-nav__link nuxt-link-exact-active nuxt-link-active">Дополнительно</nuxt-link>
              <span class="side-nav__icon icon icon_fields_remain">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#fields_remain"></use></svg>
              </span>
            </li>
            <li class="side-nav__item">
              <nuxt-link to="/auth/logout" class="side-nav__link">Выход</nuxt-link>
            </li> -->
          </ul>
        </div>
        <!---->
      </div>
      <div class="sep__base">
        <div class="settings">
          <slot></slot>
          <div class="settings__side">
            <div class="settings__info card">
              <div class="card__person">
                <div class="card__pic"><img alt="" class="card__img"></div>
                <div class="card__name">Павлов Алексей Владимирович</div>
              </div>
              <div class="card__position">Ваш личный менеджер</div>
              <div class="card__contacts">
                <div class="card__item"><a href="tel:+7914708866" class="link">+7 (914) 270-88-66</a></div>
                <div class="card__item"><a href="mailto:bratlex@gmail.com" class="link">bratlex@gmail.com</a></div>
                <!---->
              </div>
            </div>
            <ul class="settings__info data">
              <li class="data__item">
                <div class="data__title">
                  Консультация по доставке
                </div>
                <div class="data__box"><a href="tel:+79247697327" class="link">+7 924 769-73-27</a></div>
              </li>
              <li class="data__item">
                <div class="data__title">
                  Возврат товара
                </div>
                <div class="data__box"><a href="tel:+79247697327" class="link">+7 924 769-73-27</a></div>
              </li>
              <li class="data__item">
                <div class="data__title">
                  техническая поддержка
                </div>
                <div class="data__box"><a href="tel:+79247697327" class="link">+7 924 769-73-27</a></div>
              </li>
              <li class="data__item">
                <div class="data__title">
                  бухгалтерия
                </div>
                <div class="data__box"><a href="tel:+79247697327" class="link">+7 924 769-73-27</a></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      side_nav_opened: false,
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    menu() {
      return this.$store.state.menu_items
    }
  }
}
</script>

<style>
.sep {
  display: flex;
}
.sep_left .sep__side {
  margin-right: 45px;
  width: 282px;
}
.side-nav__selected {
  display: none;
  position: relative;
  padding: 6px 12px 8px;
  text-decoration: none;
  font-size: 16px;
  line-height: 1.3;
  color: #000;
  border-bottom: 1px solid #e2e2e2;
  -webkit-transition: color .25s ease;
  transition: color .25s ease;
}
.side-nav__item {
  display: flex;
  align-items: center;
  position: relative;
}
.side-nav__link {
  flex: 1;
  display: block;
  text-decoration: none;
  line-height: 1.3;
  color: #000;
  transition: color .25s ease;
}
.side-nav__link:hover {
  color: #666;
}
.side-nav__item_active .side-nav__link {
  font-weight: 700;
}
.icon_arrow_down {
  width: 12px;
  height: 8px;
}
.sep_left .sep__base {
  width: calc(100% - 327px);
}
.settings {
  display: flex;
}
.settings__base {
  width: calc(100% - 327px);
}
.history__item {
  border-top: 1px solid #e2e2e2;
}
.history__item_opened {
  background-color: #f2f2f2;
}
.history__caption {
  padding: 16px 0;
  position: relative;
  text-decoration: none;
}
.history__caption_top {
  font-size: 14px;
  line-height: 1.2;
  color: #999;
}
.history__caption_item {
  color: #000;
}
.history__cell {
  box-sizing: border-box;
}
.history__cell_state {
  display: flex;
  flex-direction: column;
}
.settings__side {
  margin-left: 30px;
  width: 297px;
}
.settings__info {
  margin-bottom: 30px;
}
.card {
  padding: 25px;
  background-color: #efefef;
  border-radius: 5px;
}
.icon_dropdown {
  width: 17px;
  height: 10px;
}
.history__arrow {
  position: absolute;
  left: 16px;
  top: 22px;
  transition: transform .25s ease,-webkit-transform .25s ease;
}
.history__item_opened .history__arrow {
  transform: rotate(-180deg);
}
.icon_dropdown .icon__item, .icon_edit .icon__item, .icon_edit_delete .icon__item {
  fill: #000;
}
.history__date, .history__number {
  font-size: 16px;
  line-height: 22px;
}
.history__date {
  display: block;
  color: #666;
}
.history__price {
  font-size: 16px;
  line-height: 22px;
}
.state {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 22px;
  position: relative;
  padding-left: 17px;
}
.state::after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.state_process::after {
  background-color: #edb121;
}
.history__content {
  display: none;
  padding: 0 20px 20px;
}
.history__item_opened .history__content {
  display: block;
}
.mb_mid {
  margin-bottom: 30px;
}
.board {
  border-radius: 5px;
  background-color: #fff;
}
.board__cell {
  font-size: 15px;
  line-height: 20px;
}
.board__cell_th {
  color: #666;
}
.board__buttons {
  margin-top: 20px;
}
.card__person {
  display: flex;
  align-items: center;
}
.card__pic {
  border-radius: 50%;
  overflow: hidden;
  width: 78px;
  height: 78px;
  margin-right: 13px;
}
.card__img {
  max-width: 100%;
  max-height: 100%;
  font-size: 0;
}
.card__name {
  font-size: 18px;
  line-height: 24px;
  flex: 1;
}
.card__position {
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.3;
  color: #999;
}
.card__contacts {
  margin-top: 20px;
}
.card__item {
  margin-bottom: 7px;
}
.settings__info {
  margin-bottom: 30px;
}
.settings__info:last-child {
  margin-bottom: 0;
}
.data__item {
  margin-bottom: 26px;
}
.data__title {
  color: #666;
  font-size: 14px;
  line-height: 1.2;
  text-transform: uppercase;
}
.data__box {
  margin-top: 6px;
}
.data__item:last-child {
  margin-bottom: 0;
}
@media (min-width: 1025px) {
  .side-nav__item {
    border-bottom: 1px solid #e2e2e2;
  }
  .side-nav__link {
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 13px;
  }
}
@media (max-width: 1365px) {
  .settings__base {
    width: 100%;
    margin-bottom: 35px;
  }
  .settings__side {
    margin-left: 0;
    width: 100%;
  }
  .settings {
    flex-direction: column;
  }
}
@media (max-width: 1024px) {
  .side-nav {
    box-shadow: 0 1px 8px 0 rgba(1,1,1,.23);
  }
  .side-nav__selected {
    display: block;
  }
  .side-nav__list {
    display: none;
    padding-top: 7px;
    padding-bottom: 12px;
  }
  .side-nav_opened .side-nav__list {
    display: block;
  }
  .side-nav_opened .side-nav__arrow {
    transform: rotate(-180deg);
  }
  .side-nav__link {
    font-size: 14px;
    padding: 6px 12px;
  }
}
@media (max-width: 768px) {
  .sep_left {
    display: block;
  }
  .sep_left .sep__side {
    margin-right: 0;
    margin-bottom: 30px;
    width: 100%;
  }
  .sep_left .sep__base {
    width: 100%;
  }
}
@media (max-width: 768px) and (min-width: 641px), (min-width: 940px) {
  .history {
    margin-top: 10px;
  }
  .history__caption {
    display: flex;
  }
  .history__cell_order {
    width: 40%;
    padding-left: 16px;
    padding-right: 20px;
  }
  .history__cell_summ {
    width: 30%;
    padding-right: 20px;
  }
  .history__cell_state {
    width: 30%;
    padding-right: 18px;
    align-items: flex-end;
  }
  .history__caption_item .history__cell_order {
    padding-left: 43px;
  }
  .board {
    padding: 22px 23px 27px;
  }
  .board .board__table {
    display: table;
  }
  .board .board__row {
    display: table-row;
  }
  .board .board__cell {
    display: table-cell;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .board .board__cell_th {
    padding-right: 15px;
  }
  .board .board__row:first-child .board__cell {
    padding-top: 0;
  }
  .board .board__buttons {
    display: flex;
  }
  .board .board__btn {
    margin-right: 5px;
  }
}
@media (max-width: 640px), (max-width: 939px) and (min-width: 769px) {
  .history {
    margin-top: 30px;
  }
  .history__caption {
    display: block;
  }
  .history__caption_top {
    display: none;
  }
  .history__caption_item {
    padding-left: 48px;
    padding-right: 20px;
  }
}
</style>
