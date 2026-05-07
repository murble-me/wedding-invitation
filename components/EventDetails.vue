<script setup lang="ts">
function openMap(): void {
  const url =
    'https://yandex.ru/maps/56/chelyabinsk/?ll=61.442753%2C55.160083&mode=routes&rtext=~55.160082%2C61.442753&rtt=comparison&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNjIyNTA3MDI5EkfQoNC-0YHRgdC40Y8sINCn0LXQu9GP0LHQuNC90YHQuiwg0L_RgNC-0YHQv9C10LrRgiDQm9C10L3QuNC90LAsIDEz0JAvMSIKDWHFdUIV7aNcQg%2C%2C&z=17.06'
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="location" class="location section" aria-labelledby="location-title">
    <div class="location__inner">

      <div class="location__card glass reveal">
        <p class="location__label">место проведения</p>

        <h2 id="location-title" class="heading-section reveal reveal-delay-1">
          Зал «Звёздный»
        </h2>

        <div class="divider reveal reveal-delay-2" />

        <address class="location__address reveal reveal-delay-2">
          <span class="location__street">пр. Ленина, 13а/1</span>
          <span>Детский парк им. В.В. Терешковой</span>
        </address>

        <button
          class="btn btn-double location__btn reveal reveal-delay-3"
          @click="openMap"
        >
          Проложить маршрут
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.location {
  padding: var(--sp-4) var(--sp-3);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  position: relative;
  z-index: 1;
}

.location__inner {
  max-width: 520px;
}

.location__card {
  padding: var(--sp-8) var(--sp-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--sp-3);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
}

.location__label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-rose);
}

.location__address {
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.location__address span {
  font-family: var(--font-body);
  font-size: clamp(0.88rem, 2.8vw, 1rem);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.location__address .location__street {
  color: var(--color-text);
  font-weight: 600;
  font-size: clamp(1rem, 3vw, 1.15rem);
}

.location__btn {
  color: var(--color-blue);
  border-color: var(--color-blue);
  background: var(--color-ivory);
  width: min(75%, 280px);
}

.location__btn:hover {
  background: #f0ede8;
}

@media (max-width: 520px) {
  .location__card {
    padding: var(--sp-5) var(--sp-3);
  }
}
</style>
