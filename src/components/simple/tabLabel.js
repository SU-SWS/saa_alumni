import React from "react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";

const TabLabel = ({ text, srText, classes, ...props }) => (
  <div
    className={dcnb(
      "su-absolute su-top-0 su-left-0 su-rs-ml-2 su-pr-8 su-pl-9 su-pb-[1.5em] su-pt-12 su-bg-digital-red-light su-text-white su-font-semibold su-leading-none su-text-vertical-lr su-transform su-rotate-180 su-shadow-sm",
      classes
    )}
    {...props}
  >
    {text}
    <SrOnlyText srText={` ${srText}`} />
  </div>
);

export default TabLabel;
