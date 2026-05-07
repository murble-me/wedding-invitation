import { ref, onMounted, onUnmounted } from 'vue'

export function useSparkler() {
  const progress = ref(0)
  const showFireworks = ref(false)
  let rafId: number | null = null

  function update() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0
    // 1.25× multiplier so the path completes by ~80% of scroll,
    // keeping the spark head visually in sync with the viewport center.
    progress.value = Math.min(raw * 1.25, 1)
    showFireworks.value = progress.value >= 1
  }

  function onScroll() {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return { progress, showFireworks }
}
