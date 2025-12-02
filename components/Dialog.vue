<template>
  <Transition name="modal" v-if="showModal">
    <div class="modal-mask" @click="closeAtOutsideClick()">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{ 'max-width': styleMaxWidth }" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '300px'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const showModal = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  showModal.value = val
})

watch(showModal, (val) => {
  emit('update:modelValue', val)
})

const closeAtOutsideClick = () => {
  showModal.value = false
}

const styleMaxWidth = computed(() => props.maxWidth)
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  background-color: #fff;
  transition: all .3s ease;
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity .3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
