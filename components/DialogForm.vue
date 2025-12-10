<template>
  <Dialog v-model="dialog" :max-width="maxWidth">
    <v-form @submit.prevent="$emit('onSubmit')" class="i-dialog">
      <div class="i-dialog-action">
        <v-btn icon @click="dialog = false">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="i-dialog-header">
        <h1 class="title">{{ title }}</h1>
      </div>
      <div class="i-dialog-container">
        <div class="error-message" v-if="error">
          <v-icon large color="#ed1c24">error</v-icon>
          {{ error.message }}
        </div>
        <slot></slot>
      </div>
      <div class="i-dialog-footer" v-if="buttonText">
        <div class="flex">&nbsp;</div>
        <div class="flex center">
          <v-btn depressed type="submit" light color="#ef9a21" :disabled="buttonDisabled">
            {{ buttonText }}
          </v-btn>
        </div>
        <div class="flex" style="text-align: right">
          <a @click="$emit('linkClick')">{{ linkText }}</a>
        </div>
      </div>
    </v-form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  maxWidth?: number | string
  buttonText?: string
  buttonDisabled?: boolean
  linkText?: string
  error?: { message?: string }
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: undefined,
  buttonText: '',
  buttonDisabled: false,
  linkText: '',
  error: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'onSubmit': []
  'linkClick': []
}>()

const dialog = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})
</script>

<style>
.i-dialog {
  background-color: white;
}
.i-dialog a {
  text-decoration: underline;
}
.i-dialog-action .v-btn--icon {
  width: auto;
}
.i-dialog-action .v-btn {
  height: auto;
  float: right;
}
.i-dialog-header {
  border-bottom: 1px solid #949494;
  padding: 15px;
  text-align: center;
}
.i-dialog-container {
  padding: 15px;
}
.i-dialog-footer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 15px 15px 15px;
}
.i-dialog-footer .center {
  text-align: center;
}
.i-dialog-footer .flex {
  flex: 1 1 100px;
}
.i-dialog-footer .theme--light.v-btn {
  margin: 0;
  text-transform: none;
  font-weight: normal;
  color: white;
}
.i-dialog .error-message {
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #ed1c24;
  text-align: center;
  padding: 15px;
}
</style>
