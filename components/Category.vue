<template>
  <div class="box">
    <div class="sep sep_catalog">
      <div class="sep__side">
        <div class="sticky-side" v-bind:class="{ 'sticky-side-fixed': sharedState.menu_fixed }">
          <div class="menu" v-bind:class="{ menu_opened: menu_open }">
            <div class="menu__box" v-for="level1 in tree" :key="level1.id" v-bind:class="{ menu__box_active: hasIncluded(level1) }">
              <div class="menu__title">
                <nuxt-link :to="`/categories/${level1.id}/`" class="menu__caption">{{level1.name}}</nuxt-link>
              </div>
              <ul class="menu__list">
                <template v-for="level2 in level1.children">
                  <li class="menu__item" :key="level2.id" v-bind:class="{ menu__item_sub: hasIncluded(level2) }">
                    <nuxt-link :to="`/categories/${level2.id}/`" class="menu__link">
                      <span class="menu__text">{{ level2.name }}</span>
                    </nuxt-link>
                    <ul class="menu__submenu" v-if="level2.children.length">
                      <li class="menu__item" v-for="level3 in level2.children" v-bind:class="{ menu__item_active: hasIncluded(level3) }">
                        <nuxt-link :to="`/categories/${level3.id}/`" class="menu__link">
                          <span class="menu__text">{{level3.name}}</span>
                        </nuxt-link>
                        <ul class="menu__subsubmenu" v-if="level3.children.length">
                          <li class="menu__item" v-for="level4 in level3.children" v-bind:class="{ submenu__item_active: level4.id === id }">
                            <nuxt-link :to="`/categories/${level4.id}/`" class="submenu__link">
                              <span class="menu__text">{{level4.name}}</span>
                            </nuxt-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </div>
            <a href="#" class="menu__close" @click.prevent="menu_open=false">
              <span class="icon icon_close_medium"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_medium"></use></svg></span>
            </a>
          </div>
        </div>
      </div>
      <div class="sep__base">
        <div class="filter-wrap" v-bind:class="{ 'filter-wrap-fixed': sharedState.menu_fixed }">
          <div class="filter-btns">
            <div class="filter-btns__cell"><a href="#" class="btn btn_type_grey btn_wide" @click.prevent="menu_open=true">Каталог</a></div>
            <div class="filter-btns__cell"><a href="#" class="btn btn_type_grey btn_wide" @click.prevent="filter_open=true">Фильтр</a></div>
          </div>
          <div class="filter" v-bind:class="{ filter_opened: filter_open }">
            <div class="filter__box">
              <div class="filter__top">
                <div class="filter__btn"><a href="#" class="btn btn_type_flat btn_wide" @click.prevent="filter_open=false">Найдено товаров: {{total}}</a></div>
                <div class="filter__btn" v-if="chipClearAll"><a href="#" class="btn btn_type_white btn_wide" @click.prevent="chipClearAll=false"><span class="menu__text">Сбросить фильтр</span></a></div>
              </div>
              <ul class="filter__list form form_type_filter">
                <!-- <FilterItem :title="getFilterName('Бренд', brand)" :items="brands" v-model="brand" uid="brand" /> -->
                <!-- <FilterItem :title="getFilterName('Тип техники', vehicle)" :items="vehicles" v-model="vehicle" uid="vehicle" />
                <FilterItem :title="getFilterName('Состав', composition)" :items="compositions" v-model="composition" uid="composition" /> -->
              </ul>
              <div class="filter__side" v-if="chipClearAll">
                <a href="#" class="filter__reset" @click.prevent="chipClearAll=false">Сбросить фильтр</a>
              </div>
            </div>
          </div>
        </div>
        <div class="bar">
          <div class="bar__result">Найдено товаров: {{total}}</div>
          <div class="bar__side">
            <!-- <div class="bar__sort">
              <DropdownSelect v-model="sort" :items="sort_items" />
            </div> -->
            <div class="bar__switcher">
              <a href="#" class="bar__view bar__view_table" v-bind:class="{ bar__view_active: view==0 }" @click="view=0">
                <span class="icon icon_view1">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#view1"></use></svg>
                </span>
              </a>
              <a href="#" class="bar__view bar__view_table" v-bind:class="{ bar__view_active: view==1 }" @click="view=1">
                <span class="icon icon_view2">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#view2"></use></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="catalog catalog_size_4" v-bind:class="{ catalog_view_table: view==0, catalog_view_row: view==1 }">
          <div v-for="(item, i) in items" :key="item.id" class="catalog__cell">
            <ProductItem v-model="item.quantity" :name="item.name" :_id="item._id" :skus="item.skus" :item="item" :packages="item.packages" :price="item.price" />
          </div>
        </div>
        <div class="pag-wrap">
          <!-- <Paginator :page.sync="page_" :limit.sync="limit" :total="total" pages=:/> -->
          <Paginator v-model="page_" :pages="pages" :max="6" />
        </div>
      </div>
    </div>
    <div class="cat-search" v-bind:class="{ 'cat-search_opened': sharedState.quick_search }">
      <div class="cat-search__box">
        <div class="b-search b-search_sm">
          <input type="text" placeholder="Быстрый поиск" class="b-search__input" v-model="sharedState.global_search">
          <span class="b-search__button">
            <span class="icon icon_search"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#search"></use></svg></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterItem from '~/components/FilterItem.vue'
import Paginator from '~/components/Paginator.vue'
import DropdownSelect from '~/components/DropdownSelect.vue'
import ProductItem from '~/components/ProductItem.vue'

export default {
  props: {
    id: String,
    page: {
      type: Number,
      default: 1
    }
  },
  components: {
    FilterItem,
    Paginator,
    DropdownSelect,
    ProductItem
  },
  data(vm) {
    return {
      sharedState: this.$store.state,
      page_: vm.page,
      tree: [],
      categories: [],
      items: [],
      limit: 24,
      pages: 1,
      total: 0,
      types: [],
      typeOfProduct: [],
      brands: [],
      brand: [],
      vehicles: [],
      vehicle: [],
      compositions: [],
      composition: [],
      viscosities: [],
      viscosity: [],
      requests: [],
      request: [],
      chipClearAll: false,
      chipBrand: false,
      chipBrandName: '',
      chipVehicle: false,
      chipVehicleName: '',
      chipComposition: false,
      chipCompositionName: '',
      types_dropdown: false,
      view: this.$store.state.settings.view_items,
      sort_open: false,
      filter_open: false,
      menu_open: false,
      sort: 0,
      sort_items: [
        { value: 0, label: 'Популярные', tooltip: 'Популярность товаров определяется по спросу. Чем чаще заказывают товар — тем он выше в поиске' },
        { value: 1, label: 'Дешевые'},
        { value: 2, label: 'Дорогие'}
      ],
      ids: []
    }
  },
  computed: {
    category() {
      let category
      const find = this.categories.find(e => e.id === this.id)
      if (find) {
        const ids = []
        this.getIds(find, ids)
        category = { $in: ids }
      }
      return category
    },
  },
  watch: {
    page_(val) {
      this.getitems()
    },
    chipClearAll(val) {
      if (!val) {
        this.brand = []
        this.vehicle = []
        this.composition = []
      }
    },
    brand(val) {
      this.chipBrand = this.brand.length > 0
      this.chipBrandName = 'Бренд: ' + (this.brand.length > 0 ? (this.brand.length == 1 ? this.brand[0] : this.brand.length + ' знач.') : '')
      this.setClearAll()
      this.getitems()
    },
    chipBrand(val) {
      if (!val) this.brand = []
    },
    vehicle(val) {
      this.chipVehicle = this.vehicle.length > 0
      this.chipVehicleName = 'Тип продукта: ' + (this.vehicle.length > 0 ? (this.vehicle.length == 1 ? this.vehicle[0] : this.vehicle.length + ' знач.') : '')
      this.setClearAll()
      this.getitems()
    },
    chipVehicle(val) {
      if (!val) this.vehicle = []
    },
    composition(val) {
      this.chipComposition = this.composition.length > 0
      this.chipCompositionName = 'Состав: ' + (this.composition.length > 0 ? (this.composition.length == 1 ? this.composition[0] : this.composition.length + ' знач.') : '')
      this.setClearAll()
      this.getitems()
    },
    chipComposition(val) {
      if (!val) this.composition = []
    },
    view(value) {
      this.$store.commit('settings/set', { setting: 'view_items', value })
    }
  },
  mounted() {
    this.getCategories()
    // this.$store.dispatch('aggregate/find', { query: 'brand' }).then(res => this.brands = res.map(item => Object.assign({ value: item._id })))
    // this.$store.dispatch('aggregate/find', { query: 'vehicle' }).then(res => this.vehicles = res.map(item => Object.assign({ title: item._id, value: item._id })))
    // this.$store.dispatch('aggregate/find', { query: { name: 'compositions', isArray: true } }).then(res => this.compositions = res.map(item => Object.assign({ title: item._id, value: item._id })))
    // this.$store.dispatch('viscosities/find', { query: { $limit: null } }).then(res => this.viscosities = res.data.map(item => Object.assign({ title: item.name, value: item.name.replace('SAE ', '') })))
  },
  methods: {
    getCategories() {
      this.$store.dispatch('categories/find', { paginate: false } ).then(response => {
        const nest = (items, id = null, link = 'parent_id') => items.filter(item => item[link] === id).map(item => ({ ...item, children: nest(items, item.id) }))
        this.categories = []
        const root = { id: 0, children: this.tree }
        const stack = [...response]
        while (stack.length > 0) {
          const item = stack.shift()
          const child = { id: item._id, name: item.name, children: [] }
          if (item.parent && item.parent !== "00000000-0000-0000-0000-000000000000") {
            const find = this.categories.find(e => e.id === item.parent)
            if (!find) stack.push(item)
            else child.parent = find
          } else {
            child.parent = root
          }
          if (child.parent) {
            child.parent.children.push(child)
            this.categories.push(child)
          }
        }
        this.getitems()
      })
    },
    getFilterName(name, values) {
      return name + (values.length > 0 ? ': ' + values.length : '')
    },
    setClearAll() {
      this.chipClearAll = this.chipBrand || this.chipVehicle || this.chipComposition
    },
    opendialog(id) {
      this.$store.state.showProduct = true
      this.$store.state.product_id = id
    },
    getIds(item, ids) {
      ids.push(item.id)
      item.children.forEach(subitem => this.getIds(subitem, ids))
    },
    getitems() {
      const $skip = (this.page_ - 1) * this.limit
      const cart = this.$store.state.cart.list
      let query = { $skip, $limit: this.limit, price: { $gt: 0 } }
      if (this.brand.length) Object.assign(query, { brand: { $in: this.brand } })
      if (this.vehicle.length) Object.assign(query, { vehicle: { $in: this.vehicle } })
      if (this.composition.length) Object.assign(query, { compositions: { $in: this.composition } })
      if (this.viscosity.length) Object.assign(query, { sae: { $in: this.viscosity } })
      if (this.request.length) Object.assign(query, { requests: { $in: this.request } })
      const find = this.categories.find(e => e.id === this.id)
      if (find) {
        const ids = []
        this.getIds(find, ids)
        Object.assign(query, { category: { $in: ids } })
      }
      this.$store.dispatch('items/find', { query })
        .then(response => {
          this.items = response.data.reduce((items, item) => {
            const cart_item = cart.find(e => e.id === item._id)
            const product = Object.assign({ quantity: 1, cart: 0, volume: '', price: 0, current_package: 0 }, item)
            if (cart_item !== undefined) Object.assign(product, { quantity: cart_item.quantity, cart: cart_item.quantity })
            items.push(product)
            return items
          }, [])
          this.total = response.total
          this.pages = Math.ceil(this.total / this.limit)
        })
    },
    typeOfProductSelect(value) {
      // const index = this.typeOfProduct.indexOf(value)
      // if (index === -1) this.typeOfProduct.push(value)
      this.menu_open = false
      this.typeOfProduct = [value]
      this.getitems()
    },
    categorySelect(category) {
      this.menu_open = false
      this.id = category.id
      this.getitems()
    },
    updateitem(item) {
      this.$refs['input' + item._id][0].value = item.quantity
      this.items.splice(this.items.indexOf(item), 1, item)
    },
    increase(item) {
      item.quantity++
      this.updateitem(item)
    },
    decrease(item) {
      if (item.quantity > 1) item.quantity--
      this.updateitem(item)
    },
    addcart(item) {
      // this.$store.commit('cart/add', item)
      // item.cart = item.quantity
      // this.items.splice(this.items.indexOf(item), 1, item)
      // this.showCartMessage()
    },
    getname(item) {
      return item.cart ? (item.cart === item.quantity ? "В корзине" : "Изменить") : "В корзину"
    },
    hasIncluded(node) {
      const stack = [node]
      while (stack.length > 0) {
        node = stack.pop()
        if (node.id == this.id) return true
        if (node.children && node.children.length) node.children.forEach(n => stack.push(n))
      }
      return false
    }
  },
}
</script>
