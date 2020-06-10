<template>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.logout()
    this.$router.push({ path: '/auth' })
  },
  methods: {
    ...mapActions('auth', ['logout']),
  }
}
</script>
