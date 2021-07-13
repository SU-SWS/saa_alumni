import React from "react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import { VideoCameraIcon, MicrophoneIcon } from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/solid";

const HeroIcon = ({ iconType, srText, hideSrText, className, ...props }) => {
  const heroIconMap = {
    video: {
      heroicon: VideoCameraIcon,
      iconStyle: "su-w-08em su-mt-[-0.2em]",
    },
    podcast: {
      heroicon: MicrophoneIcon,
      iconStyle: "su-w-08em su-mt-[-0.25em]",
    },
    external: {
      heroicon: ArrowRightIcon,
      iconStyle:
        "su-w-08em su-ml-02em su--rotate-45 group-hocus:su--rotate-45 group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em",
    },
    internal: {
      heroicon: ArrowRightIcon,
      iconStyle:
        "su-w-08em su-ml-03em su--mt-01em group-hocus:su-translate-x-02em",
    },
  };

  const Icon = heroIconMap[iconType].heroicon;
  const heroIconStyle = heroIconMap[iconType].iconStyle;

  return (
    <>
      <Icon
        aria-hidden="true"
        className={dcnb(heroIconStyle, className)}
        {...props}
      />
      {!hideSrText && <SrOnlyText srText={srText || ` ${iconType} `} />}
    </>
  );
};

export default HeroIcon;
