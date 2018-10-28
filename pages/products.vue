<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>Перечень продукции Ravenol</h1>
      <v-card flat>
        <v-list>
          <template v-for="(item, i) in items">
            <v-list-tile :key="item.id" avatar @click="opendialog(item._id)">
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-card-text v-if="pages>1">
          <v-pagination v-model="page" :length="pages"></v-pagination>
        </v-card-text>
      </v-card>
      <Product v-model="visible" :id="id" v-on:updateVisible="(val) => {visible = val}"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import Product from '~/components/Product.vue'
  export default {
    components: {
      Product
    },
    data () {
      return {
        items: [],
        page: 1,
        _page: 1,
        limit: 10,
        pages: 1,
        total: 0,
        visible: false,
        id: null
      }
    },
    created() {
      this.getitems()
    },
    watch: {
      page(val) {
        this.$router.push({ path: 'products', query: { page: this.val } })
        // this.$router.push({ name: 'products', params: { val } })
        // this.$router.push({ name: `/products?page=${val}` })
        console.log('go');
        // this.getitems()
      },
      _page(val) {
        this.getitems()
      },
      '$route' (to, from) {
        this._page = to.query.page || 1
        console.log('route', to);
      }
    },
    methods: {
      async asyncData ({query}) {
        console.log(query);
      },
      opendialog(id) {
        this.visible = true
        this.id = id
      },
      getitems() {
        const skip = (this._page - 1) * this.limit
        this.$store.dispatch('items/find', { query: { $skip: skip } })
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
