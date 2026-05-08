<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const AUDIO_SRC = '/music/wedding.mp3'

const audioEl = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

let fadeTimer: ReturnType<typeof setInterval> | null = null

function fadeIn() {
  if (!audioEl.value) return
  audioEl.value.volume = 0
  let v = 0
  fadeTimer = setInterval(() => {
    v = Math.min(v + 0.02, 0.35)
    if (audioEl.value) audioEl.value.volume = v
    if (v >= 0.35 && fadeTimer) {
      clearInterval(fadeTimer)
      fadeTimer = null
    }
  }, 80)
}

function fadeOut(cb?: () => void) {
  if (!audioEl.value) return
  let v = audioEl.value.volume
  if (fadeTimer) clearInterval(fadeTimer)
  fadeTimer = setInterval(() => {
    v = Math.max(v - 0.04, 0)
    if (audioEl.value) audioEl.value.volume = v
    if (v <= 0 && fadeTimer) {
      clearInterval(fadeTimer)
      fadeTimer = null
      cb?.()
    }
  }, 50)
}

async function toggle() {
  if (!audioEl.value) return
  if (isPlaying.value) {
    fadeOut(() => audioEl.value?.pause())
    isPlaying.value = false
  } else {
    try {
      await audioEl.value.play()
      isPlaying.value = true
      fadeIn()
    } catch {
      // Автовоспроизведение заблокировано браузером
    }
  }
}

onUnmounted(() => {
  if (fadeTimer) clearInterval(fadeTimer)
})
</script>

<template>
  <div class="music-toggle">
    <audio ref="audioEl" :src="AUDIO_SRC" loop preload="none" />
    <button
      class="music-toggle__btn"
      :aria-label="isPlaying ? 'Выключить музыку' : 'Включить музыку'"
      :class="{ playing: isPlaying }"
      @click="toggle"
    >
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
        <line x1="10" y1="6" x2="10" y2="18" />
        <line x1="14" y1="6" x2="14" y2="18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.music-toggle {
  display: contents;
}

.music-toggle__btn {
  position: fixed;
  top: 1.25rem;
  right: calc(1.25rem + 44px + 0.625rem);
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(196,132,154,0.4);
  box-shadow: 0 4px 20px rgba(92,61,78,0.18), inset 0 1px 0 rgba(255,255,255,0.9);
  color: var(--color-rose);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

[data-theme='dark'] .music-toggle__btn {
  background: rgba(40,28,54,0.72);
  border-color: rgba(196,132,154,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12);
}

.music-toggle__btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 28px rgba(92,61,78,0.24), inset 0 1px 0 rgba(255,255,255,0.9);
}

.music-toggle__btn.playing {
  border-color: var(--color-rose);
  box-shadow: 0 4px 20px rgba(196,132,154,0.3), 0 0 0 2px rgba(196,132,154,0.2), inset 0 1px 0 rgba(255,255,255,0.9);
}

@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
}

.music-toggle__btn.playing::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 1.5px solid var(--color-rose);
  animation: pulse-ring 1.8s ease-out infinite;
  pointer-events: none;
}
</style>
