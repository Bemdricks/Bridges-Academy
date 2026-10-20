/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f4f7fb',
          100: '#e4ebf5',
          200: '#c5d4ea',
          300: '#9bb6d6',
          400: '#6f93c0',
          500: '#3d6a9e',
          600: '#245087',
          700: '#1a3d73',
          800: '#122c56',
          900: '#0a1c38',
        },
        amber: {
          50:  '#fff9e8',
          100: '#fdf0c4',
          200: '#f8e08a',
          300: '#f2cc4a',
          400: '#e6b820',
          500: '#d4a017',
          600: '#b88a0e',
          700: '#8c680c',
          800: '#6a4e09',
          900: '#463406',
        },
        coral: {
          50:  '#fff4f1',
          100: '#ffe4db',
          200: '#ffcab8',
          300: '#ffa487',
          400: '#ff7850',
          500: '#f05030',
          600: '#de3a1a',
          700: '#ba2d12',
          800: '#992712',
          900: '#7d2515',
        },
        success: {
          50:  '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50:  '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50:  '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
        neutral: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
