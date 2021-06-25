/**
 * Add custom styles for heading links within a WYSIWYG
 */

module.exports = function () {
  return function ({ addComponents }) {
    const components = {
      ".heading-link-icon": {
        "h2, h3, h4, h5, h6": {
          "> a": {
            "&::after": {
              display: "inline-block",
              content: "''",
              mask: "url(/images/arrow-right.svg)",
              "-webkit-mask-size": "contain",
              backgroundColor: "currentColor",
              width: "0.8em",
              height: "0.8em",
              position: "relative",
              top: "0.05em",
              marginLeft: "0.3em",
              transition: "transform 0.25s ease-in-out",
            },

            "&:hover, &:focus": {
              "&::after": {
                transform: "translateX(0.2em)",
              },
            },

            "&.external-link": {
              "&::after": {
                transform: "rotate(-45deg)",
                width: "0.75em",
                height: "0.75em",
                top: "0.1em",
                marginLeft: "0.2em",
              },

              "&:hover, &:focus": {
                "&::after": {
                  transform: "translate(0.15em, -0.15em) rotate(-45deg)",
                },
              },
            },
          },
        },
      },
    };

    addComponents(components);
  };
};
