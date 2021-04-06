/**
 * Custom text underline styles
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // Add spacing between text and underline
      '.underline-offset': {
        textUnderlineOffset: '0.2em',
      },
      // Custom text underline colors
      '.underline-saa-digital-red': {
        textDecorationColor: theme('colors.saa-digital-red'),
      },
      '.link-underline-saa-digital-red a': {
        textDecorationColor: theme('colors.saa-digital-red'),
      },
    }

    addComponents(components)
  }
}
