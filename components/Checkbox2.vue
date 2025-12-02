<!-- This component is identical to Checkbox.vue - consider removing or using Checkbox.vue directly -->
<template>
  <Checkbox v-bind="$attrs" v-on="$attrs" />
</template>

<script setup lang="ts">
import Checkbox from '~/components/Checkbox.vue'
</script>
