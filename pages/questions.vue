<template>
  <div class="box">
    <div class="top"><h1 class="title">Хорошие вопросы</h1></div>
    <div class="flex flex_search" v-bind:class="{ flex_opened: flex_opened }" v-if="isAdmin">
      <div class="flex__btn">
        <a href="#" class="btn btn_type_flat btn_size_big" @click.prevent="flex_opened=!flex_opened">
          <span class="btn__icon icon icon_plus_big"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#plus_big"></use></svg></span>
          <span class="btn__text">Добавить вопрос</span>
        </a>
      </div>
      <form action="" class="flex__question form form_type_ava form_direct_row form_media_sm">
        <div class="form__row">
          <div class="form__control form__control_no-label form__control_huge">
            <input type="text" placeholder="Вопрос" class="form__input" v-model="question">
            <div class="form__error-message">Необходимо ввести вопрос</div>
          </div>
        </div>
        <div class="form__row form__row_flex">
          <div class="form__side">
            <div class="form__user">
              <div class="user"><span class="user__icon icon icon_user-light">
                <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#user"></use></svg></span>
              </div>
            </div>
          </div>
          <div class="form__control form__control_huge">
            <textarea rows="6" placeholder="Ответ" class="form__textarea" v-model="answer"></textarea>
            <div class="form__error-message">Необходимо написать ответ</div>
          </div>
        </div>
        <div class="form__btn">
          <button type="submit" class="btn btn_type_flat btn_size_big" @click.prevent="add_question">Добавить</button>
        </div>
      </form>
    </div>
    <div>
      <div class="empl empl_spec mb mb_mid">
        <div class="empl__pic"><img src="https://yt3.ggpht.com/a-/AAuE7mBj-fThilNDnwbjld2PBzMqe0njBv6_eTEHQQ=s288-mo-c-c0xffffffff-rj-k-no" alt="" class="empl__img"></div>
        <div class="empl__base">
          <div class="empl__text">На все вопросы отвечает наш специалист</div>
          <div class="empl__name">Андрей Тоскин</div>
        </div>
      </div>
      <div class="set">
        <div class="set__title">
          <h2 class="uppertitle">Частые вопросы</h2>
        </div>
        <div class="column">
          <div class="column__item" v-for="(q, i) in questions" :key="i">
            <Question :question="q.question" :answer="q.answer" @onDelete="deleteQuestion(q._id)" />
          </div>
        </div>
      </div>
      <!-- <div class="set__btn"><a href="/questions/popular" class="btn btn_type_flat btn_size_sm">Все частые вопросы</a></div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Question from '~/components/Question.vue'

export default {
  head () {
    return {
      title: 'Вопросы - Indexol',
    }
  },
  components: {
    Question
  },
  data () {
    return {
      flex_opened: false,
      question: '',
      answer: ''
    }
  },
  computed: {
    ...mapGetters('questions', { findQuestionsInStore: 'find' }),
    questions () {
      return this.findQuestionsInStore({ query: {} }).data
    },
    isAdmin() {
      return this.$store.state.auth.user && (this.$store.state.auth.user.role === 'admin')
    }
  },
  created() {
    this.findQuestions()
  },
  methods: {
    add_question() {
      const answer = this.answer.trim().split(/\n/).reduce((str, row) => {
        if (row) str += "<p>" + row + "</p>"
        else str += "<br>"
        return str
      }, "")
      this.addQuestion({ question: this.question, answer }).then(res => {
        this.question = ''
        this.answer = ''
      }).catch(error => console.log(error))
    },
    ...mapActions('questions', {
      findQuestions: 'find',
      addQuestion: 'create',
      deleteQuestion: 'remove'
    })
  }
}
</script>

<style>
.flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 41px;
}
.flex_opened .flex__btn .btn {
  background-color: #dfdfe1;
}
.icon_plus_big {
  width: 16px;
  height: 16px;
}
.btn__icon {
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
  vertical-align: middle!important;
}
.btn__icon+.btn__text {
  margin-left: 2px;
}
.btn__icon.icon_plus_big+.btn__text {
  margin-left: 8px;
}
.flex__question {
  display: none;
  width: 100%;
  margin-top: 39px;
}
.flex_opened .flex__question {
  display: block;
}
.top {
  margin-bottom: 25px;
}
.title {
  font-weight: 400;
  font-size: 36px;
  line-height: 1.2;
}
.mb_mid {
  margin-bottom: 30px;
}
.empl {
  display: flex;
  align-items: center;
}
.empl__pic {
  overflow: hidden;
  width: 115px;
  height: 115px;
  margin-right: 19px;
  border-radius: 50%;
}
.empl_spec .empl__pic {
  border-radius: 50%;
  border: 2px solid #ffe300;
  padding: 2px;
  width: 78px;
  height: 78px;
  margin-right: 15px;
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
.empl__text {
  font-size: 16px;
  line-height: 1.3;
  color: #666;
  margin-bottom: 1px;
}
.empl__name {
  font-size: 20px;
  line-height: 1.3;
}
.empl_spec .empl__name {
  font-size: 16px;
  font-weight: 700;
}
.set {
  margin-top: 36px;
}
.set__title {
  margin-bottom: 33px;
}
.column {
  -webkit-column-count: 2;
  column-count: 2;
  -webkit-column-gap: 30px;
  column-gap: 30px;
}
.column__item {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 30px;
}
.question {
  position: relative;
  border: 2px solid #e2e2e2;
  padding: 22px 25px 26px;
}
.question__header {
  display: flex;
}
.question__side {
  padding-top: 3px;
  margin-right: 14px;
}
.icon_comment_feedback {
  width: 26px;
  height: 26px;
}
.icon_comment_feedback .icon__item {
  fill: #000;
}
.question__base {
  flex: 1;
}
.question__caption {
  font-size: 20px;
  line-height: 26px;
}
.question__expand {
  margin-top: 15px;
}
.expand__caption, .expand__title {
  display: flex;
}
.expand__title {
  text-decoration: none;
  color: #000;
}
.expand__icon {
  margin-top: 6px;
  margin-right: 8px;
  -webkit-transition: -webkit-transform .25s ease;
  transition: -webkit-transform .25s ease;
  transition: transform .25s ease;
  transition: transform .25s ease,-webkit-transform .25s ease;
}
.icon_dropdown {
  width: 17px;
  height: 10px;
}
.expand_opened .expand__icon {
  transform: rotate(-180deg);
}
.icon_dropdown .icon__item, .icon_edit .icon__item, .icon_edit_delete .icon__item {
  fill: #000;
}
.expand__box {
  flex: 1;
}
.expand__text {
  font-size: 16px;
  line-height: 1.35;
  color: #000;
  border-bottom: 1px dotted #000;
  -webkit-transition: color .25s ease,border-color .25s ease;
  transition: color .25s ease,border-color .25s ease;
}
.expand__text_closed {
  display: inline;
}
.expand__text_opened {
  display: none;
}
.expand__content {
  display: none;
  padding-top: 32px;
}
.expand_sm .expand__content {
  padding-top: 25px;
}
.expand_opened .expand__content {
  display: block;
}
.question__answer {
  border-radius: 5px;
  background-color: #efefef;
  padding: 19px 26px 21px;
  font-size: 16px;
  line-height: 24px;
}
.question__answer p {
  margin-bottom: 18px;
}
.question__answer p:last-child {
  margin-bottom: 0;
}
</style>
