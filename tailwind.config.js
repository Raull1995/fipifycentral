/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: '#8A2BE2',
        secondary: '#00FFFF',
        background: '#000000',
        text: '#F8F8FF',
        accent: '#2E2E2E',
      },
      boxShadow: {
        neon: '0 0 10px #00FFFF',
        'neon-hover': '0 0 20px #8A2BE2',
      },
    },
  },
  plugins: [],
};