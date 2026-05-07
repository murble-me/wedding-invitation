import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.firebaseProjectId) {
    return {}
  }

  const existingApp = getApps()[0] ?? initializeApp({
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string
  })

  return {
    provide: {
      db: getFirestore(existingApp)
    }
  }
})
