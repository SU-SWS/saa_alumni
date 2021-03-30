/**
 * Tailwind Configuration.
 */

var path = require('path')
var dir = path.resolve(__dirname, 'src/tailwind/plugins')

module.exports = {
  mode: 'jit',
  prefix: 'su-',

  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: require(dir + '/theme/colors.js')(),
    }
  }
  // ...
}
