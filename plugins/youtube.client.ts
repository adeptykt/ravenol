// YouTube embed plugin for Vue 3
// Note: vue-youtube-embed may need to be updated for Vue 3 compatibility
// This is a placeholder - check if vue-youtube-embed@latest supports Vue 3

export default defineNuxtPlugin((nuxtApp) => {
  // If vue-youtube-embed is Vue 3 compatible:
  // import VueYouTubeEmbed from 'vue-youtube-embed'
  // nuxtApp.vueApp.use(VueYouTubeEmbed, { global: true })
  
  // Otherwise, use alternative like @vueuse/core or create custom component
  console.warn('YouTube plugin: Check vue-youtube-embed Vue 3 compatibility')
})

