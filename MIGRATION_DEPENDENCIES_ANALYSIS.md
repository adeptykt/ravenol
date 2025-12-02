# Анализ зависимостей для миграции на Nuxt 3

## 📦 Текущие зависимости

### Основные фреймворки
- `nuxt@^2.15.6` → `nuxt@^3.12.0` ⚠️ **BREAKING CHANGE**
- `vue@2.7.16` (через Nuxt) → `vue@^3.4.0` ⚠️ **BREAKING CHANGE**
- `@vue/composition-api@^0.6.7` → **УДАЛИТЬ** (встроено в Vue 3)

### State Management
- `feathers-vuex@^3.9.1` → **НЕСОВМЕСТИМ** с Vue 3 ⚠️ **ТРЕБУЕТ ЗАМЕНЫ**
- `nuxt-vuex-localstorage@^1.2.6` → **НЕСОВМЕСТИМ** с Nuxt 3 ⚠️ **ТРЕБУЕТ ЗАМЕНЫ**
- `vuex` (через feathers-vuex) → **ЗАМЕНИТЬ** на `pinia@^2.1.0`

### Nuxt модули (требуют проверки/обновления)
- `nuxt-client-init-module@^0.1.8` → **УДАЛИТЬ** (не нужен в Nuxt 3)
- `nuxt-feathers-vuex@0.0.7` → **УДАЛИТЬ** (несовместим)
- `nuxt-webfontloader@^1.1.0` → **ПРОВЕРИТЬ** (может быть заменен на встроенный)
- `@nuxtjs/font-awesome@^1.0.4` → **ПРОВЕРИТЬ** совместимость
- `@nuxtjs/svg-sprite@^0.2.0` → **ПРОВЕРИТЬ** совместимость
- `@naumstory/nuxtjs-yandex-metrika@^1.0.5` → **ПРОВЕРИТЬ** совместимость
- `@nuxtjs/google-analytics@^2.3.0` → **ОБНОВИТЬ** до версии для Nuxt 3

### Критические зависимости (уязвимости)
- `axios@^0.18.1` → `axios@^1.6.0` ⚠️ **КРИТИЧЕСКАЯ УЯЗВИМОСТЬ**
- `socket.io-client@^2.3.0` → `socket.io-client@^4.7.0` ⚠️ **УСТАРЕВШАЯ ВЕРСИЯ**

### Другие зависимости
- `vue-notifications@^0.9.0` → **ПРОВЕРИТЬ** совместимость с Vue 3
- `vue-text-mask@^6.1.2` → **ПРОВЕРИТЬ** совместимость
- `vue-youtube-embed@^2.2.1` → **ПРОВЕРИТЬ** совместимость
- `vue-client-only@^2.0.0` → **ЗАМЕНИТЬ** на `<ClientOnly>` (встроено в Nuxt 3)
- `jquery@^3.4.1` → **ОСТАВИТЬ** (работает, но лучше убрать позже)

### Dev Dependencies
- `eslint@^4.3.0` → `eslint@^8.57.0` ⚠️ **УСТАРЕВШАЯ ВЕРСИЯ**
- `babel-eslint@^7.2.3` → `@babel/eslint-parser@^7.23.0` ⚠️ **УСТАРЕВШИЙ**
- `eslint-loader@^1.9.0` → **УДАЛИТЬ** (заменен на eslint-webpack-plugin)
- `sass-loader@^10.1.1` → `sass-loader@^13.3.0` (для Nuxt 3)
- `stylus-loader@^3.0.1` → **ПРОВЕРИТЬ** совместимость
- `svg-sprite-loader@^4.2.1` → **ПРОВЕРИТЬ** совместимость
- `terser-webpack-plugin@^3.0.2` → **ПРОВЕРИТЬ** (Nuxt 3 использует Vite)

### Работающие зависимости
- `@feathersjs/*` - все пакеты должны работать
- `dotenv@^7.0.0` - работает
- `js-cookie@^2.2.1` - работает
- `throttle-debounce@^1.1.0` - работает
- `mini-toastr@^0.8.1` - работает
- `@mdi/font@^3.9.97` - работает
- `sass@^1.32.13` - работает
- `stylus@^0.54.7` - работает
- `autoprefixer@^10.4.14` - работает
- `postcss@^8.4.24` - работает

---

## ⚠️ Breaking Changes

### 1. Nuxt 2 → Nuxt 3
- **Конфигурация**: `nuxt.config.js` полностью переписывается
- **Роутинг**: изменился API роутинга
- **Middleware**: новый формат и API
- **Плагины**: новый формат (без Vue.use)
- **Компоненты**: автоматический импорт работает по-другому
- **SSR**: изменился процесс гидрации
- **Build**: Webpack → Vite (по умолчанию)

### 2. Vue 2 → Vue 3
- **Options API**: работает, но рекомендуется Composition API
- **v-model**: изменился синтаксис (нет `.sync`)
- **Events**: `$listeners` удален, объединен с `$attrs`
- **Filters**: удалены
- **Global API**: изменен (Vue.use → app.use)
- **Slots**: изменился синтаксис
- **Teleport**: новый компонент (был Portal)

### 3. Vuex → Pinia
- **Store**: полностью другой API
- **Модули**: нет namespaced модулей
- **Getters**: другой синтаксис
- **Actions**: другой синтаксис
- **Mutations**: удалены (только actions)

### 4. feathers-vuex → Custom Solution
- **Интеграция**: нужно переписать полностью
- **Store**: использовать Pinia вместо Vuex
- **Composables**: создать собственные composables

### 5. axios 0.18.1 → 1.6.0
- **API**: изменился формат запросов
- **Interceptors**: другой синтаксис
- **Error handling**: изменился формат ошибок

### 6. socket.io-client 2.3.0 → 4.7.0
- **API**: изменился формат подключения
- **Events**: другой синтаксис
- **Options**: изменились опции подключения

---

## 📋 План обновления зависимостей

### Шаг 1: Установить Nuxt 3 и Vue 3
```bash
npm install nuxt@^3.12.0
npm install vue@^3.4.0
```

### Шаг 2: Установить Pinia
```bash
npm install pinia@^2.1.0
npm install pinia-plugin-persistedstate@^3.2.0
```

### Шаг 3: Обновить критические зависимости
```bash
npm install axios@^1.6.0
npm install socket.io-client@^4.7.0
```

### Шаг 4: Удалить несовместимые пакеты
```bash
npm uninstall @vue/composition-api
npm uninstall feathers-vuex
npm uninstall nuxt-vuex-localstorage
npm uninstall nuxt-client-init-module
npm uninstall nuxt-feathers-vuex
npm uninstall vue-client-only
npm uninstall eslint-loader
```

### Шаг 5: Обновить Nuxt модули
```bash
# Проверить и обновить совместимые модули
npm install @nuxtjs/google-analytics@latest
# Проверить остальные модули
```

### Шаг 6: Обновить dev dependencies
```bash
npm install -D eslint@^8.57.0
npm install -D @babel/eslint-parser@^7.23.0
npm install -D sass-loader@^13.3.0
```

---

## 🔍 Проверка совместимости модулей

### Требуют проверки:
1. `@nuxtjs/font-awesome` - проверить наличие версии для Nuxt 3
2. `@nuxtjs/svg-sprite` - проверить совместимость
3. `@naumstory/nuxtjs-yandex-metrika` - проверить совместимость
4. `nuxt-webfontloader` - может быть заменен на встроенный
5. `vue-notifications` - проверить совместимость с Vue 3
6. `vue-text-mask` - проверить совместимость
7. `vue-youtube-embed` - проверить совместимость
8. `stylus-loader` - проверить совместимость с Vite
9. `svg-sprite-loader` - проверить совместимость с Vite

---

## ✅ Чеклист обновления

- [ ] Создать резервную копию package.json и package-lock.json
- [ ] Установить Nuxt 3
- [ ] Установить Vue 3
- [ ] Установить Pinia
- [ ] Обновить axios
- [ ] Обновить socket.io-client
- [ ] Удалить несовместимые пакеты
- [ ] Обновить dev dependencies
- [ ] Проверить совместимость модулей
- [ ] Обновить package-lock.json
- [ ] Протестировать установку

---

**Дата анализа:** 2024
**Статус:** В процессе

