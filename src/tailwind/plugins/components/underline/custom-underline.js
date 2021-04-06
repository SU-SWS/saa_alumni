/**
 * Custom text underline styles
 */
module.exports = function () {
  return function ({ addComponents, theme }) {
    const components = {
      // Add spacing between text and underline
      '.underline-offset': {
        textUnderlineOffset: '0.2rem',
      },
      // Custom text underline colors
      // For use directly in an <a> tag
      '.underline-saa-digital-red': {
        textDecorationColor: theme('colors.saa-digital-red'),
      },
      // For use in a parent container that contains the links
      '.link-underline-saa-digital-red a': {
        textDecorationColor: theme('colors.saa-digital-red'),
      },
    }

    addComponents(components)
  }
}
