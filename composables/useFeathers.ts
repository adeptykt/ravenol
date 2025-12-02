import type { Application } from '@feathersjs/feathers'

export const useFeathers = (): Application | null => {
  // Only available on client side
  if (process.server) {
    return null
  }

  const nuxtApp = useNuxtApp()
  const feathers = nuxtApp.$feathers as Application | null | undefined
  
  if (!feathers) {
    // Return null instead of throwing error to allow graceful handling
    return null
  }
  
  return feathers
}

