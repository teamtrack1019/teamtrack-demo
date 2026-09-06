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
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce2ff',
          300: '#8ecfff',
          400: '#58b1ff',
          500: '#308eff',
          600: '#1b6ff5',
          700: '#1358e1',
          800: '#1647b6',
          900: '#173d8f',
          950: '#0b1b44',
        },
        navy: {
          800: '#0f172a',
          900: '#0a0f1d',
          950: '#060a14',
        },
        accent: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          rose: '#f43f5e'
        }
      }
    },
  },
  plugins: [],
}
