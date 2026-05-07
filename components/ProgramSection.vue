<script setup lang="ts">
interface ProgramItem {
  time: string
  title: string
  description?: string
}

const program: ProgramItem[] = [
  { time: '16:30', title: 'Сбор гостей',
    description: 'Просим взять с собой хорошее настроение и ваши улыбки' },
  { time: '17:00', title: 'Свадебная церемония',
    description: 'Приготовьте носовые платочки для самого трогательного момента' },
  { time: '17:30', title: 'Фотосессия с гостями и поздравления' },
  { time: '18:00', title: 'Начало банкета',
    description: 'Время вкусной еды, танцев и развлечений' }
]
</script>

<template>
  <section id="program" class="program section" aria-labelledby="program-title">
    <div class="program__inner">

      <div class="program__header reveal">
        <p class="program__label">наш день</p>
        <h2 id="program-title" class="heading-section">Программа</h2>
        <div class="divider program__divider" />
      </div>

      <div class="program__card glass reveal reveal-delay-1">
        <ol class="program__list" aria-label="Расписание свадьбы">
          <li
            v-for="(item, idx) in program"
            :key="item.time"
            class="program__item reveal"
            :class="`reveal-delay-${idx + 2}`"
          >
            <span class="program__time">{{ item.time }}</span>
            <div class="program__dot" aria-hidden="true" />
            <div class="program__text">
              <p class="program__title">{{ item.title }}</p>
              <p v-if="item.description" class="program__desc">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>

    </div>
  </section>
</template>

<style scoped>
.program {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-4);
  display: flex;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  z-index: 1;
}

.program__inner {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.program__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.program__label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-rose);
}

.program__divider {
  margin-top: var(--sp-2);
}

.program__card {
  padding: var(--sp-5) var(--sp-5);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
}

.program__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.program__item {
  display: grid;
  grid-template-columns: 60px 16px 1fr;
  align-items: flex-start;
  gap: var(--sp-2);
  padding: var(--sp-3) 0;
  position: relative;
}

.program__item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 67px;
  top: calc(var(--sp-3) + 8px);
  bottom: calc(-1 * var(--sp-3) + 8px);
  width: 1px;
  background: linear-gradient(to bottom, var(--color-rose-light), transparent);
}

.program__time {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.8vw, 1.2rem);
  font-weight: 700;
  color: var(--color-rose);
  text-align: right;
  padding-top: 2px;
  letter-spacing: 0.03em;
}

.program__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-rose);
  border: 2px solid rgba(255,255,255,0.8);
  box-shadow: 0 0 0 3px rgba(196,132,154,0.25);
  margin-top: 5px;
  flex-shrink: 0;
}

.program__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
}

.program__title {
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.program__desc {
  font-family: var(--font-body);
  font-size: clamp(0.82rem, 2.5vw, 0.92rem);
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-top: 2px;
}

@media (max-width: 520px) {
  .program__card {
    padding: var(--sp-4) var(--sp-3);
  }

  .program__item {
    grid-template-columns: 52px 14px 1fr;
  }
}
</style>
