/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/app/**/*.{html,js,ts,jsx,tsx,css,scss,sass}"],
  theme: {
    extend: {
      colors: {
        'text-dark': '#e4e6eb',
      },
      backgroundColor: {
        'gray-hover': '#3a3b3c',
        'gray-divider': '#4b4c4f',
        'bg-icon-secondary': '#303031',
        'bg-card': '#242526',
      },
      spacing: {
        'top-18': '4.5rem',
        'top-17': '4.25rem',
      },
    },
  },
  plugins: [
  ],
}
