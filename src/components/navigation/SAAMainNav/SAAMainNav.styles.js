import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-flex children:su-mb-0';
export const menu =
  'su-flex su-flex-row su-items-end su-ml-auto su-list-unstyled children:su-mb-0';

// Mobile styles
export const rootMobile = 'lg:su-hidden su-flex-shrink-0';
const burgerMobileCommon =
  'su-group su-text-white su-flex su-flex-col md:su-pb-15 md:su-mt-19 su-w-40 su-items-center su-rs-ml-0 su-text-14 su-font-semibold lg:su-hidden hocus:su-shadow-none hocus:su-no-underline su-border-b-[5px] su-border-solid su-border-transparent hocus:su-border-digital-red-xlight';
export const burgerMobileSAA = dcnb(
  burgerMobileCommon,
  'su-pb-13 su-mt-19 md:su-mt-[2.3rem]'
);
export const burgerMobileHomesite = dcnb(
  burgerMobileCommon,
  'su-pb-8 su-mt-14 md:su-pb-15 md:su-mt-19'
);
export const burgerIconMobile =
  'su-transition-colors su-w-[2.4rem] group-hocus:su-text-digital-red-xlight';

const menuMobileCommon =
  'su-absolute su-rs-py-1 su-right-0 su-cc su-w-full su-shadow-lg su-border-t  su-border-solid su-border-digital-red-xlight su-flex su-flex-col su-list-unstyled children:su-mb-0 su-transform-gpu su-transition su-origin-top su-scale-y-0 su-opacity-0 su-backface-hidden';
export const menuMobileSAA = ({ menuOpened } = {}) =>
  dcnb(
    menuMobileCommon,
    'su-top-[117px] md:su-top-[123px] su-bg-saa-black su-border-b',
    {
      '!su-scale-y-100 !su-opacity-100 !su-visible': menuOpened,
      'su-invisible': !menuOpened,
    }
  );
export const menuMobileHomesite = ({ menuOpened } = {}) =>
  dcnb(
    menuMobileCommon,
    'su-top-[107px] md:su-top-[119px] su-bg-cardinal-red-xdark',
    {
      '!su-scale-y-100 !su-opacity-100 !su-visible': menuOpened,
      'su-invisible': !menuOpened,
    }
  );
