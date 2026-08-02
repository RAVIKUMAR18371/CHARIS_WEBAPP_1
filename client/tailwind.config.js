/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charis: {
          black: '#0B090A',
          dark: '#141012',
          card: '#1C1518',
          cardHover: '#261D22',
          wine: '#4A0E22',
          wineLight: '#6B1432',
          wineDark: '#2D0814',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldDark: '#AA7C11',
          goldGlow: '#E6CA65',
          cream: '#F9F6F0',
          creamMuted: '#C5BFB6',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.4)',
        'wine-glow': '0 0 35px rgba(74, 14, 34, 0.5)',
      },
    },
  },
  plugins: [],
};
