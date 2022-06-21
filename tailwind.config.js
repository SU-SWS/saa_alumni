/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/**
 * Tailwind Configuration.
 */

const path = require('path');

// Path to custom Tailwind plugins for SAA
const dir = path.resolve(__dirname, 'src/tailwind/plugins');

module.exports = {
  prefix: 'su-',
  presets: [require('decanter')],
  content: ['./src/**/*.{js,jsx,md,mdx,ts,tsx}'],
  theme: {
    screens: require(`${dir}/theme/screens.js`)(),
    // SAA themes extending our Decanter ones
    extend: {
      colors: require(`${dir}/theme/colors.js`)(),
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children-hover', '& > *:hover');
      addVariant('children-hocus', '& > *:hover, & > *:focus');
    },

    // @tailwind base;
    require(`${dir}/base/base.js`)(),

    // @tailwind components;
    require(`${dir}/components/scroll-margin/scroll-margin.js`)(),
    require(`${dir}/components/underline/custom-underline.js`)(),
    require(`${dir}/components/underline/link-underline.js`)(),
    require(`${dir}/components/wysiwyg/heading-link.js`)(),

    // // @tailwind utilities;
    require(`${dir}/utilities/gradient-border/gradient-border.js`)(),
    require(`${dir}/utilities/grid/grid-cols.js`)(),
  ],
};
