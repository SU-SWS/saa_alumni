// Common variables for shared datasource in Storyblok

export const borderColors = {
  'digital-red': 'su-border-digital-red',
  'digital-red-xlight': 'su-border-digital-red-xlight',
  'electric-blue': 'su-border-saa-electric-blue',
  'lagunita-light': 'su-border-lagunita-light',
  'palo-verde': 'su-border-palo-verde',
  plum: 'su-border-plum',
  poppy: 'su-border-poppy',
};

export const bgColors = {
  'digital-red': 'su-bg-digital-red',
  'digital-red-xlight': 'su-bg-digital-red-xlight',
  'electric-blue': 'su-bg-saa-electric-blue',
  'lagunita-light': 'su-bg-lagunita-light',
  'palo-verde': 'su-bg-palo-verde',
  plum: 'su-bg-plum',
  poppy: 'su-bg-poppy',
  'foggy-light': 'su-bg-foggy-light',
  white: 'su-bg-white',
  black: 'su-bg-saa-black su-text-white',
};

export const bgTextColorPairs = {
  'foggy-light': 'su-bg-foggy-light su-text-black print:su-bg-white',
  'black-10': 'su-bg-black-10 su-text-black print:su-bg-white',
  white: 'su-bg-white su-text-black',
  black: 'su-bg-saa-black su-text-white print:su-text-black print:su-bg-white',
  'cardinal-red':
    'su-bg-cardinal-red su-text-white print:su-text-black print:su-bg-white',
  plum: 'su-bg-plum su-text-white print:su-text-black print:su-bg-white',
  'gradient-red':
    'su-bg-gradient-to-tr su-from-cardinal-red su-to-digital-red su-text-white',
  'use-bg-image': 'su-bg-black su-text-white',
};

export const bgPositionVertical = {
  top: 'su-bg-top',
  center: 'su-bg-center',
  bottom: 'su-bg-bottom',
};

export const buttonSizes = {
  small:
    'su-px-20 su-pt-10 su-pb-11 md:su-px-26 md:su-pt-14 md:su-pb-16 su-text-18 md:su-text-20',
  'small-short':
    'su-px-20 su-pt-7 su-pb-8 md:su-px-26 md:su-pt-8 md:su-pb-10 su-text-18 md:su-text-20',
  default:
    'su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18 su-text-18 md:su-text-24',
  large:
    'su-px-20 su-pt-10 su-pb-11 md:su-px-36 md:su-pt-[22px] md:su-pb-[24px] su-text-18 md:su-text-24',
};

export const buttonStyles = {
  primary:
    'su-border-digital-red su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xdark hocus:su-text-white hocus:su-border-cardinal-red-xdark',
  secondary:
    'su-border-digital-red su-text-digital-red-light hocus:su-bg-cardinal-red-xdark hocus:su-text-white',
  'secondary-gradient':
    'su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-text-saa-electric-blue hocus:su-text-white hocus:su-bg-gradient-to-tr hocus:su-from-palo-verde-dark hocus:su-to-saa-electric-blue',
  ghost:
    'su-border-digital-red-xlight su-bg-transparent su-text-white hocus:su-bg-cardinal-red-xdark hocus:su-text-white',
  'ghost-gradient':
    'su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-text-white su-bg-transparent hocus:su-text-white hocus:su-bg-gradient-to-tr hocus:su-from-palo-verde-dark hocus:su-to-saa-electric-blue',
  'palo-verde-gradient':
    'su-border-palo-verde-dark su-bg-palo-verde-dark su-text-white hocus:su-text-white hocus:su-bg-gradient-to-tr hocus:su-from-palo-verde-dark hocus:su-to-saa-electric-blue hocus:su-gradient-border hocus:su-border-to-rt-palo-verde-dark-to-saa-electric-blue',
};

export const ctaGroupDisplay = {
  adjacent:
    'su-flex-col su-items-center lg:su-items-start lg:su-flex-row lg:su-flex-wrap lg:su-justify-center children:su-mx-10',
  'adjacent-left':
    'su-flex-col su-items-start lg:su-flex-row lg:su-flex-wrap lg:su-justify-start su--ml-10 children:su-mx-10',
  stack: 'su-flex-col su-items-center children:su-mx-auto',
};

export const ctaLinkColor = {
  'bright-red-hover-cardinal-red':
    'su-text-digital-red-light hocus:su-text-cardinal-red',
  'bright-red-hover-white': 'su-text-digital-red-xlight hocus:su-text-black-20',
  black: 'su-text-black hocus:su-text-black !su-underline-digital-red-light',
  white:
    'su-text-black-20 hocus:su-text-black-20 !su-underline-digital-red-xlight',
};

export const ctaLinkTextSize = {
  default: 'su-text-19 md:su-text-21 xl:su-text-23',
  large: 'su-text-19 md:su-text-23 xl:su-text-25',
  small: 'su-text-19 md:su-text-20 xl:su-text-21',
};

// Line heights
export const fontLeadings = {
  none: 'su-leading-none', // 1
  tight: 'su-leading-tight', // 1.1
  display: 'su-leading-display', // 1.2
  snug: 'su-leading-snug', // 1.3
  cozy: 'su-leading-cozy', // 1.4
  normal: 'su-leading', // 1.5
};

export const fontStacks = {
  sans: 'su-font-sans',
  serif: 'su-font-serif',
  slab: 'su-font-slab',
};

// Letter spacing
export const fontTrackings = {
  tighter: 'su-tracking-tighter', // -0.05em
  tight: 'su-tracking-tight', // 0.025em;
  normal: 'su-tracking-normal', // 0
  wide: 'su-tracking-wide', // 0.025em;
  wider: 'su-tracking-wider', // 0.05em;
  widest: 'su-tracking-widest', // 0.1em;
};

export const fontWeights = {
  light: 'su-font-light',
  regular: 'su-font-regular',
  semibold: 'su-font-semibold',
  bold: 'su-font-bold',
};

export const modularTypes = {
  base: 'su-type-0',
  1: 'su-type-1',
  2: 'su-type-2',
  3: 'su-type-3',
  4: 'su-type-4',
  5: 'su-type-5',
  6: 'su-type-6',
  7: 'su-type-7',
  8: 'su-type-8',
};

export const objectPosition = {
  top: 'su-object-top',
  center: 'su-object-center',
  bottom: 'su-object-bottom',
  left: 'su-object-left',
  right: 'su-object-right',
};

export const pageTextColors = {
  dark: 'su-text-black su-link-digital-red hover:su-link-sky-dark focus:su-link-sky-dark',
  light: 'su-text-white su-link-white hover:su-link-white focus:su-link-white',
};

export const posterGradients = {
  'digital-red-plum-black':
    'linear-gradient(240deg, rgba(24, 29, 28, 0.95) 10%, rgba(98, 0, 89, 0.85) 60%, rgb(177, 4, 14) 100%)',
  'sky-dark-lagunita-dark-black':
    'linear-gradient(240deg, rgba(24, 29, 28, 0.95) 10%, rgba(0, 107, 129, 0.85) 60%, rgb(1, 104, 149) 100%)',
  'palo-verde-dark-palo-alto-dark-black':
    'linear-gradient(240deg, rgba(24, 29, 28, 0.95) 10%, rgba(1, 66, 64, 0.85) 60%, rgb(1, 126, 124) 100%)',
};

export const smallPaddingBottom = {
  none: '',
  xxs: 'su-rs-pb-0',
  xs: 'su-rs-pb-1',
  sm: 'su-rs-pb-2',
  md: 'su-rs-pb-3',
  lg: 'su-rs-pb-4',
  xl: 'su-rs-pb-5',
  xxl: 'su-rs-pb-6',
};

export const smallPaddingTop = {
  none: '',
  xxs: 'su-rs-pt-0',
  xs: 'su-rs-pt-1',
  sm: 'su-rs-pt-2',
  md: 'su-rs-pt-3',
  lg: 'su-rs-pt-4',
  xl: 'su-rs-pt-5',
  xxl: 'su-rs-pt-6',
};

export const largePaddingBottom = {
  none: '',
  xxs: 'su-rs-pb-4',
  xs: 'su-rs-pb-5',
  sm: 'su-rs-pb-6',
  md: 'su-rs-pb-7',
  lg: 'su-rs-pb-8',
  xl: 'su-rs-pb-9',
  xxl: 'su-rs-pb-10',
};

export const largePaddingTop = {
  none: '',
  xxs: 'su-rs-pt-4',
  xs: 'su-rs-pt-5',
  sm: 'su-rs-pt-6',
  md: 'su-rs-pt-7',
  lg: 'su-rs-pt-8',
  xl: 'su-rs-pt-9',
  xxl: 'su-rs-pt-10',
};

export const tinyMarginBottom = {
  none: '',
  sm: 'su-mb-03em',
  md: 'su-mb-05em',
  lg: 'su-mb-07em',
};

export const largeMarginBottom = {
  none: '',
  xxs: 'su-rs-mb-4',
  xs: 'su-rs-mb-5',
  sm: 'su-rs-mb-6',
  md: 'su-rs-mb-7',
  lg: 'su-rs-mb-8',
  xl: 'su-rs-mb-9',
  xxl: 'su-rs-mb-10',
};

export const textAlign = {
  left: 'su-text-left',
  center: 'su-text-center',
  right: 'su-text-right',
};

export const horizontalAlign = {
  left: '',
  center: 'su-mx-auto',
  right: 'su-ml-auto',
};

export const justifyItems = {
  start: 'su-justify-items-start',
  center: 'su-justify-items-center',
  end: 'su-justify-items-end',
};

export const mediaAspectRatio = {
  '16x9': 'su-aspect-w-16 su-aspect-h-9',
  '4x3': 'su-aspect-w-4 su-aspect-h-3',
  '1x1': 'su-aspect-w-1 su-aspect-h-1',
};

export const superheadStyles = {
  'gradient-underline': {
    light:
      'su-text-black hocus:su-text-saa-electric-blue su-border-saa-electric-blue su-gradient-border su-border-to-r-palo-verde-dark-to-saa-electric-blue su-border-b-[4px] su-border-solid hocus:su-no-gradient-border',
    dark: 'su-text-white hocus:su-text-saa-electric-blue-light su-border-saa-electric-blue-light su-gradient-border su-border-to-r-palo-verde-dark-to-saa-electric-blue su-border-b-[4px] su-border-solid su-transition-colors hocus:su-no-gradient-border',
  },
  'red-back-link': {
    light:
      'su-text-digital-red-light hocus:su-text-cardinal-red su-underline-offset hocus:su-underline',
    dark: 'su-text-digital-red-xlight hocus:su-text-white su-underline-offset hocus:su-underline',
  },
};
