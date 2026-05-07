<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { useScrollReveal } from '~/composables/useScrollReveal'

const { init } = useTheme()
useScrollReveal()

onMounted(() => {
  if (import.meta.client) {
    history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  init()
})
</script>

<template>
  <main>
    <HeroSection />
    <InviteSection />
    <PhotoSection />
    <EventDetails />
    <ProgramSection />
    <DressCodeSection />
    <RSVPSection />
  </main>
</template>
