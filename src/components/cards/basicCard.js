import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import CardImage from "../media/cardImage";
import CircularImage from "../media/circularImage";
import BasicCardContent from "./basicCardContent";

const BasicCard = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isBigHeadline,
    align,
    image: { filename, focus } = {},
    imageFocus,
    headline,
    headingLevel,
    text,
  },
  blok,
  isDark,
}) => {
  // Default wrapper classes for white, non-minimal cards
  let wrapperClasses =
    "su-bg-white su-text-black su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm";

  // Card content padding for non-minimal cards
  let bodyPadding = "su-rs-px-2 su-rs-pt-2 su-rs-pb-4";

  // Basic card image has aspect ratio 3x2 for non-round option
  let cardImage = (
    <div className="su-aspect-w-3 su-aspect-h-2" aria-hidden="true">
      <CardImage
        filename={filename}
        size="vertical"
        imageFocus={imageFocus}
        smartFocus={focus}
        loading="lazy"
        width="600"
        height="400"
      />
    </div>
  );

  if (isRound && filename) {
    // If image is round, we need to add padding above the image
    wrapperClasses = dcnb("su-rs-pt-3", wrapperClasses);

    cardImage = (
      <CircularImage
        borderColor={borderColor}
        filename={filename}
        smartFocus={focus}
        className={isMinimal ? "" : "su-rs-ml-2"}
        loading="lazy"
        width="126"
        height="126"
      />
    );
  }

  if (isMinimal) {
    wrapperClasses = "su-max-w-600";
    bodyPadding = "";

    // Add top padding to content if the minimal card has an image
    if (filename) {
      bodyPadding = "su-rs-pt-2";
    }
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
          "basic-card su-w-full su-basefont-23 su-break-words",
          wrapperClasses
        )}
      >
        {filename?.startsWith("http") && cardImage}
        <BasicCardContent
          headline={headline}
          headingLevel={headingLevel}
          isBigHeadline={isBigHeadline}
          isDark={isDark && isMinimal}
          text={text}
          cta={cta}
          className={dcnb("card-body", bodyPadding, bodyAlign)}
        />
      </div>
    </SbEditable>
  );
};

export default BasicCard;
