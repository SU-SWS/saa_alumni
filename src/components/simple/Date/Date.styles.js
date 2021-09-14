import { dcnb } from 'cnbuilder';

export const root = ({ className, isMinimal } = {}) =>
  dcnb(
    className,
    'su-p-6 su-rounded-full su-bg-gradient-to-tr su-from-saa-black su-to-saa-black-opacity-80 su-w-fit group-hover:su-from-digital-red group-hover:su-to-digital-red-light',
    { 'su-bg-transparent': isMinimal }
  );

export const dateWrapper = ({ isMinimal }) =>
  dcnb(
    'su-justify-center su-w-fit su-h-100 lg:su-h-[11.4rem] su-bg-black-true su-rounded-full',
    'su-flex su-flex-row su-items-center su-px-20',
    'su-min-w-[10rem] lg:su-min-w-[11.4rem]',
    'su-text-white',
    { 'su-justify-start su-bg-transparent': isMinimal }
  );
export const date = 'su-flex su-flex-col su-items-center';
export const endDate = 'su-flex su-flex-col su-items-center';
export const month =
  'su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22';
export const day =
  'su-font-bold su-font-serif su-leading-trim su-text-m5 md:su-text-m4 lg:su-text-m5';
export const dash =
  'su-relative su-top-7 su-text-m4 su-font-bold su-leading-trim';
