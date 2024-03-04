/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/app/**/*.{html,js,ts,jsx,tsx,css,scss,sass}"],
  theme: {
    extend: {
      colors: {
        'text-dark': '#e4e6eb',
      },
    },
  },
  plugins: [],
}
