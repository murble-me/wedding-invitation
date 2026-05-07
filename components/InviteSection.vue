<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  guestName?: string
  isLonelyGuest?: boolean
}>(), {
  guestName: undefined,
  isLonelyGuest: false
})

const withYou = computed(() => props.isLonelyGuest ? 'тобой' : 'вами')
const line2 = computed(() => `мы женимся и мечтаем разделить этот день с ${withYou.value}!`)
</script>

<template>
  <section id="invite" class="invite" aria-label="Приглашение">
    <div class="invite__inner">
      <div class="invite__card glass reveal">
        <div class="invite__text">
          <em v-if="guestName" class="invite__line1">{{ guestName }},</em>
          <span class="invite__line2"><br v-if="guestName" />{{ line2 }}</span>
          <span class="invite__deco" aria-hidden="true">♡</span>
        </div>
        <div class="invite__envelope-bottom" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.invite {
  padding: var(--sp-6) var(--sp-3);
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.invite__inner {
  width: min(660px, 100%);
}

.invite__card {
  padding: var(--sp-8) var(--sp-6) var(--sp-8);
  padding-top: calc(var(--sp-5) + 64px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
  position: relative;
  overflow: hidden;
}

.invite__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  background: linear-gradient(180deg, rgba(196,132,154,0.22) 0%, rgba(240,189,200,0.10) 100%);
  border-bottom: 1px solid rgba(255,255,255,0.25);
  z-index: 0;
}

.invite__envelope-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  clip-path: polygon(0 100%, 100% 100%, 50% 0%);
  background: rgba(196,132,154,0.08);
  pointer-events: none;
}

.invite__text {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 4vw, 1.65rem);
  font-style: italic;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.8;
  max-width: 520px;
  min-height: 3.6em;
}

.invite__line1 {
  font-weight: 600;
  color: var(--color-rose-dark);
  font-style: italic;
}

.invite__line2 {
  font-style: italic;
}

.invite__deco {
  font-size: 1.5rem;
  color: var(--color-rose);
  animation: heartbeat 2s ease-in-out infinite;
  line-height: 1;
  margin-top: var(--sp-1);
}

@media (max-width: 520px) {
  .invite__card { padding: var(--sp-5) var(--sp-3); }
}
</style>
