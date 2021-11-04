import { dcnb } from 'cnbuilder';

export const root = ({ type, isOpen }) =>
  dcnb(
    'su-modal su-fixed su-w-screen su-h-screen su-overscroll-contain su-overflow-auto su-top-0 su-left-0 su-items-center su-justify-center su-z-50',
    {
      'su-flex': isOpen,
      'su-hidden': !isOpen,
      'su-bg-saa-black-dark': type === 'trip-filter',
    }
  );
export const wrapper = ({ type }) =>
  dcnb(
    'su-absolute su-w-screen su-h-screen su-overflow-auto su-basefont-19 su-pointer-events-auto',
    {
      'su-rs-py-5 su-bg-saa-black su-bg-opacity-[97%]': type !== 'trip-filter',
    }
  );
export const closeButtonWrapper = ({ type }) =>
  dcnb({
    'su-cc su-flex su-justify-end': type !== 'trip-filter',
    'su-fixed su-top-0 su-right-20 sm:su-right-30 md:su-right-50 su-z-[60] su-rs-pt-1':
      type === 'trip-filter',
  });
export const closeButton =
  'su-group su-bg-transparent su-text-white hocus:su-bg-transparent su-font-semibold hocus:su-underline su-text-m1 su-flex su-items-end focus:su-outline-none';
export const closeIcon = ({ type }) =>
  dcnb('su-inline-block su-h-[1.1em] su-w-[1.1em] su-ml-4', {
    'su-transition-colors group-hocus:su-text-palo-verde-light':
      type === 'trip-filter',
  });
