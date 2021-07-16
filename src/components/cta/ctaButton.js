import React from "react";
import SbEditable from "storyblok-react";
import { SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import {
  buttonSizes,
  buttonStyles,
  textAlign,
} from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";
import HeroIcon from "../simple/heroIcon";

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
                <HeroIcon
                  iconType={icon}
                  className="su-inline-block"
                  isAnimate
                  hideSrText
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
