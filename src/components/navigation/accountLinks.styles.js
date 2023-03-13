import { dcnb } from 'cnbuilder';

export const greeting = (showDesktopXl) =>
  dcnb(
    'su-inline-block su-mr-10 group-hocus:su-underline group-hocus:su-decoration-digital-red-xlight group-hocus:su-decoration-[0.12em]',
    {
      'su-hidden': !showDesktopXl,
    }
  );
