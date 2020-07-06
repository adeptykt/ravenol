<template>
  <div class="box">
    <div class="top top_flex hidden-print">
      <h1 class="top__base title">Корзина</h1>
      <div class="top__side">
        <!-- <a href="#" class="btn btn_type_grey btn_size_min">
          <span class="btn__icon icon icon_plus_xsmall"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg></span>
          <span class="btn__text">Добавить товары по артикулу</span>
        </a> -->
      </div>
    </div>
    <div class="items items_cart-mid" v-if="rows.length">
      <div class="items__row items__row_header">
        <div class="items__wrap">
          <div class="items__goods">Товар</div>
          <div class="items__info">
            <div class="items__cell items__cell_value">
              Объем
            </div>
            <div class="items__cell items__cell_sku">
              Артикул
            </div>
          </div>
        </div>
        <div class="items__actions">
          <div class="items__cell items__cell_price">
            Цена
          </div>
          <div class="items__cell items__cell_number">
            Количество
          </div>
          <div class="items__cell items__cell_summ">
            Стоимость
          </div>
          <div class="items__cell items__cell_delete hidden-print"></div>
        </div>
      </div>
      <template v-for="(row, i) in rows">
        <div class="items__row" :key="i">
          <div class="items__wrap">
            <nuxt-link :to="'/products/' + row._id" class="items__product">
              <div class="items__pic"><img :src="image_prefix + row.image" class="items__img"></div>
              <div class="items__base">
                <div class="items__title">
                  {{row.title}}
                </div>
                <div class="items__features">
                </div>
              </div>
            </nuxt-link>
            <div class="items__info">
              <div class="items__cell items__cell_value">
                {{row.volume}}
              </div>
              <div class="items__cell items__cell_sku">
                {{row.article}}
              </div>
            </div>
          </div>
          <div class="items__actions">
            <div class="items__cell items__cell_price">
              <div class="items__price">{{row.price}}&nbsp;&#8381;</div>
            </div>
            <div class="items__cell items__cell_number">
              <div class="items__counter counter">
                <div class="counter__btn counter__btn_minus hidden-print" @click="decrease(row)">-</div>
                <input type="tel" v-model="row.quantity" class="counter__number" :ref="'cartinput'+row._id" @input="oninput(row)">
                <div class="counter__btn counter__btn_plus hidden-print" @click="increase(row)">+</div>
              </div>
            </div>
            <div class="items__cell items__cell_summ">
              {{row.total}}&nbsp;&#8381;
            </div>
            <div class="items__cell items__cell_delete hidden-print">
              <a href="#" class="items__delete" @click.prevent="deleteitem(row)">
                <span class="icon icon_cart_delete"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart_delete"></use></svg></span>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="result" v-if="rows.length">
      <div class="result__base hidden-print">
        <!-- <div class="print">
          <a href="#" class="print__link">
            <span class="print__icon icon icon_print"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#print"></use></svg></span>
            <div class="print__text">Распечатать список товаров</div>
          </a>
        </div> -->
      </div>
      <div class="result__side">
        <div class="result__btn hidden-print">
          <nuxt-link to="/cart/order/contacts" class="btn btn_type_flat btn_size_big">Оформить заказ</nuxt-link>
        </div>
        <div class="result__text">
          Итого: {{total}}&nbsp;&#8381;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Корзина - Indexol',
    }
  },
  data () {
    return {
      rows: []
    }
  },
  computed: {
    total() {
      return this.rows.reduce((s, i) => { return s + i.total }, 0)
    },
    image_prefix() {
      return process.env.IMAGE_PREFIX
    },
  },
  async mounted() {
    const id_list = await this.$store.state.cart.list.map(e => e.id)
    let query = { $skip: 0, $limit: null, _id: { $in: id_list } }
    const items = await this.$store.dispatch('items/find', { query }, { paginate: false }).then(res => res.data )
    this.rows = this.$store.state.cart.list.reduce((rows, cart_item) => {
      const item = items.find(item => item._id === cart_item.id)
      const row = { _id: cart_item.id, title: '<Товар не найден>', quantity: cart_item.quantity, price: 0 }
      if (item) {
        Object.assign(row, { title: item.name, price: item.price, article: item.article, image: item.image })
      }
      rows.push({ ...row, total: row.price * row.quantity })
      return rows
    }, [])
  },
  methods: {
    updateitem(item) {
      item.total = item.quantity * item.price
      this.$refs['cartinput' + item._id][0].value = item.quantity
      this.$store.commit('cart/add', item)
      this.rows.splice(this.rows.indexOf(item), 1, item)
    },
    deleteitem(item) {
      this.$store.commit('cart/delete', item._id)
      this.rows.splice(this.rows.indexOf(item), 1)
    },
    oninput(item) {
      item.quantity = parseInt(item.quantity)
      this.updateitem(item)
    },
    increase(item, a) {
      item.quantity++
      this.updateitem(item)
    },
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--
        this.updateitem(item)
      }
    },
  }
}
</script>

<style>
.icon_plus_xsmall {
  width: 10px;
  height: 10px;
}
.btn__icon {
  transform: translateY(-1px);
  vertical-align: middle!important;
}
.items__row_header {
  border-top: none;
  padding-top: 0;
  padding-bottom: 18px;
}
.items__wrap {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.items__product {
  display: flex;
  flex: 1;
  text-decoration: none;
  color: #000;
  padding-right: 10px;
}
.items__product:hover .items__title {
  color: #666;
}
.items__goods {
  flex: 1;
  color: #999;
  font-size: 14px;
}
.items__info {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.items__cell {
  word-wrap: break-word;
  font-size: 16px;
  padding-left: 20px;
}
.items__cell_value {
  min-width: 66px;
  font-size: 14px;
}
.items__cell_sku {
  min-width: 110px;
  font-size: 14px;
}
.items__cell_price {
  min-width: 78px;
}
.items__cell_number {
  min-width: 94px;
}
.items__cell_summ {
  min-width: 86px;
  padding-left: 25px;
}
.items__cell_delete {
  min-width: 27px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.items__row_header .items__cell {
  color: #999;
  font-size: 14px;
}
.items__cell:first-child {
  padding-left: 0;
}
.items__actions {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.items__product {
  display: flex;
  flex: 1;
  text-decoration: none;
  color: #000;
  padding-right: 10px;
}
.items__pic {
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 15px;
}
.items__img {
  max-width: 100%;
  max-height: 100%;
  color: #999;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0;
}
.items__base {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.items__title {
  flex: 1;
  text-transform: uppercase;
  font-size: 16px;
  line-height: 22px;
  transition: color .25s ease;
  box-sizing: border-box;
  padding-right: 10px;
}
.items__features {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 25px;
  margin-top: 5px;
}
.items__counter {
  width: 93px;
}
.items__delete {
  text-decoration: none;
  color: #000;
  padding: 2px;
  display: block;
}
.result {
  margin-top: 45px;
  display: flex;
  align-items: center;
}
.result__base {
  flex: 1;
}
.print {
  justify-content: flex-start;
}
.print, .print__link {
  display: flex;
}
.print__link {
  text-decoration: none;
  color: #000;
}
.icon_print {
  width: 24px;
  height: 19px;
}
.print__icon {
  margin-right: 6px;
}
.icon_print .icon__item {
  fill: #000;
}
.print__text {
  font-size: 16px;
  line-height: 22px;
  color: #000;
  transition: color .25s ease;
}
.result__side {
  display: flex;
  align-items: center;
  padding-left: 40px;
}
.result__text {
  font-size: 24px;
  white-space: nowrap;
  min-width: 214px;
  margin-left: 38px;
}
@media (max-width: 1279px) {
  .items__features {
    margin-top: 10px;
    padding-left: 0;
    width: 100%;
  }
}
@media (max-width: 1023px) {
  .items__row {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .items__row_header {
    display: none;
  }
  .items__info {
    width: 100%;
    margin-top: 10px;
    padding-left: 0;
  }
  .items__cell_value {
    width: auto;
  }
  .items__cell_sku {
    width: auto;
    padding-left: 12px;
  }
}
@media (max-width: 840px) {
  .items__row {
    display: block;
  }
  .items__row_header {
    display: none;
  }
  .items__wrap {
    flex-direction: column;
    align-items: stretch;
  }
  .items_cart-big .items__cell, .items_cart-mid .items__cell {
    padding-left: 13px;
  }
  .items_cart-big .items__cell:first-child, .items_cart-mid .items__cell:first-child {
    padding-left: 0;
  }
  .items__actions {
    padding-left: 0;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  .items_cart-big .items__cell_price, .items_cart-mid .items__cell_price {
    box-sizing: border-box;
    padding-left: 0;
    padding-right: 5px;
    width: 85px;
    font-size: 15px;
  }
  .items_cart-big .items__cell:first-child, .items_cart-mid .items__cell:first-child {
    padding-left: 0;
  }
  .items_cart-big .items__cell_number, .items_cart-mid .items__cell_number {
    width: auto;
    padding-left: 0;
  }
  .items_cart-big .items__cell_summ, .items_cart-mid .items__cell_summ {
    width: 73px;
    font-size: 15px;
  }
  .items_cart-big .items__cell_delete, .items_cart-mid .items__cell_delete {
    padding-left: 8px;
  }
  .items__product {
    padding-right: 0;
  }
  .items__base {
    display: block;
  }
  .items__title {
    padding-right: 0;
  }
  .result {
    margin-top: 30px;
    flex-direction: column;
    align-items: flex-start;
  }
  .result__side {
    margin-top: 24px;
    padding-left: 0;
    align-self: flex-end;
  }
}
@media (max-width: 480px) {
  .result__side {
    align-items: flex-start;
    align-self: flex-start;
    flex-direction: column-reverse;
  }
  .result__btn {
    margin-top: 25px;
  }
  .result__text {
    margin-left: 0;
  }
}
</style>
