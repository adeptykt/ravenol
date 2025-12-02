import type { Application } from '@feathersjs/feathers'

export const useFeathers = (): Application => {
  const { $feathers } = useNuxtApp()
  if (!$feathers) {
    throw new Error('FeathersJS client is not available. Make sure feathers plugin is loaded.')
  }
  return $feathers as Application
}

