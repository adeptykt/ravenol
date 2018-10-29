<template>
  <v-dialog v-model="dialog" max-width="940px">
    <v-card>
      <v-card-text>
        <v-tabs centered color="transparent" slider-color="black">
          <v-tab v-for="tab in tabs" :key="tab">
            {{ tab }}
          </v-tab>
          <v-tab-item v-for="(tab, n) in tabs" :key="n">
            <v-container :style="{padding: 0}">
              <v-layout row v-if="n==0">
                <v-flex xs5 class="left-info">
                  <img :src="currentpack.image" class="product-image">
                  <v-btn depressed dark large color="#a81818" :style="{width: '100%', margin: '20px 0', textTransform: 'none'}">Купить</v-btn>
                  <span>Артикул: {{currentpack.article}}</span>
                  <span class="price" v-if="currentpack.price">{{currentpack.price}} р.</span>
                  <div class="product-packages">
                    <template v-for="(pack, p) in product.packages">
                      <v-btn depressed flat :key="p" :class="[p===current ? 'btn-active' : 'btn-normal']" @click="showpackage(p)">{{pack.package}}</v-btn>
                    </template>
                  </div>
                </v-flex>
                <v-flex xs7 class="product-txt">
                  <h1>{{product.name}}</h1>
                  <h2>{{product.type}}</h2>
                  <span class="pr-desc">{{product.description}}</span>
                  <span v-html="text" class="product-desc"></span>
                  <div v-if="product.usage && product.usage.length > 0" class="product-usage">
                    <h2>Применение {{product.name}} обеспечивает:</h2>
                    <ul>
                      <template v-for="(usage, i) in product.usage">
                        <li :key="i">{{usage}}</li>
                      </template>
                    </ul>
                  </div>
                </v-flex>
              </v-layout>
              <div class="product-select" v-if="n==1">
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
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="dialog=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      id: String
    },
    data () {
      return {
        dialog: false,
        product: {},
        tabs: ['Основное', 'Характеристики'],
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
    computed: {
      internalValue: {
        get () {
          return this.dialog
        },
        set (val) {
          this.dialog = val
        }
      },
      // value: {
      //   // cached: false,
      //   get: function () {
      //     return this.dialog
      //   },
      //   set: function (val) {
      //     this.dialog = val
      //   }
      // }
    },
    watch: {
      dialog (val) {
        this.$emit("updateVisible", val)
      },
      value (val) {
        console.log('product watch visible');
        this.dialog = val
        // if (this.visible && !this.dialog) this.dialog = true
        // else if (!this.visible && this.dialog) this.dialog = false
      },
      id (id) {
        console.log('product watch id');
        id && this.$store.dispatch('items/get', id)
          .then(res => {
            console.log('res', id, res);
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
  width: 375px;
  height: 500px;
  margin: -50px 0;
  object-fit: cover;
}
.product-txt {
  padding-left: 20px;
}
.product-txt h1 {
  margin-bottom: 0;
  font-size: 32px;
  font-weight: 300;
  margin: 10px 0 20px;
  text-align: center;
}
.product-txt h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: 700;
  color: #007acc;
  margin: 20px 0 10px;
}
.product-txt .pr-desc {
  font-size: 18px;
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
