/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(9, 107, 82)",
        secondary: "rgb(0,0,0)",
        tercial: "rgb(0, 184, 107)",
        text_a: "rgb(255,255,255)",
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
};
