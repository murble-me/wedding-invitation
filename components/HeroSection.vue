<script setup lang="ts">
import { useCountdown } from '~/composables/useCountdown'
import fonUrl from '~/assets/images/fon.jpg'

const WEDDING_DATE = '2026-08-24T17:00:00'
const { timeLeft } = useCountdown(WEDDING_DATE)

function pad(n: number): string {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <section class="hero" aria-label="Свадебное приглашение">
    <div class="hero__fon" :style="{ backgroundImage: `url(${fonUrl})` }" aria-hidden="true" />

    <div class="hero__stage fade-in-down">

      <div class="hero__title">
        <div class="hero__ornament" aria-hidden="true">
          <span class="hero__ornament-line" />
          <span class="hero__ornament-gem">✦</span>
          <span class="hero__ornament-line" />
          <span class="hero__ornament-gem">✦</span>
          <span class="hero__ornament-line" />
        </div>

        <p class="hero__pre">свадебное приглашение</p>

        <h1 class="hero__names">
          Ксения&nbsp;<span class="hero__amp">&amp;</span>&nbsp;Максим
        </h1>

        <div class="hero__divider" aria-hidden="true">
          <span class="hero__divider-line" />
          <span class="hero__divider-heart">♡</span>
          <span class="hero__divider-line" />
        </div>
      </div>

      <div class="hero__spacer" aria-hidden="true" />

      <div class="hero__info">
        <div class="hero__event">
          <p class="hero__date">24 августа 2026</p>
          <p class="hero__time">начало в 16:30 · Зал «Звёздный»</p>
        </div>

        <div
          v-if="!timeLeft.past"
          class="hero__countdown"
          aria-label="Обратный отсчёт до свадьбы"
        >
          <div class="hero__unit">
            <span class="hero__num">{{ pad(timeLeft.days) }}</span>
            <span class="hero__label">дней</span>
          </div>
          <span class="hero__sep" aria-hidden="true">:</span>
          <div class="hero__unit">
            <span class="hero__num">{{ pad(timeLeft.hours) }}</span>
            <span class="hero__label">часов</span>
          </div>
          <span class="hero__sep" aria-hidden="true">:</span>
          <div class="hero__unit">
            <span class="hero__num">{{ pad(timeLeft.minutes) }}</span>
            <span class="hero__label">минут</span>
          </div>
          <span class="hero__sep" aria-hidden="true">:</span>
          <div class="hero__unit">
            <span class="hero__num">{{ pad(timeLeft.seconds) }}</span>
            <span class="hero__label">секунд</span>
          </div>
        </div>

        <p v-else class="hero__past">
          Этот день стал незабываемым ♡
        </p>

        <div class="hero__ornament" aria-hidden="true">
          <span class="hero__ornament-line" />
          <span class="hero__ornament-gem">✦</span>
          <span class="hero__ornament-line" />
          <span class="hero__ornament-gem">✦</span>
          <span class="hero__ornament-line" />
        </div>

        <a href="#invite" class="hero__scroll" aria-label="Прокрутить вниз">
          <span class="hero__scroll-arrow" aria-hidden="true" />
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.hero__fon {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  opacity: 0.32;
  z-index: 0;
}

[data-theme='dark'] .hero__fon {
  opacity: 0.22;
}

.hero::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 180px;
  background: linear-gradient(to bottom, transparent, rgba(251,213,232,0.45));
  z-index: 1;
  pointer-events: none;
}

[data-theme='dark'] .hero::after {
  background: linear-gradient(to bottom, transparent, rgba(20,14,40,0.55));
}

.hero__stage {
  flex: 1;
  min-height: calc(100dvh + 60px);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

.hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  gap: var(--sp-2);
  padding: var(--sp-10) var(--sp-4) var(--sp-6);
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
}

.hero__spacer {
  flex: 1;
  min-height: 120px;
}

.hero__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: var(--sp-3);
  padding: var(--sp-8) var(--sp-4) var(--sp-8);
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
}

.hero__ornament {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 420px;
}

.hero__ornament-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,169,110,0.65), transparent);
}

.hero__ornament-gem {
  font-size: 0.55rem;
  color: var(--color-gold);
  opacity: 0.85;
}

.hero__pre {
  font-family: var(--font-body);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-rose);
}

.hero__names {
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 7.5vw, 5.8rem);
  font-weight: 400;
  color: var(--color-text);
  text-shadow:
    0 2px 18px rgba(92,61,78,0.28),
    0 1px 6px rgba(92,61,78,0.18);
  white-space: nowrap;
  line-height: 1.05;
}

.hero__amp {
  color: rgba(255,255,255,0.75);
}

.hero__divider {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
}

.hero__divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(196,132,154,0.6), transparent);
}

.hero__divider-heart {
  color: var(--color-rose);
  font-size: 1rem;
  animation: heartbeat 2.2s ease-in-out infinite;
}

.hero__date {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.8vw, 1.25rem);
  font-style: italic;
  color: var(--color-text);
  font-weight: 400;
}

.hero__time {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.hero__countdown {
  display: flex;
  align-items: center;
  gap: 4px;
}

.hero__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 52px;
}

.hero__num {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.hero__label {
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-top: 3px;
  font-weight: 600;
}

.hero__sep {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-rose);
  margin-bottom: 12px;
  animation: blink 1.4s step-start infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 0.15; }
}

.hero__past {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--color-rose);
}

.hero__scroll {
  display: flex;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.hero__scroll:hover { opacity: 1; }

.hero__scroll-arrow {
  display: block;
  width: 16px;
  height: 16px;
  border-right: 1.5px solid var(--color-rose);
  border-bottom: 1.5px solid var(--color-rose);
  transform: rotate(45deg);
  animation: bounce 1.8s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50%       { transform: rotate(45deg) translateY(5px); }
}

@media (max-width: 640px) {
  .hero__names {
    white-space: normal;
    font-size: clamp(2.2rem, 10vw, 3.2rem);
  }

  .hero__title {
    padding: var(--sp-8) var(--sp-3) var(--sp-4);
    gap: var(--sp-1);
  }

  .hero__info {
    padding: var(--sp-4) var(--sp-3) var(--sp-6);
    gap: var(--sp-2);
  }

  .hero__unit { min-width: 44px; }
}
</style>
