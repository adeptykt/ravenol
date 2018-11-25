<template>
  <v-dialog v-model="dialog" max-width="540px">
    <div class="service">
      <div class="dialog-action">
        <v-btn icon @click="dialog=false">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="dialog-header">
        <h1 class="title">Запись на сервис</h1>
      </div>
      <div class="dialog-container">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step>1" editable>Выберите услуги</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" editable>Выберите время</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" editable>Укажите...</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="service-form-n1">
                <div class="service-item-content">
                  <template v-for="(service, i) in services">
                    <Checkbox v-model="selected" :label="service.name" :value="service.value" :key="i" color='#ef9a20'></Checkbox>
                  </template>
                  <hr style="margin-right: 10px;">
                  <p>
                    Работы займут: <b><span class="mm-serv-form-ttw">{{total_time}}</span> мин.</b>
                  </p>
                </div>
              </div>
            </v-stepper-content>
            <v-stepper-content step="2">
              <div class="date-row">
                <div>
                  <v-date-picker v-model="date" locale="ru-ru" :min="mindate"></v-date-picker>
                </div>
                <div class="service-calendar-item">
                  <ul class="mm-serv-sh-time-n">
                    <template v-for="(time, t) in times">
                      <li data-vacant="Свободных мест: <b>1</b>" :key="t" v-bind:class="{selected: time.selected, busy: time.busy}" @click="calendar_click(day, time, t)">
                        {{time.time}}
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </v-stepper-content>
            <v-stepper-content step="3">
              <div class="service-f-b2">
                <div class="required">
                  <v-text-field v-model="name" label="Ваше имя" hide-details required></v-text-field>
                  <v-text-field v-model="phone" label="Ваш номер телефона" hide-details required mask="(###) ###-##-##"></v-text-field>
                </div>
                <v-autocomplete
                  :items="this.sharedState.vendor_list"
                  v-model="vendor"
                  flat
                  hide-no-data
                  hide-details
                  label="Марка"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-autocomplete
                  :items="this.sharedState.model_list"
                  v-model="model"
                  flat
                  hide-no-data
                  hide-details
                  label="Модель"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-autocomplete
                  :items="this.sharedState.generation_list"
                  v-model="generation"
                  flat
                  hide-no-data
                  hide-details
                  label="Поколение"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-textarea v-model="comment" label="Комментарий" rows=4></v-textarea>
                <div class="note">Поля, помеченные звездочкой (<span style="color: red">*</span>), обязательны к заполнению</div>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Checkbox from '~/components/Checkbox.vue'

export default {
  components: {
    Checkbox
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      dialog: false,
      sharedState: this.$store.state,
      step: "1",
      orders: [],
      total_time: 0,
      selected: [],
      services: [
        { name: 'Замена масла', value: 1, time: 30 },
        { name: 'Замена масла в АКПП (частичная)', value: 2, time: 30 },
        { name: 'Замена масла в АКПП (полная)', value: 3, time: 150 },
        { name: 'Замена масла в МКПП', value: 4, time: 30 },
        { name: 'Замена масла в ГУР', value: 5, time: 30 },
        { name: 'Промывка ДВС', value: 6, time: 30 },
        { name: 'Замена фильтров', value: 7, time: 30 },
        { name: 'Тормозная система', value: 8, time: 60 },
        { name: 'Охлаждающая жидкость', value: 9, time: 90 },
        { name: 'Аккумулятор', value: 10, time: 30 },
        { name: 'Свечи зажигания', value: 11, time: 30 },
      ],
      date: new Date().toISOString().substr(0, 10),
      times: [],
      name: "",
      phone: "",
      comment: "",
      vendor: "",
      model: "",
      generation: "",
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    },
    selected(val) {
      this.total_time = 0
      this.services.filter(s => this.selected.includes(s.value)).map(service => {
        this.total_time += service.time
      })
      // this.clear_calendar()
    },
    date(val) {
      this.fillTimes()
    },
    vendor(val) {
      this.$store.dispatch('get_models', { vendor: val, category_id: 1 })
    },
    model(val) {
      this.$store.dispatch('get_generations', val)
    }
  },
  created() {
    this.$store.dispatch('get_vendors', this.sharedState.category_list[0])
    this.mindate = this.picker_date(new Date)
    this.fillTimes()
  },
  methods: {
    fillTimes() {
      const current_date = new Date()
      const year = Number(this.date.substr(0, 4))
      const month = Number(this.date.substr(5, 2)) - 1
      const day = Number(this.date.substr(8, 2))
      let d = new Date(year, month, day, 9)
      let times = []

      for (var t = 0; t < 22; t++) {
        let busy = false
        if (d < current_date) busy = true
        else {
          const order = this.orders.find(order => {
            const local_date = new Date(d)
            if (new Date(order.startDate) <= local_date && new Date(order.endDate) > local_date) {
              console.log('orders find', local_date, new Date(order.startDate), order.endDate);
              return true
            }
            return false
          })
          if (order) busy = true
        }
        times.push({ time: this.local_time(d), busy, selected: false, index: t })
        d.setMinutes(d.getMinutes() + 30)
      }
      this.times = times
    },
    picker_date(date) {
      const two = (s) => { return ("0" + s).slice(-2) }
      var d = new Date(date)
      return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate())
    },
    local_time(date) {
      const two = (s) => { return ("0" + s).slice(-2) }
      var d = new Date(date)
      //d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
      return two(d.getHours()) + ":" + two(d.getMinutes())
      // + ":" + two(d.getSeconds())
    }
  }
}
</script>

<style>
.service {
  background-color: white;
  height: 100%;
}
.service .dialog-header {
  border-bottom: 1px solid #949494;
  padding: 15px;
  text-align: center;
}
.service .dialog-action .v-btn--icon {
  width: auto;
}
.service .dialog-action .v-btn {
  height: auto;
  display: inline-block;
  float: right;
}
.service .v-stepper {
  box-shadow: none;
}
.service .v-stepper__header {
  box-shadow: none;
  height: 54px;
}
.service .v-stepper__step {
  padding: 15px;
}
.service .v-stepper__content {
  padding: 0 15px 15px 15px;
}
.service-form-n1 {
  min-width: 207px;
  display: flex;
  justify-content: center;
}
.service-item-head {
  display: flex;
}
.service-item-head-mark {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background: #ef9a21;
  font-size: 20px;
  color: #fff;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  margin: 0 10px 0 0;
}
.service-item-head-ttl {
  display: inline-block;
  font-size: 19px;
  line-height: 35px;
}
.service-item-content {
}
.service-item-content hr {
  margin-top: 20px;
  margin-bottom: 20px;
}

.date-row {
  display: flex;
  flex-flow: row;
  justify-content: center;
}
.service-calendar-item {
  width: 94px;
  margin-right: 15px;
  display: block;
  margin: 0 20px;
}
.mm-serv-sh-time-n {
  padding: 0;
  margin: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  column-gap: 1px;
}
.mm-serv-sh-time-n li, .mm-serv-sh-time li {
  border: 3px solid #fff;
  background: #ffd69d;
  color: #000;
  font-size: 12px;
  width: 46px;
  height: 24px;
  line-height: 16px;
  text-align: center;
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;
}
.mm-serv-sh-time-n .busy {
  background: #eedede;
  color: #9e8888;
  cursor: default;
}
.mm-serv-sh-time-n .selected {
  background: #ef920f;
  color: #fff;
}
</style>
