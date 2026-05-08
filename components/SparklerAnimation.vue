<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useSparkler } from '~/composables/useSparkler'

const { progress, showFireworks } = useSparkler()

const containerRef = ref<HTMLElement | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)
const pathRef = ref<SVGPathElement | null>(null)

const totalLength = ref(30000)
const isReady = ref(false)
const containerH = ref(8000)
const sparkCssX = ref(0)
const sparkCssY = ref(0)

const VB_W = 1440
const VB_H = 6500

const SPARK_PATH =
  'M 380,0 ' +
  'C 900,200 1620,60 1380,500 ' +
  'C 1140,900 -200,740 60,1160 ' +
  'C 260,1480 1440,1260 1460,1680 ' +
  'C 1480,2040 -160,1940 -180,2340 ' +
  'C -180,2660 1180,2460 1360,2880 ' +
  'C 1520,3200 60,3260 -100,3640 ' +
  'C -220,3960 1320,3820 1380,4240 ' +
  'C 1440,4560 -100,4850 -160,5020 ' +
  'C -220,5190 560,5240 720,5240'

const SPARK_COLORS = [
  '#ffffff', '#fffde7', '#fff8b0',
  '#ffd6e8', '#ffb3cc', '#fce4ec',
  '#fff5e0', '#ffe0f0',
]

// волны "салюта"
const wave1 = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  const dist = 30 + (i % 5) * 10
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist),
    color: SPARK_COLORS[i % SPARK_COLORS.length],
    delay: (i % 6) * 18,
    w: 2,
    h: 10 + (i % 4) * 4,
    dur: 600 + (i % 3) * 140,
    rot: Math.round(angle * 180 / Math.PI),
  }
})

const wave2 = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2 + Math.PI / 16
  const dist = 25 + (i % 4) * 12
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist),
    color: SPARK_COLORS[(i + 2) % SPARK_COLORS.length],
    delay: 400 + (i % 5) * 25,
    w: 2,
    h: 8 + (i % 3) * 3,
    dur: 550 + (i % 2) * 80,
    rot: Math.round(angle * 180 / Math.PI),
  }
})

const allSparks = [...wave1, ...wave2]

const dashOffset = computed(() => totalLength.value * (1 - progress.value))
const showSparkHead = computed(() => progress.value > 0.004 && progress.value < 1)
const isAtEnd = computed(() => progress.value >= 1)

let ro: ResizeObserver | null = null

function measureHeight() {
  const parent = containerRef.value?.parentElement
  containerH.value = parent ? parent.offsetHeight : document.documentElement.clientHeight
}

onMounted(() => {
  measureHeight()
  if (pathRef.value) {
    totalLength.value = pathRef.value.getTotalLength()
    isReady.value = true
  }
  ro = new ResizeObserver(measureHeight)
  ro.observe(document.body)
})

onUnmounted(() => ro?.disconnect())

watch(progress, (p) => {
  if (!isReady.value || !pathRef.value || !svgRef.value) return
  const len   = p * totalLength.value
  const pt    = pathRef.value.getPointAtLength(Math.min(len, totalLength.value - 1))
  const scaleX = svgRef.value.clientWidth  / VB_W
  const scaleY = svgRef.value.clientHeight / VB_H
  sparkCssX.value = pt.x * scaleX
  sparkCssY.value = pt.y * scaleY
})
</script>

<template>
  <div
    ref="containerRef"
    class="sparkler"
    :style="{ height: containerH + 'px' }"
    aria-hidden="true"
  >
    <svg
      ref="svgRef"
      class="sparkler__svg"
      :viewBox="`0 0 ${VB_W} ${VB_H}`"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sp-trail" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stop-color="#fffde7" stop-opacity="0.85" />
          <stop offset="35%"  stop-color="#fff59d" stop-opacity="1" />
          <stop offset="70%"  stop-color="#ffd740" stop-opacity="1" />
          <stop offset="100%" stop-color="#ffca28" stop-opacity="1" />
        </linearGradient>

        <filter id="sp-glow" x="-60%" y="-8%" width="220%" height="116%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"  result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        :d="SPARK_PATH"
        fill="none"
        stroke="rgba(255,220,50,0.18)"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-dasharray="5 16"
      />

      <path
        ref="pathRef"
        :d="SPARK_PATH"
        fill="none"
        stroke="url(#sp-trail)"
        stroke-width="1.75"
        stroke-linecap="round"
        :stroke-dasharray="totalLength"
        :stroke-dashoffset="dashOffset"
        filter="url(#sp-glow)"
      />
    </svg>

    <div
      v-if="showSparkHead"
      class="sparkler__head"
      :style="{ left: sparkCssX + 'px', top: sparkCssY + 'px' }"
    />

    <div
      v-if="isAtEnd"
      class="sparkler__star"
      :style="{ left: sparkCssX + 'px', top: sparkCssY + 'px' }"
    />

    <Transition name="fw">
      <div
        v-if="showFireworks"
        class="sparkler__fireworks"
        :style="{ left: sparkCssX + 'px', top: sparkCssY + 'px' }"
      >
        <div
          v-for="(s, i) in allSparks"
          :key="i"
          class="sparkler__spark"
          :style="{
            width:             s.w + 'px',
            height:            s.h + 'px',
            background:        s.color,
            boxShadow:         `0 0 5px 2px ${s.color}cc`,
            '--tx':            s.x + 'px',
            '--ty':            s.y + 'px',
            '--rot':           s.rot + 'deg',
            animationDelay:    s.delay + 'ms',
            animationDuration: s.dur + 'ms',
          }"
        />

        <div class="sparkler__flash" />
        <div class="sparkler__flash sparkler__flash--2" />
        <div class="sparkler__flash sparkler__flash--3" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sparkler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}

.sparkler__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.sparkler__head {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #fff5a0 30%, #ffd840 60%, rgba(255,200,60,0) 80%);
  box-shadow:
    0 0 4px 2px rgba(255,255,200,0.95),
    0 0 10px 5px rgba(255,220,80,0.75),
    0 0 24px 10px rgba(255,190,50,0.45),
    0 0 50px 20px rgba(255,160,30,0.18);
  will-change: left, top;
}

.sparkler__fireworks {
  position: absolute;
  transform: translate(-50%, -50%);
}

.sparkler__spark {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  filter: blur(0.4px);
  animation: spark-burst linear both;
}

@keyframes spark-burst {
  0% {
    transform: translate(-50%, -50%) rotate(var(--rot)) scale(1);
    opacity: 1;
  }
  25% { opacity: 0.8; }
  55% { opacity: 1; }
  78% { opacity: 0.65; }
  100% {
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rot)) scale(0.08);
    opacity: 0;
  }
}

.sparkler__flash {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.sparkler__flash:not(.sparkler__flash--2):not(.sparkler__flash--3) {
  width: 14px;
  height: 14px;
  background: radial-gradient(circle, #fff 0%, #fffbe0 45%, transparent 70%);
  box-shadow: 0 0 22px 8px rgba(255,248,200,0.95);
  animation: flash-core 0.45s ease-out both;
}

.sparkler__flash--2 {
  width: 8px;
  height: 8px;
  background: transparent;
  box-shadow:
    0 0 0 3px rgba(255,230,100,0.85),
    0 0 12px 5px rgba(255,220,60,0.5);
  animation: flash-ring 0.65s ease-out 0.05s both;
}

.sparkler__flash--3 {
  width: 6px;
  height: 6px;
  background: transparent;
  box-shadow:
    0 0 0 3px rgba(255,160,200,0.7),
    0 0 10px 4px rgba(255,100,160,0.4);
  animation: flash-ring 0.85s ease-out 0.14s both;
}

@keyframes flash-core {
  0%   { transform: translate(-50%,-50%) scale(1);  opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(5);  opacity: 0; }
}

@keyframes flash-ring {
  0%   { transform: translate(-50%,-50%) scale(1);  opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(8);  opacity: 0; }
}

.fw-enter-active { transition: opacity .15s ease; }
.fw-leave-active { transition: opacity 1s ease 1.2s; }
.fw-enter-from, .fw-leave-to { opacity: 0; }

.sparkler__star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
  box-shadow:
    0 0 6px 3px rgba(255,255,255,0.98),
    0 0 16px 7px rgba(255,248,180,0.9),
    0 0 36px 12px rgba(255,220,80,0.6),
    0 0 65px 22px rgba(255,190,40,0.2),
    0 -24px 3px 0 rgba(255,255,230,0.85),
    0  24px 3px 0 rgba(255,255,230,0.85),
    -24px 0 3px 0 rgba(255,255,230,0.85),
     24px 0 3px 0 rgba(255,255,230,0.85),
    -15px -15px 2px 0 rgba(255,228,120,0.6),
     15px -15px 2px 0 rgba(255,228,120,0.6),
    -15px  15px 2px 0 rgba(255,228,120,0.6),
     15px  15px 2px 0 rgba(255,228,120,0.6);
  animation: star-twinkle 1.8s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.72;
    transform: translate(-50%, -50%) scale(1.25) rotate(22.5deg);
  }
}

@media (max-width: 480px) {
  .sparkler__head { width: 10px; height: 10px; }
}
</style>
