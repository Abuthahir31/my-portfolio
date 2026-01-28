/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts deactivatesx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        geist: ['Geist Mono', 'monospace'],
      },
      colors: {
        neon: '#00f5ff',
        indigo: '#6366f1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top left, #1a1a2e, #0f0f0f)',
      }
    },
  },
  plugins: [],
}