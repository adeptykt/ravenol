<template>
  <v-app>
    <style scoped>
      .v-toolbar__content {
        padding: 0;
      }
      .theme--light.application {
        background: #f6f6f6;
      }
    </style>
    <div ref="header" v-bind:style="{ paddingBottom: paddingHeader }">
      <div id="topbar" ref="topbar">
        <div class="topbar-container">
          <div class="topbar-item">
            <v-icon small>phone</v-icon>
            <strong>+7 (914) 2-705-056</strong>
            <span class="worktime" v-if="!sharedState.mobile">(c 09:00 до 19:00)</span>
          </div>
          <v-spacer></v-spacer>
          <div class="topbar-item">
            <a @click="inverse('showLogin')" v-if="!sharedState.auth.user">Войти</a>
            <a @click="inverse('showRegister')" v-if="!sharedState.auth.user">Регистрация</a>
            <!-- <div v-if="sharedState.auth.user">
              {{sharedState.auth.user.email}}
            </div> -->
            <v-menu offset-y v-if="sharedState.auth.user">
              <v-btn flat slot="activator" color="primary" dark>
                <v-icon small>person</v-icon>
                <div class="user-title">{{sharedState.auth.user.email}}</div>
                <v-icon small>keyboard_arrow_down</v-icon>
              </v-btn>
              <v-list dense>
                <v-list-tile @click="">
                  <v-list-tile-title>Профиль</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="logout">
                  <v-list-tile-title>Выйти</v-list-tile-title>
                  <v-icon small>exit_to_app</v-icon>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <v-toolbar :app="fixed" :fixed="fixed" dark flat color="rgba(0, 112, 198, 0.9)" :extended="sharedState.mobile" height="56px">
        <v-spacer></v-spacer>
        <div class="toolbar_content" :style="styleObject">
          <v-spacer v-if="sharedState.mobile"></v-spacer>
          <a href="/" class="logo">
            <img id="logo" src="/indexol_logo3.svg" alt="Vuetify.js">
          </a>
          <div class="topbar-column">
            <div>
              <v-icon small>phone</v-icon>
              <strong>+7 (914) 2-705-056</strong>
            </div>
            <div class="worktime">(c 09:00 до 19:00)</div>
          </div>
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
          </div>
          <v-btn depressed dark color="#ef9a21" v-bind:style="{ height: '30px' }" @click="showService=true">Записаться</v-btn>
          <v-spacer v-if="sharedState.mobile"></v-spacer>
        </div>
        <v-spacer></v-spacer>
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
    </div>
    <!-- <v-content> -->
    <div class="v-content" style="padding: 0 0 32px; ">
      <div class="v-content__wrap">
        <div>
          <div class="main-tabs">
            <v-tabs v-model="model" centered color="transparent" slider-color="black">
              <v-tab
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                v-bind:style="{ fontSize: '18px', textTransform: 'none', fontWiehgt: 400 }"
                v-if="!item.role || (sharedState.auth.user && sharedState.auth.user.role === item.role)"
              >
                {{ item.title }}
              </v-tab>
            </v-tabs>
          </div>
          <v-container v-bind:class="{main: true}">
            <nuxt />
          </v-container>
        </div>
        <Product v-model="sharedState.showProduct" :id="sharedState.product_id" />
        <Login v-model="showLogin" />
        <Register v-model="showRegister" />
        <Service v-model="showService" />
      </div>
    </div>
    <!-- </v-content> -->
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Product from '~/components/Product.vue'
import Login from '~/components/Login.vue'
import Register from '~/components/Register.vue'
import Service from '~/components/Service.vue'

export default {
  components: {
    Product,
    Register,
    Login,
    Service
  },
  data () {
    return {
      sharedState: this.$store.state,
      paddingHeader: '0px',
      showLogin: false,
      showRegister: false,
      showService: false,
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
        { title: 'admin', to: '/admin', role: 'admin' }
      ],
      title: '+7 (914) 2-705-056',
      windowWidth: 0,
      maxWidth: 940,
      fixed: false
    }
  },
  computed: {
    styleObject() {
      const marginLeft = this.windowWidth == 0 ? 30 : (this.windowWidth <= 940 ? 0 : (this.windowWidth - this.maxWidth) / 2 - 24)
      return {
        // marginLeft: marginLeft + 'px',
        // marginRight: marginLeft + 'px',
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
        console.log('select', val);
        if (val.vendor) {
          this.$router.push({ path: 'selection' })
          this.$store.dispatch('get_gears', val)
        } else {
          this.$store.state.showProduct = true
          this.$store.state.product_id = val._id
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
    window.addEventListener('scroll', this.handleScroll)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      const fixed = (window.pageYOffset >= this.$refs.topbar.clientHeight)
      // if (!this.fixed && fixed) height = window.pageYOffset
      this.paddingHeader = fixed ? '56px' : '0px'
      // console.log('handleScroll', window.pageYOffset, this.$refs.topbar.clientHeight, fixed, this.fixed);
      this.fixed = fixed
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
    },
    ...mapActions('auth', ['logout']),
    ...mapActions(['inverse'])
  }
}
</script>

<style>
/* .application a:hover {
  color: red;
  text-decoration: underline;
} */
</style>

<style scoped>
#logo1 {
	-o-transition: transform 0.5s linear;
	-ms-transition: transform 0.5s linear;
	-moz-transition: transform 0.5s linear;
	-webkit-transition: transform 0.5s linear;
	transition: transform 0.5s linear;
}
#logo1:hover {
	-o-transform: rotateY(180deg);
	-ms-transform: rotateY(180deg);
	-moz-transform: rotateY(180deg);
	-webkit-transform: rotateY(180deg);
	transform: rotateY(180deg);
}
.topbar-container {
  max-width: 940px;
  width: 100%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
}
#topbar {
  /* display: none; */
}
.topbar-column {
  display: none;
  flex-flow: column;
}
.right {
  align-items: flex-end;
}
.topbar-column a {
  color: white;
}
.topbar-item {
  line-height: 40px;
  display: flex;
  flex-flow: row nowrap;
}
.topbar-item .v-menu .user-title {
  margin-left: 6.5px;
  text-decoration: underline;
  font-size: 13px;
}
.topbar-item .v-menu .v-btn {
  text-transform: none;
  padding: 0;
  margin: 0;
}
.topbar-item .v-menu .v-icon {
  margin: 0;
}
.topbar-item .v-icon {
  margin: auto 8px auto 0;
}
.topbar-item a {
  padding: 0 10px;
}
.worktime {
  padding-left: 10px;
}
.main {
  margin: 0 auto;
  padding: 15px 20px;
  max-width: 980px;
}
.toolbar_content {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
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
  max-width: 300px;
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
