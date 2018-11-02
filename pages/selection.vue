<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-breadcrumbs :items="sharedState.history">
        <v-icon slot="divider">forward</v-icon>
        <template slot="item" slot-scope="props">
          <a @click="opengear(props.item)">
            {{props.item.name}}
          </a>
        </template>
      </v-breadcrumbs>
      <div class="tree" v-if="sharedState.category_list.length > 0 && !sharedState.category_id">
        <v-flex v-for="(item, n) in sharedState.category_list" :key="n" xs6 sm4 md2 lg2>
          <div class="inline">
            <a @click="opengear(item)">
              <img :src="item.image">
              {{item.name}}
           </a>
         </div>
       </v-flex>
      </div>
      <div class="tree" v-if="sharedState.category_list.length > 0 && sharedState.category_id">
        <v-flex v-for="(item, n) in sharedState.category_list" :key="n" xs12 sm4 md3 lg3>
          <div class="inline" v-bind:class="{ leaf: item.isItem }">
            <a @click="opengear(item)">
              {{item.name}}
            </a>
          </div>
        </v-flex>
      </div>
      <div class="tree" v-if="sharedState.gear_list.length > 0">
        <v-flex v-for="(gear, g) in sharedState.gear_list" :key="g" xs12 sm6 md6 lg6>
          <div class="sr-item">
            <div class="title">
              {{gear.name}}
            </div>
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
        </v-flex>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      sharedState: this.$store.state,
    }
  },
  created() {
    if (this.sharedState.category_list.length == 0 && this.sharedState.gear_list.length == 0) this.opengear({ _id: 0 })
  },
  methods: {
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
.tree {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-self: stretch;
}
.tree .inline a {
  font-size: 12px;
  color: black;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.tree .inline a>img {
  width: 80%;
  height: auto;
}
.tree .leaf {
  background-color: #eee;
  border: 1px solid #c5c5c5;
}
.sr-item {
  background-color: #ececec;
  width: calc(100% - 20px);
  text-align: left;
  /* margin-bottom: 20px; */
  margin: 10px;
  padding: 20px;
  height: calc(100% - 20px);
}
.sr-item .title {
  margin-bottom: 10px;
  font-size: 24px;
}
.item {
  margin: 0px;
  /* padding: 1px; */
}
.inline {
  background-color: #c5c5c5;
  margin: 1px;
  padding: 6px;
  width: calc(100% - 2px);
  text-transform: none;
  font-weight: normal;
  height: calc(100% - 2px);
}
.inline:hover {
  background-color: #f6f6f6;
}
</style>
