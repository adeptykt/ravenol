<template>
  <dialog-form v-model="dialog" max-width="450px" title="Профиль" buttonText="Сохранить" v-on:onSubmit="onSubmit">
    <div class="dialog-form">
      <v-text-field label="Телефон" type="text" v-model="phone" />
      <v-text-field label="Адрес электронной почты (e-mail)" type="text" v-model="email" :rules="[rules.emailMatch]" />
      <!-- <v-text-field
        label="Пароль"
        type="password"
        v-model="password"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min]"
        outline
      /> -->
      <v-text-field label="Имя" type="text" v-model="firstName" />
      <v-text-field label="Фамилия" type="text" v-model="lastName" />
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
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      password: '',
      showpassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Должно быть минимум 6 символов',
        emailMatch: value => {
          const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(value) == false) return 'Некорректный e-mail'
          return true
        }
      }
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    },
    'this.$store.state.auth.user' (val) {
      console.log('this.$store.state.auth.user');
    }
  },
  methods: {
    onSubmit() {
      const data = { phone: this.phone, firstName: this.firstName, lastName: this.lastName }
      // console.log('payload', this.$store.state.auth.payload);
      // console.log('accessToken', this.$store.state.auth.accessToken);
      // console.log('user', this.$store.state.auth.user);
      // console.log('this.patch', this.patch);
      // this.$store.dispatch('users/patch', [this.$store.state.auth.user._id, data, { accessToken: this.$store.state.auth.accessToken }])
      this.patch([this.$store.state.auth.user._id, data, { accessToken: this.$store.state.auth.accessToken }])
      this.inverse('showProfile')
    },
    ...mapActions(['inverse']),
    ...mapActions('users', ['patch'])
  }
}
</script>
