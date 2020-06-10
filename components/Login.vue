<template>
  <dialog-form v-model="dialog" max-width="450px" title="Авторизация на сайте" buttonText="Войти" v-on:onSubmit="onSubmit" linkText="Регистрация" v-on:linkClick="dialog=false; inverse('showRegister')" :error="error">
    <div>
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
    </div>
  </dialog-form>
</template>

<script>
import { mapActions } from 'vuex'
import DialogForm from '~/components/DialogForm.vue'

export default {
  components: {
    DialogForm
  },
  props: {
    value: Boolean
  },
  data () {
    return {
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
    },
    'user.email' (value) {
      this.error = undefined
    },
    'user.password' (val) {
      this.error = undefined
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
