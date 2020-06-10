<template>
  <ul class="atabs atabs_sm">
    <li v-for="tab in tabs" :key="tab.title" class="atabs__item" v-bind:class="{ 'atabs__item_active' : tab.value === currentTab }">
      <a class="atabs__link" @click="handleClick(tab.value)">
        <span class="atabs__text">{{ tab.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'vue-adv-tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    }
  },
  data: (vm) => ({
    currentTab: vm.tabs[0].value
  }),
  mounted() {
    // this.currentTab = this.tabs[0].value
  },
  methods: {
    handleClick(value) {
      this.$emit('onClick', value)
      this.currentTab = value
    }
  }
}
</script>
