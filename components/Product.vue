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
