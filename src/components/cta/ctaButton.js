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

    // Icon size/position finetuning based on icon choice
    let iconClasses;

    if (icon === "external") {
      iconClasses =
        "su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform-gpu su-rotate-45 group-hocus:su-rotate-45";
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
    let iconAnimate = "su-transition-transform group-hocus:su-transform-gpu";

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

    return (
      <SbEditable content={blok}>
        {linkText && (
          <div className={`cta-button su-block ${align}`}>
            <SbLink
              ref={ref}
              link={link}
              attributes={rel ? { rel } : {}}
              classes={dcnb(
                "su-inline-block su-w-fit su-group su-border-solid su-border-3 su-transition-colors su-no-underline su-underline-offset su-font-regular hocus:su-underline hocus:su-shadow-md",
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
                  className={`su-inline-block ${iconClasses} ${iconAnimate}`}
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
