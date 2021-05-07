import React from "react";
import SbEditable from "storyblok-react";
import Icon from "react-hero-icon";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import {
  buttonSizes,
  buttonStyles,
  heroicon,
  textAlign,
} from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";

const CtaButton = React.forwardRef(
  (
    {
      blok: {
        size,
        buttonStyle,
        icon,
        align: propsAlign,
        linkText,
        link,
        rel,
        srText,
      },
      blok,
    },
    ref
  ) => {
    // Button size
    const ctaButtonSize = buttonSizes[size] ?? buttonSizes.default;

    // Button style
    const ctaButtonStyle = buttonStyles[buttonStyle] ?? buttonStyles.primary;

    // For all button styles other than ghost-gradient, icon color is same as text color
    let iconColor;

    if (buttonStyle === "ghost-gradient") {
      iconColor =
        "su-text-saa-electric-blue-light group-hover:su-text-white group-focus:su-text-white";
    }

    // Icon size/position finetuning based on icon choice
    let iconClasses;

    if (icon === "external") {
      iconClasses =
        "su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform su-rotate-45 group-hover:su-rotate-45 group-focus:su-rotate-45";
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
    let iconAnimate =
      "su-transition-transform group-hover:su-transform group-focus:su-transform";

    if (icon === "external") {
      iconAnimate = dcnb(
        iconAnimate,
        "group-hover:su-translate-x-01em group-focus:su-translate-x-01em group-hover:su--translate-y-01em group-focus:su--translate-y-01em"
      );
    } else if (icon === "download" || icon === "chevron-down") {
      iconAnimate = dcnb(
        iconAnimate,
        "group-hover:su-translate-y-02em group-focus:su-translate-y-02em"
      );
    } else {
      iconAnimate = dcnb(
        iconAnimate,
        "group-hover:su-translate-x-02em group-focus:su-translate-x-02em"
      );
    }

    // Heroicon option
    const linkIcon = heroicon[icon] ?? heroicon["arrow-right"];

    // Horizontal alignment
    const align = textAlign[propsAlign] ?? textAlign.left;

    return (
      <SbEditable content={blok}>
        {linkText && (
          <div className={`cta-button su-block ${align}`}>
            <SbLink
              ref={ref}
              link={link}
              attributes={rel ? { rel } : {}}
              classes={dcnb(
                "su-inline-block su-w-fit su-group su-border-solid su-border-3 su-transition-colors su-no-underline su-underline-custom su-font-regular hover:su-underline focus:su-underline hover:su-shadow-md focus:su-shadow-md",
                ctaButtonStyle,
                ctaButtonSize
              )}
            >
              {linkText}
              {srText && <SrOnlyText srText={srText} />}
              {icon !== "none" && (
                <Icon
                  icon={linkIcon}
                  type="solid"
                  aria-hidden="true"
                  className={`su-inline-block ${iconColor} ${iconClasses} ${iconAnimate}`}
                />
              )}
            </SbLink>
          </div>
        )}
      </SbEditable>
    );
  }
);

export default CtaButton;
