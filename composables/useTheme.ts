import { ref } from 'vue'

// Singleton ref — shared across all component instances
const isDark = ref(false)

export function useTheme() {
  function init() {
    if (!import.meta.client) return
    isDark.value = localStorage.getItem('wedding-theme') === 'dark'
    applyTheme()
  }

  function applyTheme() {
    if (!import.meta.client) return
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  function toggle() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('wedding-theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  return { isDark, toggle, init }
}
