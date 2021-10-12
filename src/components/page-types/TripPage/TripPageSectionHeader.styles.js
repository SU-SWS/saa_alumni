import { dcnb } from 'cnbuilder';

export const sectionHeader = ({ isCenter }) =>
  dcnb('su-rs-mb-5', {
    'su-text-center su-w-fit children:su-mx-auto': isCenter,
  });
export const sectionHeading = ({ isCenter }) =>
  dcnb('su-type-5 su-mb-07', {
    'su-max-w-[120rem]': isCenter,
    'su-max-w-800': !isCenter,
  });
export const sectionIntro =
  'su-big-paragraph su-max-w-prose children:su-leading-snug';
