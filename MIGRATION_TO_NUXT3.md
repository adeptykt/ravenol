# Анализ миграции на Nuxt 3 и `<script setup>`

## 📊 Текущее состояние проекта

### Версии и зависимости
- **Nuxt**: 2.15.6 → нужно обновить до 3.x
- **Vue**: 2.7.16 (через Nuxt) → Vue 3.x
- **Vuex**: используется через feathers-vuex → нужно мигрировать на Pinia или Nuxt 3 store
- **Composition API**: используется `@vue/composition-api` 0.6.7 → встроен в Vue 3

### Структура проекта
- **Компоненты**: ~70 .vue файлов (все используют Options API)
- **Страницы**: ~30 страниц (используют asyncData/fetch)
- **Store**: Vuex с feathers-vuex интеграцией
- **Плагины**: 4 плагина (feathers, feathers-vuex, prototypes, vue-notifications)
- **Middleware**: 2 middleware файла

---

## 🔍 Детальный анализ

### 1. Компоненты (Options API → `<script setup>`)

**Текущее использование:**
- Все компоненты используют Options API (`export default { data(), methods, computed }`)
- Широкое использование `this.$store`, `mapGetters`, `mapActions`, `mapState`
- Использование `v-model` с `.sync` модификатором
- Props через `props: { ... }`
- Emits через `this.$emit()`

**Найдено:**
- 15 компонентов используют Vuex helpers (mapGetters, mapActions)
- 73 использования `$store` в компонентах
- Много компонентов с `sharedState: this.$store.state`

**Примеры компонентов для миграции:**
- `Category.vue` - сложный компонент с фильтрами, пагинацией
- `ProductItem.vue` - компонент продукта
- `Account.vue` - компонент аккаунта
- `Search.vue` - поиск

### 2. Страницы (asyncData/fetch → useAsyncData/useFetch)

**Текущее использование:**
- `asyncData()` - 8 страниц
- `fetch()` - 1 страница (index.vue)
- `head()` - для мета-тегов

**Изменения в Nuxt 3:**
- `asyncData()` → `useAsyncData()` или `useFetch()`
- `fetch()` → `useFetch()` или `$fetch`
- `head()` → `useHead()` или `useSeoMeta()`

### 3. Store (Vuex → Pinia)

**Текущая структура:**
- Vuex store с модулями (cart, settings, viewed)
- feathers-vuex интеграция
- nuxt-vuex-localstorage для персистентности
- Глобальный store/index.js с большим количеством логики

**Проблемы:**
- feathers-vuex может не работать с Nuxt 3
- nuxt-vuex-localstorage несовместим с Nuxt 3
- Нужна миграция на Pinia

**Альтернативы:**
- Использовать Pinia вместо Vuex
- Написать собственную интеграцию с FeathersJS
- Использовать composables для FeathersJS

### 4. Плагины

**Текущие плагины:**
1. `plugins/feathers.js` - FeathersJS клиент
2. `plugins/feathers-vuex.js` - Vue.use(FeathersVuex) - **НЕ РАБОТАЕТ В VUE 3**
3. `plugins/prototypes.js` - расширения прототипов (String, Number)
4. `plugins/vue-notifications.js` - уведомления

**Проблемы:**
- `Vue.use()` не работает в Vue 3
- Prototypes нужно переписать на composables или утилиты
- vue-notifications может требовать обновления

### 5. Middleware

**Текущие middleware:**
- `middleware/auth.js` - проверка авторизации
- `middleware/feathers.js` - пустой файл

**Изменения:**
- Middleware в Nuxt 3 работает по-другому
- Нужно использовать `definePageMeta({ middleware: 'auth' })`

### 6. Конфигурация (nuxt.config.js)

**Текущие настройки:**
- `mode: 'universal'` → в Nuxt 3 по умолчанию
- `modules` → некоторые модули несовместимы
- `buildModules` → объединены с `modules`
- `build.vendor` → удалено в Nuxt 3
- `build.extend` → изменился API

**Несовместимые модули:**
- `nuxt-client-init-module` - не нужен в Nuxt 3
- `nuxt-vuex-localstorage` - несовместим
- `@nuxtjs/font-awesome` - может требовать обновления
- `@nuxtjs/svg-sprite` - проверить совместимость
- `nuxt-webfontloader` - может быть заменен на встроенный

### 7. Зависимости

**Требуют обновления/замены:**
- `nuxt` → `nuxt@^3.0.0`
- `@vue/composition-api` → удалить (встроено в Vue 3)
- `feathers-vuex` → найти альтернативу или переписать
- `nuxt-vuex-localstorage` → использовать Pinia plugin
- `axios@0.18.1` → обновить до последней версии (критическая уязвимость)
- `vue-notifications` → проверить совместимость
- `socket.io-client@2.3.0` → обновить до 4.x

**Могут работать:**
- `@feathersjs/*` - должны работать
- `jquery` - работает, но лучше убрать
- `vue-text-mask` - проверить совместимость

---

## 📋 План миграции

### Этап 1: Подготовка (1-2 дня)
1. ✅ Создать отдельную ветку для миграции
2. ✅ Обновить документацию
3. ✅ Создать резервную копию
4. ✅ Проанализировать все зависимости
5. ✅ Составить список breaking changes

### Этап 2: Обновление зависимостей (2-3 дня)
1. ✅ Обновить `nuxt` до 3.x (3.12.0)
2. ✅ Обновить `vue` до 3.x (3.4.21)
3. ✅ Заменить Vuex на Pinia (2.1.7 + pinia-plugin-persistedstate)
4. ✅ Обновить критические зависимости (axios 1.6.0, socket.io 4.7.0)
5. ✅ Удалить несовместимые модули
6. ⏳ Установить обновленные зависимости (`npm install`)

### Этап 3: Миграция конфигурации (1 день)
1. ✅ Переписать `nuxt.config.js` под Nuxt 3 → `nuxt.config.ts`
2. ✅ Обновить структуру плагинов
3. ✅ Мигрировать middleware
4. ✅ Настроить новые модули

### Этап 4: Миграция Store (3-5 дней)
1. ✅ Установить Pinia (в package.json)
2. ✅ Мигрировать модули (cart, settings, viewed, auth, ui)
3. ✅ Переписать feathers-vuex интеграцию → composables
4. ✅ Создать composables для FeathersJS
5. ✅ Настроить персистентность (localStorage через pinia-plugin-persistedstate)

### Этап 5: Миграция плагинов (2-3 дня) ✅
1. ✅ Переписать `plugins/feathers-vuex.js` (убрать Vue.use) → удален, заменен на `feathers.client.ts`
2. ✅ Конвертировать `plugins/prototypes.js` в composables → обновлен `prototypes.ts` + создан `useFormat.ts`
3. ✅ Обновить `plugins/vue-notifications.js` → обновлен на `vue-notifications.client.ts`
4. ✅ Создать плагины инициализации (`init.client.ts`, `init.server.ts`)
5. ✅ Улучшить `feathers.client.ts` (добавить обработку событий подключения)
6. ✅ Удалить старые плагины (feathers.js, feathers-vuex.js, prototypes.js, vue-notifications.js)
7. ✅ Создать composable `useNotifications.ts` как альтернативу vue-notifications
8. ⏳ Протестировать все плагины (требует запуска приложения)

### Этап 6: Миграция компонентов (10-15 дней) ⏳
1. ✅ Начать с простых компонентов (Breadcrumbs, SvgIcon, Dialog, DialogForm, Question, Checkbox, Paginator, FilterItem)
2. ✅ Мигрировать средние компоненты (ProductItem, Search)
3. ✅ Мигрировать компоненты авторизации (Account, Login, Register, Authorization, AuthReset, Profile)
4. ✅ Мигрировать остальные компоненты (Order, Service)
5. ⏳ Мигрировать сложные компоненты (Category, Category_, Product)
6. ⏳ Заменить все `this.$store` на Pinia stores (частично выполнено - ~75%)
7. ✅ Заменить `.sync` на `v-model` (не найдено использований `.sync`)

### Этап 7: Миграция страниц (5-7 дней)
1. Заменить `asyncData()` на `useAsyncData()`
2. Заменить `fetch()` на `useFetch()`
3. Обновить `head()` на `useHead()` или `useSeoMeta()`
4. Обновить middleware на страницах

### Этап 8: Тестирование и фиксы (5-7 дней)
1. Протестировать все страницы
2. Проверить SSR/SSG
3. Исправить баги
4. Оптимизировать производительность

**Общее время: ~30-45 дней**

---

## ⚠️ Критические проблемы

### 1. feathers-vuex несовместим с Vue 3
**Решение:**
- Создать собственные composables для работы с FeathersJS
- Использовать Pinia для состояния
- Пример:
```typescript
// composables/useFeathers.ts
export const useFeathers = () => {
  const feathersClient = useNuxtApp().$feathers
  return feathersClient
}

// composables/useItems.ts
export const useItems = () => {
  const feathers = useFeathers()
  const itemsStore = useItemsStore() // Pinia
  
  const find = async (query) => {
    const result = await feathers.service('items').find({ query })
    itemsStore.setItems(result.data)
    return result
  }
  
  return { find }
}
```

### 2. Prototypes расширения
**Решение:**
- Создать утилиты вместо расширения прототипов
- Использовать composables
```typescript
// utils/formatters.ts
export const formatRub = (num: number) => {
  return numberFormat(num, 0, '.', '\u00A0') + '\u00A0\u20BD'
}

// В компонентах
import { formatRub } from '~/utils/formatters'
const price = formatRub(product.price)
```

### 3. jQuery зависимость
**Решение:**
- Постепенно убрать jQuery
- Заменить на нативные методы или Vue 3 API

### 4. nuxt-vuex-localstorage
**Решение:**
- Использовать Pinia plugin для персистентности
```typescript
// plugins/pinia-persist.client.ts
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(createPersistedState({
    storage: localStorage,
    paths: ['cart', 'settings', 'viewed']
  }))
})
```

---

## 📝 Примеры миграции

### Компонент: Options API → `<script setup>`

**Было (Category.vue):**
```vue
<script>
export default {
  props: {
    id: String,
    page: { type: Number, default: 1 }
  },
  data() {
    return {
      items: [],
      page_: this.page
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories_
    },
    ...mapGetters(['price_type', 'store'])
  },
  methods: {
    getitems() {
      this.$store.dispatch('items/find', { query })
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup lang="ts">
interface Props {
  id?: string
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const page_ = ref(props.page)
const items = ref([])

const store = useStore()
const categories = computed(() => store.categories_)
const { price_type, storeId } = storeToRefs(store)

const getitems = async () => {
  await store.items.find({ query })
}
</script>
```

### Страница: asyncData → useAsyncData

**Было:**
```vue
<script>
export default {
  async asyncData({ query }) {
    return {
      page: parseInt(query.page) || 1
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup>
const route = useRoute()
const page = computed(() => parseInt(route.query.page as string) || 1)
</script>
```

### Store: Vuex → Pinia

**Было (store/cart.js):**
```js
const state = () => ({
  list: []
})

const mutations = {
  add(state, item) {
    state.list.push(item)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
```

**Стало (stores/cart.ts):**
```typescript
export const useCartStore = defineStore('cart', {
  state: () => ({
    list: [] as CartItem[]
  }),
  actions: {
    add(item: CartItem) {
      this.list.push(item)
    }
  },
  persist: {
    storage: localStorage
  }
})
```

---

## 🎯 Рекомендации

### Приоритет миграции:
1. **Высокий**: Store (Vuex → Pinia), критичные зависимости
2. **Средний**: Плагины, middleware, конфигурация
3. **Низкий**: Компоненты (можно мигрировать постепенно)

### Стратегия:
1. **Постепенная миграция** - мигрировать по модулям
2. **Обратная совместимость** - использовать Nuxt Bridge для плавного перехода
3. **Тестирование** - тестировать каждый этап миграции

### Nuxt Bridge (промежуточное решение):
- Позволяет использовать Nuxt 3 API в Nuxt 2
- Упрощает постепенную миграцию
- Можно использовать `<script setup>` уже сейчас

---

## 📚 Полезные ресурсы

- [Nuxt 3 Migration Guide](https://nuxt.com/docs/getting-started/upgrade)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Nuxt Bridge](https://v3.nuxtjs.org/getting-started/bridge/)

---

## ✅ Чеклист миграции

- [ ] Создать ветку для миграции
- [ ] Обновить Nuxt до 3.x
- [ ] Установить Pinia
- [ ] Мигрировать store модули
- [ ] Переписать feathers-vuex интеграцию
- [ ] Обновить все плагины
- [ ] Мигрировать middleware
- [ ] Обновить nuxt.config.js
- [ ] Мигрировать компоненты на `<script setup>`
- [ ] Мигрировать страницы на новый API
- [ ] Убрать jQuery
- [ ] Обновить все зависимости
- [ ] Протестировать все функции
- [ ] Оптимизировать производительность

---

**Дата анализа:** 2024
**Версия проекта:** 1.0.1
**Текущий Nuxt:** 2.15.6
**Целевой Nuxt:** 3.x

