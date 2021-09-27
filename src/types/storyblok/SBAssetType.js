import PropTypes from 'prop-types';

export const SBAssetType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  alt: PropTypes.string,
  name: PropTypes.string,
  focus: PropTypes.string,
  title: PropTypes.string,
  filename: PropTypes.string,
  copyright: PropTypes.string,
  fieldType: PropTypes.string,
});

export const SBImageType = SBAssetType;
