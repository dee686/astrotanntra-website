/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#070212',
          900: '#0f0524',
          850: '#150831',
          800: '#1e0c42',
          750: '#261153',
          700: '#32166a',
          600: '#431f8b',
          500: '#5c2fa8',
        },
        astroGold: {
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
        },
        parchment: {
          50: '#faf7f2',
          100: '#f5efe6',
          200: '#ebe1d3',
          300: '#decbba',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.45)',
        'purple-glow': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'mystic': '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px -2px rgba(217, 119, 6, 0.25)',
      }
    },
  },
  plugins: [],
}
