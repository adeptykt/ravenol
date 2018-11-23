<template>
  <v-layout>
    <div class="verification">
      <div class="p" v-bind:class="largescreen">
        <div class="spinner" v-if="loading"><Socket size="60px" /></div>
        <div class="swal2-icon" v-if="!loading"><v-icon size=80 :color=color>{{icon}}</v-icon></div>
        <h2 v-if="!loading">{{message}}</h2>
      </div>
    </div>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Socket from '~/components/Socket.vue'

export default {
  components: {
    Socket
  },
  validate ({ params }) {
    return /^[0-9a-z]{24}$/.test(params.id)
  },
  async asyncData({ params }) {
    const { data } = await axios.get(`${process.env.apiUrl}/email-verification/${params.id}`)
    return { success: data.success ? true : false, loading: false }
  },
  data() {
    return {
      id: null,
      loading: true,
      success: false
    }
  },
  computed: {
    icon() {
      return this.success ? 'check_circle_outline' : 'error_outline'
    },
    color() {
      return this.success ? '#90EE90' : '#F08080'
    },
    message() {
      return this.success ? 'Активация почтового ящика прошла успешно' : 'Ошибка при активации почтового адреса'
    },
    largescreen() {
      return {
        largescreen: !this.$store.state.mobile
      }
    },
  }
}
</script>

<style>
.verification {
  width: 100%;
}
.verification h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 10px 0 20px;
  text-align: center;
}
.verification div {
  margin-bottom: 10px;
}
.verification .largescreen {
  width: 80%;
}
.verification .p {
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
}
.verification .spinner {
  margin: 0 auto;
  padding: 50px 0;
}
</style>
