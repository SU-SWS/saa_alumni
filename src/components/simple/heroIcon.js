import React from "react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import { VideoCameraIcon, MicrophoneIcon } from "@heroicons/react/outline";

const HeroIcon = ({ iconType, srText, className, ...props }) => {
  let Icon;
  let iconStyle;

  if (iconType === "video") {
    Icon = VideoCameraIcon;
    iconStyle = "su-mt-[-0.2em]";
  } else if (iconType === "podcast") {
    Icon = MicrophoneIcon;
    iconStyle = "su-mt-[-0.25em]";
  }

  return (
    <>
      <Icon
        aria-hidden="true"
        className={dcnb(iconStyle, className)}
        {...props}
      />
      <SrOnlyText srText={srText || ` ${iconType} `} />
    </>
  );
};

export default HeroIcon;
