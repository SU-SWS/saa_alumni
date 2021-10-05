import PropTypes from 'prop-types';

export const SBBlokType = PropTypes.arrayOf(
  PropTypes.shape({
    component: PropTypes.string,
    // TODO: Do we type everything else?
  })
);
