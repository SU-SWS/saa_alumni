import { dcnb } from 'cnbuilder';

export const root = '';
export const content = 'su-text-white lg:su-mt-[190px] su-text-center';
export const subtitle =
  'su-block su-max-w-prose su-font-serif su-leading-display su-type-2 su-text-shadow su-mx-auto su-mb-05em';
export const title = ({ isShortTitle }) =>
  dcnb(
    'su-leading-tight su-tracking-normal su-text-shadow-lg su-mb-02em su-max-w-[120rem] su-mx-auto',
    {
      'su-type-8': isShortTitle,
      'su-type-7': !isShortTitle,
    }
  );
export const description =
  'su-max-w-prose su-text-20 md:su-text-m1 su-leading-display su-text-shadow su-mx-auto su-mb-0';
