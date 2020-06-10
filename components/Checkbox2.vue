<template>
  <div class="a-checkbox">
    <v-icon :color="icon_color" :medium="medium" :small="small" @click="onclick">{{icon}}</v-icon>
    <div class="label">
      {{this.label}}
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'a-checkbox',

  props: {
    value: [Boolean, Array],
    color: String,
    small: {
      type: Boolean,
      default: true
    },
    medium: Boolean,
    label: String
  },
  data (vm) {
    const lazyValue = vm.$attrs.value || vm.value
    return {
      checked: false,
      icon: 'check_box_outline_blank',
      lazyValue,
      values: vm.value || []
    }
  },
  watch: {
    checked (val) {
      this.icon = val ? 'check_box' : 'check_box_outline_blank'
      if (Array.isArray(this.value)) {
        // const index = this.values.findIndex(a => a === this.lazyValue)
        // if (index > -1 && !val) this.values.splice(index, 1)
        // if (index == -1 && val) this.values.push(this.lazyValue)
        // this.$emit("input", this.values)
        const index = this.value.findIndex(a => a === this.lazyValue)
        if (index > -1 && !val) this.value.splice(index, 1)
        if (index == -1 && val) this.value.push(this.lazyValue)
      } else {
        this.$emit("input", val)
      }
      this.$emit("change", val, this.lazyValue)
    },
    value (val) {
      if (Array.isArray(this.value)) {
        const index = val.findIndex(a => a === this.lazyValue)
        this.checked = index > -1
      } else {
        this.checked = val
      }
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
  margin: auto 0;
}
.a-checkbox .label {
  margin-left: 8px;
  text-align: left;
}
</style>
