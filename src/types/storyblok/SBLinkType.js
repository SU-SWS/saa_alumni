import PropTypes from 'prop-types';

// This is the Storyblok Link schema
export const SBLinkType = PropTypes.shape({
  id: PropTypes.string,
  linktype: PropTypes.string,
  url: PropTypes.string,
  fieldtype: PropTypes.string,
  cached_url: PropTypes.string,
});
