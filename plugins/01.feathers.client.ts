import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import type { NuxtApp } from 'nuxt/app'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import feathersStorage from '~/utils/feathers-storage'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // Only run on client side
  if (import.meta.server) {
    return
  }

  // Check if feathers is already provided to avoid redefinition
  if (nuxtApp.$feathers) {
    console.log('FeathersJS plugin: Already provided, skipping')
    return
  }

  const config = useRuntimeConfig()
  let apiUrl = String(config.public.apiUrl || '')
  
  // Убираем trailing slash, если есть (как в старом коде)
  if (apiUrl.endsWith('/')) {
    apiUrl = apiUrl.slice(0, -1)
  }

  console.log('FeathersJS plugin: Connecting to', apiUrl)

  // Create socket connection (точно как в старом рабочем коде api/index.js)
  const socket = io(apiUrl, { transports: ['websocket'] })
  
  const transport = socketio(socket)

  // Create FeathersJS client (точно как в старом рабочем коде api/index.js)
  const feathersClient = feathers()
    .configure(transport)
    .configure(
      auth({
        storage: feathersStorage as any,
        aud: 'web'
      } as any)
    )
    // Добавляем хук для обработки ошибок NotAuthenticated на публичных сервисах
    .hooks({
      error: {
        all: [
          async (context: any) => {
            // Публичные сервисы, которые не требуют аутентификации
            const publicServices = ['items', 'categories', 'constants', 'search']
            
            // Если это ошибка NotAuthenticated для публичного сервиса и в params было authenticated: false
            if (
              context.error?.name === 'NotAuthenticated' &&
              publicServices.includes(context.path) &&
              context.params?.authenticated === false
            ) {
              // Удаляем authentication из params и повторяем запрос
              const originalParams = { ...context.params }
              delete originalParams.authenticated
              delete originalParams.authentication
              
              try {
                // Повторяем запрос без аутентификации
                const service = feathersClient.service(context.path)
                const method = context.method
                const result = await service[method](context.id || context.data, originalParams)
                
                context.result = result
                return context
              } catch (retryError) {
                // Если повторный запрос тоже не удался, возвращаем оригинальную ошибку
                return context
              }
            }
            return context
          }
        ]
      }
    })

  // Сохраняем ссылку на сокет в клиенте для доступа из composables
  ;(feathersClient as any).io = socket

  // Handle socket connection events
  socket.on('connect', () => {
    console.log('FeathersJS socket connected')
  })

  socket.on('disconnect', () => {
    console.log('FeathersJS socket disconnected')
  })

  socket.on('connect_error', (error: unknown) => {
    console.error('FeathersJS socket connection error:', error)
  })

  // Make FeathersJS client available throughout the app
  // In Nuxt 3, return provide object to make it available via $feathers
  console.log('FeathersJS plugin: Providing feathers client')
  
  return {
    provide: {
      feathers: feathersClient
    }
  }
})
