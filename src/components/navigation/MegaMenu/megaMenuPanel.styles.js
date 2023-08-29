import { dcnb } from 'cnbuilder';

/**
 * This Mega Menu Nav is only used on the SAA Homesite
 * The isHomesite has not been properly styled and tested for micosites
 */

export const root = ({ isHomesite }) =>
  dcnb(
    'su-float-left su-border-b su-border-solid last:su-border-none lg:su-inline-block lg:su-border-none',
    {
      'su-border-digital-red-light': isHomesite,
      'su-border-black-80': !isHomesite,
    }
  );

// Styles for top level buttons
const buttonMobile =
  'su-flex su-items-center su-font-semibold su-w-full hocus:su-shadow-none hocus:su-underline su-py-20 su-pl-26 su-pr-80 su-text-20';
const buttonDesktop =
  'lg:su-items-end lg:su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:su-font-bold lg:hocus:su-text-digital-red-xlight lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight';
export const parentButton = ({
  panelOpened,
  isActiveButton,
  isHomesite,
} = {}) =>
  dcnb(
    'su-group su-text-white su-transition-colors su-text-left su-leading-snug su-bg-transparent focus:su-outline-none su-underline-offset-[3px]',
    buttonMobile,
    buttonDesktop,
    {
      'hocus:su-bg-cardinal-red-xxdark lg:su-text-19 2xl:su-text-21':
        isHomesite,
      'hocus:su-bg-black-90 lg:su-text-20 2xl:su-text-22': !isHomesite,
      'lg:hover:!su-bg-transparent !su-text-digital-red-light lg:!su-bg-transparent lg:!su-border-digital-red-light':
        panelOpened,
      '!su-bg-cardinal-red-xxdark hover:!su-bg-digital-red !su-border-cardinal-red-xdark':
        panelOpened && isHomesite,
      '!su-bg-black-90 hover:!su-bg-black-80': panelOpened && !isHomesite,
      'lg:su-text-digital-red-xlight lg:su-bg-transparent lg:!su-border-digital-red-xlight':
        isActiveButton,
      'su-bg-transparent': isActiveButton && isHomesite,
      'su-bg-black-90': isActiveButton && !isHomesite,
    }
  );

export const parentTextLinebreak = 'su-hidden xl:su-inline 2xl:su-hidden';

// Styles for the down chevron, same for shared SAA and Homesite Main Nav
const chevronMobile =
  'su-absolute su-right-0 su-w-[3.4rem] su-pt-6 su-pb-5 su-px-5 su-bg-digital-red su-rounded-full group-hover:!su-bg-digital-red-light group-focus:!su-bg-digital-red-light su-mr-20';
const chevronDesktop =
  'lg:su-relative lg:su--top-3 lg:su-mr-0 lg:su-ml-02em lg:su-w-[0.9em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hover:su-text-digital-red-xlight lg:group-focus:su-text-digital-red-xlight lg:group-hover:!su-bg-transparent lg:group-focus:!su-bg-transparent';
export const chevron = ({ panelOpened, isActiveButton } = {}) =>
  dcnb(
    'su-inline-block su-text-white su-transition group-focus:su-text-white',
    chevronMobile,
    chevronDesktop,
    {
      'su-transform-gpu su-rotate-180 su-text-digital-red-light': panelOpened,
      'su-bg-digital-red-light lg:su-text-digital-red-xlight': isActiveButton,
    }
  );

export const childMenu = ({ panelOpened, isHomesite } = {}) =>
  dcnb(
    'su-z-50 su-left-0 su-list-unstyled su-transform-gpu su-transition su-ease-linear lg:su-ease-out lg:su-shadow-md su-w-full su-absolute children:su-mb-0',
    {
      'su-bg-white su-w-full su-scale-y-100 lg:su-scale-100 su-opacity-100 su-visible su-pb-10':
        panelOpened,
      'su-invisible !su-scale-y-0 lg:!su-scale-75 su-opacity-0 children:su-hidden su-pb-0':
        !panelOpened,
      'su-bg-white': isHomesite && panelOpened,
      'su-bg-black-90': !isHomesite && panelOpened,
    }
  );
