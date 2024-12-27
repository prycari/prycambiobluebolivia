/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'dim',
      'dark',
      'light',
      'emerald',
    ]
  },
  plugins: [
    require('daisyui')
  ],
}