/**
 * Custom checkbox styling
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // Add spacing between text and underline
      ".custom-checkbox[type='checkbox']:checked": {
        backgroundColor: theme("colors.saa-digital-red"),
        borderColor: theme("colors.saa-digital-red"),
        backgroundImage: "url(/images/checked-icon.svg)",
        backgroundSize: "60% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
      },
      ".custom-checkbox[type='checkbox']": {
        borderColor: theme("colors.black.40"),
      },
    };

    addComponents(components);
  };
};
