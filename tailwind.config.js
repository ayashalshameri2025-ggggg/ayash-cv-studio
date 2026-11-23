/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1020',
        brandBlue: '#2563EB',
        brandPurple: '#7C3AED',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        ibm: ['IBM Plex Sans Arabic', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
