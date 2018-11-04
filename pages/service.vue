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
              <v-checkbox hide-details v-model="selected" :label="service.name" :value="service.value" :key="i"></v-checkbox>
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
            <v-select v-model="vendor" :items="this.sharedState.vendors" label="Марка" item-text="name" return-object></v-select>
            <v-select v-model="model" :items="this.sharedState.model_list" label="Модель" item-text="name" return-object></v-select>
            <v-textarea v-model="comment" label="Комментарий" rows=4></v-textarea>
            <div class="note">Поля, помеченные звездочкой (<span style="color: red">*</span>), обязательны к заполнению</div>
          </div>
        </div>
      </div>
      <div class="mm-serv-btn">
    		<input type="submit" name="iblock_submit" class="mm-serv-submit" value="Записаться" @click="order_click()">
        <div class="fz-msg fs10 clr-000 mtop10 text-right">
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
export default {
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
      selected: [],
      total_time: 0,
      daytimes: [],
      services: [
        { name: 'Замена масла', value: 'c1', time: 30 },
        { name: 'Замена масла в АКПП (частичная)', value: 'c2', time: 30 },
        { name: 'Замена масла в АКПП (полная)', value: 'c3', time: 150 },
        { name: 'Замена масла в МКПП', value: 'c4', time: 30 },
        { name: 'Замена масла в ГУР', value: 'c5', time: 30 },
        { name: 'Промывка ДВС', value: 'c6', time: 30 },
        { name: 'Замена фильтров', value: 'c7', time: 30 },
        { name: 'Тормозная система', value: 'c8', time: 60 },
        { name: 'Охлаждающая жидкость', value: 'c9', time: 90 },
        { name: 'Аккумулятор', value: 'c10', time: 30 },
        { name: 'Свечи зажигания', value: 'c11', time: 30 },
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
      this.$store.dispatch('get_models', val)
    }
  },
  created() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const current_date = new Date()
    let d = new Date()
    if (current_date.getHours() >= 19 && current_date.getMinutes() >= 30) d.setDate(d.getDate() + 1)
    for (var i = 0; i < 4; i++) {
      d.setHours(9)
      d.setMinutes(0)
      const date = this.local_date(d)
      let times = []
      for (var t = 0; t < 22; t++) {
        times.push({ time: this.local_time(d), busy: d < current_date, selected: false, index: t, date: d })
        d.setMinutes(d.getMinutes() + 30)
      }
      this.daytimes.push({ date, dayweek: days[d.getDay()], times })
      d.setDate(d.getDate() + 1)
    }
    this.$store.dispatch('get_vendors')
  },
  methods: {
    order_click() {
      this.errors = []
      if (!this.selected.length) {
        this.dialog = true
        this.errors.push("Не выбрана ни одна услуга")
      }
      let times = []
      this.daytimes.map(day => day.times.map(time => { if (time.selected) times.push(time.date) }))
      if (!times.length) {
        this.dialog = true
        this.errors.push("Не выбрано время записи")
      }
      if (!name) {
        this.dialog = true
        this.errors.push("Не указано имя")
      }
      if (!name) {
        this.dialog = true
        this.errors.push("Не указан телефон")
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
          if (!day.times[t].busy && num_times > 0) {
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
    local_date(date) {
      const two = (s) => { return ("0" + s).slice(-2) }
      var d = new Date(date)
      //d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
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
.required label:after {
  color: red;
  content: " *";
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
.service-f-b2 .note {
  font-size: 10px;
}
.service-form-n3 {
  width: 25%;
}
.service-f-b input[type="text"] {
  width: 100%;
  border: 1px solid #c6ccd2;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  padding: 10px 15px 10px;
  margin: 0 0 20px 0;
}
.service-f-b textarea {
  width: 100%;
  min-width: 200px;
  border: 1px solid #c6ccd2;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  padding: 10px 15px 10px;
  min-height: 150px;
  max-height: 450px;
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
.service-calendar {
  display: flex;
  flex-flow: row;
  padding-top: 10px;
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
.service-form {
  display: flex;
  flex-flow: row;
  margin: 30px 0 0 0;
}
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
.service-form-n1 {
  width: 28%;
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
.service-checkbox {
  /* height: 20px; */
}
.service-input-slot {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}
.service-f-b-sel {
  display: inline-flex;
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  position: relative;
  margin-right: 8px;
}
.service-f-b-sel-cb {
  /* margin: 7px; */
  /* height: 16px;
  width: 16px;
  left: -8px;
  top: calc(50% - 16px); */
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.service-f-b-checkbox {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.service-f-b-sel-icon {
  position: relative;
  width: 100%;
  height: 100%;
}
.service-form-n2 {
  width: 47%;
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
.fz-msg.fs10 {
    font-size: 10px;
}
.fz-msg {
    font-size: 14px;
    font-style: italic;
}
.mtop10 {
    margin-top: 10px;
}
.clr-000 {
    color: #000;
}
.fs10 {
    font-size: 10px;
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
</style>
