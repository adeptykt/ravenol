<template>
  <Account>
    <div class="settings__base">
      <form action="" class="form form_media_sm">
        <div class="form__row">
          <label class="form__label">Полное юридическое название</label>
          <div class="form__control">
            <input placeholder="Например, ООО «Автоматика»" class="form__input" type="text">
            <div></div>
          </div>
        </div>
        <div class="form__row">
          <label class="form__label">ИНН</label>
          <div class="form__control">
            <input class="form__input" type="text">
            <div></div>
          </div>
        </div>
        <div class="form__fieldset">
          <div class="form__caption">Юридический адрес</div>
          <div class="wall">
            <div class="form__grid">
              <div class="form__cell form__cell_index">
                <label class="form__label">Индекс</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_city">
                <label class="form__label">Город</label>
                <div class="form__control">
                  <input class="form__input" type="text">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_street">
                <label class="form__label">Улица</label>
                <div class="form__control">
                  <input class="form__input" type="text">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="form__grid form__grid_3">
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Дом</label>
                  <div class="form__control">
                    <input class="form__input" type="tel">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <label class="form__label">Офис/кабинет</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
              <div class="form__cell">
                <label class="form__label">Этаж</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__fieldset">
          <div class="form__caption">Почтовый адрес</div>
          <div class="wall">
            <div class="wall__row"><a href="#" class="wall__link">Скопировать из юридического адреса</a></div>
            <div class="form__grid">
              <div class="form__cell form__cell_index">
                <label class="form__label">Индекс</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_city">
                <label class="form__label">Город</label>
                <div class="form__control">
                  <input class="form__input" type="text">
                  <div></div>
                </div>
              </div>
              <div class="form__cell form__cell_street">
                <label class="form__label">Улица</label>
                <div class="form__control">
                  <input class="form__input" type="text">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="form__grid form__grid_3">
              <div class="form__cell">
                <div class="form__control">
                  <label class="form__label">Дом</label>
                  <div class="form__control">
                    <input class="form__input" type="tel">
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="form__cell">
                <label class="form__label">Офис/кабинет</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
              <div class="form__cell">
                <label class="form__label">Этаж</label>
                <div class="form__control">
                  <input class="form__input" type="tel">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="hr hr_big">
        <!---->
        <div class="form__row">
          <label class="form__label">Номер расчетного счета</label>
          <div class="form__grid form__grid_2">
            <div class="form__cell">
              <div class="form__control">
                <input class="form__input" type="text">
                <div></div>
              </div>
            </div>
            <div class="form__cell form__cell_radio">
              <div class="form__control">
                <div class="radio">
                  <input id="requisites_0" name="main_requisite" class="radio__input" type="radio">
                  <label for="requisites_0" class="radio__label">Основной счет</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__row">
          <div class="form__grid form__grid_2">
            <div class="form__cell">
              <div class="form__control">
                <label class="form__label">Наименование банка</label>
                <div class="form__control">
                  <input class="form__input" type="text">
                  <div></div>
                </div>
              </div>
            </div>
            <div class="form__cell">
              <label class="form__label">Код банка</label>
              <div class="form__control">
                <input class="form__input" type="tel">
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__row">
          <label class="form__label">Адрес банка</label>
          <div class="form__control">
            <input class="form__input" type="text">
            <div></div>
          </div>
        </div>
        <div class="form__add"><a href="#" class="add-btn">
          <span class="add-btn__icon icon icon_plus_small"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_small"></use></svg></span>
          <div class="add-btn__box"><span class="add-btn__text">Добавить</span></div></a>
        </div>
        <div class="form__btn">
          <button type="submit" class="btn btn_type_flat btn_size_big">Сохранить</button>
          <span class="form__aside">И перейти в раздел «Пункты разгрузки»</span>
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
      title: 'Реквизиты - Indexol',
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
.wall {
  padding: 12px 21px 24px;
  border-radius: 5px;
  background-color: #efefef;
}
.wall__link {
  color: #666;
  font-size: 14px;
  line-height: 1.3;
  text-decoration: none;
}
.form__cell_index {
  width: 20%;
}
.form__cell_city, .form__cell_street {
  width: 40%;
}
.add-btn {
  text-decoration: none;
  color: #000;
  display: flex;
}
.add-btn__box {
  flex: 1;
}
.add-btn__text {
  font-size: 16px;
  line-height: 1.35;
  border-bottom: 1px dotted #000;
  transition: color .25s ease,border-color .25s ease;
}
@media (min-width: 480px) and (max-width: 1023px) {
  form_media_sm .form__cell_index {
  	width: 100%;
  	margin-bottom: 15px;
  }
}
</style>
