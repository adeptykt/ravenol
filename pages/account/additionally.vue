<template>
  <Account>
    <div class="settings__base" partner-addresses="[object Object]" partner-requisites="[object Object]">
      <form action="" class="form">
        <div class="form__row">
          <label class="form__label">ФИО руководителя компании</label>
          <div class="form__control form__control_narrow">
            <input type="text" class="form__input">
            <div></div>
          </div>
        </div>
        <div class="form__row">
          <label class="form__label">Телефон/факс</label>
          <div class="form__control form__control_narrow">
            <div class="form__item form__item_added">
              <masked-input type="tel" placeholder="+7 (___) ___-__-__" class="form__input"></masked-input>
              <div></div>
              <!---->
            </div>
          </div>
          <div class="form__add">
            <a href="#" class="add-btn">
              <span class="add-btn__icon icon icon_plus_small">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg>
              </span>
              <div class="add-btn__box"><span class="add-btn__text">Добавить</span></div>
            </a>
          </div>
        </div>
        <div class="form__row">
          <label class="form__label">Уведомления</label>
          <div class="form__control form__control_checkboxes">
            <div class="form__item">
              <div class="checkbox">
                <input type="checkbox" id="checkbox-1" class="checkbox__input">
                <label for="checkbox-1" class="checkbox__label">Я хочу после оформления заказа автоматически получать счет на email</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form__btn">
          <button type="submit" class="btn btn_type_flat btn_size_big">
            <!---->Сохранить</button>
        </div>
      </form>
    </div>
  </Account>
</template>

<script>
import Account from '~/components/Account.vue'
import MaskedInput from 'vue-text-mask'

export default {
  head () {
    return {
      title: 'Дополнительно - Indexol',
    }
  },
  components: { Account, MaskedInput },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
