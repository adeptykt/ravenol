<template>
  <article class="question">
    <div class="question__header">
      <div class="question__side">
        <span class="question__icon icon icon_comment_feedback">
          <svg class="icon__item">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#comment_feedback"></use>
          </svg>
        </span>
      </div>
      <div class="question__base">
        <div class="question__caption">
          {{ question }}
        </div>
      </div>
    </div>
    <div class="question__expand expand expand_sm" :class="{ expand_opened: expandOpened }">
      <div class="expand__caption">
        <a href="#" class="expand__title" @click.prevent="expandOpened = !expandOpened">
          <span class="expand__icon icon icon_dropdown">
            <svg class="icon__item">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#dropdown"></use>
            </svg>
          </span>
          <div class="expand__box">
            <span class="expand__text expand__text_closed">Показать ответ</span>
            <span class="expand__text expand__text_opened">Скрыть ответ</span>
          </div>
        </a>
        <div class="question__action" v-if="isAdmin">
          <a href="#" class="items__delete" @click.prevent="$emit('onDelete')">
            <span class="icon icon_cart_delete">
              <svg class="icon__item">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#cart_delete"></use>
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div class="expand__content">
        <div class="question__answer" v-html="answer"></div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

interface Props {
  value?: string
  question: string
  answer: string
}

defineProps<Props>()

defineEmits<{
  onDelete: []
}>()

const authStore = useAuthStore()
const expandOpened = ref(false)

const isAdmin = computed(() => {
  return authStore.user?.role === 'admin'
})
</script>

<style>
.question__action {
  margin-left: auto;
}
</style>
