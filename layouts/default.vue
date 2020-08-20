<template>
  <div class="wrapper" v-bind:class="{ wrapper_order, 'wrapper_no-footer': no_footer }">
    <div class="search" v-bind:class="{ search_opened: search_opened }">
      <div class="search__top">
        <div class="search__box">
          <div class="b-search b-search_sm b-search_popup">
            <div class="b-search__base">
              <input type="text" placeholder="Быстрый поиск" class="b-search__input" v-model="global_search">
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
                <div class="items__title">{{item.name}}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper__inner">
      <div>
        <header v-bind:style="{ paddingBottom: paddingHeader }" class="header" v-bind:class="{ header_opened: menu }">
          <div class="header__mob">
            <div class="header__side">
              <nuxt-link to="/" class="logo logo_mob">
                <img src="/header_logo_mob.svg" alt="Indexol" v-if="windowWidth<551">
                <img src="/header_logo.svg" alt="Indexol" v-else>
              </nuxt-link>
            </div>
            <div class="header__base">
              <div class="header__actions header__actions_mob">
                <a href="#" class="header__button button button_search" @click.prevent="search_opened=true">
                  <span class="button__icon icon icon_search-white"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#search"></use></svg></span>
                </a>
                <nuxt-link to="/cart" class="header__button button button_cart">
                  <span class="button__icon icon icon_cart"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart"></use></svg></span>
                  <span class="button__text">Корзина</span>
                  <client-only>
                    <span class="button__counter" v-if="cart_total">{{cart_total}}</span>
                  </client-only>
                </nuxt-link>
              </div>
              <a to="#" class="nav-btn" @click.prevent="menu = !menu"><span class="nav-btn__item"></span></a>
            </div>
          </div>
          <div class="header__container">
            <div ref="topbar" class="header__top">
              <div class="header__background">
              </div>
              <div class="header__box header__box_top">
                <div class="header__logo" id="logo">
                  <nuxt-link to="/" class="logo logo_icon content_logo">
                    <img src="/header_logo.svg" alt="Indexol">
                  </nuxt-link>
                </div>
                <!-- <div class="header__phone">
                  <div class="phones" v-bind:class="{ phones_opened: phones_opened }" @mouseover="phoneOpened(true)" @mouseout="phoneOpened(false)">
                    <a href="#" class="phones__header" @click="phones_opened=!phones_opened">
                      <span class="phones__btn">+7-914-288-09-99</span>
                    </a>
                    <div class="phones__dropdown">
                      <div class="dropdown">
                        <div class="dropdown__container">
                          <div class="phones__item">
                            <div class="phones__title">Магазин</div>
                            <div class="phones__row"><a href="tel:+79142880999" class="phones__link">+7-914-288-09-99</a></div>
                          </div>
                          <div class="phones__item">
                            <div class="phones__title">Администрация</div>
                            <div class="phones__row"><a href="tel:+79142705056" class="phones__link">+7-914-2-705-056</a></div>
                          </div>
                          <div class="phones__item phones__item_time">
                            <div class="phones__work">
                              <span class="phones__icon icon icon_clock">
                                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#clock"></use>
                                </svg>
                              </span>
                              <div class="phones__text">
                                Ежедневно
                                <br> с 10:00 до 18:00
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="header__wheel hidden-print"></div>
                <div class="hidden-print header__search" v-if="!no_footer">
                  <form action="" class="b-search b-search_header">
                    <div class="b-search__base">
                      <input type="text" placeholder="Быстрый поиск, например «BG 109», «Очиститель тормозов»" class="b-search__input" v-model="global_search">
                      <span class="b-search__button">
                        <span class="icon icon_search-light">
                          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#search"></use></svg>
                        </span>
                      </span>
                    </div>
                    <a href="#" class="b-search__link"></a>
                  </form>
                </div>
                <div class="header__auth">
                  <div>
                    <div class="auth auth_logged" v-bind:class="{ auth_opened: auth_opened }" @mouseover="auth_opened=true" @mouseout="auth_opened=false" v-if="sharedState.auth.user">
                      <nuxt-link to="/account/" @click.prevent="onAuthClick" class="auth__header">
                        <div class="auth__item">
                          <div class="auth__icon">
                            <span class="icon icon_user-light">
                              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#user"></use></svg>
                            </span>
                          </div>
                          <div class="auth__text">
                            <span class="auth__name">{{sharedState.auth.user.email}}</span>
                          </div>
                        </div>
                      </nuxt-link>
                      <div class="auth__dropdown">
                        <div class="dropdown dropdown_auth">
                          <ul class="dropdown__list">
                            <li class="dropdown__item" v-for="item in menu_items">
                              <nuxt-link :to="item.to" class="dropdown__link">{{item.name}}</nuxt-link>
                            </li>
                            <!-- <li class="dropdown__item">
                              <nuxt-link to="/account/history" class="dropdown__link">История заказов</nuxt-link>
                            </li>
                            <li class="dropdown__item"><a href="#" class="dropdown__link" @click.prevent="logout">Выход</a></li> -->
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="auth auth_enter" v-else>
                      <nuxt-link to="/auth" class="auth__header">
                        <div class="auth__item">
                          <div class="auth__icon">
                            <span class="icon icon_user-light">
                              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#user"></use></svg>
                            </span>
                          </div>
                          <div class="auth__text">
                            <span class="auth__name" v-if="sharedState.auth.user">{{sharedState.auth.user.email}}</span>
                            <span class="auth__name" v-else>Вход</span>
                          </div>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="header__bottom hidden-print" v-bind:class="{ header__bottom__fixed: sharedState.menu_fixed }" v-if="!no_footer">
              <div class="header__box header__box_bottom">
                <div class="header__nav">
                  <nav class="nav nav_inner">
                    <ul class="nav__list">
                      <template v-for="(item, i) in items">
                        <li class="nav__item nav__item_sub" :key="i" v-bind:class="{ nav__item_opened: item.opened }" @mouseover="menuItemOver(item)" @mouseout="menuItemOut(item)">
                          <a :href="item.to" class="nav__link" @click.prevent="menuItemClick(item)">
                            <span class="nav__text" v-if="item.items">{{ item.title }}</span>
                            <template v-if="!item.items">{{ item.title }}</template>
                          </a>
                          <div class="nav__dropdown" v-if="item.items">
                            <div class="dropdown dropdown_nav">
                              <ul class="dropdown__list">
                                <template v-for="(subitem, j) in item.items">
                                  <li class="dropdown__item" @click="menu = false" :key="i*1000+j">
                                    <nuxt-link :to="subitem.to" class="dropdown__link nuxt-link-exact-active nuxt-link-active">{{ subitem.title }}</nuxt-link>
                                  </li>
                                </template>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </template>
                    </ul>
                  </nav>
                </div>
                <div class="header__actions header__actions_desktop">
                  <nuxt-link to="/cart" class="header__button button button_cart">
                    <span class="button__icon icon icon_cart"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart"></use></svg></span>
                    <span class="button__text">Корзина</span>
                    <client-only>
                      <span class="button__counter" v-if="cart_total">{{cart_total}}</span>
                    </client-only>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div class="alert alert_attention alert_show" v-if="alert">
        <div class="alert__box box">
          Осталось заполнить поля в разделах
          <a href="/account/requisites" class="alert__link">реквизиты</a>,
          <a href="/account/delivery" class="alert__link">пункты разгрузки</a>,
          <a href="/account/additionally" class="alert__link">дополнительно</a>
        </div>
      </div>
      <div class="container" id="container" v-bind:class="{ container_main: container_main }">
        <nuxt />
      </div>
    </div>
    <footer class="footer" v-if="!no_footer" ref="footer">
      <div class="box">
        <div class="footer__top">
          <div class="footer__base">
            <ul class="f-nav">
              <li class="f-nav__item"><a href="/" class="f-nav__link nuxt-link-active">Главная</a></li>
              <li class="f-nav__item"><a href="/about" class="f-nav__link">О компании</a></li>
              <li class="f-nav__item"><a href="/cooperation" class="f-nav__link">Сотрудничество</a></li>
              <li class="f-nav__item"><a href="/delivery" class="f-nav__link">Доставка</a></li>
              <li class="f-nav__item"><a href="/payment" class="f-nav__link">Оплата</a></li>
              <li class="f-nav__item"><a href="/privacy" class="f-nav__link">Политика конфиденциальности</a></li>
              <li class="f-nav__item"><a href="/police" class="f-nav__link">Политика по обработке персональных данных</a></li>
              <li class="f-nav__item"><a href="/oferta" class="f-nav__link">Договор оферты</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="footer__base footer__base_bottom">
            <div class="footer__copyright">&copy; {{ new Date().getFullYear() }} indexol.ru<br> Все права защищены.</div>
            <div class="footer__info">
    					ООО «Равенол Якутия» ИНН 1435334875,<br>
              г. Якутск, Дежнева, 78, +7-914-288-09-99<br>
              ravenol.yakutia@gmail.com
				    </div>
          </div>
        </div>
      </div>
    </footer>
    <Profile v-model="sharedState.showProfile" />
    <AuthReset v-model="sharedState.showReset" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Profile from '~/components/Profile.vue'
import AuthReset from '~/components/AuthReset.vue'
import ClientOnly from 'vue-client-only'

export default {
  middleware: 'auth',
  components: {
    Profile,
    ClientOnly,
    AuthReset
  },
  head () {
    return {
      bodyAttrs: {
        class: this.search_opened ? 'overlayed' : ''
      }
    }
  },
  data () {
    return {
      alert: false,
      sharedState: this.$store.state,
      animate_logo: false,
      paddingHeader: '0px',
      phones_opened: false,
      auth_opened: false,
      search_opened: false,
      showService: false,
      loading: false,
      select: null,
      results: [],
      items: [
        { title: 'Каталог', to: '/categories' },
        // { title: 'Подбор', to: '/selection' },
        // { title: 'Бренды', to: '/brands' },
        // { title: 'Блог', to: '/blog' },
        // { title: 'Вопросы', to: '/questions' },
        { title: 'Доставка', to: '/delivery' },
        { title: 'Оплата', to: '/payment' },
        { title: 'Сотрудничество', to: '/cooperation' },
        {
          title: 'О нас',
          to: '/about',
          // opened: false,
          // items: [ { title: 'О компании', to: '/about' }, { title: 'Сотрудничество', to: '/cooperation' }, { title: 'Контакты', to: '/contacts' }, { title: 'Обратная связь', to: '/feedback' } ]
        }
      ],
      windowWidth: 0,
      maxWidth: 940,
      menu: false,
      facebook: false,
      vk: false,
      cart_count: 0
    }
  },
  computed: {
    menu_items() {
      return this.$store.state.menu_items
    },
    isAdmin() {
      return this.$store.state.auth.user && (this.$store.state.auth.user.role === 'admin')
    },
    cart_total() {
      if (this.$store.state.cart.status) return this.$store.state.cart.list.reduce((s, i) => { return s + i.quantity }, 0)
      return 0
    },
    global_search: {
      get: function () { return this.$store.state.global_search },
      set: function (val) { this.set_search(val) }
    },
    container_main() {
      return (this.$route.path === "/" || this.$route.path === "")
    },
    wrapper_order() {
      return /^\/cart\/order\//.test(this.$route.path)
    },
    no_footer() {
      return /^\/cart\/order\//.test(this.$route.path)
    }
  },
  watch: {
    global_search(val) {
      if (val) {
        this.search_opened = true
        val !== this.select && val.length > 2 && this.querySelections(val)
      }
    },
    select(val) {
      if (val) {
        if (val.vendor) {
          this.$router.push({ path: 'selection' })
          this.$store.dispatch('get_gears', val)
        } else {
          this.set_showProduct(true)
          this.set_product_id(val._id)
        }
      }
      this.results = []
    },
    windowWidth(width) {
      this.maxWidth = this.windowWidth <= 940 ? this.windowWidth  : 940
      this.set_mobile(this.windowWidth < 640)
    }
  },
  mounted() {
    this.$store.dispatch('auth/authenticate').then(() => this.$store.dispatch('get_menu_items'))
    this.$nextTick(() => window.addEventListener('resize', this.handleResize))
    window.addEventListener('scroll', this.handleScroll)
    this.handleResize()

    // this.animate_logo = true
    // setTimeout(this.endAnimation, 6000)

    this.set_search('')
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    endAnimation() {
      this.animate_logo = false
    },
    onCloseSearch() {
      this.global_search = ''
      this.search_opened = false
    },
    phoneOpened(val) {
      if (window.innerWidth >= 960) this.phones_opened = val
    },
    menuItemOver(item) {
      if (window.innerWidth >= 960) item.opened = true
    },
    menuItemOut(item) {
      if (window.innerWidth >= 960) item.opened = false
    },
    menuItemClick(item) {
      if (item.items && window.innerWidth < 960) {
        item.opened = !item.opened
      } else {
        this.$router.push({ path: item.to })
        this.menu = false
      }
    },
    onAuthClick() {
      if (!this.sharedState.auth.user) {
        this.inverse('showAuthorization')
        this.menu = false
      }
    },
    handleScroll(event) {
      // const fixed = (window.pageYOffset >= this.$refs.topbar.clientHeight)
      const fixed = false
      const quick_search = this.$refs.footer ? (window.pageYOffset >= this.$refs.topbar.clientHeight) && (window.pageYOffset + window.innerHeight <= this.$refs.footer.offsetTop - 50) : false
      this.paddingHeader = fixed ? '56px' : '0px'
      this.menu_fix(fixed)
      this.quick_search(quick_search)
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
    ...mapMutations({ inverse: 'inverse', menu_fix: 'menu_fix', quick_search: 'quick_search', set_search: 'set_search', set_mobile: 'set_mobile', set_product_id: 'set_product_id', set_showProduct: 'set_showProduct' })
  },
}
</script>

<style lang="scss" src="./app.scss">
</style>
