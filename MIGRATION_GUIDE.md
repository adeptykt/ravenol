# Руководство по миграции на Nuxt 3

## 🔄 Миграция Store (Vuex → Pinia)

### Использование Pinia stores

**Было (Vuex):**
```javascript
// В компоненте
this.$store.commit('cart/add', { _id: '123', quantity: 2 })
const cartItems = this.$store.state.cart.list
```

**Стало (Pinia):**
```typescript
// В компоненте
const cartStore = useCartStore()
cartStore.add({ _id: '123', quantity: 2 })
const cartItems = cartStore.items
```

### Доступные stores:

1. **useCartStore()** - корзина
   - `cartStore.add(item)` - добавить товар
   - `cartStore.delete(id)` - удалить товар
   - `cartStore.clear()` - очистить корзину
   - `cartStore.items` - список товаров
   - `cartStore.count` - количество позиций
   - `cartStore.totalItems` - общее количество товаров

2. **useSettingsStore()** - настройки
   - `settingsStore.set('view_items', 0)` - установить настройку
   - `settingsStore.viewItems` - текущий вид
   - `settingsStore.sortItems` - текущая сортировка

3. **useViewedStore()** - просмотренные товары
   - `viewedStore.add(id)` - добавить товар
   - `viewedStore.clear()` - очистить список
   - `viewedStore.has(id)` - проверить наличие

4. **useAuthStore()** - аутентификация
   - `authStore.isAuthenticated` - проверка авторизации
   - `authStore.currentUser` - текущий пользователь
   - `authStore.priceType` - тип цены
   - `authStore.storeId` - ID магазина

5. **useUIStore()** - UI состояние
   - Все глобальные UI состояния из старого store/index.js
   - `uiStore.setMobile(val)` - установить мобильный режим
   - `uiStore.setMenuFix(val)` - зафиксировать меню
   - И т.д.

---

## 🔌 Использование FeathersJS composables

### Базовые composables:

**useFeathers()** - получить FeathersJS клиент
```typescript
const feathers = useFeathers()
const itemsService = feathers.service('items')
```

**useFeathersService(serviceName)** - получить сервис
```typescript
const itemsService = useFeathersService('items')
const result = await itemsService.find({ query: { $limit: 10 } })
```

**Готовые composables для сервисов:**
```typescript
const itemsService = useItemsService()
const categoriesService = useCategoriesService()
const ordersService = useOrdersService()
const usersService = useUsersService()
const bannersService = useBannersService()
const searchService = useSearchService()
// и т.д.
```

### Аутентификация:

**useAuth()** - работа с аутентификацией
```typescript
const { authenticate, logout, isAuthenticated, user } = useAuth()

// Войти
await authenticate('local', { email, password })

// Выйти
await logout()

// Проверить авторизацию
if (isAuthenticated.value) {
  console.log(user.value)
}
```

### Категории и константы:

**useCategories()** - работа с категориями
```typescript
const { loadCategories, categories, tree } = useCategories()

// Загрузить категории
await loadCategories()

// Использовать
console.log(categories.value)
console.log(tree.value)
```

**useConstants()** - загрузка констант
```typescript
const { loadConstants } = useConstants()
await loadConstants()
```

---

## 📄 Миграция компонентов

### Пример: простой компонент

**Было:**
```vue
<script>
export default {
  data() {
    return {
      items: []
    }
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.list
    }
  },
  methods: {
    addToCart(item) {
      this.$store.commit('cart/add', item)
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup lang="ts">
const cartStore = useCartStore()
const items = ref([])

const cartItems = computed(() => cartStore.items)

const addToCart = (item: any) => {
  cartStore.add(item)
}
</script>
```

### Пример: компонент с аутентификацией

**Было:**
```vue
<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isAuthenticated() {
      return !!this.$store.state.auth.accessToken
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup lang="ts">
const { isAuthenticated, user } = useAuth()
</script>
```

### Пример: компонент с FeathersJS

**Было:**
```vue
<script>
export default {
  methods: {
    async loadItems() {
      const result = await this.$store.dispatch('items/find', {
        query: { $limit: 10 }
      })
      this.items = result.data
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup lang="ts">
const itemsService = useItemsService()
const items = ref([])

const loadItems = async () => {
  const result = await itemsService.find({
    query: { $limit: 10 }
  })
  items.value = result.data
}
</script>
```

---

## 📄 Миграция страниц

### asyncData → useAsyncData

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
const page = computed(() => {
  const pageParam = route.query.page
  return pageParam ? parseInt(pageParam as string) : 1
})
</script>
```

### fetch → useFetch

**Было:**
```vue
<script>
export default {
  data() {
    return {
      banners: []
    }
  },
  async fetch() {
    this.banners = await this.$store.dispatch('banners/find', { query })
  }
}
</script>
```

**Стало:**
```vue
<script setup>
const bannersService = useBannersService()
const { data: banners } = await useFetch('banners', () => 
  bannersService.find({ query })
)
</script>
```

### head() → useHead()

**Было:**
```vue
<script>
export default {
  head() {
    return {
      title: 'Страница',
      meta: [
        { name: 'description', content: 'Описание' }
      ]
    }
  }
}
</script>
```

**Стало:**
```vue
<script setup>
useHead({
  title: 'Страница',
  meta: [
    { name: 'description', content: 'Описание' }
  ]
})
</script>
```

---

## 🔧 Использование runtime config

**Было:**
```javascript
const apiUrl = process.env.API_URL
```

**Стало:**
```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
```

---

## 📝 Чеклист миграции компонента

- [ ] Заменить `export default` на `<script setup>`
- [ ] Заменить `data()` на `ref()` / `reactive()`
- [ ] Заменить `computed` на `computed()`
- [ ] Заменить `methods` на обычные функции
- [ ] Заменить `this.$store` на `useStore()`
- [ ] Заменить `mapGetters` / `mapActions` на прямые вызовы
- [ ] Заменить `.sync` на `v-model` или `defineModel()`
- [ ] Заменить `this.$emit` на `defineEmits()`
- [ ] Заменить `props` на `defineProps()`
- [ ] Обновить типы (добавить TypeScript)

---

**Дата создания:** 2024
**Статус:** В процессе миграции

