# Установка зависимостей

## Важно

При установке зависимостей используйте флаг `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

Это необходимо, так как некоторые пакеты (например, `vue-youtube-embed`, `vue-text-mask`) еще не полностью совместимы с Vue 3 и могут иметь конфликты peer dependencies.

## Альтернатива

Если вы используете npm 7+, можно настроить `.npmrc` файл:

```
legacy-peer-deps=true
```

Тогда можно просто использовать:

```bash
npm install
```

## Очистка и переустановка

Если возникли проблемы с зависимостями:

```bash
# Windows PowerShell
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json -Force
npm install --legacy-peer-deps

# Linux/Mac
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

