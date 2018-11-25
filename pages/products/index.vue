<template>
  <div>
    <div class="filter-side">
      <div class="products-filter">
        <v-expansion-panel class="noshadow">
          <v-expansion-panel-content>
            <div slot="header">Тип продукта</div>
            <div class="filter-content">
              <template v-for="(item, i) in types">
                <Checkbox v-model="typeOfProduct" color='#ef9a21' :value="item.value" :label="item.title" :key="i" small v-on:change="onfilter">
                </Checkbox>
              </template>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Тип техники</div>
            <div class="filter-content">
              <template v-for="(item, i) in vehicles">
                <Checkbox v-model="vehicle" color='#ef9a21' :value="item.value" :label="item.title" :key="i" small v-on:change="onfilter">
                </Checkbox>
              </template>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Состав</div>
            <div class="filter-content">
              <template v-for="(item, i) in compositions">
                <Checkbox v-model="composition" color='#ef9a21' :value="item.value" :label="item.title" :key="i" small v-on:change="onfilter">
                </Checkbox>
              </template>
            </div>
          </v-expansion-panel-content>
          <!-- <v-expansion-panel-content>
            <div slot="header">Вязкость</div>
            <div class="filter-content">
              <template v-for="(item, i) in viscosities">
                <Checkbox v-model="viscosity" color='#ef9a21' :value="item.value" :label="item.title" :key="i" small v-on:change="onfilter">
                </Checkbox>
              </template>
            </div>
          </v-expansion-panel-content> -->
          <!-- <v-expansion-panel-content>
            <div slot="header">Требования</div>
            <div class="filter-content">
              <template v-for="(item, i) in requests">
                <Checkbox v-model="request" color='#ef9a21' :value="item" :label="item" :key="i" small v-on:change="onfilter">
                </Checkbox>
              </template>
            </div>
          </v-expansion-panel-content> -->
        </v-expansion-panel>
      </div>
    </div>
    <div class="products-card">
      <div v-if="chipClearAll" class="products-chips">
        <v-chip v-model="chipClearAll" close outline label>Очистить все фильтры</v-chip>
        <v-tooltip bottom v-if="typeOfProduct.length > 0" :disabled="typeOfProduct.length == 1">
          <v-chip v-model="chipType" close outline label slot="activator">{{chipTypeName}}</v-chip>
          <ul v-for="(item, i) in typeOfProduct">
            <li :key="i">{{item}}</li>
          </ul>
        </v-tooltip>
        <v-tooltip bottom v-if="vehicle.length > 0" :disabled="vehicle.length == 1">
          <v-chip v-model="chipVehicle" close outline label slot="activator">{{chipVehicleName}}</v-chip>
          <ul v-for="(item, i) in vehicle">
            <li :key="i">{{item}}</li>
          </ul>
        </v-tooltip>
        <v-tooltip bottom v-if="composition.length > 0" :disabled="composition.length == 1">
          <v-chip v-model="chipComposition" close outline label slot="activator">{{chipCompositionName}}</v-chip>
          <ul v-for="(item, i) in composition">
            <li :key="i">{{item}}</li>
          </ul>
        </v-tooltip>
      </div>
      <div class="products-list">
        <template v-for="(item, i) in items">
          <div :key="item.id" class="tile">
            <div class="list-tile-image">
              <img :src="'/images/list/' + item.article + '.jpg'" @click="opendialog(item._id)">
            </div>
            <div class="list-tile-content">
              <div class="list-tile-title" @click="opendialog(item._id)">{{item.name}}</div>
              <div class="list-tile-subtitle">{{item.type}}</div>
              <div class="list-tile-description">{{item.description}}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="pagination">
        <v-pagination v-if="pages>1" v-model="page" :length="pages" :total-visible="7" color="#ef9a21"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '~/components/Checkbox.vue'

export default {
  components: {
    Checkbox
  },
  data () {
    return {
      items: [],
      page: 1,
      _page: 1,
      limit: 10,
      pages: 1,
      total: 0,
      types: [],
      typeOfProduct: [],
      vehicles: [],
      vehicle: [],
      compositions: [],
      composition: [],
      viscosities: [],
      viscosity: [],
      requests: [],
      request: [],
      chipClearAll: false,
      chipType: false,
      chipTypeName: '',
      chipVehicle: false,
      chipVehicleName: '',
      chipComposition: false,
      chipCompositionName: '',
    }
  },
  created() {
    this.getitems()
  },
  watch: {
    page(val) {
      this.getitems()
    },
    chipClearAll(val) {
      if (!val) {
        this.typeOfProduct = []
        this.vehicle = []
        this.composition = []
      }
    },
    typeOfProduct(val) {
      this.chipType = this.typeOfProduct.length > 0
      this.chipTypeName = 'Тип продукта: ' + (this.typeOfProduct.length > 0 ? (this.typeOfProduct.length == 1 ? this.typeOfProduct[0] : this.typeOfProduct.length + ' знач.') : '')
      this.setClearAll()
    },
    chipType(val) {
      if (!val) this.typeOfProduct = []
    },
    vehicle(val) {
      this.chipVehicle = this.vehicle.length > 0
      this.chipVehicleName = 'Тип продукта: ' + (this.vehicle.length > 0 ? (this.vehicle.length == 1 ? this.vehicle[0] : this.vehicle.length + ' знач.') : '')
      this.setClearAll()
    },
    chipVehicle(val) {
      if (!val) this.vehicle = []
    },
    composition(val) {
      this.chipComposition = this.composition.length > 0
      this.chipCompositionName = 'Состав: ' + (this.composition.length > 0 ? (this.composition.length == 1 ? this.composition[0] : this.composition.length + ' знач.') : '')
      this.setClearAll()
    },
    chipComposition(val) {
      if (!val) this.composition = []
    },
  },
  mounted() {
    this.$store.dispatch('aggregate/find', { query: 'typeOfProduct' }).then(res => this.types = res.map(item => {
      return Object.assign({ title: item._id + ' (' + item.count + ')', value: item._id})
    }))
    this.$store.dispatch('aggregate/find', { query: 'vehicle' }).then(res => this.vehicles = res.map(item => Object.assign({ title: item._id + ' (' + item.count + ')', value: item._id})))
    this.$store.dispatch('aggregate/find', { query: { name: 'compositions', isArray: true } }).then(res => this.compositions = res.map(item => Object.assign({ title: item._id + ' (' + item.count + ')', value: item._id})))
    this.$store.dispatch('viscosities/find', { query: { $limit: null } }).then(res => this.viscosities = res.data.map(item => Object.assign({ title: item.name, value: item.name.replace('SAE ', '')})))
    // this.$store.dispatch('aggregate/find', { query: { name: 'requests', isArray: true } }).then(res => this.requests = res.map(item => item._id))
  },
  methods: {
    setClearAll() {
      this.chipClearAll = this.chipType || this.chipVehicle || this.chipComposition
    },
    onfilter(checked, value) {
      this.getitems()
    },
    opendialog(id) {
      this.$store.state.showProduct = true
      this.$store.state.product_id = id
    },
    getitems() {
      const skip = (this.page - 1) * this.limit
      let query = { $skip: skip }
      if (this.typeOfProduct.length) Object.assign(query, { typeOfProduct: { $in: this.typeOfProduct } })
      if (this.vehicle.length) Object.assign(query, { vehicle: { $in: this.vehicle } })
      if (this.composition.length) Object.assign(query, { compositions: { $in: this.composition } })
      if (this.viscosity.length) Object.assign(query, { sae: { $in: this.viscosity } })
      if (this.request.length) Object.assign(query, { requests: { $in: this.request } })
      this.$store.dispatch('items/find', { query })
        .then(response => {
          this.items = response.data
          this.limit = response.limit
          this.total = response.total
          this.pages = Math.ceil(this.total / this.limit)
        })
    }
  }
}
</script>

<style>
.noshadow {
  box-shadow: none;
}
.filter-side {
  width: 220px;
  float: left;
}
.products-filter {
  border: 1px solid #ddd;
  width: 100%;
  background: white;
  /* padding: 10px; */
}
.filter-content {
  padding: 5px;
}
.products-card {
  margin-left: 240px;
}
.products-list {
  /* border: 1px solid #ddd; */
  background: white;
}
.products-list .tile {
  border: 1px solid #ddd;
  min-height: 120px;
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
}
.products-list .tile:first-of-type {
  -moz-border-radius-topleft: 4px;
  -webkit-border-top-left-radius: 4px;
  border-top-left-radius: 4px;
  -moz-border-radius-topright: 4px;
  -webkit-border-top-right-radius: 4px;
  border-top-right-radius: 4px;
}
.products-list .tile+.tile {
  border-top: none;
}
.products-list .tile:last-of-type {
  -moz-border-radius-bottomleft: 4px;
  -webkit-border-bottom-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -moz-border-radius-bottomright: 4px;
  -webkit-border-bottom-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.products-list .list-tile-image {
  min-width: 90px;
  margin: 0 auto;
}
.products-list .list-tile-image img {
  /* width: 80px; */
  height: 90px;
  object-fit: cover;
  vertical-align: baseline;
  cursor: pointer;
}
.products-list .list-tile-content {
  width: 100%;
}
.products-list .list-tile-title {
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
  cursor: pointer;
}
.products-list .list-tile-subtitle {
  font-weight: 800;
  color: gray;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
/* .pagination .theme--light.v-pagination .v-pagination__item { */
.pagination .theme--light.v-pagination .v-pagination__item, .v-pagination__navigation {
  height: 34px;
  margin: 0;
  box-shadow: none;
  border: 1px solid #ddd;
  border-radius: 0;
  margin-left: -1px;
  color: #ef9a21;
}
.pagination .theme--light.v-pagination .v-pagination__item--active {
  color: white;
  border: 1px solid #ef9a21;
}
.pagination .theme--light.v-pagination .v-pagination__navigation .v-icon {
  color: #ef9a21;
}
.pagination .theme--light.v-pagination .v-pagination__navigation--disabled .v-icon {
  color: rgba(0,0,0,0.54);
}
.pagination li:first-child button {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}
.pagination li:last-child button {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
.products-chips {
  margin: 0 0 0 -5px;
}
.products-chips .v-chip {
  margin: 0 5px 10px 5px;
}

.v-avatar {
  margin: auto 0;
}
.v-avatar img {
  width: 80px;
  height: 100px;
  object-fit: cover;
  vertical-align: baseline;
}
/* .v-list__tile {
  height: 150px;
  vertical-align: baseline;
} */
.v-list__tile__title {
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
}
.v-list_product_subtitle {
  font-weight: 800;
  color: gray;
}
.v-list__tile__avatar {
    display: flex;
    justify-content: center;
    min-width: 90px;
}
</style>
