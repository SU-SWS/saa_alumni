import React from "react";
import SbEditable from "storyblok-react";
import Icon from "react-hero-icon";
import { Heading, SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import { heroicon, ctaLinkIconColor } from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";

const CtaCard = ({
  blok: { headline, headingLevel, linkText, link, srText },
  blok,
}) => {
  // Icon classes
  let iconClasses = "su-h-1em su-w-1em su-ml-04em su--mt-2";

  // Icon color
  const iconColor = ctaLinkIconColor["white-hover-digital-red"];

  // Icon animation
  let iconAnimate =
    "su-transition-transform group-hocus:su-transform-gpu group-hocus:su-translate-x-02em";

  // Heroicon option
  let linkIcon = heroicon["arrow-right"];

  if (link.linktype === "url") {
    iconClasses =
      "su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform-gpu su-rotate-45 group-hocus:su-rotate-45";
    iconAnimate =
      "su-transition-transform group-hocus:su-transform-gpu group-hocus:su-translate-x-01em group-hocus:su--translate-y-01em";
    linkIcon = heroicon.external;
  }

  return (
    <SbEditable content={blok}>
      <div
        className={dcnb(
          "cta-card su-w-full su-relative su-transition-colors su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xdark su-basefont-23 su-break-words su-rs-py-3 su-rs-px-2 su-flex su-flex-col su-justify-end"
        )}
      >
        <Heading
          level={parseInt(headingLevel, 10) ?? "3"}
          font="sans"
          weight="bold"
          size="2"
          className={dcnb(
            "su-mb-0 su-text-white hocus:su-text-white hocus:su-no-underline"
          )}
        >
          {headline}
        </Heading>
        {link && (
          <SbLink
            link={link}
            classes="su-block su-stretched-link su-group su-transition-colors su-no-underline su-underline-offset su-text-white hocus:su-underline hocus:su-text-digital-red-xlight children:hocus:su-text-digital-red su-rs-mt-3"
          >
            {linkText}
            {srText && <SrOnlyText srText={srText} />}
            <Icon
              icon={linkIcon}
              type="solid"
              aria-hidden="true"
              className={dcnb(
                "su-inline-block su-text-white",
                iconClasses,
                iconColor,
                iconAnimate
              )}
            />
          </SbLink>
        )}
      </div>
    </SbEditable>
  );
};

export default CtaCard;
