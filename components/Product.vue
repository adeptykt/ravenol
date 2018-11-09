<template>
  <div class="product-dialog">
    <div class="blokimg">
      <div class="overlay" id="imagelarge">
        <div class="overlay_container">
          <a href="#close">
            <img :src="currentpack.image"/>
          </a>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="940px">
      <style scoped>
      .v-dialog {
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5)
      }
      </style>
      <div class="product">
        <v-toolbar light flat color="#FFFFFF" height="46" extension-height="36">
          <v-spacer></v-spacer>
          <v-toolbar-title :style="{ marginLeft: '20px' }">{{product.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tabs centered color="transparent" slider-color="black" v-model="model" height="30px" slot="extension">
            <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#ptab-${i}`">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-btn icon @click="dialog=false">
            <v-icon small>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="`ptab-${i}`">
            <v-card flat>
              <v-card-text>
                <v-container :style="{padding: '10px 0 0 0'}">
                  <div v-if="tabs[i]=='Информация'" class="product-info">
                    <!-- <h1>{{product.name}}</h1> -->
                    <h2>{{product.type}}</h2>
                    <p>{{product.description}}</p>
                    <p>Артикул продукта: {{product.article}}</p>
                    <p v-if="product.sae && product.sae.length"><b>SAE:</b> {{product.sae.join(', ')}}</p>
                    <p v-if="product.acea && product.acea.length"><b>ACEA:</b> {{product.acea.join(', ')}}</p>
                    <p v-if="product.api && product.api.length"><b>API:</b> {{product.api.join(', ')}}</p>
                    <p v-if="product.tags && product.tags.length"><b>Теги:</b> {{product.tags.join(', ')}}</p>
                    <p v-if="product.approved && product.approved.length"><b>Одобрено производителями техники:</b> {{product.approved.join(', ')}}</p>
                    <p v-if="product.requests && product.requests.length"><b>Соответствие требованиям:</b> {{product.requests.join(', ')}}</p>
                  </div>
                  <v-flex class="packages" v-if="tabs[i]=='Фасовка'">
                    <v-flex xs12 sm6 md6 lg6>
                      <div class="product-table">
                        <div id="head">
                          <span>Объем</span>
                          <span>Артикул</span>
                          <span>Код</span>
                        </div>
                        <template v-for="(pack, p) in product.packages">
                          <div class="product-row" :key="p" @mouseover="currentpack=pack">
                            <span>{{pack.volume}} л.</span>
                            <span>{{pack.article}}</span>
                            <span>{{pack.code}}</span>
                          </div>
                        </template>
                      </div>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                      <div class="blokimg">
                        <a href="#imagelarge">
                          <img :src="currentpack.image" class="product-image">
                        </a>
                      </div>
                    </v-flex>
                  </v-flex>
                  <div v-html="product.text" class="product-desc" v-if="tabs[i]=='Описание'"></div>
                  <div class="product-txt" v-if="tabs[i]=='Применение'">
                    <h2>Применение {{product.name}} обеспечивает:</h2>
                    <ul>
                      <template v-for="(usage, i) in product.usage">
                        <li :key="i">{{usage}}</li>
                      </template>
                    </ul>
                  </div>
                  <div class="product-table" v-if="tabs[i]=='Параметры'">
                    <div id="head">
                      <span>Параметр</span>
                      <span>Ед. измерения</span>
                      <span>Данные</span>
                      <span>Метод испытания</span>
                    </div>
                    <template v-for="(char, c) in product.characteristics">
                      <div class="product-row" :key="c">
                        <span>{{char[0]}}</span>
                        <span>{{char[1]}}</span>
                        <span>{{char[2]}}</span>
                        <span>{{char[3]}}</span>
                      </div>
                    </template>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      id: String
    },
    data () {
      return {
        sharedState: this.$store.state,
        model: 'ptab-0',
        dialog: false,
        product: {},
        tabs: ['Информация', 'Описание', 'Фасовка', 'Применение', 'Параметры'],
        name: '',
        text: '',
        price: '',
        vehicle: '',
        composition: '',
        viscosity: 0,
        current: 0,
        currentpack: {}
      }
    },
    watch: {
      dialog (val) {
        this.$emit("input", val)
      },
      value (val) {
        this.dialog = val
      },
      id (id) {
        id && this.$store.dispatch('items/get', id)
          .then(res => {
            this.product = res
            this.current = 0
            this.text = res.text
            this.currentpack = res.packages && res.packages.length ? res.packages[0] : { article: res.article, price: res.price, image: res.image }
          })
      }
    },
    methods: {
      showpackage(index) {
        this.current = index
        this.currentpack = this.product.packages[index]
      }
    }
  }
</script>

<style>
.product .v-toolbar__content *:last-child.v-btn--icon {
  margin: 0px;
}
.product .v-toolbar__content {
  border-bottom: 1px solid #e5e5e5;
}
.product .v-card {
  overflow-y: hidden;
  height: 485px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product .v-card__text {
  padding: 0 15px 15px 15px;
  width: 100%;
  height: 100%;
}
.product .v-card__text .container {
  height: 100%;
  overflow-y: auto;
}
.product-info {
  margin: 0 0 10px;
}
.product-desc div {
  margin-bottom: 16px;
}
.product-usage h2, .product h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
}
.product-usage h2 {
  color: #007acc;
}
.packages {
  display: flex;
  flex-direction: row;
}
.packages span {
  display: block;
  width: 100%;
  font-weight: 700;
  text-align: center;
}
.packages .price {
  margin: 10px 0;
  font-size: 34px;
  font-weight: 800;
}
.product-package {
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0;
}
.button-package {
  color: red;
}
.product-package .v-btn {
  display: inline-block;
  width: calc(25% - 4px);
  height: 49px;
  margin: 2px;
  border-radius: 5px;
  text-transform: none;
}
.product-package .btn-active {
  color: #fff;
  background-color: #007acc;
}
.product-package .btn-normal {
  background-color: #ececec;
}
.product-package .btn-normal:hover {
  color: #fff;
  background-color: gray;
}
.product-image {
  max-width: 375px;
  width: 70%;
  max-height: 350px;
  object-fit: cover;
  cursor: zoom-in;
}
.blokimg, .blokimg a {
  position: relative;
  display: flex;
  justify-content: center;
}
.overlay{
  display: none;
  height: auto;
  position: absolute;
  /* left: -14px;
  top: -12px; */
  width: auto;
  z-index: 999;
}
.overlay .overlay_container{
  display: table-cell;
  vertical-align: middle;
}
.overlay_container img {
  background-color: #007acc;
  padding: 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  cursor: zoom-out;
}
.overlay:target {
  display: table;
}
.scroll {
  /* overflow-y: auto;
  height: 100%; */
  /* max-height: 570px; */
}
.product-txt {
  padding-left: 20px;
}
.product-txt h1 {
  margin-bottom: 0;
  font-size: 32px;
  font-weight: 300;
  margin: 0;
  text-align: left;
}
.product-txt h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: 700;
  color: #007acc;
  margin: 0 0 5px;
}
.product-txt p {
  margin-bottom: 0;
}
.product-txt .pr-desc {
  font-size: 18px;
  margin-bottom: 20px;
}
.product-table #head {
  align-items: flex-end;
  margin-bottom: 0;
  font-weight: 700;
  color: #fff;
  background-color: #c5c5c5;
}
.product-table #head>span:first-child, .product-table .product-row>span:first-child {
  width: 40%;
  text-align: left;
}
.product-table #head>span, .product-table .product-row>span {
  display: inline-block;
  width: 20%;
  padding: 5px;
  font-size: 14px;
  text-align: center;
}
.product-table .product-row, .product-table #head {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.packages .product-table #head>span, .packages .product-table .product-row>span {
  width: 40%;
}
.packages .product-table #head>span:first-child, .packages .product-table .product-row>span:first-child {
  width: 20%;
  text-align: left;
}
.product-row:nth-child(2n+2) {
  background-color: #ececec;
}
.packages .product-row:hover {
  background-color: #ef920f;
}
</style>
