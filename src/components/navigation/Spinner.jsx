import React from 'react';
import { dcnb } from 'cnbuilder';

const SpinnerQuarter = () => (
  <div className="su-block su-absolute su-w-34 su-h-34 lg:su-w-38 lg:su-h-38 su-border-2 su-rounded-full su-box-border su-border-transparent su-border-t-white su-animate-spin" />
);

export const Spinner = ({ className }) => (
  <div
    className={dcnb(
      'su-spinner su-flex su-relative su-w-34 su-h-34 lg:su-w-38 lg:su-h-38',
      className
    )}
  >
    <SpinnerQuarter />
    <SpinnerQuarter />
    <SpinnerQuarter />
    <SpinnerQuarter />
  </div>
);
