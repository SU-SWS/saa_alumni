/**
 * SAA custom base styles extending Decanter 7 base
 */

module.exports = function () {
  return function ({ addBase, config }) {
    addBase({
      html: {
        scrollBehavior: "smooth",
      },
      a: {
        color: config("theme.colors.digital-red.light"),
        transition: "color 0.25s ease-in-out",

        "&:hover, &:focus": {
          color: config("theme.colors.cardinal-red.DEFAULT"),
        },
      },
      ".su-global-footer": {
        ".su-logo": {
          "&:hover, &:focus": {
            color: config("theme.colors.white"),
          },
        },
        nav: {
          a: {
            textDecoration: "none",

            "&:hover, &:focus": {
              textDecoration: "underline",
            },
          },
        },
      },
      // TW su-break-words utility uses "line-wrap: break-word" which doesn't support break up long email addresses
      // Adding "word-break: break-word" add support for long email addresses
      ".su-break-words": {
        wordBreak: "break-word",
      }
    });
  };
};
