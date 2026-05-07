<script setup lang="ts">
const palette = [
  { hex: '#FFFCD1', label: 'Шампань' },
  { hex: '#C79392', label: 'Пыльная роза' },
  { hex: '#DFB3B0', label: 'Нежно-розовый' },
  { hex: '#FABEC4', label: 'Розовый жемчуг' }
]
</script>

<template>
  <section id="dresscode" class="dresscode section" aria-labelledby="dresscode-title">
    <div class="dresscode__inner">

      <div class="dresscode__card glass reveal">
        <p class="dresscode__label">стиль праздника</p>

        <h2 id="dresscode-title" class="heading-section reveal reveal-delay-1">
          Дресс-код
        </h2>

        <div class="divider dresscode__divider reveal reveal-delay-1" />

        <p class="dresscode__text reveal reveal-delay-2">
          Мы очень ждём и с удовольствием готовимся к нашему дню!<br />
          Будет здорово, если своими нарядами вы поддержите палитру нашей свадьбы.
        </p>

        <div
          class="dresscode__palette reveal reveal-delay-3"
          role="list"
          aria-label="Цветовая палитра"
        >
          <div
            v-for="color in palette"
            :key="color.hex"
            class="dresscode__swatch"
            role="listitem"
            :style="{ background: color.hex }"
            :aria-label="color.label"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.dresscode {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-4);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  position: relative;
  z-index: 1;
}

.dresscode__inner {
  max-width: 540px;
}

.dresscode__card {
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

.dresscode__label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-rose);
}

.dresscode__divider {
  margin: 0.25rem 0;
}

.dresscode__text {
  font-family: var(--font-heading);
  font-size: clamp(0.90rem, 3vw, 1rem);
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.9;
}

.dresscode__palette {
  display: flex;
  gap: var(--sp-2);
  align-items: flex-end;
  justify-content: center;
  padding: var(--sp-2) 0;
}

.dresscode__swatch {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  cursor: default;
  flex-shrink: 0;
}

.dresscode__swatch:hover {
  transform: scale(1.15) translateY(-4px);
  box-shadow: var(--shadow);
}

@media (max-width: 520px) {
  .dresscode__card {
    padding: var(--sp-5) var(--sp-3);
  }
}
</style>
