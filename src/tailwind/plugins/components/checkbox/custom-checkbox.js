/**
 * Custom checkbox styling
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      ".form-checkbox[type='checkbox']:hover:not(:checked), .form-checkbox[type='checkbox']:focus:not(:checked)":
        {
          //borderColor: theme("colors.digital-red.light"),
          //borderWidth: "3px",
        },
    };

    addComponents(components);
  };
};
