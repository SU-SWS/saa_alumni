import { dcnb } from 'cnbuilder';

export const sectionHeader = ({ isCenter }) =>
  dcnb('su-rs-mb-5', {
    'su-text-center su-w-fit su-mx-auto': isCenter,
  });
export const sectionHeading =
  'su-max-w-800 su-text-m3 md:su-text-m4 xl:su-text-m5 su-mb-07';
export const sectionIntro = 'su-big-paragraph su-max-w-prose';
