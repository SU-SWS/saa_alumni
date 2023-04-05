import { dcnb } from 'cnbuilder';

export const initialCircleWrapper = 'su-w-38 su-h-38 su-text-24';

export const initialCircle =
  'su-w-full su-h-full su-transition su-leading su-text-center su-text-white su-border-2 su-border-digital-red-xlight su-rounded-full lg:group-hocus:su-bg-cardinal-red-xxdark xl:group-hocus:su-bg-cardinal-red-dark su-uppercase su-overflow-hidden';

export const greeting = (showDesktopXl) =>
  dcnb(
    'su-inline-block su-mr-10 group-hocus:su-underline group-hocus:su-decoration-digital-red-xlight group-hocus:su-decoration-[0.12em] su-max-w-300 su-leading-tight su-break-words',
    {
      'su-hidden': !showDesktopXl,
    }
  );
