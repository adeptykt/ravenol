<template>
  <div class="a-checkbox">
    <v-icon :color="icon_color" medium @click="onclick">{{icon}}</v-icon>
    <div class="label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: [Boolean, Array],
    color: String
  },
  data () {
    return {
      checked: false,
      icon: 'check_box_outline_blank'
    }
  },
  watch: {
    checked (val) {
      this.icon = val ? 'check_box' : 'check_box_outline_blank'
      this.$emit("input", val)
    },
    value (val) {
      this.checked = val
    }
  },
  computed: {
    icon_color () {
      return this.checked ? (this.color || 'primary') : 'inherit'
    }
  },
  methods: {
    onclick() {
      this.checked = !this.checked
    }
  }
}
</script>

<style>
.a-checkbox {
  display: flex;
  flex-flow: raw nowrap;
}
.a-checkbox .v-icon {
  cursor: pointer;
}
.a-checkbox .label {
  margin-left: 8px;
  text-align: left;
}
</style>
