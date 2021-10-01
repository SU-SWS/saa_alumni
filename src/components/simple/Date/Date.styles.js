import { dcnb } from 'cnbuilder';

export const root = ({ className, isMinimal } = {}) =>
  dcnb(
    className,
    'su-p-6 su-rounded-full su-bg-gradient-to-tr su-from-saa-black su-to-saa-black-opacity-80 su-w-fit group-hover:su-from-black group-hover:su-to-black-opacity-80 group-focus-within:su-from-black group-focus-within:su-to-black-opacity-80',
    { 'su-bg-transparent': isMinimal }
  );
export const dateWrapper = ({ isMinimal, isSmall }) =>
  dcnb(
    'su-justify-center su-w-fit su-bg-black-true su-rounded-full',
    'su-flex su-flex-row su-items-center su-px-20 su-text-white',
    {
      'su-justify-start su-bg-transparent': isMinimal,
      'su-min-w-[9rem] su-h-90': isSmall,
      'su-h-100 su-min-w-[10rem] lg:su-min-w-[11.4rem] lg:su-h-[11.4rem]':
        !isSmall,
    }
  );
export const date = 'su-flex su-flex-col';
export const endDate = 'su-flex su-flex-col';
export const month =
  'su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22';
export const day = ({ isSmall }) =>
  dcnb('su-font-bold su-font-serif su-leading-trim', {
    'su-text-[4.1rem]': isSmall,
    'su-text-m5 md:su-text-m4 lg:su-text-m5': !isSmall,
  });
export const dash = ({ isSmall }) =>
  dcnb('su-relative su-px-03em su-font-bold su-leading-trim', {
    'su-top-7 su-text-m4': !isSmall,
    'su-top-11 su-text-m2': isSmall,
  });
