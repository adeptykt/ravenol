<template>
  <v-dialog v-model="dialog" max-width="740px">
    <style scoped>
    .v-dialog {
      border-radius: 6px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, .5)
    }
    </style>
    <div class="service">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step>1" editable>Выберите услуги</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable>Выберите время</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable>Set info</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
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
      step: "1",
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
  },
  methods: {
  }
}
</script>

<style>
.service {
  background-color: white;
  height: 100%;
  padding: 15px;
}
.service-form-n1 {
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
</style>
