/**
 * Custom gradient border styles
 */
module.exports = function () {
  return function ({ addComponents }) {
    const components = {
      '.gradient-border': {
        borderImageSlice: '1',
        borderImageSource: 'linear-gradient(to right top, #017E7C, #505EEC)'
      },
    }

    addComponents(components)
  }
}
