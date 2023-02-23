/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(9, 107, 82)",
        secondary: "rgb(0,0,0)",
        tercial: "rgb(0, 184, 107)",
        text_a: "rgb(255,255,255)",
      },
      keyframes: {
        card: {
          '0%': {opacity: '100%'},
          '30%': {
            opacity: '80%'
          },
          '40%': {
            transform: 'rotate(8deg) size(1.1)',
          },
          '100%': {
            opacity: '0%',
            transform: 'translate(12%, -15%) rotate(8deg)'
          }
        }
      },
      animation: {
        card: 'card 750ms ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
};
