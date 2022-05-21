import { dcnb } from 'cnbuilder';

export const root = ({ color }) =>
  dcnb(
    'su-flex su-items-center su-w-fit su-sans su-font-semibold su-leading-display hocus:su-underline su-underline-offset-[3px]',
    {
      'su-text-white hocus:su-text-white': color === 'white',
      'su-text-black hocus:su-text-black': color === 'black',
    }
  );
