import type { Application } from '@feathersjs/feathers'

export const useFeathers = (): Application => {
  // Only available on client side
  if (process.server) {
    throw new Error('FeathersJS client is only available on the client side.')
  }

  const nuxtApp = useNuxtApp()
  const feathers = nuxtApp.$feathers as Application | null | undefined
  
  if (!feathers) {
    // Try to wait a bit if plugin is still loading
    throw new Error('FeathersJS client is not available. Make sure feathers plugin is loaded.')
  }
  
  return feathers
}

