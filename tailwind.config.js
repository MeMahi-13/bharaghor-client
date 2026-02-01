module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease forwards',
      },
       fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
        bangla: ['"Tiro Bangla"', 'sans-serif'], 
      },
    },
  },
};
