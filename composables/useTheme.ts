import { ref } from 'vue'

const isDark = ref(false)

export function useTheme() {
  function init() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('wedding-theme')
    isDark.value = saved === null ? true : saved === 'dark'
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
