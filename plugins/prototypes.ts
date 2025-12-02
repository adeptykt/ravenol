/* eslint-disable no-extend-native */

// Utility function for number formatting (can be used directly instead of prototype extension)
export function numberFormat (number: number, decimals?: number, decPoint?: string, thousandsSep?: string): string {
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals!) ? 0 : Math.abs(decimals!)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  
  const toFixedFix = function (n: number, prec: number): number {
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    const k = Math.pow(10, prec)
    return Math.round(n * k) / k
  }
  
  const s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.')
  
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  
  return s.join(dec)
}

// Extend String prototype
declare global {
  interface String {
    toLocal(): string
    toLocalLong(): string
    duration(): string
  }
  
  interface Number {
    rub(): string
  }
}

String.prototype.toLocal = function (): string {
  const two = (s: number) => ('0' + s).slice(-2)
  const d = new Date(this as string)
  return d.getDate() + '.' + two(d.getMonth() + 1) + '.' + two(d.getFullYear())
}

String.prototype.toLocalLong = function (): string {
  const d = new Date(this as string)
  return d.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
}

String.prototype.duration = function (): string {
  const two = (s: number) => ('0' + s).slice(-2)
  const regex = /PT(\d{1,2}H|)(\d{1,2}M|)(\d{1,2}S)/
  const find = regex.exec(this as string)
  
  if (!find) return ''
  
  return '' + 
    (find[1] ? parseInt(find[1]) + ':' : '') + 
    (find[2] ? two(parseInt(find[2])) + ':' : '') + 
    (find[3] ? two(parseInt(find[3])) : '')
}

Number.prototype.rub = function (): string {
  const str = numberFormat(this, 0, '.', '\u00A0')
  return str + '\u00A0\u20BD'
}

// Export utility functions for direct use (recommended approach)
export function formatRub(num: number): string {
  return numberFormat(num, 0, '.', '\u00A0') + '\u00A0\u20BD'
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const two = (s: number) => ('0' + s).slice(-2)
  return d.getDate() + '.' + two(d.getMonth() + 1) + '.' + two(d.getFullYear())
}

export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDuration(duration: string): string {
  const two = (s: number) => ('0' + s).slice(-2)
  const regex = /PT(\d{1,2}H|)(\d{1,2}M|)(\d{1,2}S)/
  const find = regex.exec(duration)
  
  if (!find) return ''
  
  return '' + 
    (find[1] ? parseInt(find[1]) + ':' : '') + 
    (find[2] ? two(parseInt(find[2])) + ':' : '') + 
    (find[3] ? two(parseInt(find[3])) : '')
}

// Nuxt 3 plugin export
export default defineNuxtPlugin(() => {
  // Prototype extensions are already applied when this file is imported
  // This plugin ensures the extensions are available globally
})

