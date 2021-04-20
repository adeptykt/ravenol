<template>
  <div class="search" v-bind:class="{ search_opened: search_opened }" v-on:keyup.esc="onCloseSearch" tabindex="0">
    <div class="search__top">
      <div class="search__box">
        <div class="b-search b-search_sm b-search_popup">
          <div class="b-search__base">
            <input type="text" placeholder="Быстрый поиск" class="b-search__input" v-model="global_search" @change="onchange_search" ref="top_search_input">
          </div>
        </div>
      </div>
      <a href="#" class="search__close" @click="onCloseSearch">
        <span class="icon icon_close_big">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_big"></use></svg>
        </span>
      </a>
    </div>
    <div class="search__container">
      <div class="box">
        <div class="search__items items items_search">
          <template v-for="(item, i) in results">
            <div class="items__row">
              <div class="items__wrap">
                <n-link :to="link(item)" class="items__product" @click.native="onClickItemInSearch(item._id)">
                <!-- <n-link to="#" class="items__product" @click.native="onClickItemInSearch(item._id)"> -->
                  <div class="items__pic">
                    <img :src="image(item)" class="items__img">
                  </div>
                  <div class="items__base">
                    <div class="items__title">{{item.name}}</div>
                  </div>
                </n-link>
                <div class="items__info">
                  <!-- <div class="items__cell items__cell_value">1 л</div> -->
                  <div class="items__cell items__cell_vendor">{{item.article}}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'search',

  head () {
    return {
      bodyAttrs: {
        class: this.search_opened ? 'overlayed' : ''
      }
    }
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      search_opened: this.value,
      results: []
    }
  },
  computed: {
    global_search: {
      get: function () { return this.$store.state.global_search },
      set: function (val) { this.set_search(val) }
    },
  },
  watch: {
    value(val) {
      this.search_opened = val;
    },
    search_opened(val) {
      this.$emit('input', val)
    },
    global_search(val) {
      if (val) {
        this.search_opened = true
        this.$refs.top_search_input.focus()
        val !== this.select && val.length > 2 && this.querySelections(val)
      }
    },
  },
  methods: {
    image(item) {
      if (item.image && item.image.length > 0) return process.env.IMAGE_PREFIX + item.image
      return process.env.IMAGE_PREFIX + "noimage.jpg"
    },
    link(item) {
      return `/products/${item._id}`
    },
    onClickItemInSearch(id) {
      this.set_search('')
      this.search_opened = false
      this.$router.push({ path: `/products/${id}` })
    },
    onCloseSearch() {
      this.global_search = ''
      this.search_opened = false
    },
    querySelections(search) {
      if (search) {
        this.loading = true
        const query = { $skip: 0, $limit: 10, price: { $gt: 0 }, $search: search, $sort: { name: -1 } }
        console.log('querySelections', query);
        this.$store.dispatch('search/find', { query })
          .then(res => {
            this.results = res.data || []
            this.loading = false
          })
      } else {
        this.results = []
      }
    },
    onchange_search(e) {
      if (this.search_opened) {
        this.search_opened = false
        this.$router.push({ path: '/search', query: { find: this.global_search } })
        e.preventDefault()
      }
    },
    ...mapMutations({ set_search: 'set_search' })
  }
}
</script>
