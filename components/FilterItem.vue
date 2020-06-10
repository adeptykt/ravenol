<template>
  <div>
    <li class="filter__item" v-bind:class="{ filter__item_opened: opened }">
      <a href="#" class="filter__caption" @click.prevent="onClick">
        <span class="filter__title">{{ title }}</span>
        <span class="filter__arrow icon icon_arrow_down2">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_down"></use></svg>
        </span>
      </a>
      <div class="filter__dropdown" @click.stop>
        <div class="filter__container">
          <div class="filter__actions">
            <div class="filter__content">
              <div>
                <template v-for="(item, i) in items">
                  <div class="filter__checkbox checkbox checkbox_sm" :key="i">
                    <input type="checkbox" :id="uid+i" class="checkbox__input" :value="item.value" v-model="values">
                    <label :for="uid+i" class="checkbox__label">{{ item.title || item.value }}</label>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import Vue from "vue"

export default {
  name: 'filter-item',

  props: {
    value: Array,
    title: String,
    items: Array,
    uid: String
  },
  data (vm) {
    return {
      opened: false,
      values: vm.value
    }
  },
  watch: {
    values(val) {
      this.$emit("input", val)
    },
    value(val) {
      this.values = val
    },
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
    onClick(event) {
      this.opened = !this.opened
    }
  },
}
</script>
