export default defineNuxtRouteMiddleware((to) => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)
  
  const publicPages = [
    'index',
    'auth',
    'about',
    'cart',
    'register',
    'categories-id',
    'contacts',
    'delivery',
    'oferta',
    'privacy',
    'police',
    'products-id',
    'email-verification-id'
  ]
  
  // Check if route is public
  const routeName = to.name as string
  if (publicPages.includes(routeName)) {
    return
  }
  
  // Check if user is authenticated
  if (!authStore.payload) {
    return navigateTo('/auth')
  }
})

