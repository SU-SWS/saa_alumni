/**
 * Scroll margin utility for use with amchor links when there is a sticky/fixed nav at the top of the page
 */
module.exports = function () {
  return function ({ addComponents }) {
    const components = {
      '.scroll-margin-top-130': {
        scrollMarginTop: '13rem',
      },
    };

    addComponents(components);
  };
};
