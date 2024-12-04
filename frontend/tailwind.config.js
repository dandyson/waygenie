/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'nav-blue': '#0063ff',
      },
      fontFamily: {
        'DM': ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
