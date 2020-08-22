<template>
  <div class="paginator" v-if="pages>1">
    <div class="paginator__item paginator__item_prev">
      <!-- <a href="/products/?page=1" @click.prevent="onClick(1)" class="paginator__btn"> -->
      <nuxt-link :to="{ path: $route.path, query: { page: 1 } }" class="paginator__btn">
        <span class="icon icon_plus_small">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_left"></use></svg>
        </span>
      </nuxt-link>
    </div>
    <div class="paginator__list">
      <!-- <nuxt-link :to="{ path: $route.path, query: { page: item.page } }" @click="onClick(item.page)" class="paginator__link" v-bind:class="{ paginator__link_active: (page === item.page) }" v-for="item in items" :key="item.page"> -->
      <nuxt-link :to="{ path: $route.path, query: getquery(item.page) }" class="paginator__link" v-bind:class="{ paginator__link_active: (page === item.page) }" v-for="item in items" :key="item.page">
        <div class="paginator__text">{{item.value}}</div>
      </nuxt-link>
    </div>
    <div class="paginator__item paginator__item_next">
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
    value: Number,
    pages: Number,
    query: {
      type: Object,
      default: {}
    },
    max: {
      type: Number,
      required: true,
      validator: function(value) {
        return (value % 2) === 0 && value >= 6
      }
    }
  },
  data (vm) {
    return {
      page: vm.value || 1,
      items: []
    }
  },
  watch: {
    '$route.query.page'(val) {
      this.page = val
    },
    value(val) {
      this.page = val
    },
    page(val) {
      this.$emit("input", val)
      this.backToTop()
      this.createPagination(this.pages, this.page)
    },
    pages(val) {
      this.createPagination(this.pages, this.page)
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
    this.createPagination(this.pages, this.page)
  },
  methods: {
    getquery(page) {
      return Object.assign({}, this.query, { page })
    },
    onClick(page) {
      this.page = page
      this.createPagination(this.pages, page)
    },
    backToTop() {
      window.smoothscroll()
      this.$emit('scrolled')
    },
    createPagination(pages, page) {
      let limit = (this.max - 2) / 2
      let pageCutLow = page - (limit - 1)
      let pageCutHigh = page + (limit - 1)
      this.items = []
      if (pages <= limit * 2 + 2) for (let p = 1; p <= pages; p++) this.items.push({ value: p, page: p })
      else {
        if (page <= limit) pageCutHigh += limit - page + 1
        if (pages - page <= limit) pageCutLow -= limit - (pages - page) + 1
        if (page > limit) {
          this.items.push({ value: 1, page: 1 })
          if (page > limit + 2) this.items.push({ value: '...', page: pageCutLow-1 })
          else if (page > limit + 1) this.items.push({ value: 2, page: 2 })
        }
        for (let p = pageCutLow; p <= pageCutHigh; p++) {
          if (p <= 0) p = 1
          if (p > pages) continue
          this.items.push({ value: p, page: p })
        }
        if (page < pages-(limit-1)) {
          if (page < pages - limit - 1) this.items.push({ value: '...', page: pageCutHigh+1 })
          else if (page < pages - limit) this.items.push({ value: pages - 1, page: pages - 1 })
          this.items.push({ value: pages, page: pages })
        }
      }
    }
  }
}
</script>
