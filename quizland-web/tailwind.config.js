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
            },
            animation: {
                card_result_r: 'card_r 800ms ease-in-out',
                card_result_l: 'card_l 800ms ease-in-out',
                card_from_right: 'from_left 250ms ease-in-out',
                card_from_left: 'from_right 250ms ease-in-out',
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
};
