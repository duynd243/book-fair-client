/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
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
                floatUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                fadeInDown:
                    'fadeInDown .7s ease-in-out 0s 1 normal none running',
                floatUp: 'floatUp .4s ease-in-out 0s 1 normal none running',
            },
            boxShadow: {
                DEFAULT:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
            },
            outline: {
                blue: '2px solid rgba(0, 112, 244, 0.5)',
            },
            screens: {
                xs: '480px',
            },
            borderWidth: {
                3: '3px',
            },
            minWidth: {
                36: '9rem',
                44: '11rem',
                56: '14rem',
                60: '15rem',
                72: '18rem',
                80: '20rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            zIndex: {
                60: '60',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
        require('daisyui'),
    ],
    daisyui: {
        themes: false,
    },
};
