import PropTypes from 'prop-types';

export const FontWeightType = PropTypes.oneOf([
  'light',
  'regular',
  'semibold',
  'bold',
]);

export const LeadingType = PropTypes.oneOf([
  'none',
  'tight',
  'display',
  'snug',
  'cozy',
  'normal',
]);

export const ModularSizeType = PropTypes.oneOf([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'base',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
]);

export const FontStackType = PropTypes.oneOf(['sans', 'serif']);

export const TrackingType = PropTypes.oneOf([
  'tighter',
  'tight',
  'normal',
  'wide',
  'wider',
  'widest',
]);

export const TextAlignType = PropTypes.oneOf(['left', 'right', 'center']);
