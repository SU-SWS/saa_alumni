import { dcnb } from 'cnbuilder';

export const root = ({ isHomesite }) =>
  dcnb(
    'su-relative su-border-b su-border-solid last:su-border-none lg:su-inline-block lg:su-border-none',
    {
      'su-border-digital-red-light': isHomesite,
      'su-border-black-80': !isHomesite,
    }
  );

// Styles for top level buttons
const buttonMobile =
  'su-flex su-items-center su-w-full hocus:su-shadow-none hocus:su-underline su-py-20 su-pl-20 su-pr-80 su-text-20';
const buttonDesktop =
  'lg:su-items-end lg:su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:hocus:su-text-digital-red-xlight lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight';
export const parentButton = ({
  panelOpened,
  isActiveButton,
  isHomesite,
} = {}) =>
  dcnb(
    'su-group su-text-white su-transition-colors su-font-bold su-text-left su-leading-snug su-bg-transparent focus:su-outline-none su-underline-offset',
    buttonMobile,
    buttonDesktop,
    {
      'hocus:su-bg-cardinal-red-xxdark lg:su-text-19 2xl:su-text-21':
        isHomesite,
      'hocus:su-bg-black-90 lg:su-text-20 2xl:su-text-22': !isHomesite,
      'lg:hover:!su-bg-cardinal-red-xdark lg:hocus:!su-text-white lg:!su-bg-cardinal-red-xdark lg:!su-border-transparent':
        panelOpened,
      '!su-bg-cardinal-red-xxdark hover:!su-bg-digital-red !su-border-cardinal-red-xdark':
        panelOpened && isHomesite,
      '!su-bg-black-90 hover:!su-bg-black-80': panelOpened && !isHomesite,
      'lg:su-text-digital-red-xlight lg:su-bg-transparent lg:!su-border-digital-red-xlight':
        isActiveButton,
      'su-bg-cardinal-red-xxdark': isActiveButton && isHomesite,
      'su-bg-black-90': isActiveButton && !isHomesite,
    }
  );

export const parentTextLinebreak = 'su-hidden xl:su-inline 2xl:su-hidden';

// Styles for the down chevron, same for shared SAA and Homesite Main Nav
const chevronMobile =
  'su-absolute su-right-0 su-w-[3.4rem] su-pt-6 su-pb-5 su-px-5 su-bg-digital-red su-rounded-full group-hocus:!su-bg-digital-red-light su-mr-20';
const chevronDesktop =
  'lg:su-relative lg:su--top-3 lg:su-mr-0 lg:su-ml-02em lg:su-w-[0.9em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent';
export const chevron = ({ panelOpened, isActiveButton } = {}) =>
  dcnb(
    'su-inline-block su-text-white su-transition',
    chevronMobile,
    chevronDesktop,
    {
      'su-transform-gpu su-rotate-180': panelOpened,
      'su-bg-digital-red-light lg:su-text-digital-red-xlight': isActiveButton,
    }
  );

// Styles for top level links for shared SAA Main Nav only
// The Homesite Main Nav does not have top level links, only buttons
const topLinkMobile =
  'su-flex su-items-center hocus:su-underline hocus:su-text-white hocus:su-bg-black-90 su-p-20 su-text-20';
const topLinkDesktop =
  'lg:su-items-end lg:su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:hocus:su-text-digital-red-xlight lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight lg:su-text-20 2xl:su-text-22';
export const topLink = dcnb(
  'su-group su-text-white su-transition-colors su-font-bold su-text-left su-leading-snug su-no-underline focus:su-outline-none su-underline-offset',
  topLinkMobile,
  topLinkDesktop
);
export const activeTopLink =
  'su-bg-black-90 lg:su-bg-cardinal-red-xxdark lg:su-text-digital-red-xlight lg:!su-bg-transparent lg:!su-border-digital-red-xlight';
export const topLinkIcon =
  'su-top-2 lg:su-top-[-0.2rem] su-text-white group-hocus:su-text-digital-red-xlight';
export const childMenu = ({ panelFacing, panelOpened, isHomesite } = {}) =>
  dcnb(
    'su-list-unstyled su-transform-gpu su-transition su-ease-linear lg:su-ease-out su-origin-top lg:su-shadow-md lg:su-w-[29rem] su-px-20 lg:su-py-10 su-relative lg:su-absolute children:su-mb-0',
    {
      'lg:su-right-0 lg:su-origin-top-right': panelFacing === 'left',
      'lg:su-origin-top-left': panelFacing !== 'left',
      'su-bg-cardinal-red-xxdark su-w-full lg:su-bg-cardinal-red-xdark su-scale-y-100 lg:su-scale-100 su-opacity-100 su-visible su-pb-10':
        panelOpened,
      'su-invisible !su-scale-y-75 lg:!su-scale-75 su-opacity-0 children:su-hidden su-pb-0':
        !panelOpened,
      'su-bg-cardinal-red-xxdark': isHomesite && panelOpened,
      'su-bg-black-90': !isHomesite && panelOpened,
    }
  );
