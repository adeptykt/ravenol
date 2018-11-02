<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>Перечень продукции Ravenol</h1>
      <v-card flat>
        <v-list three-line>
          <style scoped>
          .v-list--three-line .v-list__tile {
            height: 150px;
          }
          </style>
          <template v-for="(item, i) in items">
            <v-divider v-if="i > 0" :key="i"></v-divider>
            <v-list-tile :key="item.id" avatar @click="opendialog(item._id)">
              <v-list-tile-avatar size=80>
                <img :src="item.image">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="v-list_product_subtitle">{{item.type}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-card-text v-if="pages>1">
          <v-pagination v-model="page" :length="pages"></v-pagination>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [],
        page: 1,
        _page: 1,
        limit: 10,
        pages: 1,
        total: 0,
      }
    },
    created() {
      this.getitems()
    },
    watch: {
      page(val) {
        this.getitems()
      },
      '$route.query' (to, from) {
        // this.page = to.query.page || 1
        console.log('route', to);
      }
    },
    methods: {
      beforeRouteUpdate (to, from, next) {
        console.log(beforeRouteUpdate);
      },
      async asyncData ({query}) {
        console.log(query);
      },
      opendialog(id) {
        this.$store.state.visible = true
        this.$store.state.id = id
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
<style scoped>
.v-avatar img {
  width: 80px;
  height: 80px;
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
    min-width: 156px;
}
</style>
