<template>
  <DialogForm 
    v-model="dialog" 
    max-width="450px" 
    title="Профиль" 
    button-text="Сохранить" 
    @onSubmit="onSubmit"
  >
    <div class="dialog-form">
      <v-text-field label="Телефон" type="text" v-model="phone" />
      <v-text-field 
        label="Адрес электронной почты (e-mail)" 
        type="text" 
        v-model="email" 
        :rules="[rules.emailMatch]" 
      />
      <v-text-field label="Имя" type="text" v-model="firstName" />
      <v-text-field label="Фамилия" type="text" v-model="lastName" />
    </div>
  </DialogForm>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useFeathers } from '~/composables/useFeathers'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const authStore = useAuthStore()
const uiStore = useUIStore()
const feathers = useFeathers()

const dialog = ref(props.modelValue)
const email = ref('')
const phone = ref('')
const firstName = ref('')
const lastName = ref('')

const rules = {
  required: (value: any) => !!value || 'Required.',
  emailMatch: (value: string) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!reg.test(value)) return 'Некорректный e-mail'
    return true
  }
}

watch(() => props.modelValue, (val) => {
  dialog.value = val
  if (val && authStore.user) {
    // Load user data when dialog opens
    email.value = authStore.user.email || ''
    phone.value = authStore.user.phone || ''
    firstName.value = authStore.user.firstName || ''
    lastName.value = authStore.user.lastName || ''
  }
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

watch(() => authStore.user, (user) => {
  if (user && dialog.value) {
    email.value = user.email || ''
    phone.value = user.phone || ''
    firstName.value = user.firstName || ''
    lastName.value = user.lastName || ''
  }
}, { deep: true })

const onSubmit = async () => {
  if (!authStore.user || !authStore.accessToken) return
  
  const data = { 
    phone: phone.value, 
    firstName: firstName.value, 
    lastName: lastName.value 
  }
  
  try {
    const usersService = feathers.service('users')
    await usersService.patch(authStore.user._id, data, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
    
    // Update user in store
    authStore.setUser({ ...authStore.user, ...data })
    
    uiStore.inverse('showProfile')
    dialog.value = false
  } catch (error) {
    console.error('Profile update error:', error)
  }
}
</script>
