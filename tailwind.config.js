/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-dark': '#0a1f0d',
        'farm-green': '#2e7d32',
        'farm-green-dark': '#1b5e20',
        'farm-green-light': '#66bb6a',
        'farm-green-lighter': '#81c784',
        'farm-bg': '#1a2f1e',
      },
    },
  },
  plugins: [],
}

