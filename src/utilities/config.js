// Global variables for this project.

const config = {
  basePath:
    process.env.GATSBY_BASE_PATH === undefined
      ? '/'
      : process.env.GATSBY_BASE_PATH,
  assetCdn: process.env.GATSBY_ASSET_CDN ?? 'https://assets.stanford.edu/',
  breakpoint: {
    '2xs': 0,
    xs: 375,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1500,
  },
};

module.exports = { config };
