import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import CardImage from "../media/cardImage";
import CircularImage from "../media/circularImage";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const BasicCard = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isLightText,
    isBigHeadline,
    align,
    image: { filename } = {},
    imageFocus,
    headline,
    headingLevel,
    text,
  },
  blok,
}) => {
  const numCta = getNumBloks(cta);

  // Default wrapper classes for white, non-minimal cards
  let wrapperClasses =
    "su-bg-white su-text-black su-border su-border-solid su-border-transparent-black su-shadow";
  let imageClasses;

  // Basic card image has aspect ratio 4x3 for non-round option
  const imageWrapperClasses = "su-aspect-w-4 su-aspect-h-3";

  // Card content padding for non-minimal cards
  let bodyPadding = "su-rs-px-2 su-rs-pt-2 su-rs-pb-4";

  let cardImage = (
    <div className="su-aspect-w-4 su-aspect-h-3" aria-hidden="true">
      <CardImage
        filename={filename}
        size={isRound ? "thumb" : "vertical"}
        imageFocus={imageFocus}
        loading="lazy"
      />
    </div>
  );

  if (isRound) {
    // If image is round, we need to add padding above the image
    wrapperClasses = dcnb("su-rs-pt-3", wrapperClasses);
    cardImage = (
      <CircularImage
        borderColor={borderColor}
        filename={filename}
        imageFocus={imageFocus}
        className={isMinimal ? "" : "su-rs-ml-2"}
        loading="lazy"
      />
    );
  }

  if (isMinimal) {
    wrapperClasses = "";
    bodyPadding = "su-rs-pt-2";
  }

  // Option to use light text (only for minimal card option)
  if (isLightText) {
    wrapperClasses = "su-bg-transparent su-text-white";
  }

  // Option to make headline font larger
  let headlineSize = "su-type-2";

  if (isBigHeadline) {
    headlineSize = "su-type-3";
  }

  // Content alignment including image and CTA, default is left-align
  // This setting overrides the alignment option in the nested CTA
  let bodyAlign = "su-items-start";

  if (align === "center") {
    wrapperClasses = dcnb(wrapperClasses, "children:su-mx-auto su-text-center");
    bodyAlign = "su-items-center";
  }

  return (
    <SbEditable content={blok}>
      <div
        className={dcnb(
          "basic-card su-max-w-600 su-basefont-23",
          wrapperClasses
        )}
      >
        {filename?.startsWith("http") && cardImage}
        <FlexBox
          direction="col"
          className={dcnb("card-body", bodyPadding, bodyAlign)}
        >
          <Heading
            level={headingLevel ?? 3}
            font="serif"
            weight="bold"
            className={dcnb("su-mb-0", headlineSize)}
          >
            {headline}
          </Heading>
          {text && (
            <p className="su-card-paragraph su-rs-mt-neg1 su-mb-0">{text}</p>
          )}
          {numCta > 0 && (
            <div className="su-rs-mt-2">
              <CreateBloks blokSection={cta} />
            </div>
          )}
        </FlexBox>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
