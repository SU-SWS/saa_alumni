/**
 * Tailwind Configuration.
 */

// For merging nested objects.
const merge = require('deepmerge')

// Path.
const path = require('path');

// Path to Decanter v7 Tailwind Config
const decanter = require('decanter/tailwind.config');

// Path to custom Tailwind plugins for SAA
const dir = path.resolve(__dirname, 'src/tailwind/plugins');

// This project's tailwind config. Overwrites settings in Decanter.
const tailwind = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: require(dir + '/theme/colors.js')(),
    }
  }
}

// Combine and export.
module.exports = merge({}, tailwind);
