/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'tw-',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                fadeInDown: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, -100px, 0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'none',
                    },
                },
            },
            animation: {
                fadeInDown:
                    'fadeInDown .7s ease-in-out 0s 1 normal none running',
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
    ],
    daisyui: {
        themes: false,
    },
};
