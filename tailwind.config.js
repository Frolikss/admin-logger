/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#93c5fd',
          400: '#60a5fa',
          600: '#2563eb',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        secondary: {
          200: '#fecaca',
          300: '#fca5a5',
          600: '#dc2626'
        },
        utility: {
          100: '#f5f5f5',
          200: '#e5e7eb',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          800: '#1f2937'
        }
      },
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
        nav: 'auto auto auto auto 1fr'
      }
    }
  },
  plugins: []
};
