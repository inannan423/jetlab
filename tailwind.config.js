/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './theme.config.tsx'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class'
})
