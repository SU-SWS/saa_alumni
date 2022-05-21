/**
 * Custom text underline styles
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // For use in a parent container that contains the links
      '.link-underline-digital-red-xlight a': {
        textDecorationColor: theme('colors.digital-red-xlight'),
      },
    };

    addComponents(components);
  };
};
