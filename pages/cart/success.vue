<template>
  <div class="box">
    <div class="empl empl_large">
      <div class="empl__mob-top">Спасибо! Ваш заказ {{number}} успешно оформлен</div>
      <div class="empl__pic"><img alt="" class="empl__img"></div>
      <div class="empl__base">
        <div class="empl__name">Спасибо! Ваш заказ {{number}} успешно оформлен</div>
        <div class="empl__note">
          Ждем Вас с 9.30 до 16.30 по адресу:
          <br> г. Якутск, Сергеляхское шоссе 10 км, 3/1
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Заказ успешно оформлен - Indexol',
    }
  },
  props: {
    number: String
  }
}
</script>

<style>
.empl {
  display: flex;
  align-items: center;
}
.empl__mob-top {
  display: none;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  width: 100%;
  margin-bottom: 20px;
}
.empl__pic {
  overflow: hidden;
  width: 115px;
  height: 115px;
  margin-right: 19px;
  border-radius: 50%;
}
.empl_large .empl__pic {
  width: 122px;
  height: 122px;
  margin-right: 25px;
}
.empl__img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  font-size: 0;
}
.empl__base {
  font-size: 18px;
  line-height: 24px;
  flex: 1;
}
.empl__name {
  font-size: 20px;
  line-height: 1.3;
}
.empl_large .empl__name {
  font-size: 33px;
}
.empl__note {
  margin-top: 14px;
  font-size: 18px;
  line-height: 1.45;
}
@media (max-width: 768px) {
  .empl_large .empl__name {
    font-size: 28px;
  }
}
@media (max-width: 480px) {
  .empl_large .empl__name {
    font-size: 21px;
  }
}
@media (max-width: 413px) {
  .empl_large .empl__mob-top {
    display: block;
  }
  .empl_large .empl__pic {
    width: 70px;
    height: 70px;
    margin-right: 14px;
  }
  .empl_large .empl__name {
    display: none;
  }
}
</style>
