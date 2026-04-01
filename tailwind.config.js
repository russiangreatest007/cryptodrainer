module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-gradient': 'pulse-gradient 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gradient': {
          '0%, 100%': { background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' },
          '50%': { background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)' }
        }
      }
    },
    screens: {
      'xs': '475px',
    }
  },
  plugins: [],
};