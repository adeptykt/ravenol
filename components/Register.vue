<template>
  <DialogForm 
    v-model="dialog" 
    max-width="450px" 
    title="Регистрация" 
    button-text="Зарегистрироваться" 
    :button-disabled="!agree" 
    @onSubmit="onSubmit" 
    link-text="Войти" 
    @linkClick="onLinkClick" 
    :error="error"
  >
    <div>
      <v-text-field
        label="E-mail"
        type="text"
        hint="Введите адрес электронной почты"
        v-model="user.email"
        outline
        :error-messages="errors"
      />
      <v-text-field
        label="Пароль"
        type="password"
        hint="Придумайте пароль"
        v-model="user.password"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min]"
        outline
      />
      <v-text-field
        label="Подтверждение пароля"
        type="password"
        hint="Подтвердите пароль"
        v-model="checkpassword"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min, rules.compare]"
        outline
      />
      <div>
        <Checkbox v-model="agree" medium color="#ef9a20">
          Настоящим подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности. 
          <a @click="showPolice = true">Узнать больше</a>
        </Checkbox>
      </div>
    </div>
    <Police v-model="showPolice"/>
  </DialogForm>
</template>

<script setup lang="ts">
import { useEmailCheck } from '~/composables/useEmailCheck'
import { useTempUsers } from '~/composables/useTempUsers'
import { useUIStore } from '~/stores/ui'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { checkEmail } = useEmailCheck()
const { create: createTempUser } = useTempUsers()
const uiStore = useUIStore()

const dialog = ref(props.modelValue)
const showpassword = ref(false)
const errors = ref<string[]>([])
const error = ref<{ message?: string } | undefined>(undefined)
const agree = ref(false)
const showPolice = ref(false)

const user = ref({
  email: '',
  password: ''
})

const checkpassword = ref('')

const rules = {
  required: (value: any) => !!value || 'Required.',
  min: (v: string) => v.length >= 6 || 'Должно быть минимум 6 символов',
  compare: (v: string) => v === user.value.password || 'Пароли не совпадают'
}

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

watch(() => user.value.email, async (value) => {
  error.value = undefined
  errors.value = []
  
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (!reg.test(value)) {
    errors.value = ['Некорректный e-mail']
    return
  }
  
  try {
    const data = await checkEmail(value)
    if (data && data.exists) {
      errors.value = ['Введенный почтовый ящик уже зарегистрирован']
    }
  } catch (err) {
    console.error('Email check error:', err)
  }
})

watch(() => user.value.password, () => {
  error.value = undefined
})

const onSubmit = async () => {
  try {
    await createTempUser(user.value)
    dialog.value = false
  } catch (err: any) {
    error.value = err
  }
}

const onLinkClick = () => {
  dialog.value = false
  uiStore.inverse('showLogin')
}
</script>
