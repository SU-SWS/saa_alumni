/**
 * Decanter default breakpoints + 2 extra breakpoints
 * xs: Allow for targeting extra narrow screens under 375px (though in reality we really only support 360px and up)
 * i.e., no responsive variant prefix needed for 0 to 374px; use xs variant for 375px and up
 * 3xl: 2xl + 2 x the screen edge margins
 */

module.exports = function () {
  return {
    xs: "375px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1500px",
    "3xl": "1700px",
  };
};
