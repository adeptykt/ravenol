<template>
  <div class="wrapper" v-bind:class="{ wrapper_order: no_footer, 'wrapper_no-footer': no_footer }">
    <Search v-model="search_opened"></Search>
    <div class="wrapper__inner">
      <div>
        <header v-bind:style="{ paddingBottom: paddingHeader }" class="header" v-bind:class="{ header_opened: menu }">
          <div class="header__mob">
            <div class="header__side">
              <nuxt-link to="/" class="logo logo_mob">
                <!-- <img src="/header_logo_mob.svg" alt="Indexol" v-if="windowWidth<551"> -->
                <!-- <img src="/header_logo.svg" alt="Indexol" v-else> -->
                <div class="header_logo">
                  <div class="logo_im">ИНТЕРНЕТ МАГАЗИН</div>
                  <div class="logo_indexol">indexol.ru</div>
                </div>
              </nuxt-link>
            </div>
            <div class="header__base">
              <div class="header__actions header__actions_mob">
                <a href="#" class="header__button button button_search" @click.prevent="search_opened=true">
                  <span class="button__icon icon icon_search-white"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#search`"></use></svg></span>
                </a>
                <nuxt-link to="/cart" class="header__button button button_cart">
                  <span class="button__icon icon icon_cart"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#cart`"></use></svg></span>
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
                    <!-- <img src="/header_logo.svg" alt="Indexol"> -->
                    <div class="header_logo">
                      <div class="logo_im">ИНТЕРНЕТ МАГАЗИН</div>
                      <div class="logo_indexol">indexol.ru</div>
                    </div>
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
                                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#clock`"></use>
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
                  <form class="b-search b-search_header">
                    <div class="b-search__base">
                      <input type="text" placeholder="Быстрый поиск, например «BG 109», «Очиститель тормозов»" class="b-search__input" v-model="global_search">
                      <span class="b-search__button">
                        <span class="icon icon_search-light">
                          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#search`"></use></svg>
                        </span>
                      </span>
                    </div>
                    <a href="#" class="b-search__link"></a>
                  </form>
                </div>
                <div class="header__auth">
                  <div>
                    <div class="auth auth_logged" v-bind:class="{ auth_opened: auth_opened }" @mouseover="auth_opened=true" @mouseout="auth_opened=false" v-if="authStore.user">
                      <nuxt-link to="/account/" @click.prevent="onAuthClick" class="auth__header">
                        <div class="auth__item">
                          <div class="auth__icon">
                            <span class="icon icon_user-light">
                              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#user`"></use></svg>
                            </span>
                          </div>
                          <div class="auth__text">
                            <span class="auth__name">{{authStore.user.email}}</span>
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
                              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#user`"></use></svg>
                            </span>
                          </div>
                          <div class="auth__text">
                            <span class="auth__name" v-if="authStore.user">{{authStore.user.email}}</span>
                            <span class="auth__name" v-else>Вход</span>
                          </div>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="header__bottom hidden-print" v-bind:class="{ header__bottom__fixed: uiStore.menu_fixed }" v-if="!no_footer">
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
                    <span class="button__icon icon icon_cart"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/images/icons-sprite.svg#cart`"></use></svg></span>
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
        <NuxtPage />
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
    <AuthReset v-model="uiStore.showReset" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useCartStore } from '~/stores/cart'
import { useAuth } from '~/composables/useAuth'
import AuthReset from '~/components/AuthReset.vue'
import Search from '~/components/Search.vue'

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()
const cartStore = useCartStore()
const { authenticate } = useAuth()

// Router
const route = useRoute()
const router = useRouter()

// Refs
const alert = ref(false)
const paddingHeader = ref('0px')
const phones_opened = ref(false)
const auth_opened = ref(false)
const search_opened = ref(false)
const showService = ref(false)
const loading = ref(false)
const select = ref(null)
const results = ref([])
const windowWidth = ref(0)
const maxWidth = ref(940)
const menu = ref(false)
const cart_count = ref(0)
const topbar = ref<HTMLElement | null>(null)
const footer = ref<HTMLElement | null>(null)

const items = [
  { title: 'Каталог', to: '/categories' },
  { title: 'Доставка', to: '/delivery' },
  { title: 'Оплата', to: '/payment' },
  { title: 'Сотрудничество', to: '/cooperation' },
  {
    title: 'О нас',
    to: '/about'
  }
]

// Computed
const global_search = computed({
  get: () => uiStore.global_search,
  set: (val: string) => uiStore.setSearch(val)
})

const menu_items = computed(() => uiStore.menu_items)

const isAdmin = computed(() => authStore.user && (authStore.user as any).role === 'admin')

const cart_total = computed(() => {
  return cartStore.totalItems
})

const container_main = computed(() => {
  return route.path === "/" || route.path === ""
})

const no_footer = computed(() => {
  return /^\/cart\/order\//.test(route.path)
})

// Watch
watch(select, (val) => {
  if (val) {
    if ((val as any).vendor) {
      router.push({ path: '/selection' })
      // TODO: Implement get_gears functionality
      // uiStore.getGears(val)
    } else {
      uiStore.setShowProduct(true)
      uiStore.setProductId((val as any)._id)
    }
  }
  results.value = []
})

watch(windowWidth, (width) => {
  maxWidth.value = windowWidth.value <= 940 ? windowWidth.value : 940
  uiStore.setMobile(windowWidth.value < 640)
})

watch(() => route.path, () => {
  menu.value = false
})

// Methods
const phoneOpened = (val: boolean) => {
  if (window.innerWidth >= 960) phones_opened.value = val
}

const menuItemOver = (item: any) => {
  if (window.innerWidth >= 960) item.opened = true
}

const menuItemOut = (item: any) => {
  if (window.innerWidth >= 960) item.opened = false
}

const menuItemClick = (item: any) => {
  if (item.items && window.innerWidth < 960) {
    item.opened = !item.opened
  } else {
    router.push({ path: item.to })
    menu.value = false
  }
}

const onAuthClick = () => {
  if (!authStore.user) {
    uiStore.inverse('showAuthorization')
    menu.value = false
  }
}

const handleScroll = (event?: Event) => {
  const fixed = false
  const quick_search = footer.value && topbar.value
    ? (window.pageYOffset >= topbar.value.clientHeight) && (window.pageYOffset + window.innerHeight <= footer.value.offsetTop - 50)
    : false
  paddingHeader.value = fixed ? '56px' : '0px'
  uiStore.setMenuFix(fixed)
  uiStore.setQuickSearch(quick_search)
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Lifecycle
onMounted(async () => {
  if (process.client) {
    // Authenticate and load menu items
    try {
      await authenticate('jwt')
      uiStore.getMenuItems()
    } catch (error) {
      // Not authenticated, continue
    }
    
    await nextTick()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    handleResize()
    
    uiStore.setSearch('')
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" src="./app.scss">
</style>

<style>
.super_logo {
  background-color: #ffd008;
  clip-path: polygon(0 0, 100% 0, calc(100% - 23px) 100%, 0 100%);
}
</style>
