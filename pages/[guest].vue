<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { useScrollReveal } from '~/composables/useScrollReveal'

// guests.json is gitignored — lives only locally for the real deployment
let guests: Record<string, string> = {}
try {
  guests = (await import('~/guests.json')).default as Record<string, string>
} catch {
  // File not present in public repo — gracefully degrade
}

const route = useRoute()
const guestSlug = route.params.guest as string

const guestName = guests[guestSlug] ?? null

const isLonelyGuest = /^(Дорогая |Дорогой |Любимая |Любимый |Уважаемая |Уважаемый )/.test(guestName ?? '')

if (!guestName) {
  await navigateTo('/')
}

const { init } = useTheme()
useScrollReveal()
onMounted(() => init())
</script>

<template>
  <main>
    <HeroSection />
    <InviteSection
      v-if="guestName"
      :guest-name="guestName"
      :is-lonely-guest="isLonelyGuest"
    />
    <PhotoSection />
    <EventDetails />
    <ProgramSection />
    <DressCodeSection />
    <RSVPSection :guest-slug="guestSlug" :is-lonely-guest="isLonelyGuest" />
  </main>
</template>
