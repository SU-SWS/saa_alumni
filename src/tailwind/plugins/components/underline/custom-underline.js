/**
 * Custom text underline styles
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // Add spacing between text and underline
      ".underline-offset": {
        textUnderlineOffset: "0.15em",
      },
      ".underline-thick": {
        textDecorationThickness: "0.14em",
      },
      // Custom text underline colors
      // For use directly in an <a> tag
      ".underline-digital-red-xlight": {
        textDecorationColor: theme("colors.digital-red-xlight"),
      },
      // For use in a parent container that contains the links
      ".link-underline-digital-red-xlight a": {
        textDecorationColor: theme("colors.digital-red-xlight"),
      },
    };

    addComponents(components);
  };
};
