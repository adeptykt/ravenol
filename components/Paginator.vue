<template>
  <div class="paginator">
    <div class="paginator__item paginator__item_prev">
      <a href="/products/?page=1" @click.prevent="onClick(1)" class="paginator__btn">
        <span class="icon icon_plus_small">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use></svg>
        </span>
      </a>
    </div>
    <div class="paginator__list">
      <nuxt-link :to="{ path: $route.path, query: { page: i } }" @click="onClick(i)" class="paginator__link" v-bind:class="{ paginator__link_active: (page === i) }" v-for="i in pages" :key="i">
        <span class="paginator__text">{{i}}</span>
      </nuxt-link>
    </div>
    <div class="paginator__item paginator__item_next">
      <!-- <a :href="'/products/?page='+pages" @click.prevent="onClick(pages)" class="paginator__btn"> -->
      <nuxt-link :to="{ path: $route.path, query: { page: pages } }" class="paginator__btn">
        <span class="icon icon_plus_small">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_right"></use></svg>
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginator',

  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.limit)
    }
  },
  data (vm) {
    return {
      page_: vm.page
    }
  },
  watch: {
    '$route.query.page'(val) {
      this.page_ = val
    },
    page_(val) {
      // this.$emit("input", val)
      this.$emit('update:page', val)
      this.backToTop()
    }
  },
  mounted () {
    window.smoothscroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      const element = document.getElementById('container')
      const scrollTo = element.offsetTop
      if (currentScroll > scrollTo) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(scrollTo, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
  },
  methods: {
    onClick(val) {
      this.page_ = val
    },
    backToTop() {
      window.smoothscroll()
      this.$emit('scrolled')
    }
  }
}
</script>
