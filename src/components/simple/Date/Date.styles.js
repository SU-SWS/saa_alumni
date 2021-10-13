import { dcnb } from 'cnbuilder';

export const root = ({ className, isMinimal } = {}) =>
  dcnb(className, 'su-rounded-full su-w-fit', {
    'su-p-6 su-bg-gradient-to-tr su-from-saa-black su-to-saa-black-opacity-80 group-hover:su-from-black group-hover:su-to-black-opacity-80 group-focus-within:su-from-black group-focus-within:su-to-black-opacity-80':
      !isMinimal,
  });
export const dateWrapper = ({ isMinimal, isSmall }) =>
  dcnb(
    'su-justify-center su-w-fit su-rounded-full',
    'su-flex su-flex-row su-items-center',
    {
      'su-justify-start su-text-black': isMinimal,
      'su-bg-black-true su-text-white su-px-20': !isMinimal,
      'su-min-w-[9rem] su-h-90': isSmall && !isMinimal,
      'su-h-100 su-min-w-[10rem] lg:su-min-w-[11.4rem] lg:su-h-[11.4rem]':
        !isSmall && !isMinimal,
    }
  );
export const date = 'su-flex su-flex-col';
export const endDate = 'su-flex su-flex-col';
export const month =
  'su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22';
export const day = ({ isSmall }) =>
  dcnb('su-font-bold su-font-serif su-leading-trim su-text-[4.1rem]', {
    'md:su-text-m4': !isSmall,
  });
export const dash = ({ isSmall }) =>
  dcnb(
    'su-relative su-px-03em su-font-bold su-leading-trim su-top-11 su-text-m2',
    {
      'md:su-top-7 md:su-text-m4': !isSmall,
    }
  );
