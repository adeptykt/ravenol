<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask" @click="closeAtOutsideClick()">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:style="{ 'max-width': styleMaxWidth }" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: Boolean,
    maxWidth: String
  },
  data: (vm) => ({
    styleMaxWidth: vm.maxWidth || '300px',
    showModal: false
  }),
  watch: {
    showModal (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.showModal = val
    }
  },
  methods: {
    closeAtOutsideClick() {
      this.showModal = false
    }
  }
};
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
  /* font-family: Helvetica, Arial, sans-serif; */
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
