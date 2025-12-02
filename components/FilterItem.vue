<template>
  <div>
    <li class="filter__item" :class="{ filter__item_opened: opened }">
      <a href="#" class="filter__caption" @click.prevent="onClick">
        <span class="filter__title">{{ title }}</span>
        <span class="filter__arrow icon icon_arrow_down2">
          <svg class="icon__item">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#arrow_down"></use>
          </svg>
        </span>
      </a>
      <div class="filter__dropdown" @click.stop>
        <div class="filter__container">
          <div class="filter__actions">
            <div class="filter__content">
              <div>
                <template v-for="(item, i) in items" :key="i">
                  <div class="filter__checkbox checkbox checkbox_sm">
                    <input 
                      type="checkbox" 
                      :id="`${uid}-${i}`" 
                      class="checkbox__input" 
                      :value="item.value" 
                      v-model="values"
                    >
                    <label :for="`${uid}-${i}`" class="checkbox__label">
                      {{ item.title || item.value }}
                    </label>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
interface FilterItem {
  value: any
  title?: string
}

interface Props {
  modelValue: any[]
  title: string
  items: FilterItem[]
  uid: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: any[]]
}>()

const opened = ref(false)
const values = ref([...props.modelValue])

const close = () => {
  opened.value = false
}

const onClick = () => {
  opened.value = !opened.value
}

watch(values, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.modelValue, (val) => {
  values.value = [...val]
}, { deep: true })

watch(opened, (val) => {
  if (val) {
    setTimeout(() => {
      if (process.client) {
        document.addEventListener('click', close, false)
      }
    }, 250)
  } else {
    if (process.client) {
      document.removeEventListener('click', close, false)
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', close, false)
  }
})
</script>
