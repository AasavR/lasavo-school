/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F7F4',
          100: '#E1EDE5',
          200: '#C2DBD0',
          500: '#2C5E43', // Forest Sage
          600: '#234C36',
          700: '#1B3B2A',
          800: '#142B1E',
          accent: '#E07A5F', // Terra Cotta Accent
          accentHover: '#D0674B',
          gold: '#D4AF37',
          sand: '#FAF8F5',
          cream: '#F4F1EA'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      }
    },
  },
  plugins: [],
}