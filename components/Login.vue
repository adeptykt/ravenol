<template>
  <DialogForm 
    v-model="dialog" 
    max-width="450px" 
    title="Авторизация на сайте" 
    button-text="Войти" 
    @onSubmit="onSubmit" 
    link-text="Регистрация" 
    @linkClick="onLinkClick" 
    :error="error"
  >
    <div>
      <v-text-field 
        label="Адрес электронной почты (e-mail)" 
        type="text" 
        v-model="user.email" 
        :rules="[rules.emailMatch]" 
        outline 
      />
      <v-text-field
        label="Пароль"
        type="password"
        v-model="user.password"
        :append-icon="showpassword ? 'visibility_off' : 'visibility'"
        :type="showpassword ? 'text' : 'password'"
        @click:append="showpassword = !showpassword"
        :rules="[rules.min]"
        outline
      />
    </div>
  </DialogForm>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { authenticate } = useAuth()
const uiStore = useUIStore()

const dialog = ref(props.modelValue)
const showpassword = ref(false)
const error = ref<{ message?: string; className?: string } | undefined>(undefined)

const user = ref({
  email: '',
  password: ''
})

const rules = {
  required: (value: any) => !!value || 'Required.',
  min: (v: string) => v.length >= 6 || 'Должно быть минимум 6 символов',
  emailMatch: (value: string) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!reg.test(value)) return 'Некорректный e-mail'
    return true
  }
}

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

watch(() => user.value.email, () => {
  error.value = undefined
})

watch(() => user.value.password, () => {
  error.value = undefined
})

const onSubmit = async () => {
  try {
    const { $feathers } = useNuxtApp()
    const feathers = $feathers as any
    
    const result = await feathers.authenticate({
      strategy: 'local',
      email: user.value.email,
      password: user.value.password
    })
    
    const authStore = useAuthStore()
    authStore.setAuth(result.accessToken, result.payload)
    
    // Get user data
    const userService = feathers.service('users')
    const userData = await userService.get(result.payload.userId)
    authStore.setUser(userData)
    
    console.log('onSubmit', result.accessToken)
    uiStore.inverse('showLogin')
    dialog.value = false
  } catch (err: any) {
    const type = err.className
    error.value = {
      ...err,
      message: type === 'not-authenticated'
        ? 'Неверный логин или пароль'
        : 'An error prevented login.'
    }
  }
}

const onLinkClick = () => {
  dialog.value = false
  uiStore.inverse('showRegister')
}
</script>
