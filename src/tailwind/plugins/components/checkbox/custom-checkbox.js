/**
 * Custom checkbox styling
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // Add spacing between text and underline
      ".custom-checkbox[type='checkbox']:checked": {
        backgroundColor: theme("colors.digital-red.light"),
        borderColor: theme("colors.digital-red.light"),
        backgroundImage: "url(/images/checked-icon.svg)",
        backgroundSize: "60% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
      },
      ".custom-checkbox[type='checkbox']": {
        borderColor: theme("colors.black.40"),
      },
      ".custom-checkbox[type='checkbox']:hover:not(:checked), .custom-checkbox[type='checkbox']:focus:not(:checked)": {
        borderColor: theme("colors.digital-red.light"),
        borderWidth: "3px",
      },
    };

    addComponents(components);
  };
};
