<template>
  <div class="service-container">
    <h2><span>Запись на сервис</span></h2>
    <div class="service-content">
      <div class="service-form">
        <div class="service-form-n1">
          <div class="service-f-t">
            <div class="service-f-t-mark">
              1
            </div>
            <div class="service-f-t-ttl">
              Выберите услуги
            </div>
          </div>
          <div class="service-f-b">
            <template v-for="(service, i) in services">
              <Checkbox v-model="selected" :label="service.name" :value="service.value" :key="i" color='#ef9a20'></Checkbox>
            </template>
            <hr style="margin-right: 10px;">
            <p>
        			Работы займут: <b><span class="mm-serv-form-ttw">{{total_time}}</span> мин.</b>
      			</p>
          </div>
        </div>
        <div class="service-form-n2">
          <div class="service-f-t">
            <div class="service-f-t-mark">
              2
            </div>
            <div class="service-f-t-ttl">
              Выберите дату и время
            </div>
          </div>
          <div class="service-calendar">
            <template v-for="(day, d) in daytimes">
              <div class="service-calendar-item" :key=d>
                <h5 class="mm-serv-sh-ttl">{{day.date}}<br><span>({{day.dayweek}})</span></h5>
                <ul class="mm-serv-sh-time-n">
                  <template v-for="(time, t) in day.times">
                    <li data-vacant="Свободных мест: <b>1</b>" :key="t" v-bind:class="{selected: time.selected, busy: time.busy}" @click="calendar_click(day, time, t)">
                      {{time.time}}
                    </li>
                  </template>
                </ul>
              </div>
            </template>
          </div>
        </div>
        <div class="service-form-n3">
          <div class="service-f-t">
            <div class="service-f-t-mark">
              3
            </div>
            <div class="service-f-t-ttl">
              Укажите...
            </div>
          </div>
          <div class="service-f-b2">
            <div class="required">
              <v-text-field v-model="name" label="Ваше имя" required></v-text-field>
              <v-text-field v-model="phone" label="Ваш номер телефона" required mask="(###) ###-##-##"></v-text-field>
            </div>
            <!-- <v-select v-model="vendor" :items="this.sharedState.vendor_list" label="Марка" item-text="name" return-object></v-select> -->
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
            <!-- <v-select v-model="model" :items="this.sharedState.model_list" label="Модель" item-text="name" return-object></v-select> -->
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
        </div>
      </div>
      <div class="mm-serv-btn">
        <input type="submit" name="iblock_submit" class="mm-serv-submit" value="Подтвердить" @click="order_click()">
        <div class="fz-msg mtop10 text-right">
          Нажимая на кнопку "Записаться", вы даете согласие на обработку своих <a href="/personal" target="_blank">персональных данных</a>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="dialog_error">
          <div class="swal2-icon"><v-icon size=80 color="#f27474">error_outline</v-icon></div>
          <h1>Ошибка</h1>
          <template v-for="(error) in errors">
            <h4>{{error}}</h4>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Checkbox from '~/components/Checkbox.vue'

export default {
  components: {
    Checkbox
  },
  data () {
    return {
      sharedState: this.$store.state,
      dialog: false,
      errors: "",
      name: "",
      phone: "",
      comment: "",
      vendor: "",
      model: "",
      generation: "",
      selected: [],
      total_time: 0,
      daytimes: [],
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
    }
  },
  watch: {
    selected(val) {
      this.total_time = 0
      this.services.filter(s => this.selected.includes(s.value)).map(service => {
        this.total_time += service.time
      })
      this.clear_calendar()
    },
    vendor(val) {
      this.$store.dispatch('get_models', { vendor: val, category_id: 1 })
    },
    model(val) {
      this.$store.dispatch('get_generations', val)
    }
  },
  created() {
    this.fill_daytimes()
    // this.$store.dispatch('get_vendors', this.sharedState.category_list[0])
  },
  methods: {
    async fill_daytimes() {
      const res = await this.$store.dispatch('orders/find', { query: { startDate: { $gt: new Date() }, $or: [{ status: 0 }, { status: 10 }] } })
      this.orders = res.data

      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
      const current_date = new Date()
      let d = new Date()
      if (current_date.getHours() > 19 || (current_date.getHours() == 19 && current_date.getMinutes() >= 30)) d.setDate(d.getDate() + 1)
      this.daytimes = []

      for (var i = 0; i < 4; i++) {
        d.setHours(9)
        d.setMinutes(0)
        d.setSeconds(0)
        const date = this.local_date(d)
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
          times.push({ time: this.local_time(d), busy, selected: false, index: t, date: new Date(d) })
          d.setMinutes(d.getMinutes() + 30)
        }
        this.daytimes.push({ date, dayweek: days[d.getDay()], times })
        d.setDate(d.getDate() + 1)
      }
    },
    order_click() {
      this.errors = []
      if (!this.selected.length) {
        this.dialog = true
        this.errors.push("Не выбрана ни одна услуга")
      }
      let times = [], startDate, endDate
      this.daytimes.map(day => day.times.map(time => {
        if (time.selected) {
          if (!startDate) startDate = time.date
          endDate = new Date(new Date(time.date).setMinutes(time.date.getMinutes() + 30))
          times.push(time.date)
        }
      }))
      if (!startDate) {
        this.dialog = true
        this.errors.push("Не выбрано время записи")
      }
      if (!this.name) {
        this.dialog = true
        this.errors.push("Не указано имя")
      }
      if (!this.phone) {
        this.dialog = true
        this.errors.push("Не указан телефон")
      }
      if (!this.dialog) {
        let services = this.services.filter(s => this.selected.includes(s.value)).map(service => { return { _id: service.value, price: 100 } })
        const query = { name: this.name, phone: this.phone, startDate, endDate, services }
        this.$store.dispatch('orders/create', query)
        this.selected = []
        this.fill_daytimes()
      }
    },
    calendar_click(day, time, index) {
      if (time.busy) return
      if (!this.selected.length) {
        this.dialog = true
        this.errors = ["Выберите хотя бы одну услугу"]
      }
      else {
        this.clear_calendar()
        let num_times = this.total_time / 30
        for (var t = index; t < day.times.length; t++) {
          if (day.times[t].busy || num_times == 0) break
          if (num_times > 0) {
            day.times[t].selected = true
            num_times--
          }
        }
        if (num_times > 0) {
          this.dialog = true
          this.errors = ["Выберите другое время для записи"]
          this.clear_calendar()
        }
      }
    },
    clear_calendar() {
      this.daytimes = this.daytimes.map(day => {
        day.times = day.times.map(time => {
          time.selected = false
          return time
        })
        return day
      })
    },
    full_date(date) {
      const two = (s) => { return ("0" + s).slice(-2) }
      var d = new Date(date)
      return two(d.getDate()) + "." + two(d.getMonth() + 1) + "." + two(d.getFullYear()) + " " + two(d.getHours()) + ":" + two(d.getMinutes()) + ":" + two(d.getSeconds())
    },
    local_date(date) {
      const two = (s) => { return ("0" + s).slice(-2) }
      var d = new Date(date)
      return two(d.getDate()) + "." + two(d.getMonth() + 1) + "." + two(d.getFullYear())// + " " + two(d.getHours()) + ":" + two(d.getMinutes()) + ":" + two(d.getSeconds())
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
.service-container h2 {
  text-align: center;
  font-size: 22px;
  color: #667788;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  /* margin-right: auto;
  margin-left: auto;
  line-height: 23px; */
  font-family: "Exo 2", Arial, sans-serif;
  font-weight: 300;
  margin-top: 20px;
}
.service-container h2 > span:before, .service-container h2 > span:after {
  content: '';
  position: absolute;
  width: 100%;
  border-top: 1px solid #cdd5dd;
  margin-top: .6em;
}
.service-container h2 > span:before {
  margin-left: -102%;
}
.service-container h2 > span:after {
  margin-left: 2%;
}
.service-content {
}
.service-form {
  display: flex;
  flex-flow: row wrap;
  margin: 30px 0 0 0;
}

.service-form-n1 {
  /* width: 28%; */
  /* flex: 0.28; */
  min-width: 207px;
  flex: 1;
}
.service-f-t {
  width: 100%;
  display: flex;
}
.service-f-t-mark {
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
.service-f-t-ttl {
  display: inline-block;
  font-size: 19px;
  line-height: 35px;
}
.service-f-b {
  margin-top: 25px;
  width: 100%;
}
.service-f-b hr {
  margin-top: 20px;
  margin-bottom: 20px;
}

.service-form-n2 {
  /* width: 47%; */
  /* flex: 0.47; */
  min-width: 436px;
  flex: 1;
}
.service-calendar {
  display: flex;
  flex-flow: row;
  padding-top: 10px;
  padding-bottom: 15px;
}
.service-calendar li {
  background: #ef920f;
  color: #fff;
  cursor: pointer;
}
.service-calendar .busy {
  background: #eedede;
  color: #9e8888;
  cursor: default;
}
.service-calendar .selected {
  background: #ef920f;
  color: #fff;
}
.service-calendar-item {
  width: 94px;
  margin-right: 15px;
  display: block;
}
.mm-serv-sh-ttl {
  font-size: 16px;
  text-align: center;
  line-height: 14px;
  margin: 10px 0px
}
.mm-serv-sh-ttl span {
  font-size: 10px;
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

.service-form-n3 {
  /* width: 25%; */
  /* flex: 0.25; */
  min-width: 185px;
  max-width: 436px;
  flex: 1;
}
.service-f-b2 input[type="text"], .service-f-b2 label, .service-f-b2 .v-select__selection, .service-f-b2 textarea {
  font-size: 14px;
  line-height: 14px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.service-f-b2 .v-messages {
  height: 6px;
  display: none;
}
.required label:after {
  color: red;
  content: " *";
}
.service-f-b2 .note {
  font-size: 10px;
}

.mm-serv-btn {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    margin-top: 10px;
}
.mm-serv-submit {
  font-size: 16px;
  color: #fff;
  background: #ef9a21;
  text-align: center;
  padding: 12px 25px;
  border-radius: 5px;
  border: none;
}
.fz-msg {
  font-size: 10px;
  font-style: italic;
  color: #000;
}
.mtop10 {
  margin-top: 10px;
}
.text-right {
  text-align: right;
}

.dialog_error {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.dialog_error .swal2-icon {
  margin: 20px auto 30px;
}
.dialog_error .v-icon {
  font-size: 72px;
}

.service-f-b .v-input__control .v-icon {
  font-size: 16px;
}
.service-f-b div.accent--text {
  color: #ef9a21;
}
.service-f-b .v-input__control label {
  font-size: 14px;
  color: black;
}
.service-f-b .v-input {
  margin-top: 0;
  padding-top: 0;
}
.service-f-b .v-input--selection-controls .v-input__slot {
  margin-bottom: 0;
}
.service-f-b .v-input--selection-controls__input {
  height: 21px;
  margin-right: 0;
}
</style>
