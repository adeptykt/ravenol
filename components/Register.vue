<template>
  <dialog-form v-model="dialog" max-width="450px" title="Регистрация" buttonText="Зарегистрироваться" :buttonDisabled="!agree" v-on:onSubmit="onSubmit" linkText="Войти" v-on:linkClick="dialog=false; inverse('showLogin')" :error="error">
    <div>
      <v-text-field
        label="E-mail"
        type="text"
        hint="Введите адрес электронной почты"
        v-model="user.email"
        outline
        :error-messages="errors"
      />
      <v-text-field
        label="Пароль"
        type="password"
        hint="Придумайте пароль"
        v-model="user.password"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min]"
        outline
      />
      <v-text-field
        label="Подтверждение пароля"
        type="password"
        hint="Подтвердите пароль"
        v-model="checkpassword"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min, rules.compare]"
        outline
      />
      <div>
        <Checkbox v-model="agree" medium color='#ef9a20'>
          Настоящим подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности. <a @click="show_police=true">Узнать больше</a>
        </Checkbox>
      </div>
    </div>
    <Police v-model="show_police"/>
  </dialog-form>
</template>

<script>
import { mapActions } from 'vuex'
import DialogForm from '~/components/DialogForm.vue'
import Checkbox from '~/components/Checkbox.vue'
import Police from '~/components/Police.vue'

export default {
  components: {
    DialogForm,
    Checkbox,
    Police
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      dialog: false,
      user: {
        email: '',
        password: ''
      },
      checkpassword: '',
      showpassword: false,
      errors: [],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Должно быть минимум 6 символов',
        compare: v => v === this.user.password || 'Пароли не совпадают',
      },
      error: undefined,
      agree: false,
      show_police: false
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    },
    async 'user.email' (value) {
      this.error = undefined
      this.errors = []
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(value) == false) {
        this.errors = ['Некорректный e-mail']
        return
      }
      const data = await this.$store.dispatch('check-email/get', value)
      this.errors = data && data.exists ? ['Введенный почтовый ящик уже зарегистрирован'] : []
    },
    'user.password' (val) {
      this.error = undefined
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('tempusers/create', this.user)
        .then(res => { this.dialog = false })
        .catch(error => { this.error = error })
    },
    ...mapActions(['inverse'])
  }
}
</script>
