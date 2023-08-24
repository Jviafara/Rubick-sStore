/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            margin: {
                '5px': '5px',
            },
            screens: {
                xs: '375px',
            },
            colors: {
                orange: '#FEBA71',
                yellow: '#FFDC7E',
                pink: '#FFC7B0',
            },
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
