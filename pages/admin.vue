<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-tabs v-model="model" centered color="transparent" slider-color="black">
        <v-tab
          v-for="(item, i) in items"
          :key="i"
          ripple
          v-bind:style="{ fontSize: '18px', textTransform: 'none', fontWiehgt: 400 }"
          v-on:click="getitems(i)"
        >
          {{ item.title }}
        </v-tab>
        <v-tab-item v-for="(item, i) in items" :key="i">
          <v-spacer></v-spacer>
          <v-card flat>
            <v-toolbar color="cyan" dark>
              <v-spacer></v-spacer>
              <v-toolbar-title>{{item.title}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat color="primary" @click="opendialog()">Add item</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list>
              <template v-for="(subitem, index) in subitems">
                <v-divider v-if="index>0" :key="index"></v-divider>

                <v-list-tile :key="subitem._id" avatar @click="openeditdialog(subitem._id)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{subitem.name}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click="removeitem(subitem._id)">
                      <v-icon color="grey lighten-1">delete_forever</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-card-text v-if="pages>1">
              <v-pagination v-model="page" :length="pages"></v-pagination>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
    <v-dialog v-model="adddialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          {{items[index].title}}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Наименование" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="saveitem()">Добавить</v-btn>
          <v-btn color="primary" flat @click="adddialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addoil" max-width="600px" persistent>
      <v-card class="oildialog">
        <v-card-text>
          <v-tabs centered color="transparent" slider-color="black">
            <v-tab v-for="tab in tabs" :key="tab">
              {{ tab }}
            </v-tab>
            <v-tab-item v-for="(tab, n) in tabs" :key="n">
              <div v-if="n==0">
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs7>
                      <v-text-field v-model="name" label="Наименование" required></v-text-field>
                    </v-flex>
                    <v-flex xs5>
                      <v-text-field v-model="product.type" label="Тип"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <!-- <v-layout row wrap>
                    <v-text-field v-model="product.price" label="Цена" type="number"></v-text-field>
                  </v-layout>
                  <v-layout row wrap>
                    <v-text-field v-model="product.image" label="Изображение" required></v-text-field>
                  </v-layout> -->
                  <v-layout row wrap>
                    <v-select
                      v-model="product.compositions"
                      :items="compositions"
                      attach
                      chips
                      label="Состав"
                      multiple
                    ></v-select>
                  </v-layout>
                  <v-layout row wrap>
                    <v-select v-model="product.vehicle" :items="vehicles" label="Тип техники" required>
                      <v-list-tile slot="prepend-item" ripple @click="vehicledialog=true">
                        <v-list-tile-title>Добавить тип техники</v-list-tile-title>
                      </v-list-tile>
                      <v-divider slot="prepend-item" class="mt-2"></v-divider>
                    </v-select>
                  </v-layout>
                  <v-layout row wrap>
                    <v-select v-model="product.viscosity" :items="viscosities" label="Вязкость" required></v-select>
                  </v-layout>
                  <v-layout row wrap>
                    <v-textarea v-model="product.description" label="Описание" required></v-textarea>
                  </v-layout>
                </v-container>
              </div>
              <div v-if="n==1">
                <QuillEditor v-model="product.text"></QuillEditor>
              </div>
              <div v-if="n==2">
                <v-toolbar>
                  <v-spacer></v-spacer>
                  <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat @click="addpackage">Добавить упаковку</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-container grid-list-md text-xs-center class="v-packages">
                  <template v-for="(pack, p) in packages">
                    <v-layout row wrap>
                      <v-flex xs3>
                        <v-text-field v-model="pack.article" label="Артикул" required></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field v-model="pack.package" label="Упаковка" required></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field v-model="pack.price" label="Цена" required></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field v-model="pack.image" label="Изображение" required></v-text-field>
                      </v-flex>
                      <v-flex xs1>
                        <v-btn icon @click="removepackage(p)">
                          <v-icon color="grey lighten-1">delete_forever</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </template>
                </v-container>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="saveitem()" type="submit">{{buttonname}}</v-btn>
          <v-btn color="primary" flat @click="addoil=false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="vehicledialog" max-width="500px" attach>
      <v-card>
        <v-card-title>Добавление типа техники</v-card-title>
        <v-card-text>
          <v-text-field v-model="vehiclename" label="Тип техники" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="addvehicle()">Добавить</v-btn>
          <v-btn color="primary" flat @click="vehicledialog">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import QuillEditor from '~/components/QuillEditor.vue'
  export default {
    components: {
      QuillEditor
    },
    data () {
      return {
        // dialog parameters
        id: 0,
        name: '',
        product: {},
        vehiclename: '',
        packages: [],
        tabs: ['Основное', 'Текст', 'Упаковки', 'Характеристики'],
        buttonname: 'Добавить',
        // other
        model: 'tab-0',
        subitems: [],
        vehicles: [],
        page: 1,
        limit: 10,
        pages: 1,
        total: 0,
        index: 0,
        items: [
          { title: 'Масла', service: 'items' },
          { title: 'Категории', service: 'categories' },
          { title: 'Вязкость', service: 'viscosities' },
        ],
        adddialog: false,
        addoil: false,
        vehicledialog: false,
        compositions: [
          { text: 'Синтетика' },
          { text: 'Полусинтетика' },
          { text: 'Минеральный' },
          { text: 'ПАО масла (PAO, полиальфаолефины)' }
        ],
        viscosities: []
      }
    },
    created() {
      this.getitems(0)
    },
    computed: {
      // categories () { return [] }
    },
    watch: {
      page(newPage) {
        this.getitems()
      }
    },
    methods: {
      addpackage() {
        this.packages.push({ article: '', package: '', price: 0 })
      },
      removepackage(index) {
        console.log('removepackage', index, typeof(index));
        this.packages.splice(index, 1)
      },
      addvehicle() {
        this.vehicledialog = false
        this.vehicles.push({ text: this.vehiclename })
        this.vehicle = this.vehiclename
      },
      getviscosities() {
        this.$store.dispatch('viscosities/find', { query: { $limit: null } })
          .then(res => {
            this.viscosities = res.data.map(item => { return { value: item._id, text: item.name } } )
          })
      },
      getvehicles() {
        this.$store.dispatch('vehicles/find', { query: {} }).then(res => {
          console.log('vehicles', res);
          this.vehicles = res.map(v => v._id)
          console.log('vehicles', this.vehicles);
        })
      },
      opendialog() {
        if (this.service === 'items') {
          this.dialogmode = 'create'
          this.buttonname = 'Добавить'
          this.addoil = true
          this.getviscosities()
          this.getvehicles()
          this.name = ''
          this.product = {}
        }
        else this.adddialog = true
      },
      openeditdialog(id) {
        this.addoil = true
        this.dialogmode = 'edit'
        this.buttonname = 'Записать'
        this.getviscosities()
        this.getvehicles()
        this.$store.dispatch('items/get', id).then(res => {
          console.log('openeditdialog', res);
          this.name = res.name
          this.id = res._id
          Object.assign(this.product, res)
          this.packages = res.packages || []
          console.log('packages', this.packages);
        })
      },
      getitems(index) {
        if (typeof(index) == "number") {
          this.service = this.items[index].service
          this.index = index
          this.page = 1
        } else {
          index = this.current
        }
        const skip = (this.page - 1) * this.limit
        this.$store.dispatch(this.service + '/find', { query: { $skip: skip } })
          .then(response => {
            this.subitems = response.data
            this.limit = response.limit
            this.total = response.total
            this.pages = Math.ceil(this.total / this.limit)
          })
      },
      saveitem() {
        let object = { name: this.name }
        this.name = ''
        if (this.service === "items") {
          this.addoil = false
          delete this.product.packages
          // Object.assign(object, this.product, { '$set': { packages: this.packages } })
          Object.assign(object, this.product, { packages: this.packages })
          console.log('saveitem', object);
        } else {
          this.adddialog = false
        }

        if (this.dialogmode === 'edit') {
          this.$store.dispatch(this.service + '/update', [this.id, object]).then(() => this.getitems())
        } else {
          this.$store.dispatch(this.service + '/create', object).then(() => {
            this.total++
            this.pages = Math.ceil(this.total / this.limit)
            this.page = this.pages
            this.getitems()
          })
        }
      },
      removeitem(id) {
        this.$store.dispatch(this.service + '/remove', id).then(() => this.getitems())
      }
    }
  }
</script>

<style>
.oildialog {
  height: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
.html-element {
  overflow: auto;
  flex-direction: column;
  height: 464px;
}
.html-element div {
  margin-bottom: 16px;
}
.html-element h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: 700;
  color: #007acc;
}
.v-packages {
  padding: 10px;
}
</style>
