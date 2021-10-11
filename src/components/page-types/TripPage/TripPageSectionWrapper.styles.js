import { dcnb } from 'cnbuilder';

export const root = 'su-rs-mt-9 lg:su-scroll-margin-top-130';
export const sectionHeading = ({ isCenter }) =>
  dcnb('su-rs-mb-3', { 'su-text-center': isCenter });
