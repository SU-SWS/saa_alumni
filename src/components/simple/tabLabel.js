import React from "react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";

const TabLabel = ({ text, srText, classes, ...props }) => {

  // Focus isn't on the card itself since we are using the stretched-link class for accessibility, so no need for group-focus styles
  const interactionClasses =
    "group-hover:su-bg-gradient-to-t group-hover:su-from-cardinal-red group-hover:su-to-digital-red-light group-hover:su-shadow-md";

  return (
    <div
      className={dcnb(
        "su-absolute su-top-0 su-left-0 su-rs-ml-2 su-pr-8 su-pl-9 su-pb-[1.5em] su-pt-12 su-bg-digital-red-light su-text-white su-font-semibold su-leading-none su-text-vertical-lr su-transform-gpu su-rotate-180 su-shadow-sm su-transition",
        interactionClasses,
        classes
      )}
      {...props}
    >
      {text}
      <SrOnlyText srText={` ${srText}`} />
    </div>
  );
};

export default TabLabel;
