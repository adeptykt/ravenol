<template>
  <Account>
    <div class="settings__base">
      <form action="" class="form form_media_sm">
        <div class="form__row">
          <div class="form__grid form__grid_2">
            <div class="form__cell">
              <div class="form__control">
                <input type="number" placeholder="Номер заказа" class="form__input form__input_search" v-model.number="number">
                <span class="form__submit">
                  <span class="icon icon_search">
                    <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#search"></use></svg>
                  </span>
                </span>
              </div>
            </div>
            <div class="form__cell">
              <div class="form__control datepicker">
                <input type="text" placeholder="Выбрать дату" data-input="" class="form__input datepicker__input form-control input flatpickr-input" readonly="readonly">
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="history">
        <div class="history__caption history__caption_top">
          <div class="history__cell history__cell_order">
            Номер заказа
          </div>
          <div class="history__cell history__cell_summ">
            Стоимость
          </div>
          <div class="history__cell history__cell_state">
            Статус
          </div>
        </div>
        <div class="history__container" v-for="(order, i) in orders" :key="i">
          <history-item :order="order"/>
        </div>
      </div>
    </div>
  </Account>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Account from '~/components/Account.vue'
import HistoryItem from '~/components/HistoryItem.vue'

export default {
  head () {
    return {
      title: 'История заказов',
    }
  },
  components: { Account, HistoryItem },
  data () {
    return {
      number: 0
    }
  },
  computed: {
    ...mapGetters('orders', { findOrdersInStore: 'find' }),
    orders() {
      const query = { $limit: 20, $sort: { date: -1 } }
      const user = this.$store.state.auth.user
      if (user) query.userId = user._id
      if (this.number > 0) query.number = this.number
      console.log('query', query);
      return user ? this.findOrdersInStore({ query }).data : []
    },
  },
  created() {
    this.findOrders()
  },
  methods: {
    ...mapActions('orders', {
      findOrders: 'find'
    })
  }
}
</script>
