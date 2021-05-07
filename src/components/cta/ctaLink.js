import React from "react";
import SbEditable from "storyblok-react";
import Icon from "react-hero-icon";
import { dcnb } from "cnbuilder";
import { SrOnlyText } from "decanter-react";
import {
  ctaLinkColor,
  ctaLinkTextSize,
  ctaLinkIconColor,
  heroicon,
  textAlign,
  tinyMarginBottom,
} from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";

const CtaLink = React.forwardRef(
  (
    {
      blok: {
        size,
        textColor: propsTextColor,
        iconColor: propsIconColor,
        icon,
        align: propsAlign,
        spacingBottom,
        link,
        rel,
        linkText,
        srText,
      },
      blok,
    },
    ref
  ) => {
    // Link text size
    const textSize = ctaLinkTextSize[size] ?? ctaLinkTextSize.default;

    // Link text color
    const textColor =
      ctaLinkColor[propsTextColor] ??
      ctaLinkColor["bright-red-hover-cardinal-red"];

    // Icon color
    const iconColor =
      ctaLinkIconColor[propsIconColor] ??
      ctaLinkIconColor["bright-red-hover-cardinal-red"];

    // Icon size/position finetuning based on icon choice
    let iconClasses;

    if (icon === "external") {
      iconClasses =
        "su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform su-rotate-45 group-hocus:su-rotate-45";
    } else if (icon === "email" || icon === "video") {
      iconClasses = "su-h-08em su-w-08em su-ml-7 su--mt-2";
    } else if (icon === "download") {
      iconClasses = "su-h-08em su-w-08em su-ml-4 su--mt-3";
    } else if (icon === "chevron-down") {
      iconClasses = "su-h-[1.1em] su-w-[1.1em] su-ml-4 su--mt-3";
    } else {
      iconClasses = "su-h-1em su-w-1em su-ml-04em su--mt-2";
    }

    // Icon animation
    let iconAnimate = "su-transition-transform group-hocus:su-transform";

    if (icon === "external") {
      iconAnimate = dcnb(
        iconAnimate,
        "group-hocus:su-translate-x-01em group-hocus:su--translate-y-01em"
      );
    } else if (icon === "download" || icon === "chevron-down") {
      iconAnimate = dcnb(iconAnimate, "group-hocus:su-translate-y-02em");
    } else {
      iconAnimate = dcnb(iconAnimate, "group-hocus:su-translate-x-02em");
    }

    // Heroicon option
    const linkIcon = heroicon[icon] ?? heroicon["arrow-right"];

    // Horizontal alignment
    const align = textAlign[propsAlign] ?? textAlign.left;

    // Margin bottom
    const marginBottom = tinyMarginBottom[spacingBottom] ?? tinyMarginBottom.md;

    return (
      <SbEditable content={blok}>
        {linkText && (
          <div className={`su-block ${align} ${textSize} ${marginBottom}`}>
            <SbLink
              ref={ref}
              link={link}
              attributes={rel ? { rel } : {}}
              classes={`su-w-fit su-group su-transition-colors su-no-underline su-underline-custom hocus:su-underline ${textColor}`}
            >
              {linkText}
              {srText && <SrOnlyText srText={srText} />}
              {icon !== "none" && (
                <Icon
                  icon={linkIcon}
                  type="solid"
                  aria-hidden="true"
                  className={`su-inline-block ${iconClasses} ${iconColor} ${iconAnimate}`}
                />
              )}
            </SbLink>
          </div>
        )}
      </SbEditable>
    );
  }
);

export default CtaLink;
