import React from "react";
import SbEditable from "storyblok-react";
import { Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";

const CtaCard = ({ blok: { headline, cta }, blok }) => (
  <SbEditable content={blok}>
    <div
      className={dcnb(
        "cta-card su-w-full su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xdark su-basefont-23 su-break-words su-pb-50 su-px-50 su-h-[50rem] su-flex su-flex-col su-justify-end"
      )}
    >
      <Heading level="4" font="sans" weight="bold" className={dcnb("su-mb-0")}>
        {headline}
      </Heading>
      {cta && (
        <div className="su-rs-mt-2">
          <CreateBloks blokSection={cta} />
        </div>
      )}
    </div>
  </SbEditable>
);

export default CtaCard;
