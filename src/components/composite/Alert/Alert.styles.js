import { dcnb } from 'cnbuilder';

export const root = ({ type }) =>
  dcnb({
    'su-bg-illuminating-dark su-text-black': type === 'warning',
    'su-bg-digital-red su-text-white': type === 'error',
    'su-bg-digital-green su-text-white': type === 'success',
    'su-bg-digital-blue su-text-white': type === 'info',
  });
export const wrapper = 'su-cc su-rs-py-1 sm:su-items-center';
export const labelWrapper =
  'su-order-1 su-mb-15 md:su-mb-0 su-flex su-flex-shrink-0 su-rs-mr-1 su-w-full md:su-w-max';
export const label = 'su-text-17 su-mb-0';
export const iconWrapper = 'su-inline-block su-mr-5';
export const contentWrapper = 'su-order-2 su-flex-1 su-flex-grow su-w-full';
export const heading = 'su-rs-mb-neg1';
