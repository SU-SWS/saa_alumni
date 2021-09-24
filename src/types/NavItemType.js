import PropTypes from 'prop-types';

// TODO: Make more general types and abstract
// This is the Storyblok Link schema
const SBLinkType = PropTypes.shape({
  id: PropTypes.number,
  linktype: PropTypes.string,
  url: PropTypes.string,
  fieldtype: PropTypes.string,
  cached_url: PropTypes.string,
});

export const NavItemType = {
  text: PropTypes.string,
  link: SBLinkType,
};
