<script setup lang="ts">
import { ref } from 'vue'

const prefersReducedMotion = ref(
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
)

const petals = [
  { left: 7,  size: 14, dur: 14, delay: 0,    color: '#f0bdc8', rx: 55, ry: -18 },
  { left: 18, size: 11, dur: 18, delay: 3,    color: '#fabec4', rx: -42, ry: 22 },
  { left: 29, size: 18, dur: 12, delay: 7,    color: '#e8d5b0', rx: 38, ry: -14 },
  { left: 41, size: 13, dur: 16, delay: 1,    color: '#f0bdc8', rx: -55, ry: 30 },
  { left: 52, size: 20, dur: 11, delay: 9,    color: 'rgba(255,255,255,0.72)', rx: 45, ry: -20 },
  { left: 63, size: 15, dur: 19, delay: 4,    color: '#fabec4', rx: -38, ry: 16 },
  { left: 74, size: 12, dur: 13, delay: 11,   color: '#e8d5b0', rx: 60, ry: -28 },
  { left: 85, size: 17, dur: 17, delay: 2,    color: '#f0bdc8', rx: -50, ry: 24 },
  { left: 11, size: 16, dur: 15, delay: 13,   color: 'rgba(255,255,255,0.65)', rx: 35, ry: -12 },
  { left: 34, size: 10, dur: 20, delay: 6,    color: '#fabec4', rx: -62, ry: 32 },
  { left: 58, size: 19, dur: 10, delay: 14,   color: '#f0bdc8', rx: 48, ry: -18 },
  { left: 79, size: 13, dur: 16, delay: 5,    color: '#e8d5b0', rx: -40, ry: 20 },
  { left: 92, size: 15, dur: 12, delay: 8,    color: '#fabec4', rx: 52, ry: -26 },
  { left: 46, size: 11, dur: 18, delay: 12,   color: 'rgba(255,255,255,0.70)', rx: -30, ry: 14 },
]
</script>

<template>
  <div v-if="!prefersReducedMotion" class="petals" aria-hidden="true">
    <div
      v-for="(p, i) in petals"
      :key="i"
      class="petal"
      :style="{
        left: p.left + '%',
        width: p.size + 'px',
        height: Math.round(p.size * 0.72) + 'px',
        background: p.color,
        animationDuration: p.dur + 's',
        animationDelay: p.delay + 's',
        '--rx': p.rx + 'px',
        '--ry': p.ry + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.petals {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -30px;
  border-radius: 60% 40% 55% 45% / 40% 50% 60% 45%;
  opacity: 0.75;
  animation: petal-fall linear infinite both;
  will-change: transform;
}

@keyframes petal-fall {
  0% {
    transform: translateY(-60px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  8% {
    opacity: 0.75;
  }
  50% {
    transform: translateY(50vh) translateX(var(--rx)) rotate(240deg);
  }
  92% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(110vh) translateX(var(--ry)) rotate(540deg);
    opacity: 0;
  }
}
</style>
