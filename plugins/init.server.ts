export default defineNuxtPlugin(async (nuxtApp) => {
  // Server-side initialization
  // Note: FeathersJS client is only available on client side
  // Constants and categories will be loaded on client in init.client.ts
  // This prevents errors when trying to use FeathersJS on server
  
  // Server-side stores initialization can happen here if needed
  // but without FeathersJS calls
})

function parseCookies(req: any): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (req?.headers?.cookie) {
    req.headers.cookie.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=')
      const name = parts.shift()?.trim()
      const value = parts.join('=')
      if (name) {
        cookies[name] = decodeURIComponent(value)
      }
    })
  }
  return cookies
}

