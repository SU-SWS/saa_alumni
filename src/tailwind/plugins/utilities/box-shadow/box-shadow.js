/**
 * Custom box shadow
 */
module.exports = function () {
  return function ({ addUtilities }) {
    const newUtilities = {
      '.shadow-menu': {
        boxShadow:
          '0px -3px 20px 20px rgba(0, 0, 0, .13), 0 3px 6px rgba(0, 0, 0, .1)',
      },
    };

    addUtilities(newUtilities);
  };
};
