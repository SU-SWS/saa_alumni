import { dcnb } from 'cnbuilder';

export const root = ({ orientation, isDark }) =>
  dcnb(
    'su-group su-relative su-w-full su-overflow-hidden su-bg-saa-black su-break-words su-basefont-23 su-bg-clip-padding su-border su-border-solid su-backface-hidden',
    {
      'su-w-full md:su-flex-row xl:su-h-500': orientation === 'horizontal',
      'sm:su-max-w-[42rem] md:su-max-w-full': orientation !== 'horizontal',
      'su-border-black hover:su-border-black-90 focus-within:su-border-black-90':
        isDark || orientation === 'horizontal',
      'su-border-black-30-opacity-40 hover:su-border-black-30 focus-within:su-border-black-30':
        !isDark && orientation !== 'horizontal',
    }
  );
export const imageWrapper = ({ orientation }) =>
  dcnb('su-relative su-overflow-hidden', {
    'su-w-full su-mb-[-4em] md:su-mb-0 md:su-w-1/2 su-h-[60vw] sm:su-h-[50vw] lg:su-h-[40vw] xl:su-h-500 su-flex-shrink-0 su-h-full':
      orientation === 'horizontal',
    'su-aspect-w-3 su-aspect-h-2 su-mb-[-3em]': orientation !== 'horizontal',
  });
export const image =
  'su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03] group-focus-within:su-scale-[1.03]';
export const gradient = ({ orientation }) =>
  dcnb(
    'su-absolute su-block su-w-full su-h-[101%] su-top-0 su-left-0 su-from-transparent su-to-saa-black su-backface-hidden su-bg-gradient-to-b',
    {
      'md:su-bg-gradient-to-r md:su-h-full': orientation === 'horizontal',
    }
  );
export const contentWrapper = ({ orientation }) =>
  dcnb('su-rs-px-2 su-rs-pb-3', {
    'su-w-full md:su-w-9/12 lg:su-w-7/12 lg:su-max-w-[72rem] md:su-self-end md:su-rs-pt-3 md:su-pl-0 md:su-ml-[-7em]':
      orientation === 'horizontal',
    'su-flex-grow': orientation !== 'horizontal',
  });
export const link = ({ orientation }) =>
  dcnb(
    'su-block su-stretched-link su-group su-mb-06em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight',
    {
      'su-type-2 md:su-type-1 lg:su-type-2 xl:su-type-3':
        orientation === 'horizontal',
      'su-type-1': orientation !== 'horizontal',
    }
  );
export const heading = 'su-relative su-inline su-type-0';
export const icon =
  'su-relative su-inline-block su-text-digital-red-xlight group-hocus:su-text-white';
export const description = ({ orientation }) =>
  dcnb('su-relative su-text-black-20 su-flex-grow su-mb-0 su-card-paragraph', {
    'xl:su-big-paragraph xl:su-leading-snug': orientation === 'horizontal',
  });
