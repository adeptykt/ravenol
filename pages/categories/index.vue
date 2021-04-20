<template>
  <Category :page.sync="page" />
</template>

<script>
import Category from '~/components/Category.vue'

export default {
  head () {
    return {
      title: 'Каталог',
    }
  },
  components: {
    Category
  },
  async asyncData({ query, params }) {
    return {
      page: parseInt(query.page) || 1
    }
  },
  data () {
    return {
      sharedState: this.$store.state,
    }
  },
}
</script>

<style>
.title {
  font-weight: 400;
  font-size: 36px;
  line-height: 1.2;
}
.cat-title {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.35;
  margin-bottom: 14px;
}
.cat-title__link {
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color .25s ease,border-color .25s ease;
}
.cat-title__link:hover {
  color: #585858;
  border-bottom-color: #b2b2b2;
}
.category__cell {
  box-sizing: border-box;
}
.category_catalog .category__cell {
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
.category__cat-link, .category__item, .category__side {
  display: flex;
  align-items: center;
}
.category_catalog .category__item {
  align-items: stretch;
  padding: 16px 23px 18px;
}
.category__side {
  justify-content: center;
}
.icon_catalog_1 {
  width: 41px;
  height: 41px;
}
.icon__item {
  display: block;
  width: inherit;
  height: inherit;
  transition: fill .25s;
}
.icon_catalog_1 .icon__item {
  fill: #000;
}
.category__base, .category__text {
  flex: 1;
}
.category__top {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.category_catalog .category__top {
  min-height: 52px;
}
.category_catalog .category__title {
  padding-top: 6px;
  padding-bottom: 6px;
}
.category__link {
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color .25s ease,border-color .25s ease;
}
.category__link:hover {
  color: #585858;
  border-bottom-color: #b2b2b2;
}
.category_catalog .category__link {
  font-size: 16px;
  line-height: 20px;
}
.category_catalog .category__submenu {
  margin-top: 5px;
}
.category_catalog .category__sub-item {
  margin-top: 10px;
}
.category_catalog .category__sub-item:first-child {
  margin-top: 0;
}
.category__sub-link {
  color: #666;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color .25s ease,border-color .25s ease;
}
.category__sub-link:hover {
  color: #000;
  border-bottom-color: #000;
}
.category_catalog .category__sub-link {
  font-size: 16px;
  line-height: 20px;
}
@media (min-width: 769px) {
  .category_catalog {
    display: block;
    column-count: 3;
  }
  .category_catalog .category__side {
    width: 52px;
    height: 52px;
    margin-right: 21px;
  }
}
@media (max-width: 1279px) {
  .category_catalog {
    column-count: 3;
  }
}
@media (max-width: 1023px) {
  .category_catalog {
    column-count: 2;
  }
}
@media (max-width: 768px) {
  .category_catalog {
    column-gap: 40px;
  }
  .category_catalog .category__item {
    padding: 7px 2px;
  }
  .category_catalog .category__side {
    width: 34px;
    height: 28px;
    margin-right: 16px;
  }
  .category_catalog .category__icon.icon {
    width: 100%;
    height: 100%;
  }
  .category_catalog .category__top {
    min-height: 28px;
  }
  .category_catalog .category__link, .category_catalog .category__sub-link {
    font-size: 14px;
    line-height: 18px;
  }
  .category_catalog .category__submenu {
    margin-top: 8px;
  }
  .category_catalog .category__link, .category_catalog .category__sub-link {
    font-size: 14px;
    line-height: 18px;
  }
}
@media (max-width: 550px) {
  .category_catalog {
    column-count: auto;
  }
}
</style>
