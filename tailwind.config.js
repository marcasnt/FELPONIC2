/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        felponic: {
          red: '#E50914',
          darkRed: '#C20812',
          gold: '#FFCC00',
          darkBlue: '#0A1128',
          black: '#000000',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 204, 0, 0.5)',
      },
    },
  },
  plugins: [],
};