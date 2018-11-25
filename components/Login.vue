<template>
  <v-dialog v-model="sharedState.showLogin" max-width="450px">
    <div class="dialog-login">
      <div class="dialog-action">
        <v-btn icon @click="inverse('showLogin')">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="dialog-header">
        <h1 class="title">Авторизация на сайте</h1>
      </div>
      <div class="dialog-container">
        <div class="error-message" v-if="error">
          <v-icon large color="#ed1c24">error</v-icon>
          {{error.message}}
        </div>
        <form @submit.prevent="onSubmit" class="dialog-form">
          <v-text-field label="Адрес электронной почты (e-mail)" type="text" v-model="user.email" :rules="[rules.emailMatch]" outline />
          <v-text-field
            label="Пароль"
            type="password"
            v-model="user.password"
            :append-icon="showpassword ? 'visibility_off' : 'visibility'"
            :type="showpassword ? 'text' : 'password'"
            @click:append="showpassword = !showpassword"
            :rules="[rules.min]"
            outline
          />
          <div class="footer">
            <div class="flex"></div>
            <div class="flex"><v-btn depressed dark type="submit" color="#ef9a21">Войти</v-btn></div>
            <div class="flex right"><a @click="inverse('showLogin'); inverse('showRegister')">Регистрация</a></div>
          </div>
        </form>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      sharedState: this.$store.state,
      dialog: false,
      valid: true,
      user: {
        email: '',
        password: '',
      },
      showpassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Должно быть минимум 6 символов',
        emailMatch: value => {
          const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(value) == false) return 'Некорректный e-mail'
          return true
        }
      },
      error: undefined
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    }
  },
  methods: {
    onSubmit() {
      this.authenticate({ strategy: 'local', ...this.user })
        .then((res) => {
          console.log('onSubmit', res.accessToken);
          console.log('payload', this.$store.state.auth.payload);
          this.inverse('showLogin')
        })
        .catch(error => {
          let type = error.className
          error = Object.assign({}, error)
          error.message = (type === 'not-authenticated')
            ? 'Неверный логин или пароль'
            : 'An error prevented login.'
          this.error = error
        })
    },
    ...mapActions(['inverse']),
    ...mapActions('auth', ['authenticate'])
  }
}
</script>

<style>
.dialog-login {
  background-color: white;
}
.dialog-login .dialog-action .v-btn--icon {
  width: auto;
}
.dialog-login .dialog-action .v-btn {
  height: auto;
  display: inline-block;
  float: right;
}
.dialog-login .dialog-header {
  border-bottom: 1px solid #949494;
  padding: 15px;
  text-align: center;
}
.dialog-login .dialog-container {
  padding: 20px;
}
.dialog-login .dialog-form {
  text-align: center;
}
.dialog-login .dialog-form a {
}
.dialog-login .footer .flex {
  flex: 1;
}
.dialog-login .footer .right {
  text-align: right;
}
.dialog-login .footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.dialog-login .footer .v-btn {
  margin: 10px 0 0 0;
  text-transform: none;
}
.dialog-login .hr {
  border-top: 2px solid #ccc;
  width: 100%;
  height: 2px;
  margin-top: 5px;
  padding-top: 5px;
}
.dialog-login .error-message {
  background-color: #eee;
  border-radius: 4px;
  margin: 15px 0;
  color: #ed1c24;
  text-align: center;
  padding: 15px;
}
</style>
