import { dcnb } from 'cnbuilder';

export const root =
  'section-menu su-hidden lg:su-flex su-sticky su-top-0 su-z-30 su-cc su-pt-5 su-bg-saa-black su-justify-center su-items-center';
export const menu = 'su-flex su-list-unstyled su-bg-saa-black';
export const listItem = 'su-mb-0';
export const link = ({ isActive }) =>
  dcnb(
    'su-block su-text-white su-transition-colors su-font-bold su-leading-snug su-no-underline focus:su-outline-none su-underline-offset hocus:su-text-digital-red-xlight su-px-20 su-py-[4rem] su-border-b-[5px] su-border-solid su-border-transparent hocus:su-border-digital-red-xlight su-text-21',
    {
      'su-text-digital-red-xlight !su-border-digital-red-xlight': isActive,
    }
  );
export const button = 'su-ml-[8rem] su-mt-[-0.5rem]';

// Mobile styles
export const navWrapperMobile =
  'lg:su-hidden su-relative su-bg-saa-black su-rs-pb-2';
export const rootMobile =
  'section-menu-mobile su-relative su-block lg:su-hidden su-max-w-[35rem] su-mx-auto';
export const burger = ({ navOpened }) =>
  dcnb(
    'su-group su-w-full su-flex su-justify-between su-font-semibold su-items-center su-transition-colors su-border-solid su-border su-py-12 su-px-20 hocus:su-bg-digital-red hocus:su-text-white hocus:su-shadow-lg',
    {
      'su-bg-digital-red su-text-white su-border-black-80': navOpened,
      'su-text-black-10 su-border-black-70': !navOpened,
    }
  );
export const burgerIcon = ({ navOpened }) =>
  dcnb('su-transition-colors su-w-[2.4rem] group-hocus:su-text-white', {
    'su-text-white': navOpened,
    'su-text-digital-red-xlight': !navOpened,
  });
export const menuMobile = ({ navOpened }) =>
  dcnb(
    'su-flex su-flex-col su-absolute su-z-20 su-bg-saa-black su-shadow-xl su-bg-white su-w-full',
    'su-border-l su-border-r su-border-b su-border-black-80',
    {
      'su-block': navOpened,
      'su-hidden': !navOpened,
    }
  );
export const listMobile = 'su-flex su-flex-col su-list-unstyled su-p-0';
export const listItemMobile = 'su-mb-0 su-border-b su-border-black-80';
export const linkMobile =
  'su-group su-block su-no-underline su-border-l-5 su-border-saa-black su-py-14 su-pl-10 su-pr-20 su-transition-all su-text-white su-text-21 hocus:su-text-digital-red-xlight hocus:su-border-digital-red-xlight hocus:su-underline';
export const buttonWrapperMobile = 'su-px-20 md:su-px-30 su-rs-py-2';
export const buttonMobile = '!su-w-full su-text-center su-text-21';
