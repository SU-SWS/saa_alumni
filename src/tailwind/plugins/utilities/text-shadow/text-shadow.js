/**
 * Custom text shadow styles
 */
module.exports = function () {
  return function ({ addUtilities }) {
    const newUtilities = {
      '.text-shadow-white': {
        textShadow:
          'rgba(255, 255, 255, 40%) 0 0 10px, rgba(255, 255, 255, 60%) 0 0 10px',
      },
      '.text-shadow-white-lg': {
        textShadow: 'rgba(255, 255, 255, 50%) 0 0 12px',
      },
    };

    addUtilities(newUtilities);
  };
};
