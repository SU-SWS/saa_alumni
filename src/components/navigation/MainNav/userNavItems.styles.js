import { dcnb } from 'cnbuilder';

export const utilityNavLink =
  'su-group su-font-regular hocus:su-underline su-transition su-w-full su-text-20 su-px-26 su-py-32 lg:su-pr-16 lg:su-py-26 su-flex su-items-baseline su-justify-between su-leading-display su-text-left su-font-semibold su-text-white hocus:su-text-white su-no-underline hocus:su-bg-cardinal-red-xxdark su-decoration-digital-red-xlight hocus:su-decoration-digital-red-xlight su-underline-offset-2';
export const utilityNav2Link =
  'su-group su-font-regular hocus:su-underline su-transition su-w-full su-text-20 su-px-26 su-py-12 su-flex su-leading-display su-text-left su-text-white hocus:su-text-white su-no-underline hocus:su-bg-cardinal-red-xxdark su-rounded su-decoration-digital-red-xlight hocus:su-decoration-digital-red-xlight su-underline-offset-2';
export const link =
  'su-flex su-items-baseline su-justify-between su-group su-w-full su-px-20 su-py-12 su-no-underline su-leading-display su-text-white hocus:su-text-white hocus:su-bg-cardinal-red-xxdark su-font-semibold !su-underline-offset-[3px] lg:!su-decoration-digital-red-xlight su-text-20';
export const heroicon =
  'su-relative su-inline-block su-mt-0 su-text-digital-red-xlight group-hocus:su-text-white su-text-[2.6rem] su-relative su-top-[0.15em]';

export const menuWrapper = (expanded) =>
  dcnb(
    'su-transform-gpu su-transition su-origin-top lg:su-origin-top-right lg:su-bg-cardinal-red-xdark lg:su-z-10 lg:su-absolute lg:su-shadow-lg lg:su-rounded-[4px] lg:su-rs-px-1 su-rs-pt-0 su-rs-pb-1 children:su-mb-02em su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] lg:su-w-[38rem] su-right-0 su-mt-8 su-text-left',
    {
      'lg:su-scale-y-0 lg:su-scale-x-0 lg:su-opacity-0 lg:su-invisible':
        !expanded,
      'lg:su-scale-y-100 lg:su-scale-x-100 lg:su-opacity-100 lg:su-visible':
        expanded,
    }
  );
export const desktopMenu = 'su-list-none su-p-0 su-m-0 su-hidden lg:su-block';

export const mobileMenu =
  'su-list-none su-p-0 su-w-screen su-text-left lg:su-hidden';

export const menu =
  'su-relative su-list-unstyled su-border-t su-border-digital-red-xlight children:su-mb-0 su-divide-y su-divide-cardinal-red-light';
export const menu2 =
  'su-relative children:su-mb-0 su-list-unstyled su-border-t su-border-digital-red-xlight su-pt-14';
