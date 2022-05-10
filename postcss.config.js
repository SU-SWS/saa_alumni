/* eslint-disable global-require */
// postcss.config.js
module.exports = () => ({
  plugins: [require('tailwindcss'), require('autoprefixer')],
});
