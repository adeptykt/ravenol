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
      color="#0070C6"
      height="56px"
    >
      <div :style="styleObject">
        <a href="/" class="logo">
          <img src="/logo2.svg" alt="Vuetify.js">
        </a>
        <!-- <v-form ref="form" class="searchForm">
          <style scoped>
            .v-text-field.v-text-field--solo .v-input__control {
              min-height: 20px;
              padding: 0;
            }
            .v-toolbar__content .v-btn--icon {
              margin: 0px;
              width: 30px;
              height: 30px;
            }
            .theme--light.v-text-field--solo .v-input__slot {
              border-radius: 15px;
            }
            .v-btn:before {
              opacity: 0;
            }
            .v-toolbar__title {
              font-weight: 300;
              font-size: 20px;
            }
            .v-toolbar__title:not(:first-child) {
              margin-left: 0px;
            }
          </style> -->
          <div class="search">
            <v-autocomplete
              :loading="loading"
              :items="results"
              :search-input.sync="search"
              v-model="select"
              cache-items
              class="mx-3"
              flat
              hide-no-data
              hide-details
              label="Поиск и подбор"
              solo-inverted
              item-text="name"
              height="20"
              solo
            ></v-autocomplete>
            <v-btn icon @click="searchSubmit">
              <v-icon>search</v-icon>
            </v-btn>
          </div>
        <!-- </v-form> -->
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </div>
    </v-toolbar>
    <v-content>
      <div>
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
        <v-container v-bind:class="{main: true}">
          <nuxt />
        </v-container>
      </div>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        search: null,
        select: null,
        results: [],
        model: 'tab-0',
        items: [
          { icon: 'apps', title: 'Главная', to: '/' },
          { icon: 'bubble_chart', title: 'Продукция', to: '/products' },
          { title: 'Подбор', to: '/selection' },
          { title: 'О нас', to: '/about' },
          { title: 'admin', to: '/admin' }
        ],
        title: '+7 (914-2) 705-056',
        windowWidth: 0
      }
    },
    computed: {
      styleObject() {
        const marginLeft = this.windowWidth == 0 ? 30 : (this.windowWidth - 940) / 2 - 24
        return {
          width: '940px',
          display: 'flex', alignItems: 'center',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          position: 'relative',
          marginLeft: marginLeft + 'px',
          marginRight: marginLeft + 'px'
        }
      },
    },
    watch: {
      search(val) {
        val && val !== this.select && val.length > 2 && this.querySelections(val)
      },
      select(val) {
        console.log('select', val);
      },
      windowWidth(width) {
        this.marginLeft = (width - 940) / 2;
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
        this.loading = true
        this.$store.dispatch('search/find', { query: { search } })
          .then(res => {
            this.results = res
            this.loading = false
          })
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
  width: 980px;
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
.v-toolbar__content .logo {
  display: block;
  line-height: 0;
}
.v-toolbar__content .logo img {
  width: 170px;
  height: auto;
}
</style>
