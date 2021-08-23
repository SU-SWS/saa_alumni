import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import { Grid as DrGrid } from "decanter-react";
import CardImage from "../media/cardImage";
import CircularImage from "../media/circularImage";
import BasicCardContent from "./basicCardContent";

const BasicCardHorizontal = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isBigHeadline,
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
    "su-bg-white su-text-black su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm su-rs-pt-2 su-rs-px-2 su-rs-pb-3";

  // Basic card image has aspect ratio 3x2 for non-round option
  let cardImage = (
    <div className="md:su-col-span-1" aria-hidden="true">
      <div className="su-aspect-w-3 su-aspect-h-2">
        <CardImage
          filename={filename}
          size="vertical"
          imageFocus={imageFocus}
          smartFocus={focus}
          loading="lazy"
        />
      </div>
    </div>
  );

  if (isRound && filename) {
    cardImage = (
      <CircularImage
        borderColor={borderColor}
        filename={filename}
        imageFocus={imageFocus}
        smartFocus={focus}
        className="su-flex-shrink-0"
        loading="lazy"
      />
    );
  }

  if (isMinimal) {
    wrapperClasses = "";
  }

  return (
    <SbEditable content={blok}>
      <DrGrid
        element="article"
        gap
        className={dcnb(
          `basic-card-horizontal ${
            isRound
              ? "md:su-grid-flow-col md:su-grid-cols-auto-1fr"
              : "md:su-grid-cols-2"
          } su-gap-x-xl su-w-full su-basefont-23 su-break-words`,
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
        />
      </DrGrid>
    </SbEditable>
  );
};

export default BasicCardHorizontal;
