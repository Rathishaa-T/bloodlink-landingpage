/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF2F4',
          100: '#FBE3E7',
          200: '#F7C6CF',
          300: '#EF95A5',
          400: '#E25A74',
          500: '#CF2E4B',
          600: '#B3122B',
          700: '#931025',
          800: '#730D1E',
          900: '#520815',
        },
        ink: {
          50: '#F5F1F1',
          100: '#E8E1E2',
          200: '#D2C6C8',
          300: '#B1A1A4',
          400: '#8A7478',
          500: '#6A5559',
          600: '#4F3E41',
          700: '#3A2C2F',
          800: '#24191B',
          900: '#14090B',
        },
        paper: {
          DEFAULT: '#FBF6F3',
          50: '#FFFCFB',
        },
        blush: {
          DEFAULT: '#F6E3E0',
          50: '#FBF1EF',
        },
        success: {
          50: '#ECF8F0',
          500: '#2E9E5B',
          700: '#1F6B3E',
        },
        warning: {
          50: '#FFF7E6',
          500: '#D9921A',
          700: '#8A5A0B',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 9, 11, 0.06), 0 12px 32px -16px rgba(20, 9, 11, 0.18)',
        lift: '0 2px 4px rgba(20, 9, 11, 0.08), 0 24px 48px -20px rgba(179, 18, 43, 0.35)',
      },
    },
  },
  plugins: [],
};
