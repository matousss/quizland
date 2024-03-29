const cardAnimation = (rotation, x, y) => ({
    '0%': {},
    '5%': {
        transform: `rotate(${rotation}deg) size(1.05)`,
    },
    '30%': {
        opacity: '100%'
    },
    '50%': {transform: `translate(0,0) rotate(${rotation}deg)`},
    '65%': {transform: `translate(${x / 3}%,${y / 3}%) rotate(${rotation}deg)`},
    '80%': {transform: `translate(${x / 3 * 2}%,${y / 3 * 2}%) rotate(${rotation}deg)`},
    '100%': {
        opacity: '0%',
        transform: `translate(${x}%, ${y}%) rotate(8deg)`
    }
})

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.gray["800"],
                secondary: colors.gray["600"],
                middle: colors.gray["700"],
                middle_dark: "#2f3949",
                gray: {
                    "750": "#2f3949",
                ...colors.gray},
                contrast: colors.gray["300"],
            },
            keyframes: {
                card_old: {
                    '0%': {opacity: '100%'},
                    '40%': {
                        transform: 'rotate(8deg) size(1.1)',
                        opacity: '100%',
                    },
                    '100%': {
                        opacity: '0%',
                        transform: 'translate(12%, -15%) rotate(8deg)',
                    },
                },
                card_r: cardAnimation(-4, 20, 0),
                card_l: cardAnimation(4, -20, 0),
                from_right: {
                    '0%': {
                        transform: 'scale(.9) translate(-20%, 0) rotateY(45deg)',
                    },
                    '100%': {
                        transform: 'translate(0, 0)',
                    }
                },
                from_left: {
                    '0%': {
                        transform: 'scale(.9) translate(20%, 0) rotateY(-45deg)',
                    },
                    '100%': {
                        transform: 'translate(0, 0)',
                    }
                },
                fadein: {
                    '0%': {opacity: '0%'},
                    '100%': {opacity: '100%'},
                },
            },

            animation: {
                card_result_r: 'card_r 800ms ease-in-out',
                card_result_l: 'card_l 800ms ease-in-out',
                card_from_right: 'from_left 250ms ease-in-out',
                card_from_left: 'from_right 250ms ease-in-out',
                fadein: 'fadein 500ms ease-in-out',
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar')({ nocompatible: true }),
        require("tailwindcss-animation-delay"),
    ],
};
