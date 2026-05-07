<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '~/assets/images/carusel_1.jpg'
import img2 from '~/assets/images/carusel_2.JPG'
import img3 from '~/assets/images/carusel_3.jpg'
import img4 from '~/assets/images/carusel_4.jpg'
import img5 from '~/assets/images/carusel_5.jpg'
import img6 from '~/assets/images/carusel_6.JPG'
import img7 from '~/assets/images/carusel_7.PNG'

const photos = [
  { src: img1, alt: 'Наши моменты' },
  { src: img2, alt: 'Наши моменты' },
  { src: img3, alt: 'Наши моменты' },
  { src: img4, alt: 'Наши моменты' },
  { src: img5, alt: 'Наши моменты' },
  { src: img6, alt: 'Наши моменты' },
  { src: img7, alt: 'Наши моменты' },
]

const trackRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const isHovered = ref(false)

function slideWidth(): number {
  return trackRef.value?.firstElementChild
    ? (trackRef.value.firstElementChild as HTMLElement).offsetWidth + 16
    : 0
}

function goTo(index: number) {
  const i = (index + photos.length) % photos.length
  trackRef.value?.scrollTo({ left: i * slideWidth(), behavior: 'smooth' })
  activeIndex.value = i
}

function prev() { goTo(activeIndex.value - 1) }
function next() { goTo(activeIndex.value + 1) }

function onScroll() {
  if (!trackRef.value) return
  const sw = slideWidth()
  if (sw > 0) activeIndex.value = Math.round(trackRef.value.scrollLeft / sw)
}

let timer: ReturnType<typeof setInterval> | null = null

function startAuto() {
  timer = setInterval(() => {
    if (!isHovered.value) goTo(activeIndex.value + 1)
  }, 4000)
}

onMounted(() => startAuto())
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <section class="photos section" aria-label="Наши моменты">
    <div class="photos__inner">

      <div class="photos__header reveal">
        <p class="photos__label">наши фотографии</p>
        <h2 class="heading-section">Особенные моменты</h2>
        <div class="divider photos__divider" />
      </div>

      <div
        class="photos__wrap reveal reveal-delay-1"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <button class="photos__btn photos__btn--prev" aria-label="Предыдущее фото" @click="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div
          ref="trackRef"
          class="photos__track"
          @scroll="onScroll"
        >
          <div
            v-for="(photo, i) in photos"
            :key="i"
            class="photos__slide"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="photos__img"
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>

        <button class="photos__btn photos__btn--next" aria-label="Следующее фото" @click="next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div class="photos__dots reveal reveal-delay-2" role="tablist" aria-label="Слайды">
        <button
          v-for="(_, i) in photos"
          :key="i"
          class="photos__dot"
          :class="{ active: activeIndex === i }"
          :aria-selected="activeIndex === i"
          :aria-label="`Фото ${i + 1}`"
          role="tab"
          @click="goTo(i)"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.photos {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-4);
}

.photos__inner {
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
}

.photos__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.photos__divider {
  margin-top: var(--sp-2);
}

.photos__label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-rose);
}

/* ── Carousel wrapper ──────────────────── */
.photos__wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.photos__track {
  flex: 1;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0;
}

.photos__track::-webkit-scrollbar { display: none; }

.photos__slide {
  scroll-snap-align: center;
  flex-shrink: 0;
  width: min(480px, 80vw);
  height: clamp(320px, 60vh, 580px);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.photos__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.photos__slide:hover .photos__img {
  transform: scale(1.03);
}

/* ── Navigation buttons ─────────────────── */
.photos__btn {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  cursor: pointer;
}

.photos__btn:hover {
  background: var(--glass-bg-strong);
  transform: scale(1.08);
}

/* ── Dots ────────────────────────────────── */
.photos__dots {
  display: flex;
  gap: var(--sp-1);
  align-items: center;
}

.photos__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(196,132,154,0.3);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 0;
}

.photos__dot.active {
  background: var(--color-rose);
  transform: scale(1.35);
}

@media (max-width: 600px) {
  .photos__btn {
    display: none;
  }
  .photos__slide {
    width: min(340px, 85vw);
  }
}
</style>
