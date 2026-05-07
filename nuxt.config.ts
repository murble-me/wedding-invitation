export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  typescript: {
    strict: true
  },

  devtools: { enabled: false },

  css: [
    '@techmely/reset-css',
    '~/assets/styles/main.css'
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      script: [
        {
          // Apply saved theme before first paint to prevent background flash
          innerHTML: `(function(){document.documentElement.setAttribute('data-theme',localStorage.getItem('wedding-theme')==='dark'?'dark':'light')})()`,
        }
      ]
    }
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss'
  ],

  fonts: {
    families: [
      { name: 'Great Vibes', provider: 'google', display: 'swap', preload: true },
      { name: 'Playfair Display', provider: 'google', display: 'swap', preload: true },
      { name: 'Montserrat', provider: 'google', display: 'swap', preload: true }
    ]
  },

  vite: {
    assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG']
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? '',
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? ''
    }
  }
})
