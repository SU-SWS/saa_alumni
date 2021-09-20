/**
 * Extra breakpoints
 * xs: Allow for targeting extra narrow screens under 375px (though in reality we really only support 360px and up)
 * i.e., no responsive variant prefix needed for 0 to 374px; use xs variant for 375px and up
 * 3xl: 2xl + 2 x the screen edge margins
 */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = function () {
  return {
    xs: "375px",
    ...defaultTheme.screens,
    "3xl": "1700px",
  };
};
