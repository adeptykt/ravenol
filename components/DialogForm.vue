<!-- :rules="[emailMatch]" -->
<template>
  <v-dialog v-model="dialog" :max-width="maxWidth">
    <v-form @submit.prevent="$emit('onSubmit')" class="i-dialog">
      <div class="i-dialog-action">
        <v-btn icon @click="dialog=false">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
      <div class="i-dialog-header">
        <h1 class="title">{{title}}</h1>
      </div>
      <div class="i-dialog-container">
        <slot></slot>
      </div>
      <div class="i-dialog-footer" v-if="buttonText">
        <div class="flex">&nbsp;</div>
        <div class="flex"><v-btn depressed type="submit" light color="#ef9a21" :disabled="buttonDisabled">{{buttonText}}</v-btn></div>
        <div class="flex" style="textAlign: right"><a @click="$emit('linkClick')">{{linkText}}</a></div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    maxWidth: [Number, String],
    buttonText: String,
    buttonDisabled: Boolean,
    linkText: String
  },
  data () {
    return {
      dialog: false,
    }
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
    },
    value (val) {
      this.dialog = val
    }
  },
  methods: {
  }
}
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
  display: inline-block;
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
.i-dialog-footer .flex {
  flex: 1 1 100px;
}
.i-dialog-footer .v-btn {
  margin: 0;
  text-transform: none;
  font-weight: normal;
}
.i-dialog-footer .theme--light.v-btn {
  color: white;
}
.i-dialog-footer .v-btn__content {
}
</style>
