const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      purple: {
        100: "#352559",
        200: "#B963F2",
        300: "#27075C",
        400: "#190E40",
      },
      white: "#F2F2F2",
    },
  },
  plugins: [],
};
