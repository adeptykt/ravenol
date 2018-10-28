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
        // this.$router.push({ path: 'products', query: { page: this.val } })
        // this.$router.push({ name: 'products', params: { val } })
        // this.$router.push({ name: `/products?page=${val}` })
        // console.log('go');
        this.getitems()
      },
      // _page(val) {
      //   this.getitems()
      // },
      '$route' (to, from) {
        this.page = to.query.page || 1
        // console.log('route', to);
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
        const skip = (this.page - 1) * this.limit
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
