<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { collection, addDoc, type Firestore } from 'firebase/firestore'

const props = withDefaults(defineProps<{
  guestSlug?: string
  isLonelyGuest?: boolean
}>(), {
  guestSlug: undefined,
  isLonelyGuest: false
})

interface RSVPForm {
  name: string
  attending: 'yes' | 'no' | ''
  dietary: string
}

const form = reactive<RSVPForm>({
  name: '',
  attending: '',
  dietary: ''
})

const errors = reactive({ name: '', attending: '' })
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const confirmLabel = computed(() =>
  props.isLonelyGuest ? 'Я приду!' : 'Мы придём!'
)

const { $db } = useNuxtApp()

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Пожалуйста, введите ваше имя'
  errors.attending = form.attending ? '' : 'Пожалуйста, выберите вариант'
  return !errors.name && !errors.attending
}

async function handleSubmit(): Promise<void> {
  if (!validate()) return

  isSubmitting.value = true

  const payload = {
    name: form.name.trim(),
    attending: form.attending,
    dietary: form.dietary.trim(),
    guestSlug: props.guestSlug ?? 'anonymous',
    submittedAt: new Date().toISOString()
  }

  try {
    if ($db) {
      await addDoc(collection($db as Firestore, 'rsvp_responses'), payload)
    } else {
      throw new Error('Firebase not configured')
    }
  } catch {
    const stored = JSON.parse(localStorage.getItem('wedding-rsvp') || '[]')
    stored.push({ ...payload, id: Date.now() })
    localStorage.setItem('wedding-rsvp', JSON.stringify(stored))
  }

  isSubmitting.value = false
  isSubmitted.value = true
}

function resetForm(): void {
  Object.assign(form, { name: '', attending: '', dietary: '' })
  errors.name = ''
  errors.attending = ''
  isSubmitted.value = false
}
</script>

<template>
  <section id="rsvp" class="rsvp section" aria-labelledby="rsvp-title">
    <div class="rsvp__inner">

      <div class="rsvp__header reveal">
        <p class="rsvp__top-label">ответ на приглашение</p>
        <h2 id="rsvp-title" class="heading-section">Вы придёте?</h2>
        <div class="divider rsvp__divider" />
      </div>

      <p class="rsvp__subtitle reveal reveal-delay-1">
        Мы будем очень рады видеть вас на нашем торжестве!<br />
        Пожалуйста, подтвердите своё присутствие до <strong>1 августа 2025</strong>
      </p>

      <div class="rsvp__card glass reveal reveal-delay-2">

        <Transition name="fade">
          <div v-if="isSubmitted" class="rsvp__success">
            <p class="rsvp__success-icon" aria-hidden="true">♡</p>
            <p class="rsvp__success-title">
              {{ form.attending === 'yes' ? 'Будем ждать вас!' : 'Жаль, что не сможете...' }}
            </p>
            <button class="btn btn-double rsvp__reset" @click="resetForm">
              Изменить ответ
            </button>
          </div>
        </Transition>

        <Transition name="fade">
          <form
            v-if="!isSubmitted"
            class="rsvp__form"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="rsvp__field" :class="{ 'has-error': errors.name }">
              <label for="rsvp-name" class="rsvp__label">Ваше имя *</label>
              <input
                id="rsvp-name"
                v-model="form.name"
                type="text"
                class="rsvp__input"
                placeholder="Иван Иванов"
                autocomplete="name"
                @blur="errors.name = form.name.trim() ? '' : 'Пожалуйста, введите ваше имя'"
              />
              <p v-if="errors.name" class="rsvp__error" role="alert">{{ errors.name }}</p>
            </div>

            <fieldset class="rsvp__field" :class="{ 'has-error': errors.attending }">
              <legend class="rsvp__label">Вы придёте? *</legend>
              <div class="rsvp__radios">
                <label class="rsvp__radio" :class="{ active: form.attending === 'yes' }">
                  <input v-model="form.attending" type="radio" name="attending" value="yes" class="sr-only" />
                  <span class="rsvp__radio-dot" aria-hidden="true" />
                  <span>{{ confirmLabel }}</span>
                </label>
                <label class="rsvp__radio" :class="{ active: form.attending === 'no' }">
                  <input v-model="form.attending" type="radio" name="attending" value="no" class="sr-only" />
                  <span class="rsvp__radio-dot" aria-hidden="true" />
                  <span>К сожалению, нет</span>
                </label>
              </div>
              <p v-if="errors.attending" class="rsvp__error" role="alert">{{ errors.attending }}</p>
            </fieldset>

            <div class="rsvp__field">
              <label for="rsvp-dietary" class="rsvp__label">Пожелания по меню и напиткам</label>
              <input
                id="rsvp-dietary"
                v-model="form.dietary"
                type="text"
                class="rsvp__input"
                placeholder="Вегетарианское, без глютена, предпочтения..."
              />
            </div>

            <button
              type="submit"
              class="btn btn-double rsvp__submit"
              :disabled="isSubmitting"
            >
              <svg
                v-if="isSubmitting"
                class="rsvp__spinner"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {{ isSubmitting ? 'Будем ждать ♡' : 'Отправить' }}
            </button>
          </form>
        </Transition>

      </div>

    </div>
  </section>
</template>

<style scoped>
.rsvp {
  display: flex;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  z-index: 1;
}

.rsvp__inner {
  width: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
}

.rsvp__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.rsvp__top-label {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-rose);
}

.rsvp__divider {
  margin-top: var(--sp-2);
}

.rsvp__subtitle {
  font-family: var(--font-heading);
  font-size: clamp(0.82rem, 2.5vw, 0.92rem);
  color: var(--color-text-muted);
  font-style: italic;
  text-align: center;
  line-height: 1.9;
}

.rsvp__card {
  width: 100%;
  padding: var(--sp-8) var(--sp-6);
}

.rsvp__form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.rsvp__field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  border: none;
  padding: 0;
}

.rsvp__label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rsvp__input {
  background: var(--color-bg-card);
  border: 2px solid rgba(196, 132, 154, 0.45);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1.1rem;
  font-size: 0.92rem;
  color: var(--color-text);
  transition: var(--transition);
  outline: none;
  width: 100%;
  min-height: 48px;
}

.rsvp__input:focus {
  border-color: var(--color-rose);
  box-shadow: 0 0 0 3px rgba(196,132,154,.15);
}

.rsvp__input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.65;
}

.has-error .rsvp__input { border-color: #c0394a; }
.rsvp__error { font-size: 0.75rem; color: #c0394a; font-style: italic; }

.rsvp__radios { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-top: 4px; }

.rsvp__radio {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid rgba(196, 132, 154, 0.45);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-text);
  user-select: none;
  min-height: 48px;
}

.rsvp__radio:hover { border-color: var(--color-rose); }

.rsvp__radio.active {
  border-color: var(--color-rose);
  color: var(--color-rose-dark);
  background: rgba(196,132,154,0.08);
}

.rsvp__radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  flex-shrink: 0;
  position: relative;
  transition: var(--transition);
}

.rsvp__radio.active .rsvp__radio-dot::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: var(--color-rose);
  border-radius: 50%;
}

.rsvp__submit {
  color: var(--color-rose);
  border-color: var(--color-rose);
  background: rgba(196,132,154,0.04);
  width: 100%;
  padding: 0.9rem;
  font-size: 0.8rem;
  margin-top: var(--sp-2);
  letter-spacing: 0.16em;
}

.rsvp__submit:not(:disabled):hover {
  background: rgba(196,132,154,0.14);
}

.rsvp__submit:disabled { opacity: 0.7; cursor: not-allowed; }
.rsvp__spinner { animation: spin 0.8s linear infinite; }

@keyframes spin { to { transform: rotate(360deg); } }

.rsvp__success {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-6) var(--sp-3);
}

.rsvp__success-icon {
  font-size: 2.8rem;
  color: var(--color-rose-light);
  animation: heartbeat 1.8s ease-in-out infinite;
}

.rsvp__success-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: var(--color-rose);
  font-style: italic;
}

.rsvp__reset {
  font-size: 0.78rem;
  padding: 0.55rem 1.6rem;
  color: var(--color-rose);
  border-color: var(--color-rose);
  margin-top: var(--sp-1);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 520px) {
  .rsvp__card { padding: var(--sp-5) var(--sp-3); }
  .rsvp__form { gap: var(--sp-3); }
}
</style>
