<template>
  <Account>
    <div class="settings__base">
      <div class="rows">
        <div class="rows__item">
          <div class="empl empl_big">
            <div class="empl__pic">
              <div class="user">
                <span class="user__icon icon icon_user-ava">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#user"></use></svg>
                </span>
              </div>
              &lt;
            </div>
            <div class="empl__base">
              <div class="empl__name">test@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Account>
</template>

<script>
import Account from '~/components/Account.vue'

export default {
  head () {
    return {
      title: 'Сотрудники - Indexol',
    }
  },
  components: { Account },
  data () {
    return {
    }
  }
}
</script>

<style>
@media (max-width: 413px) {
  .empl_big .empl__pic {
    width: 86px;
    height: 86px;
    margin-right: 14px;
  }
}
</style>
