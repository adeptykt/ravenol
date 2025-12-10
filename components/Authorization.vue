<template>
  <Dialog v-model="dialog" max-width="580px">
    <div class="auth_dialog">
      <div class="i-dialog-action">
        <a href="#" @click="dialog = false">
          <span class="icon icon_close_big">
            <svg class="icon__item">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#close_big`"></use>
            </svg>
          </span>
        </a>
      </div>
      <div class="form form_direct_row form_type_center">
        <div class="form__wrap">
          <div class="form__heading">Авторизация</div>
          <ul class="form__tabs switch">
            <li class="switch__item" :class="{ switch__item_active: (tab === 0) }">
              <a href="#" class="switch__link link" @click.prevent="onTabClick(0)">Вход</a>
            </li>
            <li class="switch__item" :class="{ switch__item_active: (tab === 1) }">
              <a href="#" class="switch__link link" @click.prevent="onTabClick(1)">Регистрация</a>
            </li>
          </ul>
        </div>
        <form v-if="tab === 0" @submit.prevent="login">
          <div class="form__row">
            <label class="form__label">Email</label>
            <div class="form__control">
              <input type="email" class="form__input" v-model="user.email">
              <div></div>
            </div>
          </div>
          <div class="form__row" :class="{ form__error: passwordError }">
            <label class="form__label">Пароль</label>
            <div class="form__control">
              <input :type="passwordType" class="form__input" v-model="user.password">
              <div></div>
              <i class="fa show-password" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
              <div v-if="passwordError">
                <div class="form__error-message">Неправильный пароль</div>
              </div>
            </div>
          </div>
          <div class="form__wrap form__btn">
            <button type="submit" class="btn btn_type_flat btn_size_big" :class="{ btn_loading: isLoading }">
              <span class="loader" v-if="isLoading"></span>Войти
            </button>
            <a href="#" @click="dialog = false; inverse('showReset')" class="form__link link link_sm">Забыли пароль?</a>
          </div>
        </form>
        <form v-if="tab === 1" @submit.prevent="register">
          <div class="form__row">
            <label class="form__label">Тип регистрации</label>
            <div class="form__control">
              <select class="form__select" v-model="user.type">
                <option class="form__option" value="0">Физическое лицо</option>
                <option class="form__option" value="1">Юридическое лицо</option>
              </select>
            </div>
          </div>
          <div class="form__row" v-if="user.type === '1'">
            <label class="form__label">Наименование компании</label>
            <div class="form__control">
              <input type="text" class="form__input" v-model="user.company">
            </div>
          </div>
          <div class="form__row" :class="{ form__error: emailError }">
            <label class="form__label">Email</label>
            <div class="form__control">
              <input type="email" class="form__input" v-model="user.email">
              <div></div>
              <div v-if="emailError">
                <div class="form__error-message">Такое значение поля email уже существует.</div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <label class="form__label">Пароль</label>
            <div class="form__control">
              <input :type="passwordType" class="form__input" v-model="user.password" placeholder="Придумайте пароль">
              <div></div>
              <i class="fa show-password" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
            </div>
          </div>
          <div class="form__row form__wrap">
            <div class="form__control form__control_pt">
              <div class="checkbox checkbox_light">
                <input type="checkbox" id="checkbox-5" class="checkbox__input" v-model="user.subscribe">
                <label for="checkbox-5" class="checkbox__label">Хочу получать рассылку о новинках и акциях</label>
              </div>
            </div>
          </div>
          <div class="form__wrap form__btn">
            <button type="submit" class="btn btn_type_flat btn_size_big" :class="{ btn_loading: isLoading }">
              <span class="loader" v-if="isLoading"></span>Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNuxtApp } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useTempUsers } from '~/composables/useTempUsers'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const authStore = useAuthStore()
const uiStore = useUIStore()
const { create: addUser } = useTempUsers()

const dialog = ref(props.modelValue)
const tab = ref(0)
const hidePassword = ref(true)
const passwordError = ref(false)
const emailError = ref(false)
const isLoading = ref(false)

const user = ref({
  type: '1',
  company: '',
  email: '',
  password: '',
  subscribe: true
})

const passwordType = computed(() => hidePassword.value ? 'password' : 'text')
const passwordIcon = computed(() => hidePassword.value ? 'fa-eye' : 'fa-eye-slash')

watch(() => props.modelValue, (val) => {
  dialog.value = val
  if (val) {
    passwordError.value = false
    emailError.value = false
  }
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

const onTabClick = (value: number) => {
  tab.value = value
}

const login = async () => {
  passwordError.value = false
  isLoading.value = true
  
  try {
    const { $feathers } = useNuxtApp()
    const feathers = $feathers as any
    
    const result = await feathers.authenticate({
      strategy: 'local',
      email: user.value.email,
      password: user.value.password
    })
    
    authStore.setAuth(result.accessToken, result.payload)
    
    // Get user data
    const userService = feathers.service('users')
    const userData = await userService.get(result.payload.userId)
    authStore.setUser(userData)
    
    isLoading.value = false
    uiStore.inverse('showAuthorization')
  } catch (error) {
    isLoading.value = false
    passwordError.value = true
  }
}

const register = async () => {
  console.log('register')
  isLoading.value = true
  
  try {
    await addUser(user.value)
    isLoading.value = false
    dialog.value = false
  } catch (error) {
    isLoading.value = false
    emailError.value = true
    console.log('error', error)
  }
}

const inverse = (name: string) => {
  uiStore.inverse(name as any)
}
</script>

<style>
.show-password {
  position: absolute;
  top: 12px;
  right: 13px;
}
.auth_dialog {
  padding: 15px;
  position: relative;
}
.i-dialog-action .icon_close_big {
  position: absolute;
  top: 2px;
  right: 2px;
  margin: 0;
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
.checkbox, .radio {
  line-height: 1;
}
.checkbox__input, .radio__input {
  display: none;
}
.checkbox__label, .radio__label {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  position: relative;
  min-height: 22px;
  color: #000;
}
.checkbox__label {
  padding-top: 2px;
  padding-left: 32px;
}
.checkbox_light .checkbox__label {
  color: #666;
}
.checkbox__label:before, .radio__label:before {
  top: 0;
  content: "";
  box-sizing: border-box;
  position: absolute;
  transition: border-color .25s ease;
}
.checkbox__label:before {
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #fff;
  border: 1px solid #cbcbcb;
}
.checkbox__label:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 14px;
  height: 12px;
  background-image: url("../static/marked.svg");
  opacity: 0;
  transform: scale(.8);
  transform-origin: center center;
  transition: opacity .25s ease,transform .25s ease,-webkit-transform .25s ease;
}
.checkbox__input:checked+.checkbox__label:after {
  opacity: 1;
  transform: scale(1);
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
