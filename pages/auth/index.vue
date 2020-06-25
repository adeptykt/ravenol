<template>
  <div class="box">
    <div class="center">
      <div class="center__item">
        <div class="emailsent" v-if="emailsent">На адрес электронной почты: <b>{{user.email}}</b> отправлено письмо с инструкцией по завершению регистрации</div>
        <div class="form form_direct_row form_type_center" v-else>
          <div class="form__wrap">
            <div class="form__heading">Авторизация</div>
            <ul class="form__tabs switch">
              <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 0) }"><a href="#" class="switch__link link" @click.prevent="onTabClick(0)">Вход</a></li>
              <li class="switch__item" v-bind:class="{ switch__item_active: (tab == 1) }"><a href="#" class="switch__link link" @click.prevent="onTabClick(1)">Регистрация</a></li>
            </ul>
          </div>
          <form action v-if="tab==0" @submit.prevent="login">
            <div class="form__row">
              <label class="form__label">Email</label>
              <div class="form__control">
                <input type="email" class="form__input" v-model="user.email"><div></div>
              </div>
            </div>
            <div class="form__row" v-bind:class="{ form__error: password_error }">
              <label class="form__label">Пароль</label>
              <div class="form__control">
                <input :type="passwordType" class="form__input" v-model="user.password"><div></div>
                <i class="fa show-password" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
                <div v-if="password_error"><div class="form__error-message">Неправильный пароль</div></div>
              </div>
            </div>
            <div class="form__wrap form__btn">
              <button type="submit" class="btn btn_type_flat btn_size_big" v-bind:class="{ btn_loading: isLoading }"><span class="loader" v-if="isLoading"></span>Войти</button>
              <a href="#" @click="dialog = false; inverse('showReset')" class="form__link link link_sm">Забыли пароль?</a>
            </div>
          </form>
          <form action v-if="tab==1" @submit.prevent="register">
            <div class="form__row">
              <label class="form__label">Тип регистрации</label>
              <div class="form__control">
                <select class="form__select" v-model="user.type"><option class="form__option" value='0'>Физическое лицо</option><option class="form__option" value='1'>Юридическое лицо</option></select>
              </div>
            </div>
            <div class="form__row" v-if="user.type==='1'">
              <label class="form__label">Наименование компании</label>
              <div class="form__control">
                <input type="text" class="form__input" v-model="user.company">
              </div>
            </div>
            <div class="form__row" v-bind:class="{ form__error: email_error }">
              <label class="form__label">Email</label>
              <div class="form__control">
                <input type="email" class="form__input" v-model="user.email"><div></div>
                <div v-if="email_error"><div class="form__error-message">Такое значение поля email уже существует.</div></div>
              </div>
            </div>
            <div class="form__row">
              <label class="form__label">Пароль</label>
              <div class="form__control">
                <input :type="passwordType" class="form__input" v-model="user.password" placeholder="Придумайте пароль"><div></div>
                <i class="fa show-password" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
              </div>
            </div>
            <!-- <div class="form__row">
              <label class="form__label">Подтверждение</label>
              <div class="form__control">
                <input :type="passwordType" class="form__input" v-model="confirmation" placeholder="Подтвердите пароль"><div></div>
                <i class="fa show-password" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
              </div>
            </div> -->
            <div class="form__row form__wrap">
              <div class="form__control form__control_pt">
                <div class="checkbox checkbox_light">
                  <input type="checkbox" id="checkbox-5" class="checkbox__input" v-model="user.subscribe">
                  <label for="checkbox-5" class="checkbox__label">Хочу получать рассылку о новинках и акциях</label>
                </div>
              </div>
            </div>
            <div class="form__wrap form__btn">
              <button type="submit" class="btn btn_type_flat btn_size_big" v-bind:class="{ btn_loading: isLoading }"><span class="loader" v-if="isLoading"></span>Зарегистрироваться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head () {
    return {
      title: 'Авторизация',
    }
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      tab: 0,
      valid: true,
      type: 0,
      user: {
        type: '1',
        company: '',
        email: '',
        password: '',
        subscribe: true
      },
      hidePassword: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Должно быть минимум 6 символов',
        emailMatch: value => {
          const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(value) == false) return 'Некорректный e-mail'
          return true
        }
      },
      error: undefined,
      password_error: false,
      email_error: false,
      isLoading: false,
      emailsent: false,
      confirmation: ''
    }
  },
  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'fa-eye' : 'fa-eye-slash'
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
      if (val) {
        this.password_error = false
        this.email_error = false
      }
    }
  },
  // mounted() {
  //   // this.set_cart({ id: 3339, count: 1 })
  //   this.$store.commit('localStorage/set_cart', { id: 3339, count: 1 })
  // },
  methods: {
    onTabClick(value) {
      this.tab = value
    },
    login() {
      this.password_error = false
      this.isLoading = true
      this.authenticate({ strategy: 'local', ...this.user })
        .then((res) => {
          this.isLoading = false
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          this.isLoading = false
          this.password_error = true
          // let type = error.className
          // error = Object.assign({}, error)
          // error.message = (type === 'not-authenticated')
          //   ? 'Неверный логин или пароль'
          //   : 'An error prevented login.'
          // this.error = error
        })
    },
    register() {
      this.isLoading = true
      this.addUser(this.user)
        .then(res => {
          this.isLoading = false
          this.emailsent = true
        })
        .catch(error => {
          this.isLoading = false
          this.email_error = true
          console.log('error', error);
        })
    },
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', { addUser: 'create' }),
  }
}
</script>

<style>
.emailsent {
  font-size: 14px;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.center__item {
  padding-top: 25px;
  transform: translateX(-100px);
}
@media (max-width: 1024px) {
  .center__item {
    -webkit-transform: translateX(-70px);
    transform: translateX(-70px);
  }
}
@media (max-width: 768px) {
  .center__item {
    padding-top: 7px;
    transform: none;
  }
}
@media (max-width: 479px) {
  .center {
    display: block;
  }
}
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
  background-image: url("../../static/marked.svg");
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
