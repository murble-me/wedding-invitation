import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  past: boolean
}

export function useCountdown(targetDate: string) {
  const now = ref(Date.now())
  let intervalId: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    intervalId = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })

  onUnmounted(() => {
    if (intervalId !== null) clearInterval(intervalId)
  })

  const timeLeft = computed((): CountdownTime => {
    const diff = new Date(targetDate).getTime() - now.value
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }

    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      past: false
    }
  })

  return { timeLeft }
}
