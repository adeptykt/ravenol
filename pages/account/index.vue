<template>
  <Account>
    <div class="settings__base">
      <div class="form form_direct_row form_width_sm form_media_sm">
        <div class="empl empl_editable">
          <div class="empl__pic">
            <div class="user"><span class="user__icon icon icon_user-ava"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#user"></use></svg></span></div>
          </div>
          <div class="empl__base">
            <input type="text" placeholder="Введите ФИО" class="empl__textarea form__textarea form__textarea_no-border">
            <div class="empl__position"></div>
          </div>
        </div>
        <div class="rec">
          <div class="rec__item rec__item_editable">
            <input type="tel" placeholder="Введите телефон" class="rec__input form__input form__input_no-border">
          </div>
          <div class="rec__item rec__item_editable">
            <input placeholder="Введите email" class="rec__input form__input form__input_no-border" v-model="user.email">
          </div>
        </div>
        <hr class="hr">
        <div class="expand" v-bind:class="{ expand_opened }">
          <div class="expand__caption">
            <a href="#" class="expand__title" @click.prevent="expand_opened = !expand_opened">
              <span class="expand__icon icon icon_dropdown">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#dropdown"></use></svg>
              </span>
              <div class="expand__box"><span class="expand__text">Изменить пароль</span></div>
            </a>
          </div>
          <div class="expand__content">
            <form action="">
              <div class="form__row">
                <label class="form__label">Старый пароль</label>
                <div class="form__control">
                  <input type="password" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__row">
                <label class="form__label">Новый пароль</label>
                <div class="form__control">
                  <input type="password" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__btn">
                <button type="submit" class="btn btn_type_flat btn_size_big">
                  <!---->Сохранить</button>
              </div>
            </form>
          </div>
        </div>
        <hr class="hr">
      </div>
    </div>
  </Account>
</template>

<script>
import Account from '~/components/Account.vue'

export default {
  head () {
    return {
      title: 'Профиль - Indexol',
    }
  },
  components: { Account },
  data () {
    return {
      expand_opened: false,
      user: {}
    }
  },
  watch: {
    '$store.state.auth.user'(val) {
      this.user = val
    }
  },
  created() {
    console.log('user', this.$store.state.auth.user);
    this.user = this.$store.state.auth.user || { email: '' }
  }
}
</script>

<style>
.empl {
  display: flex;
  align-items: center;
}
.empl__pic {
  overflow: hidden;
  width: 115px;
  height: 115px;
  margin-right: 19px;
  border-radius: 50%;
}
.empl_editable .empl__pic {
  margin-right: 12px;
}
@media (max-width: 1024px) {
  .empl_editable .empl__pic {
    width: 80px;
    height: 80px;
    margin-right: 11px;
  }
}
@media (max-width: 480px), (max-width: 880px) and (min-width: 768px) {
  .empl_editable .empl__pic {
    width: 50px;
    height: 50px;
    margin-right: 6px;
  }
}
.user {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: #dfdfe1;
}
.empl__base {
  font-size: 18px;
  line-height: 24px;
  flex: 1;
}
.empl__position {
  font-size: 14px;
  line-height: 18px;
  color: #999;
}
.empl_editable .empl__position {
  padding-left: 7px;
}
.rec {
  margin-top: 25px;
  font-size: 16px;
  line-height: 1.3;
}
.rec__item {
  margin-bottom: 2px;
}
.rec__item_editable {
  margin-left: -7px;
}
.rec__item:last-child {
  margin-bottom: 0;
}
.expand__caption, .expand__title {
  display: flex;
}
.expand__title {
  text-decoration: none;
  color: #000;
}
.expand__box {
  flex: 1;
}
.expand__text {
  font-size: 16px;
  line-height: 1.35;
  color: #000;
  border-bottom: 1px dotted #000;
  transition: color .25s ease,border-color .25s ease;
}
.expand__content {
  display: none;
  padding-top: 32px;
}
.expand_opened .expand__content {
  display: block;
}
</style>
