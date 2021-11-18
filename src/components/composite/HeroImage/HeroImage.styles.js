import { dcnb } from 'cnbuilder';

export const root = 'su-relative su-bg-saa-black lg:su-top-0 print:su-bg-white';
export const imgWrapper = ({ children }) =>
  dcnb('su-top-0 su-overflow-hidden su-w-full su-h-full print:su-hidden', {
    'su-absolute': children,
  });
export const img = 'su-w-full su-h-full su-object-cover';
export const overlay = ({ overlay: overlayType }) =>
  dcnb(
    'su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-to-saa-black print:su-hidden',
    {
      'su-from-black-true-opacity-20': overlayType === 'dark',
      'su-from-transparent': overlayType === 'normal',
    }
  );
export const content =
  'su-relative su-rs-pt-10 su-rs-pb-8 print:su-pt-0 print-su-pb-0 print:children:su-text-black print:children:children:su-text-shadow-none';
