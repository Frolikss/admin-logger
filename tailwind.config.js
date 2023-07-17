/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      gridTemplateRows: {
        0: '0fr',
        auto: '1fr'
      }
    }
  },
  plugins: []
};
