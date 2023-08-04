/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        "primary-black": "#1A1919",
        "primary-blue": "#006AFF",
        "app-bg": "#F8F7F1",
        "card-light": "#FDFDFD",
        "primary-text": "#494D4F",
      },
      fontFamily: {
        dmsans: ["sans-serif"],
        montserrat: ["sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      },
      boxShadow: {
        card: "0px 8px 24px 0px rgba(69, 69, 80, 0.10);",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
};
