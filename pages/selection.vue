<template>
  <div class="box">
    <div class="selection-container">
      <!-- <Tabs :tabs="sharedState.category_list" wrapperClass="newtab_wapper" tabClass="newtabs__div" tabActiveClass="tabs__item--active" lineClass="newtabs__slider" @onClick="onTabClick" /> -->
      <div class="parts__tabs">
        <ATabs :tabs="sharedState.category_list" @onClick="onTabClick" />
      </div>
      <div class="menu menu_hide" v-bind:class="{ menu_opened: menu_open }">
        <div class="menu__box">
          <div class="menu__title">Тип техники</div>
          <ul class="menu__list">
            <template v-for="(item, i) in sharedState.category_list">
              <li class="menu__item" :key="i">
                <a class="menu__link" @click="onTabClick(item.value)">
                  <span class="menu__text">{{ item.name }}</span>
                </a>
              </li>
            </template>
          </ul>
        </div>
        <a href="#" class="menu__close" @click.prevent="menu_open=false">
          <span class="icon icon_close_medium"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_medium"></use></svg></span>
        </a>
      </div>
      <div class="selection-btns">
        <div class="selection-btns__cell"><a href="#" class="btn btn_type_grey btn_wide" @click.prevent="menu_open=true">Тип техники</a></div>
      </div>
      <div class="selection-body">
        <ul class="breadcrumbs" id="breadcrumbs">
          <li class="breadcrumbs__item" v-for="(item, i) in sharedState.history" :key="i">
            <nuxt-link to="#" class="breadcrumbs__link" @click="$store.dispatch(item.dispatch, item.data)"><span class="breadcrumbs__text">{{item.name}}</span></nuxt-link>
          </li>
        </ul>
        <div class="selection-category item-img" v-if="sharedState.selection_mode === 'vendors'">
          <div class="flex xs6 sm4 md3 lg3" v-for="(item, n) in vendor_list" :key="n">
            <a @click="getmodels(item)">
              <img :src="item.img" style="maxHeight: 100px">
              {{item.name}}
            </a>
          </div>
        </div>
        <div class="selection-category item-img" v-if="sharedState.selection_mode === 'models'">
          <div class="flex xs6 sm4 md3 lg3" v-for="(item, n) in sharedState.model_list" :key="n">
            <a @click="getgenerations(item)">
              <img :src="item.img" style="maxHeight: 150px">
              {{item.name}}<br>
              {{item.begin}}&nbsp;-&nbsp;{{item.end}}
            </a>
          </div>
        </div>
        <div class="selection-category center" v-if="sharedState.selection_mode === 'generations'">
          <table cellspacing=0>
            <tr>
              <th>Модификация</th>
              <th>Даты выпуска</th>
            </tr>
            <template v-for="(item, r) in sharedState.generation_list">
              <tr @click="getgears(item)">
                <td>{{item.name}}</td>
                <td>{{item.begin}}&nbsp;-&nbsp;{{item.end}}</td>
              </tr>
            </template>
          </table>
        </div>
        <div class="selection-gear" v-if="sharedState.selection_mode === 'gears'">
          <div class="panel flex x12 sm6 md6 lg6" v-for="(gear, g) in sharedState.gear_list" :key="g">
            <div class="card">
              <div class="title">
                {{gear.name}}
              </div>
              <div class="panel-body">
                <template v-for="(row, r) in gear.items">
                  <div :key="'text'+(g*20+r)">
                    <span class="value">{{row}}</span>
                  </div>
                </template>
                <template v-for="(product, p) in gear.products" v-if="gear.products">
                  <div :key="'product'+(g*20+p)">
                    <a class="value" @click="showproduct(product)">{{getproduct(product)}}</a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 0">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '~/components/Tabs.vue'
import ATabs from '~/components/AdvTabs.vue'

export default {
  components: {
    Tabs,
    ATabs
  },
  head() {
    return {
      title: 'Подбор'
    }
  },
  data () {
    return {
      sharedState: this.$store.state,
      category_id: 1,
      menu_open: false
    }
  },
  computed: {
    vendor_list() { return this.$store.state.vendor_list }
  },
  created() {
    // this.getvendors(this.sharedState.category_list[0])
  },
  methods: {
    onTabClick(value) {
      this.menu_open = false
      const cat = this.sharedState.category_list.find(x => x.value === value)
      this.getvendors(cat)
    },
    getvendors(category, tab) {
      this.category_id = category._id
      // this.$store.dispatch('get_vendors', category)
    },
    getmodels(vendor) {
      this.$store.dispatch('get_models', { vendor: vendor, category_id: this.category_id })
    },
    getgenerations(model) {
      this.$store.dispatch('get_generations', model)
    },
    getgears(generation) {
      this.$store.dispatch('get_gears', generation)
    },
    getproduct(article) {
      const product = this.sharedState.product_list.find(p => p.article === article)
      if (product) return product.name
      return article
    },
    showproduct(article) {
      const product = this.sharedState.product_list.find(p => p.article === article)
      if (product) {
        this.$store.state.showProduct = true
        this.$store.state.product_id = product._id
      }
    },
    opengear(choose) {
      this.$store.dispatch('open_gear', choose)
    }
  }
}
</script>

<style>
.flex > * {
  flex: 1 1 auto;
  max-width: 100%;
}
@media (min-width: 0) {
  .flex.xs6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
  .flex.xs12 {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
  }
}
@media (min-width: 600px) {
  .flex.sm4 {
    flex-basis: 33.33333333333333%;
    flex-grow: 0;
    max-width: 33.33333333333333%;
  }
  .flex.sm6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
}
@media (min-width: 960px) {
  .flex.md3 {
    flex-basis: 25%;
    flex-grow: 0;
    max-width: 25%;
  }
  .flex.md6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
}
@media (min-width: 1264px) {
  .flex.lg3 {
    flex-basis: 25%;
    flex-grow: 0;
    max-width: 25%;
  }
  .flex.md6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }
}
.parts__tabs {
  padding-top: 8px;
  flex: 1;
  padding-left: 15px;
}
.atabs {
  display: flex;
  flex-wrap: wrap;
}

.atabs__item {
    margin-right: 5px;
    margin-bottom: 5px;
}
.atabs_sm .atabs__item {
    margin-left: 2px;
}
.atabs_sm .atabs__item:first-child {
  margin-left: 0;
}
.atabs__link {
  display: block;
  text-decoration: none;
  padding: 6px 16px 10px;
  font-size: 24px;
  line-height: 24px;
  -webkit-transition: background-color .25s ease;
  transition: background-color .25s ease;
}
.atabs__item_active .atabs__link {
  background-color: #000;
}
.atabs_sm .atabs__link {
    font-size: 20px;
    line-height: 20px;
    padding: 4px 12px 6px;
}
.atabs__text {
    color: #000;
    border-bottom: 1px dotted #000;
    -webkit-transition: color .25s ease,border-color .25s ease;
    transition: color .25s ease,border-color .25s ease;
}
.atabs__item_active .atabs__link:hover .atabs__text, .atabs__item_active .atabs__text {
  color: #fff;
  border-bottom-color: transparent;
}
.atabs__link:hover .atabs__text {
  color: #666;
  border-bottom-color: #b2b2b2;
}

.tabs {
  position: relative;
}
.tabs__bar {
  position: relative;
  border-radius: inherit;
  background-color: #242417;
  color: #fff;
}
.newtabs__div {
  align-items: center;
  display: inline-flex;
  flex: 0 1 auto;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  height: inherit;
  max-width: 264px;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
}
.newtab_wapper .newtabs__slider + .newtabs__div {
  margin-left: auto;
}
.newtab_wapper > .newtabs__div:last-child {
  margin-right: auto;
}
.tabs__wrapper {
  overflow: hidden;
  contain: content;
  display: flex;
}
.newtab_wapper {
  flex: 1 0 auto;
  display: flex;
  height: 48px;
  list-style-type: none;
  transition: -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1), -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  white-space: nowrap;
  /* border-radius: inherit; */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #242417;
  color: #fff;
}
.selection-btns {
  display: none;
  margin: 15px 15px 0 15px;
}
.selection-btns__cell {
  box-sizing: border-box;
  width: 100%;
}
@media (max-width: 768px) {
  .tabs {
    /* visibility: hidden; */
    display: none;
  }
  .selection-btns {
    display: flex;
  }
}
.newtabs__slider {
  bottom: 0;
  margin: 0 !important;
  position: absolute;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  height: 2px;
  width: 100%;
  background-color: rgb(255, 204, 0);
  border-color: rgb(255, 204, 0);
}
.tabs__container {
  flex: 1 0 auto;
  display: flex;
  height: 48px;
  list-style-type: none;
  transition: -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1), -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  white-space: nowrap;
  position: relative;
}
.tabs__slider-wrapper {
  bottom: 0;
  margin: 0 !important;
  position: absolute;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.tabs__slider {
  height: 2px;
  width: 100%;
  background-color: rgb(255, 204, 0);
  border-color: rgb(255, 204, 0);
}
.tabs__div {
  align-items: center;
  display: inline-flex;
  flex: 0 1 auto;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  height: inherit;
  max-width: 264px;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
}
.tabs__container--centered .tabs__slider-wrapper + .tabs__div {
  margin-left: auto;
}
.tabs__container--centered > .tabs__div:last-child {
    margin-right: auto;
}
.tabs__item {
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  justify-content: center;
  max-width: inherit;
  padding: 6px 12px;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  user-select: none;
  white-space: normal;
}
.tabs__item:not(.tabs__item--active) {
  opacity: 0.7;
}
.selection-container {
  /* background: #efefef; */
  background: white;
  /* border: 1px solid #ddd;
  border-radius: 4px; */
}
.selection-body {
  padding: 15px;
}
.selection-body .v-breadcrumbs {
  padding: 0px;
}
.selection-category {
  padding-top: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-self: stretch;
}
.selection-category a {
  font-size: 12px;
  color: black;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* inline */
  background-color: #c5c5c5;
  margin: 1px;
  padding: 6px;
  width: calc(100% - 2px);
  text-transform: none;
  font-weight: normal;
  height: calc(100% - 2px);
}
.selection-category a:hover {
  background-color: #0070C6;
  color: white;
}
.selection-category .inline a>img {
  width: 80%;
  height: auto;
}
.selection-category .leaf {
  background-color: #eee;
  border: 1px solid #c5c5c5;
}
.selection-category .sr-item {
  background-color: #ececec;
  width: calc(100% - 20px);
  text-align: left;
  /* margin-bottom: 20px; */
  margin: 10px;
  padding: 20px;
  height: calc(100% - 20px);
}
.selection-category .sr-item .title {
  margin-bottom: 10px;
  font-size: 24px;
}
.item-img div.flex {
  padding-bottom: 10px;
  text-align: center;
}
.item-img a {
  background-color: white;
}
.item-img a:hover {
  background-color: white;
  color: red;
}
.selection-body .center {
  justify-content: center;
}
.selection-category table {
  width: 100%;
  max-width: 600px;
}
.selection-category table tr:hover:not(:first-child) {
  /* background-color: #f5f5f5; */
  background-color: #cccccc;
  cursor: pointer;
}
.selection-category table th {
  background-color: #007acc;
  color: white;
  height: 30px;
}
.selection-category table td {
  border-bottom: 1px solid #e4e4e2;
  text-align: center;
  height: 25px;
}
.selection-gear {
  padding: 0px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-self: stretch;
}
.selection-gear .panel {
  padding: 8px;
  box-sizing: border-box;
}
.selection-gear .card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100%;
}
.selection-gear .panel .title {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
.selection-gear .panel .panel-body {
  margin: 15px;
}
</style>
