import React from 'react';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from '../accessibility/SrOnlyText';

const TabLabel = ({ text, srText, classes, ...props }) => {
  // Focus isn't on the card itself since we are using the stretched-link class for accessibility, so no need for group-focus styles
  const interactionClasses =
    'group-hover:su-bg-none group-hover:su-bg-digital-red-light group-focus-within:su-bg-none group-focus-within:su-bg-digital-red-light';

  return (
    <div
      className={dcnb(
        'su-absolute su-top-[-1px] su-left-0 su-rs-ml-2 su-pr-8 su-pl-9 su-pb-[1.5em] su-pt-12 su-bg-digital-red-light su-text-white su-font-semibold su-leading-none su-text-vertical-lr su-transform-gpu su-rotate-180 su-transition su-bg-gradient-to-t su-from-digital-red su-to-digital-red-light first-letter:su-uppercase',
        interactionClasses,
        classes
      )}
      {...props}
    >
      {text}
      {srText && <SrOnlyText>{` ${srText}`}</SrOnlyText>}
    </div>
  );
};

export default TabLabel;
