import { dcnb } from 'cnbuilder';

export const root = 'su-block print:su-hidden';
export const link =
  'su-flex su-w-fit su-group su-transition-colors su-no-underline su-underline-offset hocus:su-underline';
export const leadingIconWrapper = 'su-w-fit su-max-w-3rem su-flex-shrink-0';
export const leadingIcon = 'su-mr-06em su-backface-hidden su-text-black-80';
export const trailingIcon = ({ textColor }) =>
  dcnb('su-inline-block', {
    'su-text-digital-red-light group-hocus:su-text-cardinal-red':
      textColor === 'bright-red-hover-cardinal-red',
    'su-text-white group-hocus:su-text-white': textColor === 'all-white',
    'su-text-black group-hocus:su-text-black': textColor === 'all-black',
    'su-text-digital-red-xlight group-hocus:su-text-black-20':
      textColor === 'bright-red-hover-white' ||
      textColor === 'white' ||
      textColor === 'black',
  });
