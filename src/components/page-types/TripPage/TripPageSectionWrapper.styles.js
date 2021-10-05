import { dcnb } from 'cnbuilder';

export const root = 'su-rs-mt-9';
export const sectionHeading = ({ isCenter }) =>
  dcnb('su-rs-mb-3', { 'su-text-center': isCenter });
