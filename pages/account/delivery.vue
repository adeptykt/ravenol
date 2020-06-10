<template>
  <Account>
    <div class="settings__base">
      <form action="" class="form form_media_sm">
        <div class="form__fieldset">
          <div class="form__caption">Пункт доставки / разгрузки товара</div>
          <div class="form__point wall">
            <div class="form__grid">
              <div class="form__cell form__cell_index">
                <label class="form__label">Индекс</label>
                <div class="form__control">
                  <input type="tel" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_city">
                <label class="form__label">Город</label>
                <div class="form__control">
                  <input type="text" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_street">
                <label class="form__label">Улица</label>
                <div class="form__control">
                  <input type="text" class="form__input">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="form__grid form__grid_3">
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Дом</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Офис/кабинет</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Этаж</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <!---->
          </div>
        </div>
        <div class="form__add"><a href="#" class="add-btn"><span class="add-btn__icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg></span><div class="add-btn__box"><span class="add-btn__text">Добавить</span></div></a></div>
        <div class="form__fieldset">
          <div class="form__caption">Адрес торговой точки</div>
          <div class="form__point wall">
            <div class="wall__row"><a href="#" class="wall__link">Скопировать адрес из пункта разгрузки</a></div>
            <div class="form__grid">
              <div class="form__cell form__cell_index">
                <label class="form__label">Индекс</label>
                <div class="form__control">
                  <input type="tel" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_city">
                <label class="form__label">Город</label>
                <div class="form__control">
                  <input type="text" class="form__input">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_street">
                <label class="form__label">Улица</label>
                <div class="form__control">
                  <input type="text" class="form__input">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="form__grid form__grid_3">
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Дом</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Офис/кабинет</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Этаж</label>
                  <div class="form__control">
                    <input type="tel" class="form__input">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__add">
          <a href="#" class="add-btn">
            <span class="add-btn__icon icon icon_plus_small">
              <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg>
            </span>
            <div class="add-btn__box"><span class="add-btn__text">Добавить</span></div>
          </a>
        </div>
        <div class="form__btn">
          <button type="submit" class="btn btn_type_flat btn_size_big">Сохранить</button>
          <span class="form__aside">И перейти в раздел «Сотрудники»</span>
        </div>
      </form>
    </div>
  </Account>
</template>

<script>
import Account from '~/components/Account.vue'

export default {
  head () {
    return {
      title: 'Пункты разгрузки - Indexol',
    }
  },
  components: { Account },
  data () {
    return {
    }
  }
}
</script>
