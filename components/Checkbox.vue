<template>
  <div class="a-checkbox">
    <v-icon :color="iconColor" :medium="medium" :small="small" @click="onclick">{{ icon }}</v-icon>
    <div class="label">
      {{ label }}
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useAttrs } from 'vue'

interface Props {
  modelValue: boolean | any[]
  color?: string
  small?: boolean
  medium?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  small: true,
  medium: false,
  color: undefined,
  label: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | any[]]
  'change': [value: boolean, lazyValue?: any]
}>()

const attrs = useAttrs()
const lazyValue = attrs.value || props.modelValue

const checked = ref(Array.isArray(props.modelValue) 
  ? props.modelValue.findIndex((a: any) => a === lazyValue) > -1
  : props.modelValue as boolean)

const icon = computed(() => checked.value ? 'check_box' : 'check_box_outline_blank')

const iconColor = computed(() => {
  return checked.value ? (props.color || 'primary') : 'inherit'
})

watch(() => props.modelValue, (val) => {
  if (Array.isArray(val)) {
    const index = val.findIndex((a: any) => a === lazyValue)
    checked.value = index > -1
  } else {
    checked.value = val as boolean
  }
}, { immediate: true })

watch(checked, (val) => {
  if (Array.isArray(props.modelValue)) {
    const currentValue = [...props.modelValue]
    const index = currentValue.findIndex((a: any) => a === lazyValue)
    if (index > -1 && !val) {
      currentValue.splice(index, 1)
    }
    if (index === -1 && val) {
      currentValue.push(lazyValue)
    }
    emit('update:modelValue', currentValue)
  } else {
    emit('update:modelValue', val)
  }
  emit('change', val, lazyValue)
})

const onclick = () => {
  checked.value = !checked.value
}
</script>

<style>
.a-checkbox {
  display: flex;
  flex-flow: raw nowrap;
}
.a-checkbox .v-icon {
  cursor: pointer;
  margin: auto 0;
}
.a-checkbox .label {
  margin-left: 8px;
  text-align: left;
}
</style>
