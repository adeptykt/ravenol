<template>
  <div class="search" v-bind:class="{ search_opened: search_opened_ }">
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
                <n-link :to="'/products/' + item._id" class="items__product">
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

  props: {
    search_opened: Boolean
  },
  data () {
    return {
      search_opened_: this.search_opened,
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
    search_opened(val) {
      this.search_opened_ = val;
    },
    global_search(val) {
      if (val) {
        this.search_opened_ = true
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
    onCloseSearch() {
      this.global_search = ''
      this.search_opened_ = false
    },
    querySelections(search) {
      if (search) {
        this.loading = true
        const query = { $skip: 0, $limit: 10, price: { $gt: 0 }, $search: search }
        this.$store.dispatch('search/find', { query })
          .then(res => {
            console.log('results', res.data);
            this.results = res.data || []
            this.loading = false
          })
      } else {
        this.results = []
      }
    },
    onchange_search(e) {
      console.log('onchange_search', this.global_search);
      this.search_opened_ = false
      this.$router.push({ path: 'search', query: { find: this.global_search } })
      e.preventDefault()
    },
    ...mapMutations({ set_search: 'set_search' })
  }
}
</script>
