<!-- :rules="[emailMatch]" -->
<template>
  <v-dialog v-model="sharedState.showRegister" max-width="470px">
    <div class="dialog-reg">
      <div class="dialog-action">
        <v-btn icon @click="inverse('showRegister')">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="dialog-header">
        <h1 class="title">Регистрация</h1>
      </div>
      <div class="dialog-container">
        <div class="error-message" v-if="error">
          <!-- <v-icon large color="#ed1c24">error</v-icon> -->
          {{error.message}}
        </div>
        <form @submit.prevent="onSubmit" class="dialog-form">
          <v-text-field
            label="Адрес электронной почты (e-mail)"
            type="text"
            v-model="user.email"
            outline
            :error-messages="errors"
          />
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
          <div style="paddingBottom: 10px">
            <Checkbox v-model="agree" medium color='#ef9a20'>
              Настоящим подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности. <a @click="show_police=true">Узнать больше</a>
            </Checkbox>
          </div>
          <div class="footer">
            <div class="flex"></div>
            <div class="flex"><v-btn depressed light type="submit" color="#ef9a21" :disabled="!agree">Зарегистрироваться</v-btn></div>
            <div class="flex right"><a @click="inverse('showRegister'); inverse('showLogin')">Войти</a></div>
          </div>
        </form>
      </div>
      <Police v-model="show_police"/>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import Checkbox from '~/components/Checkbox.vue'
import Police from '~/components/Police.vue'

export default {
  components: {
    Checkbox,
    Police
  },
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
      errors: [],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Должно быть минимум 6 символов',
        emailMatch: value => {
          const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(value) == false) return 'Некорректный e-mail'
          const res = this.checkEmail(value)
          // const res = this.$store.dispatch('check-email/get', value)
          // .then(res => {
          //   if (res) return 'Введенный почтовый ящик уже зарегистрирован'
          //   return true
          // })
          console.log('q', res);
          return true
          // // if (res) return 'Введенный почтовый ящик уже зарегистрирован'
          // return true
        }
      },
      error: undefined,
      agree: false,
      show_police: false
    }
  },
  watch: {
    async 'user.email'(value) {
      this.errors = []
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(value) == false) {
        this.errors = ['Некорректный e-mail']
        return
      }
      const { data } = await axios.get(`${process.env.apiUrl}/check-email/${value}`)
      // const res = await this.$store.dispatch('check-email/get', value)
      console.log('checkEmail', data);
      this.errors = data ? ['Введенный почтовый ящик уже зарегистрирован'] : []
    },
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    }
  },
  methods: {
    async emailMatch(value) {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(value) == false) return 'Некорректный e-mail'
      // const res = this.checkEmail(value)
      var done = false
      var message
      this.$store.dispatch('check-email/get', value)
        .then(res => {
          // if (res) return 'Введенный почтовый ящик уже зарегистрирован'
          // return true
          message = 'Введенный почтовый ящик уже зарегистрирован'
          done = true
        })
      if (message) return message
      return true
      // // if (res) return 'Введенный почтовый ящик уже зарегистрирован'
      // return true
    },
    onSubmit() {
      this.$store.dispatch('tempusers/create', this.user)
        .then(res => {
          console.log('tempusers/create', res)
          this.inverse('showRegister')
        })
        .catch(error => {
          console.log('error', error)
          this.error = error
        })
    },
    ...mapActions(['inverse'])
  }
}
</script>

<style>
.dialog-reg {
  background-color: white;
}
.dialog-reg .dialog-action .v-btn--icon {
  width: auto;
}
.dialog-reg .dialog-action .v-btn {
  height: auto;
  display: inline-block;
  float: right;
}
.dialog-reg .dialog-header {
  border-bottom: 1px solid #949494;
  padding: 15px;
  text-align: center;
}
.dialog-reg .dialog-container {
  padding: 20px;
}
.dialog-reg .dialog-form {
  text-align: center;
}
.dialog-reg .dialog-form a {
}
.dialog-reg .footer .flex {
  flex: 1;
}
.dialog-reg .footer .right {
  text-align: right;
}
.dialog-reg .footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.dialog-reg .footer .v-btn {
  margin: 0;
  text-transform: none;
}
.dialog-reg .error-message {
  background-color: #eee;
  border-radius: 4px;
  margin: 15px 0;
  color: #ed1c24;
  text-align: center;
  padding: 15px;
}
</style>
