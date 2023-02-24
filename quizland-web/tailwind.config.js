const cardAnimation = (rotation, x, y) => ({
  '0%': {opacity: '100%'},
  '30%': {
    opacity: '80%'
  },
  '10%': {
    transform: `rotate(${rotation}deg) size(1.05)`,
  },
  '50%':{transform: `translate(0,0) rotate(${rotation}deg) `},
  '80%':{transform: `translate(${x/2}%,${y/2}%) rotate(${rotation}deg) `},
  '100%': {
    opacity: '0%',
    transform: `translate(${x}%, ${y}%) rotate(8deg)`
  }
})

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
        card_old: {
          '0%': {opacity: '100%'},
          '30%': {
            opacity: '80%'
          },
          '40%': {
            transform: 'rotate(8deg) size(1.1)',
          },
          '100%': {
            opacity: '0%',
            transform: 'translate(12%, -15%) rotate(8deg)',
          },
          card_r: cardAnimation(8, 20, 0),
          card_l: cardAnimation(-8, -20, 0)
        },
      },
      animation: {
        card: 'cardd 1000ms ease-in-out infinite'
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
};
