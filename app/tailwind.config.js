/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '5px 6px 35px 6px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        "gray-1000": '#292929',
      },
      padding: {
        15: '60px'
      },
      borderRadius: {
        20: '20px'
      }
    },
  },
  plugins: [],
}