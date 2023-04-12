import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-flex children:su-mb-0';
export const menu =
  'su-flex su-flex-row su-items-end su-ml-auto su-list-unstyled children:su-mb-0';

// Mobile styles
export const rootMobile = 'lg:su-hidden su-flex-shrink-0';
export const menuCircles =
  'su-flex-shrink-0 su-w-34 su-h-34 su-ml-auto su-items-center su-flex su-justify-center su-justify-content-center lg:su-w-auto lg:su-h-[3.4rem] lg:su-pl-16 lg:su-pr-13 su-rounded-full lg:su-text-18 su-text-white su-leading-none su-border-2 su-border-solid su-border-digital-red-xlight su-transition-colors hocus:su-bg-cardinal-red-xxdark xl:hocus:su-bg-cardinal-red-xdark lg:hocus:su-no-underline su-self-center';
export const headerUserCircle =
  'su-flex su-justify-center su-transition su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark';

export const burgerIconMobile =
  'su-transition-colors su-w-[2.2rem] group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight';

const menuMobileCommon =
  'su-w-full su-border-t su-border-solid su-border-digital-red-light su-flex su-flex-col su-list-unstyled children:su-mb-0';
export const menuMobileSAA = ({ menuOpened } = {}) =>
  dcnb(menuMobileCommon, ' su-bg-black');
export const menuMobileHomesite = ({ menuOpened } = {}) =>
  dcnb(menuMobileCommon);
