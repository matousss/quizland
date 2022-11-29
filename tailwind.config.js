/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(134,28,89)",
                secondary: "rgb(0,0,0)",
                tercial: "rgb(172,35,118)",
                text_a: "rgb(255,255,255)",
            }
        },
    },
    plugins: [],
}
