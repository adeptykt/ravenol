// Composable for notifications (alternative to vue-notifications)
// This provides a Vue 3 compatible way to show notifications

export const useNotifications = () => {
  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warn' = 'info', title?: string) => {
    // Try to use vue-notifications if available
    const { $notify } = useNuxtApp() as any
    
    if ($notify && typeof $notify[type] === 'function') {
      return $notify[type]({
        title: title || '',
        message,
        timeout: 5000
      })
    }
    
    // Fallback to console if notifications not available
    console[type === 'error' ? 'error' : type === 'warn' ? 'warn' : 'log'](title ? `${title}: ${message}` : message)
  }

  return {
    success: (message: string, title?: string) => showNotification(message, 'success', title),
    error: (message: string, title?: string) => showNotification(message, 'error', title),
    info: (message: string, title?: string) => showNotification(message, 'info', title),
    warn: (message: string, title?: string) => showNotification(message, 'warn', title),
    notify: showNotification
  }
}

// Usage in components:
// const { success, error } = useNotifications()
// success('Operation completed!')
// error('Something went wrong!')

