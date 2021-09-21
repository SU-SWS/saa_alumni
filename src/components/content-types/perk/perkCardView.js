import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import { largeMarginBottom } from "../../../utilities/dataSource";
import HeroIcon from "../../simple/heroIcon";

const PerkCardView = ({
  blok: {
    image: { filename, focus } = {},
    imageFocus,
    isNew,
    title,
    descriptionShort,
    cardUrl,
  },
  blok,
  headingLevel,
  orientation,
  spacingBottom,
  cardImageFocus,
  isDark,
}) => {
  let wrapperClasses = "perk-card su-max-w-500";
  let borderColor =
    "su-border-black-30-opacity-40 hover:su-border-black-30 focus-within:su-border-black-30";
  let imageWrapper = "su-aspect-w-3 su-aspect-h-2 su-mb-[-3em]";
  let gradientDirection = "su-bg-gradient-to-b";
  let contentWrapper = "su-flex-grow";
  let descriptionClasses = "su-card-paragraph";
  let marginBottom = "";

  // Horizontal card styles and options
  if (orientation === "horizontal") {
    wrapperClasses =
      "perk-card-horizontal su-w-full md:su-flex-row xl:su-h-500";
    marginBottom = largeMarginBottom[spacingBottom] ?? largeMarginBottom.md;
    imageWrapper =
      "su-w-full su-mb-[-4em] md:su-mb-0 md:su-w-1/2 su-h-[60vw] sm:su-h-[50vw] lg:su-h-[40vw] xl:su-h-500 su-flex-shrink-0 su-h-full";
    gradientDirection = dcnb(
      "md:su-bg-gradient-to-r md:su-h-full",
      gradientDirection
    );
    contentWrapper =
      "su-w-full md:su-w-9/12 lg:su-w-7/12 lg:su-max-w-[72rem] md:su-self-end md:su-rs-pt-3 md:su-pl-0 md:su-ml-[-7em]";
    descriptionClasses = dcnb(
      "xl:su-big-paragraph xl:su-leading-snug",
      descriptionClasses
    );
  }

  if (isDark || orientation === "horizontal") {
    borderColor =
      "su-border-black hover:su-border-black-90 focus-within:su-border-black-90";
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className={dcnb(
          "su-group su-relative su-w-full su-overflow-hidden su-bg-saa-black su-break-words su-basefont-23 su-bg-clip-padding su-border su-border-solid su-backface-hidden",
          wrapperClasses,
          borderColor,
          marginBottom
        )}
      >
        <div
          className={dcnb(
            "perk-card-image-wrapper su-relative su-overflow-hidden",
            imageWrapper
          )}
          aria-hidden="true"
        >
          {filename?.startsWith("http") && (
            <CardImage
              filename={filename}
              smartFocus={focus}
              imageFocus={cardImageFocus || imageFocus}
              className="su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03] group-focus-within:su-scale-[1.03]"
              loading={orientation === "horizontal" ? "eager" : "lazy"}
              size={orientation === "horizontal" ? "horizontal" : "vertical"}
            />
          )}
          <div
            className={dcnb(
              "su-absolute su-block su-w-full su-h-[101%] su-top-0 su-left-0 su-from-transparent su-to-saa-black su-backface-hidden",
              gradientDirection
            )}
            aria-hidden="true"
          />
        </div>
        {isNew && <TabLabel text="New" srText="item" />}
        <FlexBox
          direction="col"
          className={dcnb(
            "perk-card-content su-rs-px-2 su-rs-pb-3",
            contentWrapper
          )}
        >
          <SbLink
            link={cardUrl}
            classes={`su-block su-stretched-link su-group su-mb-06em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight ${
              orientation === "horizontal"
                ? "su-type-2 md:su-type-1 lg:su-type-2 xl:su-type-3"
                : "su-type-1"
            }`}
          >
            <Heading
              level={parseInt(headingLevel, 10) ?? 3}
              font="serif"
              tracking="normal"
              className="su-relative su-inline su-type-0"
            >
              {title}
            </Heading>
            <HeroIcon
              iconType={cardUrl.linktype === "url" ? "external" : "arrow-right"}
              className="su-relative su-inline-block su-text-digital-red-xlight group-hocus:su-text-white"
              isAnimate
            />
          </SbLink>
          <p
            className={dcnb(
              "su-relative su-text-black-20 su-flex-grow su-mb-0",
              descriptionClasses
            )}
          >
            {descriptionShort}
          </p>
        </FlexBox>
      </FlexBox>
    </SbEditable>
  );
};
export default PerkCardView;
