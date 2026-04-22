/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0c0b0b',
        purple: {
          DEFAULT: '#5700ef',
          light: '#7b2fff',
          dark: '#3d00a8',
        },
        glass: 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #5700ef 0%, #3d00a8 100%)',
      },
    },
  },
  plugins: [],
}
