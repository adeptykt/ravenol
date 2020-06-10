<template>
  <nav class="tabs" :class="wrapperClass">
    <div class="tabs__active-line" :class="lineClass" :style="{ width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"></div>
    <div v-for="tab in tabs" :ref="tab.value" :key="tab.title" :class="tabClass">
      <a class="tabs__item" :class="[{ 'tabs__item_active' : tab.value === currentTab }, tab.value === currentTab && tabActiveClass ? tabActiveClass: '']" @click="handleClick(tab.value)">
        {{ tab.name }}
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'vue-tabs-with-active-line',
  props: {
    // currentTab: {
    //   type: String,
    //   required: true,
    // },
    tabs: {
      type: Array,
      required: true,
    },
    wrapperClass: {
      type: String,
      required: false,
    },
    tabClass: {
      type: String,
      required: false,
    },
    tabActiveClass: {
      type: String,
      required: false,
    },
    lineClass: {
      type: String,
      required: false,
    },
  },
  watch: {
    // currentTab(newCurrentTab) {
    //   if (this.newTab === newCurrentTab) return;
    //   this.moveActiveLine(newCurrentTab);
    // },
  },
  data: () => ({
    activeLineWidth: 0,
    activeLineOffset: 0,
    newTab: '',
    currentTab: ''
  }),
  mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.handleResize))
    this.currentTab = this.tabs[0].value
    this.moveActiveLine(this.currentTab)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.moveActiveLine(this.currentTab)
    },
    handleClick(value) {
      this.$emit('onClick', value)
      this.currentTab = value
      this.$nextTick(() => this.moveActiveLine(value))
    },
    moveActiveLine(newValue) {
      const element = this.$refs[newValue][0]
      if (!element) return
      this.activeLineWidth = element.clientWidth
      this.activeLineOffset = element.offsetLeft
    }
  }
}
</script>
