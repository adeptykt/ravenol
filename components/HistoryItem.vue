<template>
  <div class="history__item" v-bind:class="{ history__item_opened }" v-if="order">
    <a href="#" class="history__caption history__caption_item" @click.prevent="history__item_opened = !history__item_opened">
      <div class="history__cell history__cell_order">
        <span class="history__arrow icon icon_dropdown">
          <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#dropdown"></use></svg>
        </span>
        <div class="history__number">№ {{order && order.number}}</div>
        <time class="history__date">{{order.date.toLocalLong()}}</time>
      </div>
      <div class="history__cell history__cell_summ">
        <div class="history__price">
          {{items_count}} {{declOfNum(items_count, ["товар", "товара", "товаров"])}}
          <br> на сумму {{order.total.rub()}} р.
        </div>
      </div>
      <div class="history__cell history__cell_state">
        <div class="state state_process">
          {{ statuses[order.status] }}
        </div>
      </div>
    </a>
    <div class="history__content">
      <div class="history__table">
        <div class="board mb mb_mid">
          <div class="board__table">
            <!---->
            <div class="board__row">
              <div class="board__cell board__cell_th">
                Доставка
              </div>
              <div class="board__cell">
                Самовывоз
              </div>
            </div>
            <!---->
            <div class="board__row">
              <div class="board__cell board__cell_th">
                Контактный телефон
              </div>
              <div class="board__cell"><a href="#" class="board__link link">{{phone}}</a> ({{order.name}})</div>
            </div>
          </div>
          <div class="board__buttons">
            <!-- <div class="board__btn"><a href="#" class="btn btn_type_flat btn_size_min">Повторить заказ</a></div> -->
            <!-- <div class="board__btn"><a href="https://drops.by/api/user/orders/308/pdf?api_token=W6AHljVloQW7mMEmvY5iZsmrGj4f1Mjy" class="btn btn_type_grey btn_size_min">Скачать счет</a></div> -->
          </div>
        </div>
      </div>
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
          <div class="r-items__row" v-for="(row, i) in order.items">
            <nuxt-link :to="'/products/' + row._id" class="r-items__product">
              <div class="r-items__pic"><img :src="image(row)" class="r-items__img"></div>
              <div class="r-items__base">
                <div class="r-items__title">
                  {{row.item.name}}
                </div>
                <div class="r-items__info">
                  <span class="r-items__value">{{row.volume}}</span>
                  <span class="r-items__value">{{row.sku}}</span>
                </div>
              </div>
            </nuxt-link>
            <div class="r-items__actions">
              <div class="r-items__cell r-items__cell_price">
                <div class="r-items__price">
                  {{row.price}}&nbsp;&#8381;
                </div>
              </div>
              <div class="r-items__cell r-items__cell_number">
                <span class="r-items__number">{{row.count}}</span>
              </div>
              <div class="r-items__cell r-items__cell_summ">
                {{row.price * row.count}}&nbsp;&#8381;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: { _id: 1 }
  },
  data (vm) {
    return {
      history__item_opened: false,
      statuses: {
        0: 'В обработке',
        10: 'Сборка',
      },
      rows: []
    }
  },
  computed: {
    image_prefix() {
      return process.env.IMAGE_PREFIX
    },
    items_count() {
      return this.order.items.reduce((s, i) => { return s + i.count }, 0)
    },
    phone() {
      const phone = this.order.phone
      return '+7 (' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 2) + '-' + phone.substr(8, 2)
    }
  },
  mounted() {
    console.log(this.order);
  },
  methods: {
    image(row) {
      if (row.item && row.item.image && row.item.image.length > 0) return process.env.IMAGE_PREFIX + row.item.image
      return process.env.IMAGE_PREFIX + "noimage.jpg"
    },
    declOfNum(n, titles) {
      return titles[(n%10===1 && n%100!==11) ? 0 : (n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)]
    },
    onclick() {
      this.checked = !this.checked
    }
  }
}
</script>

<style>
</style>
