<template>
  <div class="selection-container">
    <v-tabs centered dark max="100px" slider-color="#FFCC00">
      <v-tab v-for="(tab, i) in sharedState.category_list" :key="i" :href="`#cmenu-${i}`" @click="getvendors(tab)">
        {{tab.name}}
      </v-tab>
    </v-tabs>
    <div class="selection-body">
      <v-breadcrumbs :items="sharedState.history">
        <v-icon slot="divider">forward</v-icon>
        <template slot="item" slot-scope="props">
          <a @click="$store.dispatch(props.item.dispatch, props.item.data)">
            {{props.item.name}}
          </a>
        </template>
      </v-breadcrumbs>
      <div class="selection-category item-img" v-if="sharedState.selection_mode === 'vendors'">
        <v-flex v-for="(item, n) in sharedState.vendor_list" :key="n" xs12 sm4 md3 lg3>
          <a @click="getmodels(item)">
            <img :src="item.img" style="maxHeight: 50px">
            {{item.name}}
          </a>
        </v-flex>
      </div>
      <div class="selection-category item-img" v-if="sharedState.selection_mode === 'models'">
        <v-flex v-for="(item, n) in sharedState.model_list" :key="n" xs12 sm4 md3 lg3>
          <a @click="getgenerations(item)">
            <img :src="item.img" style="maxHeight: 150px">
            {{item.name}}<br>
            {{item.begin}}&nbsp;-&nbsp;{{item.end}}
          </a>
        </v-flex>
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
        <v-flex class="panel" v-for="(gear, g) in sharedState.gear_list" :key="g" xs12 sm6 md6 lg6>
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
        </v-flex>
      </div>
      <div style="height: 0">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharedState: this.$store.state,
      category_id: 1
    }
  },
  created() {
    this.getvendors(this.sharedState.category_list[0])
  },
  methods: {
    getvendors(category) {
      this.category_id = category._id
      this.$store.dispatch('get_vendors', category)
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
.selection-container {
  /* background: #efefef; */
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.selection-container .v-tabs__bar {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.selection-container .v-tabs__bar a:hover {
  text-decoration: none;
  color: inherit;
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
