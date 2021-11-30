import PropTypes from 'prop-types';

export const BoxElementType = PropTypes.oneOf([
  'div',
  'section',
  'article',
  'main',
  'header',
  'footer',
  'aside',
  'nav',
  'form',
]);

// Flexbox specific types
export const FlexDirectionType = PropTypes.oneOf([
  'row',
  'row-reverse',
  'col',
  'col-reverse',
]);

export const FlexWrapType = PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']);

export const JustifyContentType = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
]);

export const JustifyItemsType = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'stretch',
]);

export const AlignContentType = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
]);

export const AlignItemsType = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
]);
