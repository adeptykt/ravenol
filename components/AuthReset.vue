<template>
  <Dialog v-model="dialog" max-width="580px">
    <div class="auth_dialog">
      <div class="i-dialog-action">
        <a @click="dialog = false">
          <span class="icon icon_close_big">
            <svg class="icon__item">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_big"></use>
            </svg>
          </span>
        </a>
      </div>
      <div class="form form_direct_row form_type_center">
        <div class="form__wrap">
          <div class="form__heading">Новый пароль</div>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="form__row">
            <label class="form__label">Email</label>
            <div class="form__control">
              <input type="email" class="form__input" v-model="email">
              <div></div>
            </div>
          </div>
          <div class="form__wrap form__btn">
            <button type="submit" class="btn btn_type_flat btn_size_big" :class="{ btn_loading: isLoading }">
              <span class="loader" v-if="isLoading"></span>Восстановить
            </button>
            <a href="#" @click="onLinkClick" class="form__link link link_sm">Вход</a>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import { useFeathers } from '~/composables/useFeathers'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const uiStore = useUIStore()
const feathers = useFeathers()

const dialog = ref(props.modelValue)
const email = ref('')
const emailError = ref(false)
const isLoading = ref(false)

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

const onSubmit = async () => {
  emailError.value = false
  isLoading.value = true
  
  try {
    // Try to use auth-reset service, or fallback to direct API call
    try {
      const authResetService = feathers.service('auth-reset')
      await authResetService.create({ email: email.value })
    } catch (err) {
      // Fallback: might need to use a different service or endpoint
      // Adjust based on your backend implementation
      const { $fetch } = useNuxtApp()
      const config = useRuntimeConfig()
      await $fetch(`${config.public.apiUrl}auth-reset`, {
        method: 'POST',
        body: { email: email.value }
      })
    }
    
    isLoading.value = false
    uiStore.inverse('showReset')
    dialog.value = false
  } catch (error) {
    isLoading.value = false
    emailError.value = true
  }
}

const onLinkClick = () => {
  uiStore.inverse('showReset')
}
</script>

<style scoped>
.auth_dialog {
  padding: 15px;
  position: relative;
}
.i-dialog-action .v-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 0;
}
.form__heading {
  font-size: 36px;
  line-height: 1.3;
  margin-bottom: 20px;
}
.link {
  text-decoration: none;
  font-size: 16px;
  line-height: 1.3;
  color: #000;
  transition: color .25s ease;
}
.link_sm {
  font-size: 14px;
}
.form__link {
  margin-left: 20px;
}
.form__row {
  margin-top: 17px;
}
.form__row:first-child {
  margin-top: 0;
}
.form_direct_row .form__row {
  display: flex;
  align-items: flex-start;
}
.form_type_center .form__wrap {
  text-align: center;
  justify-content: center;
}
.form__control {
  flex: 1;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
}
.form_direct_row .form__control {
  max-width: 280px;
}
.form_type_center .form__control {
  width: 280px;
}
.form__input, .form__select, .form__textarea {
  outline: none;
  display: block;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0;
  border: 1px solid #cbcbcb;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  font-family: Roboto,sans-serif;
  font-weight: 400;
  padding: 8px 12px;
  background-color: #fff;
  transition: border-color .25s ease;
}
.form__input, .form__select {
  position: relative;
  height: 43px;
}
.form__select {
  border-radius: 0;
  box-sizing: border-box;
  appearance: none;
  position: relative;
  z-index: 1;
  padding-left: 12px;
  padding-right: 40px;
  background-repeat: no-repeat;
  background-image: url("../static/down.svg");
  background-position: 100%;
}
.form__input {
  appearance: none;
}
.form__error .form__input, .form__error .form__input:focus, .form__error .form__select, .form__error .form__select:focus, .form__error .form__textarea, .form__error .form__textarea:focus {
  border-color: #f18686;
}
.form__label {
  box-sizing: border-box;
  position: relative;
  font-family: Roboto,sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #000;
  display: block;
  margin-bottom: 9px;
  padding-top: 5px;
  word-wrap: break-word;
}
.form_direct_row .form__label {
  display: flex;
  align-items: center;
  padding-right: 15px;
  min-height: 43px;
  margin-bottom: 0;
  padding-top: 0;
  width: 136px;
}
.form_type_center .form__label {
  max-width: 210px;
  justify-content: flex-end;
  flex: 1;
}
.form__btn {
  display: flex;
  align-items: center;
  margin-top: 34px;
}
.btn {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: 0;
  border: none;
  outline: 0;
  margin: 0;
  font-family: Roboto,sans-serif;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  word-wrap: break-word;
  text-decoration: none;
  box-sizing: border-box;
  text-align: center;
  background-color: transparent;
  transition: color .25s linear,background-color .25s linear;
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
.form__error-message {
  width: 100%;
  display: none;
  color: #f91939;
  font-family: Roboto,sans-serif;
  font-size: 12px;
  line-height: 15px;
  padding-top: 4px;
  text-align: left;
}
.form__error .form__error-message {
  display: block;
}
.btn_loading {
  pointer-events: none;
  color: transparent!important
}
.loader {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -8px;
  margin-left: -8px;
  font-size: 5px;
  text-indent: -9999em;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg,#333 10%,transparent 72%);
  animation: rotate .7s infinite linear;
  z-index: 150
}
.loader:after, .loader:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box
}
.loader:after {
  margin: auto;
  bottom: 0;
  right: 0;
  background-color: #ffe300;
  width: 80%;
  height: 80%;
  border-radius: 50%
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #333;
  border-radius: 100% 0 0 0
}
@keyframes rotate{
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg)
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
}
</style>
