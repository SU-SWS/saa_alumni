import React from "react";
import SbEditable from "storyblok-react";
import { Heading, SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import SbLink from "../../utilities/sbLink";
import HeroIcon from "../simple/heroIcon";

const CtaCard = ({
  blok: { headline, headingLevel, linkText, link, srText },
  blok,
}) => (
  <SbEditable content={blok}>
    <div
      className={dcnb(
        "cta-card su-w-full su-relative su-transition-colors su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xxdark su-basefont-23 su-break-words su-rs-py-3 su-rs-px-2 su-flex su-flex-col su-justify-end"
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
          classes="su-block su-stretched-link su-group su-transition-colors su-font-regular su-no-underline su-underline-offset su-text-white hocus:su-underline hover:su-text-digital-red-xlight focus:su-text-white children:hocus:su-text-digital-red su-rs-mt-3"
        >
          {linkText}
          {srText && <SrOnlyText srText={srText} />}
          <HeroIcon
            iconType={link.linktype === "url" ? "external" : "arrow-right"}
            className="su-relative su-inline-block su-text-white group-hover:su-text-digital-red-xlight group-focus:su-text-white"
            isAnimate
            hideSrText
          />
        </SbLink>
      )}
    </div>
  </SbEditable>
);

export default CtaCard;
