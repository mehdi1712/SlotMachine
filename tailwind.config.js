/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}", "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    {
      pattern: /bg-+/, // 👈  This includes bg of all colors and shades
    },
  ],

  theme: {
    extend: {
      colors: {
        jade: {
          50: "#eafff5",
          100: "#cdfee5",
          200: "#a0fad1",
          300: "#63f2b9",
          400: "#25e29d",
          500: "#00bd7e",
          600: "#00a46e",
          700: "#00835c",
          800: "#00674a",
          900: "#00553e",
        },
        primary: {
          50: "#212529",
          100: "#343a40",
        },
        indigo: {
          50: "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5",
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e",
        }

      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
};
