import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fbf6f4',
          100: '#f4ebe8',
          200: '#dfb3b0',
          300: '#fabec4',
          400: '#c79392',
          500: '#b07877',
          600: '#8a5e5d'
        },
        muted: '#8a7068'
      },
      fontFamily: {
        display: ['Great Vibes', 'cursive'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      }
    }
  }
}
