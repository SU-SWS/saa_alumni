/**
 * Custom gradient border styles
 */
module.exports = function () {
  return function ({ addUtilities }) {
    const newUtilities = {
      '.gradient-border': {
        borderImageSlice: '1',
        borderImageSource: 'linear-gradient(to right top, #017E7C, #505EEC)'
      },
      '.gradient-border-bottom': {
        borderImageSlice: '1',
        borderImageSource: 'linear-gradient(to right, #017E7C, #505EEC)'
      },
      '.no-gradient-border': {
        borderImageSource: 'none'
      },
    }

    addUtilities(newUtilities)
  }
}
