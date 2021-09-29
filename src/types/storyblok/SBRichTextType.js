import PropTypes from 'prop-types';

export const SBRichTextContentNodeType = PropTypes.shape({
  // TODO: Better typing for rich text content nodes?
  /* eslint-disable react/forbid-prop-types */
  type: PropTypes.any,
  content: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
});

export const SBRichTextType = PropTypes.shape({
  type: PropTypes.oneOf(['doc']), // Other docuemtn types?
  content: PropTypes.arrayOf(SBRichTextContentNodeType),
});
