<template>
  <div class="selection-container">
    <v-tabs centered dark max="100px" slider-color="#FFCC00">
      <v-tab v-for="(tab, i) in this.sharedState.category_menu" :key="i" :href="`#cmenu-${i}`" @click="ontabclick(i)">
        {{tab.name}}
      </v-tab>
    </v-tabs>
    <div class="selection-body">
      <v-breadcrumbs :items="sharedState.history">
        <v-icon slot="divider">forward</v-icon>
        <template slot="item" slot-scope="props">
          <a @click="opengear(props.item)">
            {{props.item.name}}
          </a>
        </template>
      </v-breadcrumbs>
      <div class="selection-category" v-if="sharedState.category_list.length > 0 && sharedState.category_id">
        <v-flex v-for="(item, n) in sharedState.category_list" :key="n" xs12 sm4 md3 lg3>
          <a @click="opengear(item)" v-bind:class="{ leaf: item.isItem }">
            {{item.name}}
          </a>
        </v-flex>
      </div>
      <div class="selection-gear" v-if="sharedState.gear_list.length > 0">
        <div class="panel" v-for="(gear, g) in sharedState.gear_list" :key="g">
          <div class="title">
            {{gear.name}}
          </div>
          <div class="panel-body">
            <template v-for="(volume, v) in gear.volumes">
              <div :key="volume+g*20+v">
                <span class="key" v-if="v==0">Объем:</span>
                <span class="value">{{volume}}</span>
              </div>
            </template>
            <template v-for="(mode, m) in gear.modes">
              <div :key="mode.name+g*20+m">
                <span class="key">Режим:</span>
                <span class="value">{{mode.name}}</span>
              </div>
              <template v-for="(interval, i) in mode.intervals">
                <div :key="interval+(g*20+m)*10+i">
                  <span class="key" v-if="i==0">Интервалы:</span>
                  <span class="value">{{interval}}</span>
                </div>
              </template>
              <template v-for="(product, p) in mode.products">
                <div :key="'product'+(g*20+m)*10+p">
                  <span class="key" v-if="p==0">Продукты:</span>
                  <span class="value" v-if="!product.name">{{product}}</span>
                  <span class="value" v-if="product.name">
                    <a @click="showproduct(product.id)">
                      {{product.name}}
                    </a>
                  </span>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div style="height: 0">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharedState: this.$store.state
    }
  },
  created() {
    this.$store.dispatch('category_menu_find')
  },
  methods: {
    ontabclick(i) {
      this.$store.dispatch('open_gear', this.sharedState.category_menu[i])
    },
    showproduct(id) {
      this.$store.state.visible = true
      this.$store.state.id = id
    },
    opengear(choose) {
      this.$store.dispatch('open_gear', choose)
    }
  }
}
</script>

<style>
.selection-container {
  background: #efefef;
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
.selection-gear {
  padding: 0px 0px;
}
.selection-gear .panel {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.selection-gear .panel .title {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
.selection-gear .panel .panel-body {
  margin: 15px;
}
</style>
