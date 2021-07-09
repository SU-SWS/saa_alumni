/**
 * SAA colors
 */
module.exports = function () {
  return {
    black: {
      true: {
        opacity: {
          20: "rgba(0, 0, 0, 20%)", // For use in linear gradients
        },
      },
      30: {
        opacity: {
          40: "rgba(192, 192, 191, 40%)", // For card borders
        },
      },
    },
    "masthead-black": {
      top: "rgba(13, 18, 17, 0.95)",
      bottom: "rgba(26, 31, 30, 0.85)",
    },
    "saa-black": "#181D1C",
    "digital-red-xlight": "#F83535", // Passed contrast test for black background
    "cardinal-red": {
      xdark: "#7A0000", // Passed contrast test with digital-red-xlight as text
      xxdark: "#541107", // Used for hover/focus color for xdark
    },
    "saa-electric-blue": {
      DEFAULT: "#505EEC",
      light: "#6B77F5",
    },
    facebook: "#4267B2",
    twitter: "#1da1f2",
    instagram: "#d73676",
    linkedin: "#0077b5",
    youtube: "#FF0000",
  };
};
