/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      gridTemplateColumns: {
        0: '0fr',
        auto: '1fr'
      },
      gridTemplateRows: {
        0: '0fr',
        auto: '1fr',
        nav: 'auto auto auto 1fr'
      }
    }
  },
  plugins: []
};
