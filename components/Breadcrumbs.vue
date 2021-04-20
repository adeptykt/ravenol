<template>
  <ul class="breadcrumbs">
    <template v-for="item in items">
      <li class="breadcrumbs__item"><n-link :to="item.to" class="breadcrumbs__link nuxt-link-active"><span class="breadcrumbs__text">{{item.name}}</span></n-link></li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array
  }
}
</script>
