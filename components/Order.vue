<template>
  <div class="order" v-bind:class="{ order_opened }">
    <a href="#" class="order__caption" @click.prevent="order_opened=!order_opened">
      <div class="order__title">Показать содержание заказа</div>
      <div class="order__summ">{{total}}&nbsp;&#8381;</div>
      <span class="order__arrow icon icon_arrow_down">
        <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_down"></use></svg>
      </span>
    </a>
    <div class="order__content">
      <div class="r-items">
        <div class="r-r-items__row r-items__row_header">
          <div class="r-items__goods">Товар</div>
          <div class="r-items__actions">
            <div class="r-items__cell r-items__cell_price">
              Цена
            </div>
            <div class="r-items__cell r-items__cell_number">
              Количество
            </div>
            <div class="r-items__cell r-items__cell_summ">
              Стоимость
            </div>
          </div>
        </div>
        <div class="r-items__row" v-for="(row, i) in rows">
          <nuxt-link :to="'/products/' + row._id" class="r-items__product">
            <div class="r-items__pic"><img :src="image_prefix + row.image" class="r-items__img"></div>
            <div class="r-items__base">
              <div class="r-items__title">
                {{row.title}}
              </div>
              <div class="r-items__info">
                <span class="r-items__value">{{row.volume}}</span>
                <span class="r-items__value">{{row.article}}</span>
              </div>
            </div>
          </nuxt-link>
          <div class="r-items__actions">
            <div class="r-items__cell r-items__cell_price">
              <div class="r-items__price">
                {{row.price.rub()}}
              </div>
            </div>
            <div class="r-items__cell r-items__cell_number">
              <span class="r-items__number">{{row.quantity}}</span>
            </div>
            <div class="r-items__cell r-items__cell_summ">
              {{row.total.rub()}}
            </div>
          </div>
        </div>
        <div class="r-items__line">
          <div class="r-items__result"><span class="r-items__caption">Стоимость товаров:</span><span class="r-items__summ">{{total.rub()}}</span></div>
          <!---->
          <div class="r-items__result"><span class="r-items__caption">Доставка:</span><span class="r-items__summ">{{delivery.rub()}}</span></div>
        </div>
        <div class="r-items__line">
          <div class="r-items__result"><span class="r-items__caption">Итоговая стоимость:</span><span class="r-items__summ r-items__summ_big">{{sum.rub()}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rows: [],
      order_opened: false
    }
  },
  computed: {
    delivery() {
      return 0
    },
    total() {
      return this.rows.reduce((s, i) => { return s + i.total }, 0)
    },
    sum() {
      return this.delivery + this.total
    },
    image_prefix() {
      return process.env.IMAGE_PREFIX
    },
  },
  async mounted() {
    const order = this.$store.state.order
    order.items = []
    order.total = 0
    const id_list = await this.$store.state.cart.list.map(e => e.id)
    let query = { $skip: 0, $limit: null, _id: { $in: id_list } }
    const items = await this.$store.dispatch('items/find', { query }).then(res => res.data )
    this.rows = this.$store.state.cart.list.reduce((rows, cart_item) => {
      try {
        const item = items.find(item => item._id === cart_item.id)
        const row = { _id: cart_item.id, title: '<Товар не найден>', quantity: cart_item.quantity, price: 0 }
        if (item) {
          Object.assign(row, { title: item.name, price: item.price, article: item.article, image: item.image })
          order.items.push({ _id: item._id, sku: row.sku, quantity: row.quantity, price: row.price })
          order.total += row.price * row.quantity
        }
        rows.push({ ...row, total: row.price * row.quantity })
      } catch {
      }
      return rows
    }, [])
  },
}
</script>
