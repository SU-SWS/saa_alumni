import { dcnb } from 'cnbuilder';

export const utilityNavLink =
  'children:su-text-white hocus:children:su-text-white su-m-0 su-transition-colors su-font-bold su-text-left su-leading-snug su-bg-transparent su-flex su-items-center children:su-justify-between su-w-full children:su-flex children:su-w-full children:su-py-20 children:su-px-20 su-text-20 hocus:su-bg-cardinal-red-xxdark su-border-digital-red-light children:su-no-underline children:hocus:su-underline su-border-t';
export const link =
  'su-flex su-items-baseline su-justify-between su-group su-w-full su-px-20 su-py-12 su-no-underline su-leading-display su-text-white hocus:su-underline hocus:su-text-white hocus:su-bg-cardinal-red-xxdark !su-underline-offset-[3px] lg:!su-decoration-digital-red-xlight su-text-20';
export const heroicon =
  'su-relative su-inline-block su-mt-0 su-text-digital-red-xlight group-hover:su-text-white group-focus:su-text-white su-mr-7';

export const desktopMenu = (expanded) =>
  dcnb(
    'su-transform-gpu su-transition su-origin-top md:su-origin-top-right su-bg-cardinal-red-xdark su-z-10 su-list-none su-absolute su-rs-px-1 su-rs-pt-0 su-rs-pb-1 children:su-mb-02em su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] md:su-w-[32rem] su-right-0 su-mt-8 su-text-left',
    {
      'su-scale-y-0 md:su-scale-x-0 su-opacity-0 su-invisible': !expanded,
      'su-scale-y-100 md:su-scale-x-100 su-opacity-100 su-visible': expanded,
    }
  );
export const mobileMenu =
  'su-z-10 su-p-0 su-list-none su-w-screen su-text-left lg:su-hidden';
