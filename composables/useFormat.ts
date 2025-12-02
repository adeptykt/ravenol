// Composable for formatting functions (alternative to prototype extensions)
import { formatRub, formatDate, formatDateLong, formatDuration } from '~/plugins/prototypes'

export const useFormat = () => {
  return {
    rub: formatRub,
    date: formatDate,
    dateLong: formatDateLong,
    duration: formatDuration
  }
}

// Usage in components:
// const { rub, date } = useFormat()
// const price = rub(1000) // "1 000 ₽"
// const formattedDate = date('2024-01-01') // "01.01.2024"

