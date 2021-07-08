import React from "react";
import SbEditable from "storyblok-react";
import Icon from "react-hero-icon";
import { Heading, SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import { heroicon } from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";

const CtaCard = React.forwardRef(
  ({ blok: { headline, icon, linkText, link, rel, srText }, blok }, ref) => {
    // Icon size/position finetuning based on icon choice
    let iconClasses;

    if (icon === "external") {
      iconClasses =
        "su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform-gpu su-rotate-45 group-hocus:su-rotate-45";
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
    } else {
      iconAnimate = dcnb(iconAnimate, "group-hocus:su-translate-x-02em");
    }

    // Heroicon option
    const linkIcon = heroicon[icon] ?? heroicon["arrow-right"];

    return (
      <SbEditable content={blok}>
        <div
          className={dcnb(
            "cta-card su-w-full su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xdark su-basefont-23 su-break-words su-pb-50 su-px-50 su-h-[50rem] su-flex su-flex-col su-justify-end"
          )}
        >
          <SbLink
            ref={ref}
            link={link}
            attributes={rel ? { rel } : {}}
            classes="su-w-fit su-group su-transition-colors su-no-underline su-underline-offset hocus:su-underline su-text-white"
          >
            <Heading
              level="4"
              font="sans"
              weight="bold"
              className={dcnb("su-mb-0")}
            >
              {headline}
            </Heading>
            {linkText}
            {srText && <SrOnlyText srText={srText} />}
            {icon !== "none" && (
              <Icon
                icon={linkIcon}
                type="solid"
                aria-hidden="true"
                className={`su-inline-block su-text-white ${iconClasses} ${iconAnimate}`}
              />
            )}
          </SbLink>
        </div>
      </SbEditable>
    );
  }
);

export default CtaCard;
