import React from "react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import { VideoCameraIcon, MicrophoneIcon } from "@heroicons/react/outline";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";

const HeroIcon = ({ iconType, srText, hideSrText, className, ...props }) => {
  let Icon;
  let iconStyle;

  if (iconType === "video") {
    Icon = VideoCameraIcon;
    iconStyle = "su-w-08em su-mt-[-0.2em]";
  } else if (iconType === "podcast") {
    Icon = MicrophoneIcon;
    iconStyle = "su-w-08em su-mt-[-0.25em]";
  } else if (iconType === "external") {
    Icon = ArrowUpIcon;
    iconStyle =
      "su-w-08em su-ml-02em su-rotate-45 group-hocus:su-rotate-45 group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em";
  } else if (iconType === "internal") {
    Icon = ArrowRightIcon;
    iconStyle =
      "su-w-08em su-ml-03em su--mt-01em group-hocus:su-translate-x-02em";
  }

  return (
    <>
      <Icon
        aria-hidden="true"
        className={dcnb(iconStyle, className)}
        {...props}
      />
      {!hideSrText && <SrOnlyText srText={srText || ` ${iconType} `} />}
    </>
  );
};

export default HeroIcon;
