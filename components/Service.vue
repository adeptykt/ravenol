<template>
  <Dialog v-model="dialog" max-width="540px">
    <div class="service">
      <div class="dialog-action">
        <v-btn icon @click="dialog = false">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="dialog-header">
        <h1 class="title">Запись на сервис</h1>
      </div>
      <div class="dialog-container">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1" editable>Выберите услуги</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" editable>Выберите время</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" editable>Укажите...</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="service-form-n1">
                <div class="service-item-content">
                  <template v-for="(service, i) in services" :key="i">
                    <Checkbox 
                      v-model="selected" 
                      :label="service.name" 
                      :value="service.value" 
                      color="#ef9a20"
                    ></Checkbox>
                  </template>
                  <hr style="margin-right: 10px;">
                  <p>
                    Работы займут: <b><span class="mm-serv-form-ttw">{{ totalTime }}</span> мин.</b>
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
                    <template v-for="(time, t) in times" :key="t">
                      <li 
                        data-vacant="Свободных мест: <b>1</b>" 
                        :class="{ selected: time.selected, busy: time.busy }" 
                        @click="calendarClick(day, time, t)"
                      >
                        {{ time.time }}
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
                  <v-text-field 
                    v-model="phone" 
                    label="Ваш номер телефона" 
                    hide-details 
                    required 
                    mask="(###) ###-##-##"
                  ></v-text-field>
                </div>
                <v-autocomplete
                  :items="vendorList"
                  v-model="vendor"
                  flat
                  hide-no-data
                  hide-details
                  label="Марка"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-autocomplete
                  :items="modelList"
                  v-model="model"
                  flat
                  hide-no-data
                  hide-details
                  label="Модель"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-autocomplete
                  :items="generationList"
                  v-model="generation"
                  flat
                  hide-no-data
                  hide-details
                  label="Поколение"
                  item-text="name"
                  return-object
                ></v-autocomplete>
                <v-textarea v-model="comment" label="Комментарий" rows="4"></v-textarea>
                <div class="note">
                  Поля, помеченные звездочкой (<span style="color: red">*</span>), обязательны к заполнению
                </div>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import { useModels } from '~/composables/useModels'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const uiStore = useUIStore()
const { getModels, getGenerations } = useModels()

const dialog = ref(props.modelValue)
const step = ref('1')
const orders = ref<any[]>([])
const totalTime = ref(0)
const selected = ref<any[]>([])
const date = ref(new Date().toISOString().substr(0, 10))
const times = ref<any[]>([])
const mindate = ref('')
const name = ref('')
const phone = ref('')
const comment = ref('')
const vendor = ref<any>(null)
const model = ref<any>(null)
const generation = ref<any>(null)
const day = ref(null)

const services = [
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
  { name: 'Свечи зажигания', value: 11, time: 30 }
]

const vendorList = computed(() => uiStore.vendor_list)
const modelList = computed(() => uiStore.model_list)
const generationList = computed(() => uiStore.generation_list)

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

watch(selected, (val) => {
  totalTime.value = 0
  services.filter(s => val.includes(s.value)).forEach(service => {
    totalTime.value += service.time
  })
})

watch(date, () => {
  fillTimes()
})

watch(vendor, async (val) => {
  if (val && val._id) {
    await getModels(val._id, 1)
  }
})

watch(model, async (val) => {
  if (val) {
    await getGenerations(val)
  }
})

const pickerDate = (date: Date) => {
  const two = (s: number) => ('0' + s).slice(-2)
  const d = new Date(date)
  return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate())
}

const localTime = (date: Date) => {
  const two = (s: number) => ('0' + s).slice(-2)
  const d = new Date(date)
  return two(d.getHours()) + ':' + two(d.getMinutes())
}

const fillTimes = () => {
  const currentDate = new Date()
  const year = Number(date.value.substr(0, 4))
  const month = Number(date.value.substr(5, 2)) - 1
  const dayNum = Number(date.value.substr(8, 2))
  let d = new Date(year, month, dayNum, 9)
  const timesList: any[] = []

  for (let t = 0; t < 22; t++) {
    let busy = false
    if (d < currentDate) {
      busy = true
    } else {
      const order = orders.value.find(order => {
        const localDate = new Date(d)
        if (new Date(order.startDate) <= localDate && new Date(order.endDate) > localDate) {
          return true
        }
        return false
      })
      if (order) busy = true
    }
    timesList.push({ time: localTime(d), busy, selected: false, index: t })
    d.setMinutes(d.getMinutes() + 30)
  }
  times.value = timesList
}

const calendarClick = (day: any, time: any, index: number) => {
  // Handle calendar click
  times.value[index].selected = !times.value[index].selected
}

onMounted(() => {
  mindate.value = pickerDate(new Date())
  fillTimes()
})
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
