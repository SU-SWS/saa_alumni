import { dcnb } from 'cnbuilder';

export const root =
  'su-border-solid su-border-digital-red-light last:su-border-none lg:su-border-b';
export const link = ({ isHomesite }) =>
  dcnb(
    'su-block su-group su-w-full su-px-20 su-py-16 su-no-underline lg:su-text-20 2xl:su-text-21 su-leading-display su-text-white su-font-regular hocus:su-underline hocus:su-text-white lg:hocus:su-bg-cardinal-red-xxdark !su-underline-offset lg:!su-underline-digital-red-xlight',
    {
      'hocus:su-bg-digital-red': isHomesite,
      'hocus:su-bg-black-80': !isHomesite,
    }
  );
export const activeLink = ({ isHomesite }) =>
  dcnb('!su-underline lg:su-bg-cardinal-red-xxdark', {
    'su-bg-digital-red': isHomesite,
    'su-bg-black-80': !isHomesite,
  });
export const externalIcon =
  'su-text-digital-red-xlight group-hocus:su-text-white';
