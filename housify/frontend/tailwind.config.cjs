/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      ss: "465",
      sm: "624px",
      md: "824px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
