<template>
  <v-app>
    <style scoped>
      .v-toolbar__content {
        padding: 0;
      }
    </style>
    <v-toolbar
      fixed
      app
      dark
      flat
      color="#0070C6"
      :extended="sharedState.mobile"
      height="56px"
    >
      <div class="toolbar_content" :style="styleObject">
        <v-spacer v-if="sharedState.mobile"></v-spacer>
        <a href="/" class="logo">
          <img src="/logo2.svg" alt="Vuetify.js">
        </a>
          <div class="search" v-if="!sharedState.mobile">
            <style scoped>
              .search .v-text-field.v-text-field--solo .v-input__control {
                min-height: 30px;
                padding: 0;
              }
            </style>
            <v-autocomplete
              :loading="loading"
              :items="results"
              :search-input.sync="search"
              v-model="select"
              class="mx-3"
              flat
              hide-no-data
              hide-details
              label="Поиск и подбор"
              solo-inverted
              item-text="name"
              height="20"
              solo
              no-filter
              return-object
              clearable
            ></v-autocomplete>
            <!-- <v-btn icon @click="searchSubmit">
              <v-icon>search</v-icon>
            </v-btn> -->
          </div>
        <!-- </v-form> -->
        <v-toolbar-title v-text="title" v-if="!sharedState.mobile"></v-toolbar-title>
        <v-spacer v-if="sharedState.mobile"></v-spacer>
      </div>
      <div class="search" slot="extension" v-if="sharedState.mobile">
        <style scoped>
          .search .v-text-field.v-text-field--solo .v-input__control {
            min-height: 40px;
            padding-bottom: 20px;
          }
        </style>
        <v-autocomplete
          :loading="loading"
          :items="results"
          :search-input.sync="search"
          v-model="select"
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Поиск и подбор"
          solo-inverted
          item-text="name"
          height="20"
          solo
          no-filter
          return-object
          clearable
        ></v-autocomplete>
      </div>
    </v-toolbar>
    <v-content>
      <div>
        <div class="main-tabs">
          <v-tabs v-model="model" centered color="transparent" slider-color="black">
            <v-tab
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              v-bind:style="{ fontSize: '18px', textTransform: 'none', fontWiehgt: 400 }"
            >
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </div>
        <v-container v-bind:class="{main: true}">
          <nuxt />
        </v-container>
      </div>
      <Product v-model="sharedState.visible" :id="sharedState.id"/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Product from '~/components/Product.vue'
export default {
  components: {
    Product
  },
  data () {
    return {
      sharedState: this.$store.state,
      loading: false,
      search: null,
      select: null,
      results: [],
      model: 'tab-0',
      items: [
        { icon: 'apps', title: 'Главная', to: '/' },
        { icon: 'bubble_chart', title: 'Продукция', to: '/products' },
        { title: 'Подбор', to: 'selection' },
        { title: 'О нас', to: '/about' },
        { title: 'Запись', to: '/service' },
        // { title: 'admin', to: '/admin' }
      ],
      title: '+7 (914) 2-705-056',
      windowWidth: 0,
      maxWidth: 940
    }
  },
  computed: {
    styleObject() {
      const marginLeft = this.windowWidth == 0 ? 30 : (this.windowWidth <= 940 ? 0 : (this.windowWidth - this.maxWidth) / 2 - 24)
      return {
        marginLeft: marginLeft + 'px',
        marginRight: marginLeft + 'px',
        width: this.maxWidth + 'px'
      }
    },
    toolbar_style() {
      return {
        height: this.windowWidth < 940 ? 'auto' : '56px'
      }
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && val.length > 2 && this.querySelections(val)
    },
    select(val) {
      if (val) {
        if (val.service === 'items') {
          this.$store.state.visible = true
          this.$store.state.id = val._id
        } else {
          this.$router.push({ path: 'selection' })
          this.$store.dispatch('open_gear', val)
        }
      }
      this.results = []
    },
    windowWidth(width) {
      this.maxWidth = this.windowWidth <= 940 ? this.windowWidth  : 940
      this.$store.state.mobile = this.windowWidth < 640 ? true : false
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
    });
    this.handleResize();
  },
  methods: {
    searchSubmit() {
      console.log('searchSubmit');
    },
    querySelections(search) {
      if (search) {
        this.loading = true
        this.$store.dispatch('search/find', { query: { search } })
          .then(res => {
            this.results = res.data || []
            this.loading = false
          })
      } else {
        this.results = []
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>
<style scoped>
.main {
  margin: 0 auto;
  padding: 7px 20px;
  max-width: 980px;
}
.toolbar_content {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
}
.searchForm {
  display: flex;
  justify-content: space-around;
  width: 40%;
  height: 30px;
}
.searchForm .v-icon {
  font-size: 30px;
  margin-left: -5px;
  margin-top: -5px;
  padding-left: 25px;
}
.searchForm .v-icon:hover {
  font-size: 35px;
}
.search {
  display: flex;
  flex-direction: row;
  flex: 1;
},
.mx-3 .v-input__control {
  min-height: 20px;
  padding: 0;
}
.v-toolbar__content .logo {
  display: block;
  line-height: 0;
}
.v-toolbar__content .logo img {
  width: 170px;
  height: auto;
}
</style>
