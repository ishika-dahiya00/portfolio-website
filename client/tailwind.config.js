/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        // Custom color palette
        cream: '#F5EBDD',
        terracotta: {
          50: '#FDF6F3',
          100: '#FBEEE8',
          200: '#F5D5C5',
          300: '#EFBCA2',
          400: '#E2A17F',
          500: '#D4A373', // Main terracotta
          600: '#C08C5A',
          700: '#9D6E42',
          800: '#7A5332',
          900: '#573B24',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F3E9D7',
          300: '#ECDCBF',
          400: '#E8CFA9', // Main gold
          500: '#DDB876',
          600: '#C99F43',
          700: '#A17E2F',
          800: '#785E23',
          900: '#4F3E17',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
