/**
 * Text shadow styles
 */
module.exports = function () {
  return function ({ addComponents }) {
    const components = {
      '.text-shadow': {
        textShadow: 'rgba(0, 0, 0, 40%) 0 0 6px'
      },
      '.text-shadow-md': {
        textShadow: 'rgba(0, 0, 0, 40%) 0 0 8px'
      },
      '.text-shadow-lg': {
        textShadow: 'rgba(0, 0, 0, 30%) 0 0 12px'
      },
    }

    addComponents(components)
  }
}
