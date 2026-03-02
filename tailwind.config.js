/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-gold': '#D4AF37',
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
                'serif-luxury': ['Playfair Display', 'serif'],
                'cinzel': ['Cinzel', 'serif'],
            },
            animation: {
                'swing-pendulum': 'swing-pendulum 4s ease-in-out infinite',
            },
            keyframes: {
                'swing-pendulum': {
                    '0%, 100%': { transform: 'rotate(1.5deg)' },
                    '50%': { transform: 'rotate(-1.5deg)' },
                }
            }
        },
    },
    plugins: [],
}
