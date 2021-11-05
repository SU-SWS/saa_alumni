import { dcnb } from 'cnbuilder';

export const root = 'su-block print:su-hidden';
export const link =
  'su-inline-block su-w-fit su-group su-border-solid su-border-3 su-transition-colors su-no-underline su-underline-offset su-font-regular hocus:su-underline hocus:su-shadow-md';
export const icon = ({ buttonStyle }) =>
  dcnb('su-inline-block', {
    'su-text-digital-red-light group-hocus:su-text-white':
      buttonStyle === 'secondary',
    'su-text-saa-electric-blue group-hocus:su-text-white':
      buttonStyle === 'secondary-gradient',
  });
