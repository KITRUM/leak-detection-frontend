/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,tsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],

  theme: {
    extend: {
      colors: {
        'bg-100': '#D0DAE9',
        'bg-200': '#EAEFF4',
        'primary-100': '#B8CEEE',
        'primary-200': '#A2C1EE',
        'primary-300': '#6693D5',
        'primary-text': '#494D4F',
      },
      fontFamily: {
        dmsans: ['sans-serif'],
        montserrat: ['sans-serif'],
      },
      screens: {
        xs: '480px',
        sm: '768px',
        md: '1060px',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
  darkMode: 'class',
}
