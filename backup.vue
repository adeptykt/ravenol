<div class="header__mob">
  <div class="header__side">
    <nuxt-link to="/" class="logo logo_mob">
      <img src="/indexol_logo4.svg" alt="Indexol">
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
        <span class="button__counter" v-if="cart_total">
          {{cart_total}}
        </span>
      </nuxt-link>
    </div>
    <a to="#" class="nav-btn" @click.prevent="menu = !menu"><span class="nav-btn__item"></span></a>
  </div>
</div>
<div class="header__container">
  <div ref="topbar" class="header__top">
    <div class="header__box header__box_top">
      <div class="header__logo" id="logo">
        <nuxt-link to="/" class="logo logo_icon content_logo">
          <img src="/indexol_logo4.svg" alt="Indexol">
        </nuxt-link>
      </div>
      <div class="header__phone">
        <div class="phones" v-bind:class="{ phones_opened: phones_opened }" @mouseover="phoneOpened(true)" @mouseout="phoneOpened(false)">
          <a href="#" class="phones__header" @click="phones_opened=!phones_opened">
            <span class="phones__btn">+7-914-2 705-056</span>
          </a>
          <div class="phones__dropdown">
            <div class="dropdown">
              <div class="dropdown__container">
                <div class="phones__item">
                  <div class="phones__title">МТС</div>
                  <div class="phones__row"><a href="tel:+375172767610" class="phones__link">+7-914-2 705-056</a></div>
                </div>
                <div class="phones__item">
                  <div class="phones__title">Мегафон</div>
                  <div class="phones__row"><a href="tel:+375291203344" class="phones__link">+7-924-769-73-37</a></div>
                </div>
                <div class="phones__item phones__item_time">
                  <div class="phones__work">
                    <span class="phones__icon icon icon_clock">
                      <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#clock"></use>
                      </svg>
                    </span>
                    <div class="phones__text">
                      Ежедневно
                      <br> с 11:00 до 19:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header__wheel hidden-print"></div>
      <div class="hidden-print header__search" v-if="!no_footer">
        <form action="" class="b-search b-search_header">
          <div class="b-search__base">
            <input type="text" placeholder="Быстрый поиск, например «HG3421», «Очиститель форсунок»" class="b-search__input" v-model="sharedState.global_search">
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
          <div class="auth auth_enter" v-bind:class="{ auth_logged: sharedState.auth.user, auth_opened: auth_opened }" @mouseover="auth_opened=true" @mouseout="auth_opened=false">
            <nuxt-link to="/auth" @click.prevent="onAuthClick" class="auth__header">
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
            <div class="auth__dropdown" v-if="sharedState.auth.user">
              <div class="dropdown dropdown_auth">
                <ul class="dropdown__list">
                  <li class="dropdown__item" v-for="item in menu_items">
                    <nuxt-link :to="item.to" class="dropdown__link">{{item.name}}</nuxt-link>
                  </li>
                  <li class="dropdown__item">
                    <nuxt-link to="/account/history" class="dropdown__link">История заказов</nuxt-link>
                  </li>
                  <li class="dropdown__item"><a href="#" class="dropdown__link" @click.prevent="logout">Выход</a></li>
                </ul>
              </div>
            </div>
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
        <div class="action_service">
          <div class="product__btn"><a class="btn product__btn-item btn_wide btn_type_flat" @click="showService=false"><span class="product__btn-text">Записаться</span></a></div>
        </div>
        <nuxt-link to="/cart" class="header__button button button_cart">
          <span class="button__icon icon icon_cart"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart"></use></svg></span>
          <span class="button__text">Корзина</span>
          <span class="button__counter" v-if="cart_total">{{cart_total}}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</div>
