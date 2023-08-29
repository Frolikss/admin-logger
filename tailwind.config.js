/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-light': '#51CBFF',
        'primary-dim': '#1B2B65',
        'primary-text': '#1C1F37',
        'text-gray': '#53575A',
        background: '#F8F9FF',
        'dim-blue': '#EBF1FC',
        dim: '#F5F7FB',
        reject: '#E06C50',
        approve: '#4EA67D',
        pending: '#FCD777',
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
      boxShadow: {
        dashboard: '0px 5px 10px 0px #F1F2FA',
        button: '0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)'
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
