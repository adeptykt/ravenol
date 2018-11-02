<template>
  <div>
    <div class="blokimg">
      <div class="overlay" id="imagelarge">
        <div class="overlay_container">
          <a href="#close">
            <img :src="currentpack.image"/>
          </a>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="956px">
      <div class="product-info">
        <v-toolbar light flat color="white" height="36px" extension-height="36">
          <v-spacer></v-spacer>
          <v-toolbar-title :style="{ marginLeft: '20px' }">{{product.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tabs centered color="transparent" slider-color="black" v-model="model" height="30px" slot="extension">
            <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#ptab-${i}`">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-btn icon @click="dialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="`ptab-${i}`">
            <v-card flat>
              <v-card-text>
                <v-container :style="{padding: 0}">
                  <v-layout :row="!sharedState.mobile" :column="sharedState.mobile" v-if="i==0">
                    <v-flex xs5 class="left-info">
                      <div class="blokimg">
                        <a href="#imagelarge">
                          <img :src="currentpack.image" class="product-image">
                        </a>
                      </div>
                      <v-btn depressed dark large color="#a81818" :style="{width: '100%', margin: '10px 0', textTransform: 'none'}">Купить</v-btn>
                      <span>Артикул: {{currentpack.article}}</span>
                      <span class="price" v-if="currentpack.price">{{currentpack.price}} &#8381;</span>
                      <div class="product-packages">
                        <template v-for="(pack, p) in product.packages">
                          <v-btn depressed flat :key="p" :class="[p===current ? 'btn-active' : 'btn-normal']" @click="showpackage(p)">{{pack.package}}</v-btn>
                        </template>
                      </div>
                    </v-flex>
                    <v-flex xs7 class="product-txt">
                      <div class="scroll">
                        <!-- <h1>{{product.name}}</h1> -->
                        <h2>{{product.type}}</h2>
                        <div class="pr-desc">{{product.description}}</div>
                        <span v-html="text" class="product-desc"></span>
                        <div v-if="product.usage && product.usage.length > 0" class="product-usage">
                          <h2>Применение {{product.name}} обеспечивает:</h2>
                          <ul>
                            <template v-for="(usage, i) in product.usage">
                              <li :key="i">{{usage}}</li>
                            </template>
                          </ul>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                  <div class="product-select" v-if="i==1">
                    <div id="head">
                      <span>Параметр</span>
                      <span>Ед. измерения</span>
                      <span>Данные</span>
                      <span>Метод испытания</span>
                    </div>
                    <template v-for="(char, c) in product.characteristics">
                      <div class="productparam" :key="c">
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
        tabs: ['Описание', 'Характеристики'],
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
      model (val, old) {
        console.log('model', val, old);
      },
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
.product-info .v-window__container {
  /* overflow-y: auto; */
  /* height: 685px; */
}
.product-info .v-toolbar__content *:last-child.v-btn--icon {
  margin: 0px;
}
.product-info .v-card {
  overflow-y: hidden;
  height: 685px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-info .v-card__text {
  padding: 0 12px;
  width: 100%;
}
.product-desc div {
  margin-bottom: 16px;
}
.product-usage h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: 700;
  color: #007acc;
}
.left-info span {
  display: block;
  width: 100%;
  font-weight: 700;
  text-align: center;
}
.left-info .price {
  margin: 10px 0;
  font-size: 34px;
  font-weight: 800;
}
.product-packages {
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0;
}
.button-package {
  color: red;
}
.product-packages .v-btn {
  display: inline-block;
  width: calc(25% - 4px);
  height: 49px;
  margin: 2px;
  border-radius: 5px;
  text-transform: none;
}
.product-packages .btn-active {
  color: #fff;
  background-color: #007acc;
}
.product-packages .btn-normal {
  background-color: #ececec;
}
.product-packages .btn-normal:hover {
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
  overflow-y: auto;
  max-height: 670px;
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
.product-select #head {
  align-items: flex-end;
  margin-bottom: 0;
  font-weight: 700;
  color: #fff;
  background-color: #c5c5c5;
}
.product-select #head>span:first-child, .product-select .productparam>span:first-child {
  width: 40%;
  text-align: left;
}
.product-select #head>span, .product-select .productparam>span {
  display: inline-block;
  width: 20%;
  padding: 5px;
  font-size: 14px;
  text-align: center;
}
.product-select .productparam, .product-select #head {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.productparam:nth-child(2n+2) {
  background-color: #ececec;
}
</style>
