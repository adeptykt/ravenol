<template>
  <div class="sort" v-bind:class="{ sort_opened: opened }">
    <a href="#" class="sort__caption" @click.prevent="opened=!opened">
      <span class="sort__title">{{title}}</span>
      <span class="sort__arrow icon icon_arrow_down2">
        <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_down"></use></svg>
      </span>
    </a>
    <div class="sort__dropdown">
      <div class="dropdown dropdown_sm">
        <ul class="dropdown__list">
          <li class="dropdown__item" v-for="(item, i) in items" :key="i">
            <a href="#" class="dropdown__link" @click.prevent="handleClick(item)">
              {{item.label || item.value}}
              <div class="dropdown__tooltip tooltip tooltip_bottom" v-if="item.tooltip">
                <div class="tooltip__icon icon icon_question">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#question"></use></svg>
                </div>
                <div class="tooltip__drop">
                  <div class="tooltip__content">{{item.tooltip}}</div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    items: Array
  },
  data: () => ({
    opened: false
  }),
  computed: {
    title() {
      const item = this.items.find(e => e.value === this.value)
      if (item) return item.label || item.value
      return this.value
    }
  },
  watch: {
    opened(val) {
      if (val) {
        setTimeout(() => document.addEventListener("click", this.close, false), 250);
      } else {
        document.removeEventListener("click", this.close, false);
      }
    }
  },
  methods: {
    close() {
      this.opened = false
    },
    handleClick(item) {
      this.$emit("input", item.value)
      this.opened = false
    }
  }
}
</script>
