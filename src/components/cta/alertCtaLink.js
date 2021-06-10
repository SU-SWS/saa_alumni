import React from "react";
import SbEditable from "storyblok-react";
import {
  CtaLink as DecanterCtaLink,
  CtaButton as DecanterCtaButton,
} from "decanter-react";

const AlertCtaLink = ({ blok, ...rest }) => {
  const btnOptions = {
    href: blok.link.cached_url,
    text: blok.text,
    srText: blok.srText,
  };

  const setCtaLink = (type) => {
    switch (type) {
      case "button":
        return (
          <DecanterCtaButton
            {...btnOptions}
            variant={`${rest.isLinkDark ? "unset" : "ghost"}`}
            size="default"
            className={`${
              rest.isLinkDark &&
              "su-text-black su-border-black su-border-2 hover:su-text-black"
            }`}
          />
        );
      case "link":
        return (
          <DecanterCtaLink
            {...btnOptions}
            color="unset"
            className={`${rest.isLinkDark ? "su-text-black" : "su-text-white"}`}
          />
        );
      default:
        return "Please chose Type for the CTA Link";
    }
  };

  return <SbEditable content={blok}>{setCtaLink(blok.ctaType)}</SbEditable>;
};

export default AlertCtaLink;
